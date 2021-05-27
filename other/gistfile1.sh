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
# automatic backups to a remote repository if the last commit is a specific
# amount of time older than the current one. 

# The timeout is the amount of seconds that the last commit has to be older
# than the current one to trigger a new backup
timeout=3600
# The name of the remote repository to backup to. This should be a mirror
# repository, i.e. remote.<remote>.mirror has to be true.
remote=backup

current_timeout=`git log -1 --pretty=format:%ct HEAD`
last_timeout=`git log -1 --pretty=format:%ct HEAD^`
diff=$[$current_timeout - $last_timeout]

if [ $diff -gt $timeout ]
  then git push $remote
fi