'use strict';

var Detector = require('./vendor/threejs/Detector');

var builder = require('./builder'),
    container = require('./container');

if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
    container.innerHTML = "";
} else {
    builder.start();
}
