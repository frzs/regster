angular.module('regApp.controllers')

.controller('AgentsCtrl', ['$scope', 'AgentsDB', 'HardcodedService', function($scope, AgentsDB, HardcodedService) {
  
  //----initial inputs values
  $scope.agentsData = {};

  //----get data from database
  // AgentsDB.get(function(data) {
  //   $scope.agents = data;
  // });

  $scope.agents = HardcodedService.agents;
  // console.log($scope.agents);

  //----add item and clear inputs
  $scope.addAgent = function() {
    var agent = {
      name: $scope.agentsData.name,
      payRate: $scope.agentsData.payRate
      // date: $scope.agentsData.date,
      // regNum: $scope.agentsData.regNum
    };

    AgentsDB.add(agent, function(data) {
      agent._id = data._id;
      $scope.agents.push(agent);
      $scope.agentsData = { name: null, payRate: null };
    });
  };

  //----remove item from base
  $scope.removeAgent = function (item) {
    AgentsDB.delete({id:agent._id}, function() {
      $scope.agents.splice($scope.agents.indexOf(agent), 1);
    });
  };

  $scope.updateAgent = function(item){

    var withoutId = $scope.agentsData;
    delete withoutId._id;

    AgentsDB.update({id: item._id}, withoutId, function (data) {});
  }


}]);