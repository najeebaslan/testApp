const express = require('express');
require('express-async-errors');
const router = express.Router();
const offersController = require('../controller/offers');
const auth=require('../middleware/auth')
const block=require('../middleware/is_block')

router.post('/offer',[auth,block], offersController.createOffer,);
router.get("/offer",[auth,block],offersController.getOffer);
router.get("/AllOffer",[auth,block],offersController.getAllOffer);
module.exports = router;

