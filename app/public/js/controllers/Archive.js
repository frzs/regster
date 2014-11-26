angular.module('regApp.controllers')

.controller('ArchiveCtrl', ['$scope', 'ArchiveDB', function($scope, ArchiveDB) {
  
    ArchiveDB.get(function(data) {
        $scope.items = data;
    });

    

    $scope.removeItem = function (item) {
        var deleteItem = confirm('Are you sure you want to delete this item?');   

        if (deleteItem) {
          ArchiveDB.delete({id:item._id}, function() {
            $scope.items.splice($scope.items.indexOf(item), 1);
          });
        }
    
    };

    /*
     Export to json
    */
    $scope.export = function(){
        // console.log($scope.items);
        window.location = "http://localhost:3000/archive"
    }

}]);