#!/bin/sh

DIR=$(dirname "$0")

cd $DIR/..

if [[ $(git status -s) ]]
then
    echo "💾 The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "💾 Deleting old publication"
cd public
shopt -s extglob
rm -rf !(/.git) #except .git
cd ..

echo "💾 Generating lunr.json"
yarn run build:search

echo "💾 Generating site"
hugo

echo "💾 Updating gh-pages branch"
cd public
git add --all && git commit -m "Publishing to gh-pages (publish.sh)"
git push origin gh-pages