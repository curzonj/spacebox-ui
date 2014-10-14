var websockets = require('../../websockets');

// create the controller and inject Angular's $scope
require('../app').controller('mainController', function($scope) {
    var ws;

    websockets.get('3dsim').onOpen(function(connection) {
        ws = connection;
    });

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

    function cmd(name, opts) {
        if (opts === undefined) {
            opts = {};
        }

        opts.command = name;
        ws.send(JSON.stringify(opts));
    }

    function randomAxis() {
        return ((10 * Math.random()) - 5);
    }

    $scope.testMe = function() {
        cmd('spawn', {
            blueprint: "6e573ecc-557b-4e05-9f3b-511b2611c474",
            position: {
                x: randomAxis(),
                y: randomAxis(),
                z: randomAxis(),
            }
        });
    };
});
