const express = require('express');
require('express-async-errors');
const router = express.Router();
const packageController = require("../controller/package/packages");
const auth=require('../middleware/auth');
const commissionController = require("../controller/package/commission");
const admin=require('../middleware/admin');
const block=require('../middleware/is_block')

// router.post("/create",auth,packageController.PostPackage_Price);
router.post("/createDetailsPackage",[auth,block],packageController.PostDetailsPackage);
router.get("/:_id",[auth,block],packageController.getPackage);
//router.get("/price/:_id",auth,package_Price_Controller.getPackage_Price);
router.get("/",[auth,block],packageController.getAllPackage);
router.put("/update",[auth,block,admin],packageController.UpdatePackage);
router.put("/commission",[auth,block,admin],commissionController.createCommission);


// router.patch("/update/price",auth,package_Price_Controller.UpdatePackage_Price);
// router.get("/pac_Pr/Id",auth,package_Price_Controller.getPackage_PriceById);
// router.delete('/:_id',auth, package_Price_Controller.findPackageByIdAndDelete);

module.exports = router;