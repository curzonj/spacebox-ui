#!/bin/bash

# skip this for speed atm
# npm install

AUTH_URL=https://spacebox-auth.herokuapp.com GOOGLE_CLIENT_ID=267148687014-ra21lf83k2eetssdo20irhjqiqq79il9.apps.googleusercontent.com GOOGLE_REDIRECT_URI=https://curzonj.github.io/ ./bin/gulp build

(
        cd ../../curzonj.github.io
        git rm -rf *
        cp -r ../spacebox-local/ui/build/* ./
        git add *
        git commit -m "deploy"
        git push
)
