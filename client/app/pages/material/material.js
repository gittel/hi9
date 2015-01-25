'use strict';

angular.module('ih9App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/material', {
        templateUrl: 'app/pages/material/material.html',
        controller: 'MaterialCtrl'
      });
  });
