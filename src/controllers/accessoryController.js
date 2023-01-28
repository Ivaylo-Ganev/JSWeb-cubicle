const Accessory = require('../models/Accessory');
const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('accessory/createAccessory');
});

router.post('/create', async (req, res) => {
    const {name, description, imageUrl} = req.body;
    await Accessory.create({name, description, imageUrl});

    res.redirect('/');
});

router.get('/attach', (req, res) => {
    res.render('accessory/attachAccessory');
})

module.exports = router;