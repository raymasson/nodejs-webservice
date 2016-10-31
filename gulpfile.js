var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env');

gulp.task('default', function () {
    nodemon
        ({
            script: 'server.js',
            ext: 'js',
            env: {
                PORT: 5000
            },
            ignore: ['./node_modules/**']
        })
        .on('restart', function () {
            console.log('Restarting');
        });
});

gulp.task('test', function () {
    env({ vars: { ENV: 'Test', PORT: 5000 } });
    gulp.src('tests/*.js', { read: false })
        .pipe(gulpMocha({ reporter: 'nyan' }));
});
