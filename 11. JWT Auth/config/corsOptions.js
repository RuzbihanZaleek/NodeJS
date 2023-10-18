// cors: Cross Origin Resource Sharing
const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callBack) => {
        // during the development we don't have a origin hence we put !origin
        //finally we can remove "|| !origin" part.
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callBack(null, true); // error: null, isOriginAllowed: true
        } else {
            callBack(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;