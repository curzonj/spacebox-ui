'use strict';

var $ = require('jquery');

$(function() {
    var Detector = require('./vendor/threejs/Detector');

    var builder = require('./builder'),
        container = require('./container');

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
        container.getViewport().innerHTML = "";
    } else {
        builder.start();
    }
    console.log('loaded');
});
