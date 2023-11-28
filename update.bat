rmdir /S /Q dist
rmdir /S /Q node_modules

yarn && yarn tsc && node ./dist/index.js