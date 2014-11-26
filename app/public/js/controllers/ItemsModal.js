angular.module('regApp.controllers')

.controller('ItemsModalCtrl', ['$scope', '$modalInstance', 'ItemsDB', 'HardcodedService', 'Random', 'item', 'gui',
  function($scope, $modalInstance, ItemsDB, HardcodedService, Random, item, gui) {

  //----connected to listing
  // $scope.edata = item;

  //----get data from database
  $scope.edata = {};

  ItemsDB.getItem({id: item._id}, function(data) {
    $scope.edata = data;
  });

  $scope.agents = HardcodedService.agents;
  $scope.types = HardcodedService.types;


  $scope.generateDate = function(){
    $scope.edata.bDate = Random.randomDate();
  }
  $scope.generatePhone = function(){
    $scope.edata.phone =  Random.randomPhone();
  }

  $scope.edit = function () {

    var withoutId = $scope.edata;
    delete withoutId._id;

    ItemsDB.update({id: item._id}, withoutId, function (data) {});

    ItemsDB.get(function(data) {
      $modalInstance.close(data);
    });

    // console.log($scope);
    // $modalInstance.close($scope.items);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


  $scope.copyToClipboard = function(){
    // console.log(JSON.stringify(item));
    var itemToText = item.fName + " " + item.lName + "\n" + item.bDate + "\n" + item.phone + "\n" + item.mail;
    gui.setClipboard(itemToText );
  }

}]);
