'use strict';

var $ = require('jquery');

require('./asset_urls')

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

require('./ang/load_all')
