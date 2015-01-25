'use strict';

angular.module('ih9App')
  .controller('MaterialCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/material').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('material', $scope.awesomeThings);
    });

    $scope.addMaterial = function() {
      if($scope.newMaterial === '') {
        return;
      }
      $http.post('/api/material', { name: $scope.newMaterial });
      $scope.newMaterial = '';
    };

    $scope.deleteMaterial = function(material) {
      $http.delete('/api/material/' + material._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('material');
    });
  });
