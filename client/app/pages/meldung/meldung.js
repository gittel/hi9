'use strict';

angular.module('ih9App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/meldung', {
        templateUrl: 'app/pages/meldung/meldung.html',
        controller: 'MeldungCtrl'
      });
  });
