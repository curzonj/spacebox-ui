'use strict';

var $ = require('jquery'),
    C = require('spacebox-common')

C.setEnvHash({
    SPODB_URL: process.env.SPODB_URL
})

require('./asset_urls')

global.Q = require('q')
global.Qhttp = require('q-io/http')

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
