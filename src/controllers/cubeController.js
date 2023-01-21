const Cube = require('../models/Cube');


exports.getCubeController = (req, res) => {
    res.render('create');
}
exports.postCubeController = (req, res) => {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    const cube = new Cube(name, description, imageUrl, difficultyLevel);
    cube.save(cube);

    res.redirect('/');
}