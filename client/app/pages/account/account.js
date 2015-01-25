'use strict';

angular.module('ih9App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/pages/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/pages/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/pages/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
