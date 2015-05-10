'use strict';

var websockets = require('spacebox-common/src/websockets-wrapper.js')

// create the controller and inject Angular's $scope
require('../app').controller('mainController', function($scope) {
    function randomAxis() {
        return ((10 * Math.random()) - 5)
    }

    var ws = websockets.get('3dsim')
    $scope.testMe = function() {
        ws.cmd('spawn', {
            blueprint: "6e573ecc-557b-4e05-9f3b-511b2611c474",
            position: {
                x: randomAxis(),
                y: randomAxis(),
                z: randomAxis(),
            }
        })
    }
})
