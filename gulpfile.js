var gulp = require('gulp');
var del = require('del');
var nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['./build','!./build/public/*']);
});

// 编译js
gulp.task('babel', ['clean'],function(){
   return gulp.src(['./src/**/*.es','!./src/public/**/*'])
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('node', function () {
  return nodemon({
    script: './build/app.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
  .on('error', function(err){
    console.log(err.message);
    this.emit('end');
  })
})

gulp.task('watch',()=>{
  return gulp.watch(['./src/**/*.es', '!./public/**/*'],function(){
    gulp.run(['babel']);
  });
});




gulp.task('default', ['clean','babel','node','watch']);