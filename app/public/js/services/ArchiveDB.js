angular.module('regApp.services')
.factory('ArchiveDB', function($resource) {
  return $resource('/archive/:id',
    {id: '@id'},
    {
      get: {method: 'GET', isArray: true },
      getItem: {method: 'GET', isArray: false},
      add: {method: 'POST', isArray: true},
      delete: {method: 'DELETE'},
      update: {method: 'PUT'}
    }
  );
});