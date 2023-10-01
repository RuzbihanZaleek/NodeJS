const fs = require('fs'); //import common core fs module
const path = require('path'); 
const fsPromises = require('fs').promises;

//Method 1
fs.readFile('./files/starter.txt', (err, data) => {
    if (err) throw err;
    console.log(data); // Presenting as buffer
    console.log(data.toString());
})

//Method 1.1
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
})

//Method 2
fs.readFile('./files/starter.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
})

console.log("Hello..."); //Node will execute this while it is reading the file.

// exit on uncaught errors
process.on('uncaughtException', err => {
    console.log(`There was an uncaught error: ${err}`);
    process.exit(1);
});

//Write Method 1
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you!', (err) => {
    if (err) throw err;
    console.log('Write Complete');
})


//Append Method 1
fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Testing Text', (err) => {
    if (err) throw err;
    console.log("Append Complete");
})

//////////////////////  CALL BACK HELL /////////////////////////////////////////

// Write, Append and Rename (Inside call back function)
fs.writeFile(path.join(__dirname, 'files', 'writeAndAppend.txt'), 'Hello how are you?', (err) => {
    if (err) throw err;
    console.log('Write Complete');

    // Append
    fs.appendFile(path.join(__dirname, 'files', 'writeAndAppend.txt'), '\n\nI am fine. You?', (err) => {
        if (err) throw err;
        console.log("Append Complete");

        // Rename
        fs.rename(path.join(__dirname, 'files', 'writeAndAppend.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
            if (err) throw err;
            console.log('Rename Complete');
        })
    })
})

//Avoid Call Back Hell

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        //await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt')); // Delete the file

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you bro');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
        console.log(newData);
        console.log('FileOps Done');
    } catch (error) {
        console.error(error);
    }
}

fileOps();

////////////////////////////////////////////////////////////////////////////////

