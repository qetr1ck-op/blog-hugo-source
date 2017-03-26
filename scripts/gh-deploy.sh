#!/bin/sh

DIR=$(dirname "$0")

cd $DIR/..

# if [[ $(git status -s) ]]
# then
#     echo "The working directory is dirty. Please commit any pending changes."
#     exit 1;
# fi

echo "Deleting old publication"
cd public
shopt -s extglob
rm -rf !(/.git)
cd ..

echo "Generating site"
hugo

echo "Updating gh-pages branch"
git add .
git commit -m "Publishing to gh-pages (publish.sh)"