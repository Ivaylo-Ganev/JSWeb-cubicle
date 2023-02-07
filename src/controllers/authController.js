const router = require('express').Router();
const authServices = require('../services/authServices');

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const token = await authServices.login(username, password);
        res.cookie('auth', token, {httpOnly: true});
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }

    res.redirect('/');
})

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', async (req, res) => {
    const {username, password, repeatPassword} = req.body;

    if (password !== repeatPassword) {
        return res.redirect('/404');
    }
    const existingUser = await authServices.getRegisteredUser(username);

    if(existingUser) {
        return res.redirect('/404');
    }
    const user = await authServices.registerUser(username, password);

    res.redirect('/login');
})

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})

module.exports = router;