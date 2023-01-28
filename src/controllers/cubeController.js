const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const { findById } = require('../models/Cube');

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

exports.getAttachAccessory = async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await Cube.findById(cubeId).lean();
    const accessories = await Accessory.find().lean();

    res.render('accessory/attachAccessory', {cube, accessories});
}

exports.postAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryId = req.body.accessory;

    cube.accessories.push(accessoryId);
    await cube.save();

    res.redirect(`/cubes/${cube._id}/details`);
}