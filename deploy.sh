#!/bin/bash

PHP_PUBLIC=/home/wwwroot/code/fans-ranking/public

git pull
npm run deploy
rm -rvf ${PHP_PUBLIC}/*.png
rm -rvf ${PHP_PUBLIC}/*.jpg
rm -rvf ${PHP_PUBLIC}/*.gif
rm -rvf ${PHP_PUBLIC}/*.js
rm -rvf ${PHP_PUBLIC}/*.html
ln -s ${PWD}/build/* ${PHP_PUBLIC}
