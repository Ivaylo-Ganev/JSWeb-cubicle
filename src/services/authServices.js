const User = require('../models/User');

exports.getRegisteredUser = (username) => User.findOne({username});

exports.registerUser = (username, password) => User.create({username, password});