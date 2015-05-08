'use strict';

var C = require('spacebox-common'),
    Q = require('q'),
    qhttp = require('q-io/http')

var redirect_uri = "http://localhost:3000/",
    client_id = '267148687014-d0mpv7h0en79tv28iafgt7c5hd7pvakk.apps.googleusercontent.com'

module.exports = function() {
    // TODO cache the token in a cookie and reuse it if it's 
    // still valid
    if (window.location.hash.includes("access_token")) {
        var params = window.location.hash.split('#')[1]
        var results = params.split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0]

        window.location.hash = '/'

        return C.getAuth('google:'+results.access_token)
    } else {
        window.location.assign("https://accounts.google.com/o/oauth2/auth?scope=email%20profile&&redirect_uri="+encodeURIComponent(redirect_uri)+"&response_type=token&client_id="+client_id)

        return Q.reject("needs authentication")
    }
}
