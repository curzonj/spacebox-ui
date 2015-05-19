'use strict';

var $ = require('jquery'),
    C = require('spacebox-common'),
    authenticate = require('./authentication'),
    websockets = require('spacebox-common/src/websockets-wrapper.js')

C.configure({
    AUTH_URL: process.env.AUTH_URL
})

authenticate.client_id = process.env.GOOGLE_CLIENT_ID
authenticate.redirect_uri = process.env.GOOGLE_REDIRECT_URI

authenticate()
websockets.registerPath('3dsim', '/temporary')

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
})

require('./ang/load_all')
