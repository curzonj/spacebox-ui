'use strict';

var C = require('spacebox-common')

// create the controller and inject Angular's $scope
require('../app').controller('account_details', function($scope) {
    C.request('auth', 'GET', 200, '/account').then(function(json) {
        $scope.$apply(function() {
            $scope.account_id = json.id
            $scope.secret = json.secret
        })
    })
})
