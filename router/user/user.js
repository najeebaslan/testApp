const express = require('express');
require('express-async-errors');
const router = express.Router();
const UserController = require('../../controller/user/user');
const users_reports = require('../../controller/user/users_reports');
const auth=require('../../middleware/auth')
const block=require('../../middleware/is_block')

router.get('/user/:_id',[auth,block], UserController.getOneUser);
router.get('/count',[auth,block], UserController.userAccount);
router.get('/profile/:_id',[auth,block], UserController.getUserProfile);
// router.post('/outcome', UserController.addnewOutCome);
router.get('/ReportsBuying',[auth,block], users_reports.ReportsBuying);
router.get('/SalesReports',[auth,block], users_reports.SalesReports);
router.get('/RemittancesToMyFromUserId',[auth,block], users_reports.getRemittancesToMyFromUserId);
router.get('/TransferrersToUser',[auth,block], users_reports.getTransferrersToUser);
router.get('/TotalPayings',[auth,block], users_reports.getTotalBuying);
router.get('/TotalSales',[auth,block], users_reports.getTotalSales);
router.get('/SalesAndPaying',[auth,block], users_reports.getSalesAndBuying);
router.get("/CardStoreDetails",[auth,block], users_reports.CardStoreDetails);
router.get("/CardsSoldInSpecificated",[auth,block], users_reports.CardsSoldInSpecificated);


module.exports = router;

