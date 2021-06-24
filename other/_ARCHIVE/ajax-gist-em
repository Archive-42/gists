// … find all gist scripts inside the ajax container
var $gists = $ajax_container.find('script[src^="https://gist.github.com/"]');

// if gist embeds are found
if( $gists.length ){

	// update each gist
	$gists.each(function(){

		// we need to store $this for the callback
		var $this = $(this);

		// load gist as json instead with a jsonp request
		$.getJSON( $this.attr('src') + 'on?callback=?', function( data ) {

			// replace script with gist html
			$this.replaceWith( $( data.div ) );

			// load the stylesheet, but only once…
			add_stylesheet_once( 'https://gist.github.com/' + data.stylesheet )

		});

	});

}