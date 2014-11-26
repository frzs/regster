angular.module('regApp.services')
.factory('AgentsDB', function($resource) {
  return $resource('/agents/:id',
    {id: '@id'},
    {
      get: {method: 'GET', isArray: true },
      getItem: {method: 'GET', isArray: false},
      add: {method: 'POST'},
      delete: {method: 'DELETE'},
      update: {method: 'PUT'}
    }
  );
});