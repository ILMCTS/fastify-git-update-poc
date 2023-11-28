rmdir /S /Q dist
rmdir /S /Q node_modules

git pull

yarn && yarn tsc && node ./dist/index.js