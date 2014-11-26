angular.module('regApp.controllers')

.controller('ListingCtrl', ['$scope', '$modal', 'ItemsDB', 'HardcodedService', 'Random', 'ArchiveDB',
  function($scope, $modal, ItemsDB, HardcodedService, Random, ArchiveDB) {

  // input field's colaps
  $scope.showNew = true;
  $scope.showPay = false;

  /*
    Initial input fields values
  */
  $scope.pdata = { 
      mainText: '',//'ИМЯ ФАМИЛИЯ\n12.12.2014\n595926245\nlastname.firstname@yandex.ru',
      fName: '',
      lName: '',
      bDate: '',
      phone: '',
      mail: ''
  };

  /*
    Initial get data from database
  */
  ItemsDB.get(function(data) {
    $scope.items = data;
    $scope.calculate($scope.items);
  });

  // AgentsDB.get(function(data){
  //   $scope.agents = data;
  // });

  $scope.agents = HardcodedService.agents;
  $scope.types = HardcodedService.types;


  /*
    Add item and clear input fields
  */
  $scope.addItem = function() {
    var item = {
      fName: $scope.pdata.fName,
      lName: $scope.pdata.lName,
      bDate: $scope.pdata.bDate,
      phone: $scope.pdata.phone,
      mail: $scope.pdata.mail,
      type: $scope.pdata.type,
      agent: $scope.pdata.agent,
      state: 1,//$scope.pdata.state,
      postDate: $scope.pdata.postDate
    };

    ItemsDB.add(item, function(data) {
      item._id = data._id;
      $scope.items.push(item);
      $scope.pdata = {
        name: null,
        surname: null,
        birthDate: null,
        phone: null,
        email: null,
        type: null,
        agent: null,
        state: null,
        postDate: null
      }

      $scope.calculate($scope.items);  //dynamically calculate on addition
    });
  };


  /*
    Remove item from base
  */
  $scope.removeItem = function (item) {
    var deleteItem = confirm('Are you sure you want to delete this item?');   

    if (deleteItem) {
      ItemsDB.delete({id:item._id}, function() {
        $scope.items.splice($scope.items.indexOf(item), 1);
        $scope.calculate($scope.items);  //dynamically calculate on delete
      });
    }
    
  };


  /*
    Change item state and move to another zone
  */ 
  $scope.changeState = function(item, direction){

    // ItemsDB.update(item, function (data) { });
    if(direction == "down"){
      ItemsDB.updateStateDown(item, function (data) {});
    }else if(direction == "up"){
      ItemsDB.updateStateUp(item, function (data) {});
    }

    ItemsDB.get(function(data) {
      $scope.items = data;
      $scope.calculate($scope.items);  //dynamically calculate on state change
    });

  };
  
  /*
    Parse textarea value to inputs
  */
  $scope.parse = function(){

    var pdata = $scope.pdata,
        text = $scope.pdata.mainText,
        matchAll = /([А-Я]+\s[А-Я]+\D)\n(\d{1,2}.\d{1,2}.\d{3,4})\n(\d{5,9})\n(.+@[^>]+)/g,
        matchName = /([А-Я]+\s[А-Я]+\D)(?!\n\n)/m,  //[\s\n]/g; ([\n\s\S]*?)  [?:^(\n)]  (\n?)
        matchBirthDate = /(\d{2}.\d{2}.\d{4})/g,
        matchPhone = /(\d{5,9})/g,
        matchMail = /(.+@[^>]+)$/g;

    // parse as whole expression
    // var nameUnparsed = text.match(matchName)[0],
    //     fullName = nameUnparsed.split(' '),
    //     bDate = text.match(matchBirthDate)[0],
    //     phone = text.match(matchPhone)[0],
    //     mail = text.match(matchMail)[0];

    // // Change input field's value
    // pdata.fName = fullName[0];
    // pdata.lName = fullName[1];
    // pdata.bDate = bDate;
    // pdata.phone = phone;
    // pdata.mail = mail;

    // // return pdata;

    // parse each value separately
    if(text){
    
      if(text.match(matchName) != null){
        var nameUnparsed = text.match(matchName)[0];
        var fullName = nameUnparsed.split(' ');
        pdata.fName = fullName[0];
        pdata.lName = fullName[1];
      }
      if(text.match(matchBirthDate) != null){
        var bDate = text.match(matchBirthDate)[0];
        pdata.bDate = bDate;
      }
      if(text.match(matchPhone) != null){
        var phone = text.match(matchPhone)[0];
        pdata.phone = phone;
      }
      if(text.match(matchMail) != null){
        var mail = text.match(matchMail)[0];
        pdata.mail = mail;
      }
    
    }
    
  };


   /*
    Backward parse
  */
  $scope.parseBack = function(){

    var pdata = $scope.pdata;
    var backFirstName = pdata.fName != undefined ? pdata.fName : "",
        backLastName = pdata.lName != undefined ? pdata.lName : "",
        backDate = pdata.bDate != undefined ? pdata.bDate : "",
        backPhone = pdata.phone != undefined ? pdata.phone : "",
        backMail = pdata.mail != undefined ? pdata.mail : "";
    $scope.pdata.mainText = backFirstName +" "+ backLastName +"\n"+ backDate +"\n"+ backPhone +"\n"+ backMail;
  };



  /*
    Random generators
  */
  $scope.generateDate = function(){
    $scope.pdata.bDate = Random.randomDate();
    $scope.parseBack();
  }
  $scope.generatePhone = function(){
    $scope.pdata.phone =  Random.randomPhone();
    $scope.parseBack();
  }


  /*
    Open modal dialog for editing
  */
  $scope.openModal = function (item) {

    var modalInstance = $modal.open({
      templateUrl: 'views/itemsEditModal.html',
      controller: 'ItemsModalCtrl',
      resolve: {
        item: function () {
          return item;
        }
      }
    });

    modalInstance.result.then(function (response) {
      $scope.items = response;
      $scope.calculate($scope.items);  //dynamically calculate on edit
    }, function () {
      console.log("Error opening modal");
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };


  /*
    Calculate and display price of entered items
  */
  $scope.calculate = function(items){

    $scope.totalItems = items.length;    // total items in current session
    $scope.enteredItems = 0;             // items in red area
    $scope.pendingItems = 0;             // items in yeallow area
    $scope.completedItems = 0;           // items in green area(completed)
    $scope.completedTotalPrice = 0;      // total price of completed items
    $scope.completedSelfPay = 0;         // total payment
    $scope.completedAgentsPay = 0;       // total agents payments


    for(i = 0; i < items.length; i++){

      var typePrice = HardcodedService.getTypeRate(items[i].type);
      var agentRate = HardcodedService.getAgentRate(items[i].agent);

      if(items[i].state == 1) $scope.enteredItems++ ;

      if(items[i].state == 2) $scope.pendingItems++ ;

      if(items[i].state == 3){ 
        $scope.completedItems++;
        $scope.completedTotalPrice += parseInt(typePrice);

        $scope.completedAgentsPay += agentRate * typePrice;
        $scope.completedSelfPay += typePrice - (agentRate * typePrice);
      }

    }

  }

  /*
    Move completed items to archive, add date to each
  */
  $scope.moveToArchive = function(){
    var items = $scope.items;
    var itemsArr = [];        //array to hold archive candidate items

    var date = new Date();
    // var fullDate = date.getDate() +"."+ (parseInt(date.getMonth()) + 1) +"."+ date.getFullYear();

    for(i = 0; i < items.length; i++){
      
      // check if completed
      if(items[i].state == 3){

        //add date to each element

        items[i].date = date.toDateString();

        //add to array for database or add each to base
        itemsArr.push(items[i]);
      }
    }

    // add to db as array
    ArchiveDB.add(itemsArr, function(data) {

      // clear all completed from scope
      for(i = 0; i < itemsArr.length; i++){

        //TODO: make this pretty, in one request
        ItemsDB.delete({id:itemsArr[i]._id}, function() {});

        items.splice(items.indexOf(itemsArr[i]), 1);
      }

      $scope.calculate(items); 
    });

  }

}]);