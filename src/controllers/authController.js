const router = require('express').Router();
const authServices = require('../services/authServices');
const {parseMongooseErrors} = require('../utils/errorsUtil');

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const token = await authServices.login(username, password);
        res.cookie('auth', token, {httpOnly: true});
    } catch (err) {
        return res.render('auth/login', {error: err.message});
    }


    res.redirect('/');
})

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', async (req, res, next) => {
    const {username, password, repeatPassword} = req.body;

    if (password !== repeatPassword) {
        return next(new Error('Passwords missmatch!'));
    }
    const existingUser = await authServices.getRegisteredUser(username);

    if(existingUser) {
        return res.render('404', {error: 'User already exists!'});
    }

    try {
        const user = await authServices.registerUser(username, password);
    } catch(err) {
        const errors = parseMongooseErrors(err);
        return res.render('auth/register', {error: errors[0]});
    }

    res.redirect('/login');
})

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})

module.exports = router;