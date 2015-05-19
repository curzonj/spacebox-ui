'use strict';

var C = require('spacebox-common'),
    Q = require('q'),
    moment = require('moment'),
    qhttp = require('q-io/http')

var fn = module.exports = function() {
    // TODO cache the token in a cookie and reuse it if it's 
    // still valid
    if(typeof(sessionStorage) === "undefined") {
        alert("you need to use a browser that supports WebStorage")
    }

    if (window.location.hash.includes("access_token")) {
        var params = window.location.hash.split('#')[1]
        var results = params.split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0]

        sessionStorage.google_access_token_expires = 
            moment().add(results.expires_in, 's').unix()
        sessionStorage.google_access_token = results.access_token

        window.location.hash = '/'
    }

    if (sessionStorage.google_access_token_expires !== undefined &&
            moment.unix(sessionStorage.google_access_token_expires).isAfter(moment())) {
    
        C.configure({ credentials: 'google:'+sessionStorage.google_access_token })
    } else {
        window.location.assign("https://accounts.google.com/o/oauth2/auth?scope=email%20profile&&redirect_uri="+encodeURIComponent(fn.redirect_uri)+"&response_type=token&client_id="+fn.client_id)
    }
}
