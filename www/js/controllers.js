angular.module('whereto.controllers', [])


.controller('AirportsCtrl', function($scope, $stateParams, $ionicPopup, $ionicLoading, $timeout, Airdata) {

    $scope.search = {};

    $scope.$watch('search.q', function (val) {
        $timeout(function() {
            if (val === $scope.search.q) {
                $scope.search();
            }
        }, 500);

    });

    $scope.search = function() {
        
        if ($scope.search.q) {
            Airdata.airports($scope.search.q).then(function(data) {
                $scope.airports = data;
            });
        }
    }

    $scope.nearest = function() {

        $scope.loading = $ionicLoading.show({
          template: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(
            function(position) {
                Airdata.nearAirports(position.coords.longitude, position.coords.latitude).then(function(data) {
                    $scope.airports = data;
                });
                $scope.loading.hide();
            },
            function(error) {
                $scope.loading.hide();
                $ionicPopup.alert({
                     title: 'Location error',
                     template: "Location service is off or it's not possible to get location at moment.",
                     okType: 'button-positive'
                });
            },
            {
                timeout: 16000,
                enableHighAccuracy: false
            }
        );
    }
})

.controller('AirportCtrl', function($scope, $stateParams, Airdata) {

    Airdata.airport($stateParams.id).then(function(data) {
        $scope.airport = data;
    });
})

.controller('AirlinesCtrl', function($scope, $stateParams, Airdata) {

    $scope.search = {};

    $scope.search = function() {
        Airdata.airlines($scope.search.q).then(function(data) {
            $scope.airlines = data;
        });
    }
})

.controller('AirlineCtrl', function($scope, $stateParams, Airdata) {

    Airdata.airline($stateParams.id).then(function(data) {
        $scope.airline = data;
        console.log($scope);
    });
});
