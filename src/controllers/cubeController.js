const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const { findById } = require('../models/Cube');
const cubeServices = require('../services/cubeServices');
const cubeUtils = require('../utils/cubeUtils');

exports.getCubeController = (req, res) => {
    res.render('cube/create');
}
exports.postCubeController = async (req, res) => {
    const {name, description, imageUrl, difficultyLevel} = req.body;

    try {
    const cube = new Cube( {
         name,
         description,
         imageUrl,
         difficultyLevel,
         owner: req.user._id
        });
    await cube.save();
    } catch (err) {
        console.log(err.message);
        return res.redirect('/404');
    }
    res.redirect('/');
}
exports.getCubeDetails = async (req, res) => {
    const cubeId = req.params.cubeId;
    
    let currentCube = await Cube.findById(cubeId).populate('accessories').lean();

    if (!currentCube) {
        res.redirect('/404');
        return;
    }
    const isOwner = currentCube.owner == req.user._id;
  
    res.render('cube/details', {currentCube, isOwner});
}

exports.getAttachAccessory = async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = await Cube.findById(cubeId).lean();
    const accessories = await Accessory.find({ _id: {$nin: cube.accessories}}).lean();

    res.render('cube/attach', {cube, accessories});
}

exports.postAttachAccessory = async (req, res) => {
    const cube = await Cube.findById(req.params.cubeId);
    const accessoryId = req.body.accessory;

    cube.accessories.push(accessoryId);
    await cube.save();

    res.redirect(`/cubes/${cube._id}/details`);
}

exports.getEditCube = async (req, res) => {
    const cube = await cubeServices.getOne(req.params.cubeId).lean();
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel); 

    res.render('cube/edit', {cube, difficultyLevels});
}

exports.postEditCube = async (req, res) => {
    const {name, description, imageUrl, difficultyLevel} = req.body;
    await cubeServices.update(req.params.cubeId, 
        {
         name,
         description,
         imageUrl,
         difficultyLevel
        });
    res.redirect(`/cubes/${req.params.cubeId}/details`);
}

exports.getDeleteCube = async (req, res) => {
    const cube = await cubeServices.getOne(req.params.cubeId).lean();
    const difficultyLevels = cubeUtils.generateDifficultyLevels(cube.difficultyLevel); 

    res.render('cube/delete', {cube, difficultyLevels});
}

exports.postDeleteCube = async (req, res) => {
    await cubeServices.delete(req.params.cubeId);

    res.redirect('/');
}