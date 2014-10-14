#!/bin/bash

# skip this for speed atm
# npm install

SPODB_URL=https://frozen-island-6216.herokuapp.com ./bin/gulp build

(
        cd ../../curzonj.github.io
        git rm -rf *
        cp -r ../spacebox-local/ui/build/* ./
        git add *
        git commit -m "deploy"
        git push
)
