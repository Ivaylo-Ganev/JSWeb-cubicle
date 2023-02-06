const router = require('express').Router();
const authServices = require('../services/authServices');

router.get('/login', (req, res) => {
    res.render('auth/login');
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
    await authServices.registerUser(username, password);

    res.redirect('/login');
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;

})

module.exports = router;