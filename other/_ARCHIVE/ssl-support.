<?php

add_filter( 'wp_get_attachment_url', function( $url, $id ){

  if( is_ssl() )
    $url = str_replace( 'http://', 'https://', $url );

  return $url;

});