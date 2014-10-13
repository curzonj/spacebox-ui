'use strict';

var THREE = require('./vendor/three-shim'),
    camera = require('./camera'),
    container = require('./container');

var controls = new THREE.OrbitControls(camera, container.getViewport());

controls.minDistance = 0.25;
controls.maxDistance = camera.maxDistance;

controls.rotateSpeed = 2.0;
controls.zoomSpeed = 1;
controls.panSpeed = 3;

controls.noZoom = false;
controls.noPan = false;

controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

module.exports = controls;
