var list = {};

module.exports = {
    add: function(name, fn) {
        list[name] = fn
    },
    load: function(name, size, cb) {
        var fn = list[name];
        if (fn === undefined) {
            throw new Error("no model named "+name)
        } else {
            list[name](size, cb)
        }
    }
}
