// Middleware is anything between req and res

// There are three types of middleware
// 1. in build middleware
// 2. custom middleware
// 3. third party middleware

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// cors: Cross Origin Resource Sharing
const whiteList = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callBack) => {
        // during the development we don't have a origin hence we put !origin
        //finally we can remove "|| !origin" part.
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callBack(null, true); // error: null, isOriginAllowed: true
        } else {
            callBack(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// build-in middleware to handle requests urlencoded data
// in other words, form data:
// 'Content-type: application/x-www-form-urlencoded'

// app.use is often we use to apply middleware
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files (EX: to load images, supply css files)
// path is available for the public (which means can load file (EX: css) in the browser by giving path) 
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public'))); // apply for subdirectory as well

// ROUTES //
// If we use '/subdir' in our url it will execute the middleware functions in the ./routes/subdir
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

// select all
app.get('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

// custom error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));

