'use strict';

var THREE = require('three'),
    THREEx = require('threex.planets');

THREEx.Planets.baseURL	= '/threex.planets/'

var scene,
    frustrumDistance = 10000,
    handlers = [];

module.exports = {
    frustrumDistance: frustrumDistance,

    get: function() {
        return scene;
    },

    create: function() {
        scene = new THREE.Scene();
        window.scene = scene;

        // Grid squares are 10km
        scene.add(new THREE.GridHelper(4000, 100));

        var starSphere = THREEx.Planets.createStarfield(frustrumDistance);
        scene.add(starSphere);

        handlers.forEach(function(fn) {
            fn(scene);
        });
    },
    
    onCreate: function(fn) {
        handlers.push(fn);

        if (scene !== undefined) {
            fn(scene);
        }
    }
};
