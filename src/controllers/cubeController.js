const Cube = require('../models/Cube');

exports.getCubeController = (req, res) => {
    res.render('create');
}
exports.postCubeController = async (req, res) => {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    const cube = new Cube( {name, description, imageUrl, difficultyLevel} );
    await cube.save();

    res.redirect('/');
}
exports.getCubeDetails = async (req, res) => {
    const cubeId = req.params.cubeId;
    
    let currentCube = await Cube.findById(cubeId).lean();

    if (!currentCube) {
        res.redirect('/404');
        return;
    }
  
    res.render('details', {currentCube});
}