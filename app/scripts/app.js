'use strict';

/**
 * @ngdoc overview
 * @name almachaApp
 * @description
 * # almachaApp
 *
 * Main module of the application.
 */
angular
  .module('almachaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'underscore'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/almacha.html',
        controller: 'AlmachaCtrl',
        controllerAs: 'almacha'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
