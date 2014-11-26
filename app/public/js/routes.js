angular.module('regApp.routes')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', 
          {
            templateUrl: 'views/main.html', 
            controller: 'ListingCtrl'
          })
        .when('/archive', 
          {
            templateUrl: 'views/archive.html', 
            controller: 'ArchiveCtrl'
          })
        .when('/agents', 
          {
            templateUrl: 'views/agents.html'
            // controller: 'AgentsCtrl'
          })
        .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
}]);