// Install ndoemon globally
// npm install/i/add nodemon -g
console.log('testing');

// Install ndoemon as a dev dependency
// npm i nodemon -D

// initiate npm package
// npm init -> (package.json)

// node_module is very large. Hence we do not need to add it to github
// Then we include it in the .gitignore

// If we clone a project and starts to tun it will fail because we do not get node_modules
// In that case we have to run "npm install" command

const { format } = require('date-fns');

console.log(format(new Date(), 'yyyy-MM-dd\tHH:mm:ss'));

// Define script (in the package.json file) to run the project
// "start": "node index", // npm start
// "dev": "nodemon index" //npm run dev

//uuid package allows to generate different ids.
const { v4: uuid } = require('uuid'); // Import specific version (v4) uuid.
// if we import uuid then we can use the version in the code as uuid.v4

console.log(uuid());

//Symbols of version
// 8.3.2 => 8 (major version), 3 (minor version), 2 (patch version)
// ^8.3.2 => update only minor version and patch version but not major version
// 8.3.2 => keep this exact version
// ~8.3.2 => update patch version not major or minor versions
// * => go ahead and update everything all the time

// install a package with the specific version
// npm i uuid@8.3.2

//npm update -> to check any updates

// npm uninstall/un/rm to remove
// npm rm nodemon -D -> uninstall dev dependency nodemon
 