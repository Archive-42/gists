#!/bin/bash
TSTAMP=`date '+%Y%m%d-%H%M%S'`
zip -r $1.$TSTAMP.zip $1 -x "**.git/*" -x "**node_modules/*" `shift; echo $@;`

printf "\nCreated: $1.$TSTAMP.zip\n"

# usage: 
# - zipdir thedir
# - zip thedir -x "**anotherexcludedsubdir/*"    (important the double quotes to prevent glob expansion)

# if in windows/git-bash, add 'zip' command this way: 
# https://stackoverflow.com/a/55749636/1482990
