#!/bin/sh
#
# This code is free software; you can redistribute it and/or modify it under
# the terms of the new BSD License.
#
# Copyright (c) 2010, Sebastian Staudt
#
# This is a demonstration hook that can be used to automatically update a
# backup repository.
#
# Save this file as post-commit to the .git/hooks directory of a Git
# repository and make it executable (`chmod u+x`). This will enable
# automatic backups to a remote repository if a specific path inside your
# repository changed. 

# The path is the directory inside your repository that should include
# changes to trigger a new backup
path=lib
# The name of the remote repository to backup to. This should be a mirror
# repository, i.e. remote.<remote>.mirror has to be true.
remote=backup

if [ "`git log -1 --oneline HEAD -- $path`" ]
  then git push $remote
fi