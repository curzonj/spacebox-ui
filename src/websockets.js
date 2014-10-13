'use strict';

var events = require('events');
var handlers = {};

var self = {
    // TODO allow websocket connections to multiple services
    websocketUrl: function(service) {
        var loc = window.location,
            new_uri;
        if (loc.protocol === "https:") {
            new_uri = "wss:";
        } else {
            new_uri = "ws:";
        }
        new_uri += "//" + loc.host + "/";

        return 'ws://localhost:5100/arena';
    },
    get: function(service) {
        if (handlers[service] === undefined) {
            handlers[service] = new events.EventEmitter();
            self.newConnection(service);
        }

        return handlers[service];
    },
    newConnection: function(service) {
        var connection = new WebSocket(self.websocketUrl(service));
        var eventEmitter = handlers[service];

        eventEmitter.getReadyState = function() {
            return connection.readyState;
        }

        eventEmitter.onOpen = function(fn) {
            this.on('open', fn);

            if (this.getReadyState() == WebSocket.OPEN) {
                fn(connection);
            }
        }

        connection.onopen = function() {
            eventEmitter.emit('open', connection)
        };

        connection.onclose = function() {
            eventEmitter.emit('close', connection)

            console.log("waiting 1sec to reconnect");
            setTimeout(function() {
                console.log("reconnecting");
                self.newConnection(service);
            }, 1000);
        };

        connection.onerror = function(error) {
            console.log('WebSocket Error');
            console.log(error);

            // Don't emit undhandled error events
            if (eventEmitter.listeners('error').length > 0) {
                eventEmitter.emit('error', error, connection)
            }
        };

        connection.onmessage = function(message) {
            eventEmitter.emit('message', message, connection);
        }
    }
}

module.exports = self;
