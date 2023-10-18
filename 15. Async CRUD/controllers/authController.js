const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        //create JWTs here
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    'username': foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refresh token with current user
        // Invalidate the refresh token if the user logs out before 1d
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        // If we set the cookie HTTP only it is not available to javaScript
        // This is much more secure than storing refresh token in the local storage which is available to javaScript
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true (use it in production)
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }