const express = require('express');
require('express-async-errors');
const router = express.Router();
const CardsController = require('../../controller/card/card');
const auth=require('../../middleware/auth')
const block=require('../../middleware/is_block')

router.post('/create',[auth,block], CardsController.addCards);
router.get('/all',[auth,block],CardsController.getAllCards);
router.post("/buyCard",[auth,block],CardsController.buyCard);


module.exports = router;