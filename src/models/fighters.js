'use strict';

var THREEx = require('threex.spaceships'),
    list = require('./list');

var models = [{
    name: 'fighter1',
    fn: 'loadSpaceFighter01',
    scale: 0.25
}, {
    name: 'fighter2',
    fn: 'loadSpaceFighter02',
    scale: 0.25
}]

models.forEach(function(stats) {
    list.add(stats.name, function(scale, cb) {
        var scalar = scale * stats.scale;

        THREEx.SpaceShips[stats.fn](function(object3d) {
            object3d.baseScale = object3d.scale.length();
            object3d.scale.multiplyScalar(scalar);

            cb(object3d);
        });
    });
});

