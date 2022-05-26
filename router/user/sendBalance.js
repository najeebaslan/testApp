const express = require('express');
require('express-async-errors');
const router = express.Router();
const UserController = require('../../controller/user/sendBalance');
const auth=require('../../middleware/auth')
const block=require('../../middleware/is_block')

router.post('/SaleBalance',[auth,block], UserController.sendBalance);
router.post('/incomeBalanceSystemToUser',[auth,block], UserController.incomeBalanceSystemToUser);

module.exports = router;