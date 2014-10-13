// create the controller and inject Angular's $scope
require('../app').controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    $scope.testMe = function() {
        console.log("testing");
    };
});
