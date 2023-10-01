// If we have large files, it is not good ot get all the data at once.
// This method is good and efficient.

const fs = require('fs');

//Create readable stream
const rs = fs.createReadStream('./files/lorem.txt', {encoding: 'utf8'});

//Write Stream
const ws = fs.createWriteStream('./files/new-lorem.txt');

//METHOD 1
//Listen data coming from the stream
rs.on('data', (dataChunk) => {
    ws.write(dataChunk);
})

//METHOD 2 (most efficient way)
rs.pipe(ws);
