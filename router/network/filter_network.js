const express = require('express');
require('express-async-errors');
const router = express.Router();
const FilterBuying = require('../../controller/network/filter_network');
const auth=require('../../middleware/auth');
const block=require('../../middleware/is_block')

router.get("/PackageBestSellingNetwork/userId",[auth,block], FilterBuying.PackageBestSelling);

module.exports = router;
