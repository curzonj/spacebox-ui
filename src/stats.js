'use strict';

var Stats = require('./vendor/threejs/libs/stats.min'),
    container = require('./container');

var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
container.getViewport().appendChild( stats.domElement );

module.exports = stats;
