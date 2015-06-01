'use strict';

var websockets = require('spacebox-common/src/websockets-wrapper.js')

// create the controller and inject Angular's $scope
require('../app').controller('mainController', function($scope) {
    var ws = websockets.get('3dsim')
    $scope.testMe = function() {
        ws.cmd('spawnStarter')
    }
})
