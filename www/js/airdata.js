angular.module('whereto.airdata', [])

.factory('Airdata', function(config, $http) {

    var token = 666;

    $http.defaults.headers.get = { 'X-Mashape-Key' : config.mashapeKey };

    function getAirports(url) {

        return $http.get(config.baseUrl + '/airports' + url).then(function (response) {
                return response.data;
        });
    }

    return {
        airports: function(q) {
            var url = '?xt=' + token;
            if (q) url = '/' + q + '/' + '?xt=' + token;
            return getAirports(url);
        },

        nearAirports: function(long, lat) {
            return getAirports('/' + long +  '/' + lat + '?xt=' + token);
        },

        airport: function(id) {
            return $http.get(config.baseUrl + '/airport/' + id + '?xt=' + token).then(function (response) {
                    return response.data;
            });
        },

        airlines: function(q) {
            var url = '?xt=' + token;
            if (q) url = '/' + q + '/' + '?xt=' + token;
            return $http.get(config.baseUrl + '/airlines' + url).then(function (response) {
                    return response.data;
            });
        },
        airline: function(id) {

            return $http.get(config.baseUrl + '/airline/' + id + '?xt=' + token).then(function (response) {
                    return response.data;
            });
        }
    };
});
