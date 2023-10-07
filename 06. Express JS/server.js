const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

//Define route
app.get('^/$|index(.html)?', (req, res) => {
    // reg ex to identify "/" and "/index.html"
    // ^ must begin with a slash
    // $ must end with a slash
    // or /index.html
    // (.html)? is optional

    // res.send('Hello World!');

    //Inside the directory -> send views/index.html
    //res.sendFile('./views/index.html', { root: __dirname });

    //2nd method
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

// redirect to the new page
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html'); // sending 302 bu default hence we put 301

})

// select all
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// })

// Route Handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('Attempting to load hello.html');
    next();
}, (req, res) => {
    res.send('Hello World!');
})

// chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Hello Route Handlers!');
}

app.get('/route-handlers(.html)?', [one, two, three]);

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));

