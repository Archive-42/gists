var gulp = require('gulp'),
	filter = require('gulp-filter'),
	changed = require('gulp-changed'),
	imagemin = require('gulp-imagemin')

var paths = {
	images: './source/img/**/*'
};

// Process images
gulp.task('images', function() {
	var dest = './assets/img';

	return gulp.src(paths.images)
		// ignore empty files
		.pipe(filter(function(a){ return a.stat && a.stat.size }))
		// Don't run the same files twice
		.pipe(changed(dest))
		// Optimize images
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(dest))
});


gulp.task('default', ['images']);