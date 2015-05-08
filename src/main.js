'use strict';

var $ = require('jquery'),
    C = require('spacebox-common'),
    authenticated = require('./authentication'),
    websockets = require('./websockets')

C.setEnvHash({
    AUTH_URL: process.env.AUTH_URL
})

websockets.registerPath('3dsim', '/arena')

require('./asset_urls')

global.Q = require('q')
global.Qhttp = require('q-io/http')

authenticated().then(function() {
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
    })
}).done()

require('./ang/load_all')
