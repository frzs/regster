angular.module('regApp.services')
.factory('ItemsDB', function($resource) {
  return $resource('/items/:id',
    {id: '@id'},
    {
      get: {method: 'GET', isArray: true },
      getItem: {method: 'GET', isArray: false},
      add: {method: 'POST'},
      delete: {method: 'DELETE'},
      update: {method: 'PUT'},
      updateStateDown: {method: 'PUT', params:{ direction: "down" } },
      updateStateUp: {method: 'PUT', params:{ direction: "up" } }
      // {method: 'PUT', params: {memberRoute: 'location'}}
    }
  );
});