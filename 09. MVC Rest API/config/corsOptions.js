// cors: Cross Origin Resource Sharing
const whiteList = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://localhost:3500'
];

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

module.exports = corsOptions;