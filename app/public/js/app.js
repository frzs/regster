'use strict';

var regApp = angular.module('regApp', [
  'ngRoute',
  'ngResource', 
  'ngAnimate', 
  'ui.bootstrap',
  'regApp.controllers',
  'regApp.services',
  'regApp.routes'
  ]);

var controllers = angular.module('regApp.controllers', []);
var services = angular.module('regApp.services', []);
var routes = angular.module('regApp.routes', []);

