document.addEventListener("DOMContentLoaded", function(event) { 
	var ak_js = document.getElementById( 'ak_js' );

	if( !ak_js ){
		ak_js = document.createElement( 'input' );
		ak_js.type = 'hidden';
		ak_js.name = ak_js.id = 'ak_js';
	}
	else {
		ak_js.parentNode.removeChild( ak_js );
	}

	ak_js.value = ( new Date() ).getTime();

	var el;
	var destinations = [];

	if( el = document.getElementById( 'commentform' ) ){
		destinations.push( el );
	}

	if( ( el = document.getElementById( 'replyrow' ) ) && ( el = el.getElementsByTagName('td') ) ){
		destinations.push( el.item(0) );
	}

	for( var i = 0, j = destinations.length; i < j; i++ ){
		destinations[i].appendChild( ak_js );
	}
});