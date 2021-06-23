#!/bin/bash
#
# This code is free software; you can redistribute it and/or modify it under the
# terms of the new BSD License.
#
# Copyright (c) 2009, Sebastian Staudt
#
# This script takes all Git tags and displays them in a nicely ordered list with
# all changes between tags.
# If you do version bumping inside your code (e.g. Rakefile, pom.xml or
# similar), you should be sure that the bumping commit is the tagged one and
# add a caret (^) after "$tag" in both lines where "git log" is called.
# The history before the first tag is not printed here by default. If you want
# it to be printed too, uncomment the last line.

git_tags=(`git tag |\
           sort -r -n -t . -k 3 |\
           sort -r -n -t . -k 2,2 -s |\
           sort -r -n -t . -k 1,1 -s`)
tag_count=`git tag | wc -l`

echo "Changelog"
echo "========="
echo

for ((i=0; i < tag_count; i++)) do
  tag=${git_tags[$i]}
  previous_tag=${git_tags[$((i+1))]}

  date=`date -d "\`git log -1 $tag --format="%ai"\`" +"%d.%m.%Y %H:%M"`
  echo "Version $tag - $date"
  if [ "$previous_tag" != "" ]; then
    echo
    git log $previous_tag..$tag --format="  * %s" | cat
    echo
  fi
done

# Uncomment this if you also want the commits before the first tag in your
# changelog
# git log $tag --format="  * %s" | cat
