'use strict';

angular.module('ih9App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/pages/main/main.html',
        controller: 'MainCtrl'
      });
  });
