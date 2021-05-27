#!/bin/sh
#
# This code is free software; you can redistribute it and/or modify it under
# the terms of the new BSD License.
#
# Copyright (c) 2010, Sebastian Staudt
#
# This is a simple example to demonstrate continuous integration on top of
# Git.
#
# Save this file to the .git/hooks directory of a (non-bare) Git repository and
# make it executable (`chmod u+x`). It will enable Git-based continuous
# integration using Ruby's Rake before committing. It will call `rake test` on
# the source code in your repository and - based on the result of the tests -
# deny or allow your commit.
#
# If you have a commit that will not pass your tests and should be allowed
# though you need to call `git commit` with the `--no-verfiy` (`-n`) flag. You
# may also used this hook as `post-commit` (for local repositories) or
# `post-update` (for remotes) hook to have a behavior more similar to usual
# continuous integration services - after committing and not before.

rake test
TEST_RESULT=$?

if [ $TEST_RESULT -eq 0 ]
  then echo "Tests passed. Committing..."
  else echo "Testing your changes has failed! Commit will be aborted."
fi

exit $TEST_RESULT