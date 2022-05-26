const express = require('express');
require('express-async-errors');
const router = express.Router();
const auth=require('../../middleware/auth');
const FilterBuying = require('../../controller/user/filter_user');
const users_reports = require('../../controller/user/users_reports');
const block=require('../../middleware/is_block')

router.get("/net_Id",[auth,block], FilterBuying.FilterBayingReports);
router.get("/PackageBestSelling/page",[auth,block], FilterBuying.PackageBestSelling);
router.get('/filterReportsBuying',[auth,block], users_reports.getReportsBuying);
router.get('/filterReportsSales',[auth,block], users_reports.getReportsSales);

module.exports = router;
