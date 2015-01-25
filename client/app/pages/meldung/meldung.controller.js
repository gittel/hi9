'use strict';

angular.module('ih9App')
  .controller('MeldungCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/meldung').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('meldung', $scope.awesomeThings);
    });

    $scope.addMeldung = function() {
      if($scope.newMeldung === '') {
        return;
      }
      $http.post('/api/meldung', { name: $scope.newMeldung });
      $scope.newMeldung = '';
    };

    $scope.deleteMeldung = function(meldung) {
      $http.delete('/api/meldung/' + meldung._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('meldung');
    });
  });
