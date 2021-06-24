sub vcl_hash {
        
        # … Other vcl_hash stuff
 
	# If this is a HTTPS request, keep it in a different cache
        if (req.http.X-Forwarded-Proto) {
                hash_data(req.http.X-Forwarded-Proto);
        }