global.THREEx = {
    SpaceShips: require('threex.spaceships').SpaceShips
}

require('./vendor/threejs/loaders/MTLLoader')
require('./vendor/threejs/loaders/OBJMTLLoader')

var lasers = require('threex.laser')
lasers.LaserCooked.baseURL = '/threex.laser/'

THREEx.SpaceShips.baseUrl = '/threex.spaceships/'
