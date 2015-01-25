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
      $http.post('/api/material', { name: $scope.newMaterial,status:0,info:$scope.newInfo + 'demo' });
      $scope.newMaterial = '';
    };

    $scope.updateMaterial = function(material) {
      $http.put('/api/material/'+ material._id, { status: material.status, info:material.info });
    };

    $scope.nextStatus = function(material) {
      if (material.status<7){
      $http.put('/api/material/'+ material._id, { status: material.status +1 });
    } else return;
    };


    $scope.deleteMaterial = function(material) {
      $http.delete('/api/material/' + material._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('material');
    });
  });
