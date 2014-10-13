'use strict';

var $ = require('jquery'),
    angular = require('angular')

$(function() {
    var Detector = require('./vendor/threejs/Detector');

    var builder = require('./builder'),
        container = require('./container');

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
        container.getViewport().innerHTML = "";
    } else {
        builder.start();
    }
    console.log('loaded');
});

var appHUD = angular.module('app', ['ngRoute']);

appHUD.config(function($routeProvider) {
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

// create the controller and inject Angular's $scope
appHUD.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    $scope.testMe = function() {
        console.log("testing");
    };
});
