'use strict';

require('./app').config(function($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl : 'home.html',
            controller  : 'mainController'
        })

        .when('/testmeForm', {
            templateUrl : 'home.html',
            controller  : 'mainController'
        });
});
