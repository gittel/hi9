'use strict';

angular.module('ih9App') // ,['ngSanitize']
  .config(function ($routeProvider) {
    $routeProvider
      .when('/material', {
        templateUrl: 'app/pages/material/material.html',
        controller: 'MaterialCtrl'
      });
})

.filter('checkmark', function() {
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  })

/*
.filter('svgdonat', function($sce) {
    return function(input) {
      return $sce.trustAsHtlm('<svg><rect class="srec" width="15" height="10"></rect></svg>');
    };
  })
*/

;
