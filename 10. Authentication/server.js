const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

app.use(cors(corsOptions));

// app.use is often we use to apply middleware
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files (EX: to load images, supply css files)
// path is available for the public (which means can load file (EX: css) in the browser by giving path) 
app.use('/', express.static(path.join(__dirname, '/public')));

// If we use '/subdir' in our url it will execute the middleware functions in the ./routes/subdir
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
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

