'use strict';

var C = require('spacebox-common'),
util = require('util'),
urlUtil = require("url"),
events = require('events');
var handlers = {};

var WebsocketWrapper = function (service, path) {
    if (service === undefined || path === undefined) {
        throw new Error("all parameters is required")
    }

    this.service = service
    this.ws_path = path
}
util.inherits(WebsocketWrapper, events.EventEmitter);

C.deepMerge({
    getReadyState: function() {
        if (this.connection !== undefined) {
            return this.connection.readyState;
        }
    },
    onOpen: function(fn) {
        this.on('open', fn);

        if (this.getReadyState() == WebSocket.OPEN) {
            fn(this.connection);
        }
    },
    connect: function(service) {
        var self = this;

        websocketUrl(self.service).then(function(url) {
            var conn = new WebSocket(url+self.ws_path);

            conn.onopen = self._onopen.bind(self);
            conn.onclose = self._onclose.bind(self);
            conn.onerror = self._onerror.bind(self);
            conn.onmessage = self._onmessage.bind(self);

            self.connection = conn;
        }).done();
    },
    _onopen: function() {
        this.emit('open', this.connection)
    },

    _onclose: function(e) {
        this.emit('close', e, this.connection)

        console.log("waiting 1sec to reconnect");

        var self = this;
        setTimeout(function() {
            console.log("reconnecting");
            self.connect();
        }, 1000);
    },
    _onerror: function(error) {
        console.log('WebSocket Error');
        console.log(error);

        // Don't emit undhandled error events
        if (this.listeners('error').length > 0) {
            this.emit('error', error, this.connection)
        }
    },
    _onmessage: function(message) {
        this.emit('message', message, this.connection);
    }
}, WebsocketWrapper.prototype)

function websocketUrl(service) {
    return C.getEndpoints().then(function(endpoints) {
        if (endpoints[service] === undefined) {
            throw new Error(Object.keys(endpoints)+ " is missing "+service)
        }

        var new_uri,
        loc = urlUtil.parse(endpoints[service])

        if (loc.protocol === "https:") {
            new_uri = "wss:";
        } else {
            new_uri = "ws:";
        }
        new_uri += "//" + loc.host

        return new_uri
    });
}

var paths={}

module.exports = {
    registerPath: function(service, path) {
        paths[service] = path
    },
    get: function(service) {
        if (handlers[service] === undefined) {
            var path = paths[service] || '/'
            var h = handlers[service] = new WebsocketWrapper(service, path);

            // This is an async call
            h.connect();
        }

        return handlers[service];
    },
}

