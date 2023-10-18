const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // No Content
    const refreshToken = cookies.jwt;

    // is refreshToken in db?
    // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204); //No content
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https, we do not add this on development but would in production
    res.sendStatus(204);
}

module.exports = { handleLogout }