var sceneCtl = require('../sceneCtl'),
    worldState = require('../world_state'),
    models = require('./list');

require('./load_all');

var self = {
    loadModel: function(key, cb) {
        var spo = worldState.get(key);
        var model_name = spo.values.model_name || "cube";
        var model_scale = parseInt(spo.values.model_scale || 1);
        console.log(spo);

        models.load(model_name, model_scale, function(object3d) {
            // Reload it because it may be stale
            spo = worldState.get(key);

            spo.object3d = object3d;
            object3d.name = key; // key is a string

            if (cb !== undefined) {
                cb(object3d, spo);
            }

            worldState.asyncMutation(spo.key);

            sceneCtl.get().add(object3d);
        });
    }
};

worldState.registerHandler(function(key, values) {
    self.loadModel(key);
});

module.exports = self
