angular.module('regApp.controllers')

.controller('NavigationCtrl', ['$scope', '$location', function($scope, $location) {
  
  $scope.changeView = function(view) {
      $location.path(view);
  };

}]);