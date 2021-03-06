var gulp        = require ('gulp'),
    sass        = require ('gulp-sass'),
    browserSync = require ('browser-sync'),
    concat      = require ('gulp-concat'),
    uglifyjs    = require ('gulp-uglifyjs');

gulp.task('sass', function() {
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
  });

gulp.task('scripts', function() {
  return gulp.src([
      'app/libs/jquery/dist/jquery.min.js',
      'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglifyjs())
  .pipe(gulp.dest('app/js'))
})

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  }); 
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});