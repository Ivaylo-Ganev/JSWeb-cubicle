const router = require('express').Router();
const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');

router.get('/', homeController.getHomePage);
router.get('/about', homeController.getAboutPage);
router.get('/404', homeController.getErrorPage);

router.get('/create', cubeController.getCubeController);
router.post('/create', cubeController.postCubeController);
router.get('/details/:cubeId', cubeController.getCubeDetails);

module.exports = router;