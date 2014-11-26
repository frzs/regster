angular.module('regApp.controllers')

.controller('TypesCtrl', ['$scope', 'HardcodedService', function($scope, HardcodedService) {
  
  //----initial inputs values
  $scope.typesData = {};

  $scope.types = HardcodedService.types;

}]);