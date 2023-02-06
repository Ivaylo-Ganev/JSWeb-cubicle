const User = require('../models/User');

exports.getRegisteredUser = (username) => User.findOne({username});

exports.registerUser = (username, password) => User.create({username, password});

exports.login = async (username, password) => {
    const user = await this.getRegisteredUser(username);
    
    if (!user) {
        throw 'Password or username not valid!'
    };

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw 'Password or username not valid!'
    }
    return user;
}