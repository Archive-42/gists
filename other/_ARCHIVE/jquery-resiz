var resizeTimer = false;

$(window).on('resize', function(e) {

  if( !resizeTimer ) {
	$(window).trigger('resizestart');  	
  }

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {

	resizeTimer = false;
	$(window).trigger('resizeend');
            
  }, 250);

}).on('resizestart', function(){
	console.log('Started resizing the window');
}).on('resizeend', function(){
	console.log('Done resizing the window');
});