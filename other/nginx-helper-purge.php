<?php

/**
 * When the site admin is hosted on a different domain, this filter can be used to
 * purge the cache of the exposed site
 */
add_filter( 'rt_nginx_helper_purge_url', function( $url ){

	$find = 'admin-domain.com';
	$replace = 'live-domain.com';

	if( stripos( $url, $find ) !== false )  {
		global $nginx_purger;
		
		if( isset( $nginx_purger ) && method_exists( $nginx_purger, 'purge_url' ) ) {
			$live_url = str_replace( $find, $replace, $url );
			$nginx_purger->purge_url( $live_url );
		}
	}

	return $url;
});