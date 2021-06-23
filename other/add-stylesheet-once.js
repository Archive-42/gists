function add_stylesheet_once( url ){
	$head = $('head');
	if( $head.find('link[rel="stylesheet"][href="'+url+'"]').length < 1 )
		$head.append('<link rel="stylesheet" href="'+ url +'" type="text/css" />');
}