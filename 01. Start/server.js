// How NodeJS differs from Vanilla JS
// 1) Node runs on a server - not in a browser (backend not frontend)
// 2) The console is the terminal window

console.log("Hello world!"); // node "filename" to run in console. EX : node server

// 3) global object instead of window object
//console.log(global); // global is the keyword fot the global object
const { log } = require('console');
// 4) Has common core modules that we will explore
// 5) CommonJS modules instead of ES6 modules
// 6) Missing some JS APIs like fetch

////////////////////////////////////////////////////////////////////////////////
const os = require('os');
const path = require('path');

console.log(os.type()); // Windows_NT
console.log(os.version()); // Windows 10 Pro
console.log(os.homedir()); // C:\Users\RuzbihanZaleek

console.log(__dirname); // D:\Ruz\Learning\NodeJs\NODEJS-TUTORIAL\01. Start 
console.log(__filename); // D:\Ruz\Learning\NodeJs\NODEJS-TUTORIAL\01. Start\server.js

console.log(path.dirname(__filename)); // D:\Ruz\Learning\NodeJs\NODEJS-TUTORIAL\01. Start
console.log(path.basename(__filename)); // server.js
console.log(path.extname(__filename)); // .js

//Get the all these values as an object
console.log(path.parse(__filename));

////////////////////////////////////////////////////////////////////////////////
const math = require('./math');
const { multiple, divide } = require('./math');

console.log(math.add(2, 3));
console.log(multiple(2, 3));
console.log(divide(2, 3));

const math = require('./math');
console.log("Exporting math");
console.log("Importing math");