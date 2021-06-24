#!/bin/sh
#find ./ | grep -i "\.*$" >files
find. / |sed - E - e 's/([^ ]+[ ]+){8}//' | grep - i "\.*$" > files 
  listing = "files" 
  out = "" 
  html = "index.html" 
  out = "basename $out.html" 
 html = "index.html" 
 cmd ()
{
  
echo '  <!DOCTYPE html>' 
    echo '<html>' 
    echo '<head>' 
    echo '  <meta http-equiv="Content-Type" content="text/html">' 
    echo '  <meta name="Author" content="Bryan Guner">' 
    echo
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/themes/prism-dark.css">'
    
 echo
    ' <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bgoonz/GIT-CDN-FILES/mdn-article.css">'
    
 echo
    ' <script async defer src="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/prism.min.js"></script>'
    
 echo "  <TITLE> directory </TITLE> </head>" 
 echo "" 
 echo '</head>' 
    echo '<body>' 
 echo "" 
#################### continue with the HTML stuff:
    echo "" 
    echo "" 
    echo "<ul>" 
    awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</li>"}' $listing 
#awk '{print "<li>"};
#{print " <a href=\""$1"\">",$1,"</a></li>&nbsp;"}' \ $listing
echo "" 
 echo "</ul>" 
 echo "</body>" 
 echo "</html>" 
}


cmd $listing-- sort = extension >> $html 
