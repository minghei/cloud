var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');
	
gulp.task('default', function(){
	nodemon({
		script : 'server.js',
		ext : 'js',
		env : {
			PORT:8001
		},
		ignore : ['./node_module/**']
	})
	.on('restart', function(){
		console.log("Restarting..");
	});
});













