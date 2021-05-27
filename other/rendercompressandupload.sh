	#!/bin/bash
	# Assumptions!
	# - Current directory is the same as the one AE renders to
	# - Inside this directory is a directory called 'handbraked',
	#	where we move the files which already have been compressed to
	
	OUTPUTDIR="" # where should handbrake move the files to when done
	AEPROJECT='' # where is your project, full path
	AERENDERER='' # where is AERENDER executable, for example /Applications/Adobe After Effects CS6/AErender
	
	echo "---------- starting"
	"$AERENDERER" -sound ON -project "$AEPROJECT"
	echo "---------- AE render finished"
	
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