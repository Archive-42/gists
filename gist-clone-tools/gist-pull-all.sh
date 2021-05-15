#!/bin/bash

for i in *; do
  if [ -d $i ]; then
    pushd $i
    git commit -am '' --allow-empty-message && git push
    popd
  fi
done
