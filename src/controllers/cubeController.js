const Cube = require('../models/Cube');
const db = require('../db.json');


exports.getCubeController = (req, res) => {
    res.render('create');
}
exports.postCubeController = (req, res) => {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    const cube = new Cube(name, description, imageUrl, difficultyLevel);
    cube.save();

    res.redirect('/');
}
exports.getCubeDetails = (req, res) => {
    const cubeId = Number(req.params.cubeId);
    if (!cubeId) {
        res.redirect('/404');
    }
    const currentCube = db.cubes.find(cube => cube.id === cubeId);

    if (!currentCube) {
        res.redirect('/404');
    }
    res.render('details', {currentCube});
}