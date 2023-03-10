const User = require('../models/User');
const jwt = require('../lib/jsonwebtoken');
const config = require('../config');

exports.getRegisteredUser = (username) => User.findOne({username});

exports.registerUser = (username, password) => User.create({username, password});

exports.login = async (username, password) => {
    const user = await this.getRegisteredUser(username);
    
    if (!user) {
        throw {
                message: 'Password or username not valid!',
                payload: username
        }
    };

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw 'Password or username not valid!'
    }

    const payload = {_id: user._id, username: user.username};
    const secret = config.SECRET;

    const token = await jwt.sign(payload, secret, {expiresIn: '2h'});
    return token;
}