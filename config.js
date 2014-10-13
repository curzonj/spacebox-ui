(function() {
    'use strict';

    require.config({
        shim: {
            threeCore: {
                exports: 'THREE'
            },
            tween: {
                exports: 'TWEEN'
            },
            VRMLLoader: {
                deps: ['threeCore']
            },
            OBJMTLLoader: {
                deps: ['threeCore', 'MTLLoader']
            },
            MTLLoader: {
                deps: ['threeCore']
            },
            'threex.planets/package.require': {
                deps: ['threeCore']
            },
            'threex.keyboardstate/package.require': {
                deps: ['threeCore']
            },
            'threex.laser/package.require': {
                deps: ['threeCore']
            },
            'threex.spaceships/package.require': {
                deps: ['threeCore', 'OBJMTLLoader']
            },
            OrbitControls: {
                deps: [ 'threeCore' ]
            },
            detector: {
                exports: 'Detector'
            },
            stats: {
                deps: [ 'threeCore' ],
                exports: 'Stats'
            }
        },
        paths: {
            three: 'lib/shims/three',
            keyboard: 'lib/shims/keyboard',
            threeCore: 'lib/three.js-r67/build/three',
            OrbitControls: 'lib/three.js-r67/examples/js/controls/OrbitControls',
            OBJMTLLoader: 'lib/three.js-r67/examples/js/loaders/OBJMTLLoader',
            MTLLoader: 'lib/three.js-r67/examples/js/loaders/MTLLoader',
            VRMLLoader: 'lib/three.js-r67/examples/js/loaders/VRMLLoader',
            detector: 'lib/three.js-r67/examples/js/Detector',
            stats: 'lib/three.js-r67/examples/js/libs/stats.min',
            text: 'lib/requirejs_plugins/text',
            shader: 'lib/requirejs_plugins/shader',
            shaders: 'src/shaders',
            requirejs: 'bower_components/requirejs/require',
            jquery: 'bower_components/jquery/dist/jquery',
            'threex.planets': 'bower_components/threex.planets',
            'threex.spaceships': 'bower_components/threex.spaceships',
            'threex.laser': 'bower_components/threex.laser',
            'threex.keyboardstate': 'bower_components/threex.keyboardstate',
            'tween': 'bower_components/tween/build/tween.min',
            'angular': 'bower_components/angularjs/angular.min'
            //'tween': 'bower_components/tween/src/Tween'
        },
        packages: [

        ]
    });

    require(['detector', 'src/container', 'src/builder'], function(Detector, container, builder) {
        if (!Detector.webgl) {
            Detector.addGetWebGLMessage();
            container.innerHTML = "";
        } else {
            builder.start();
        }
    });
})();
