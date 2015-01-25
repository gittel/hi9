'use strict';

angular.module('ih9App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/pages/admin/admin.html',
        controller: 'AdminCtrl'
      });
  });
