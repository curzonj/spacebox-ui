#!/bin/bash

# skip this for speed atm
# npm install

AUTH_URL=https://spacebox-auth.herokuapp.com ./bin/gulp build

(
        cd ../../curzonj.github.io
        git rm -rf *
        cp -r ../spacebox-local/ui/build/* ./
        git add *
        git commit -m "deploy"
        git push
)
