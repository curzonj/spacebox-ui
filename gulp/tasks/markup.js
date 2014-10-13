var gulp = require('gulp');
var es = require('event-stream');
var config = require('../config').markup

gulp.task('markup', function() {
    var tasks = Object.keys(config).map(function(k) {
        return gulp.src(k).pipe(gulp.dest(config[k]));
    });

    return es.merge.apply(null, tasks);
});
