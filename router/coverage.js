const express = require('express');
require('express-async-errors');
const router = express.Router();
const CoverageController = require('../controller/allCoverage_Area');
const locationController = require('../controller/location/location');
const admin=require('../middleware/admin');
const auth=require('../middleware/auth')
const block=require('../middleware/is_block')

router.get('/',[auth,block],CoverageController.getAllArea);
router.get('/:_id',[auth,block],CoverageController.getAllAreaByIdNetwork);
router.post('/CoverageAreaNetwork',[auth,block],CoverageController.PostAllCoverage);
router.post('/CreateGovernorate',[auth,block],locationController.carateLocation);
router.get('/location/:governorate',[auth,block],locationController.getGovernorateByName);
router.patch('/:id',[auth,block,admin], CoverageController.UpdateArea);
router.delete('/:_id',[auth,block,admin], CoverageController.findAreaByIdAndDelete);
router.get('/name/Governorate',[auth,block], CoverageController.getAreaByName);
router.get('/counts/area',[auth,block], CoverageController.CoveragesCount);
 // router.post('/governorate',auth,CoverageController.Postgovernorate);
// router.get('/governorate/all',auth,CoverageController.getgovernorate);
module.exports = router;

  