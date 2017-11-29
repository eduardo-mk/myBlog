let gulp = require('gulp'),
    typescript = require('gulp-typescript'),
    del = require('del');

gulp.task('delete', function(){
    console.log('Delete whatever is inside dist folder')
    // return del(['dist/**', '!dist'])
});

gulp.task('views', ['delete'], function(){
    console.log('Templete files pug.');
    return gulp.src('src/views/*.{pug, jade}')
        .pipe(gulp.dest('dist/views'))
});

gulp.task('public', ['delete'], function(){
    console.log('Public Folder.');
    return gulp.src('src/public/**/*.*')
        .pipe(gulp.dest('dist/public'))
});


gulp.task ('tsc', ['views'], function() {
    console.log('Typescript task runner.');
    return gulp.src('src/**/*.ts')
        .pipe(typescript())
        .pipe(gulp.dest('dist'))
});

gulp.task( 'default', ["views", "public", "tsc"] )