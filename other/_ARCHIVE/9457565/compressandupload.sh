#!/bin/bash
# use with 'fswatch . ./compressandupload.sh'
# https://github.com/alandipert/fswatch
# moves compressed files to a sub dir called "handbraked", which you need to create first  
 
echo "---------- starting"
 
OUTPUTDIR="/your/path/here"
FILES=*
for f in $FILES
do
	FILENAME=$(basename "$f")
	EXTENSION="${FILENAME##*.}"
	FILENAME="${FILENAME%.*}"
 
	if [ "$EXTENSION" != "mov" ] ; then
		echo "not a mov: $FILENAME.$EXTENSION"
		continue
	fi
 
	echo "starting to compress: $FILENAME.$EXTENSION to $OUTPUTDIR"
 
	# make handbrake silent by adding 2>&1
	# redirect output to script, so we can check for errors
	# handbrake tries to compress files which havent finished exporting yet, so important to check for 
	# "Encode done!" line, and only move the file then.
	HandBrakeCLI -i "$f" -o "$OUTPUTDIR/$FILENAME.mp4" --preset "High Profile" 2>&1 | while read line
	do
		echo "$line"
		if [ "$line" == "Encode done!" ] ; then
			echo "---------------------------------------------- worked !"
			mv "$f" ./handbraked
			echo "finished $FILENAME.$EXTENSION"
		fi
	done
 
done 
 
echo "---------- finished"