const Cube = require('../models/Cube');

exports.getHomePage = async (req, res) => {
    let cubes = await Cube.find().lean();
    const {search, from: difficultyFrom, to: difficultyTo} = req.query;

    if (search) {
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }; 
    if (difficultyFrom) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= difficultyFrom);
    }
    if (difficultyTo) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= difficultyTo);
    }
    res.render('index', {cubes, search, difficultyFrom, difficultyTo});
}
exports.getAboutPage = (req, res) => {
    res.render('about');
}

exports.getErrorPage = (req, res) => {
    res.render('404');
}