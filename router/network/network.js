

    const express = require('express');
    require('express-async-errors');
    const router = express.Router();
    const multer = require('multer');
    const auth = require('../../middleware/auth');
    const NetworkController = require('../../controller/network/network');
    const {logger}=require('../../utils/utils')
    const block=require('../../middleware/is_block')
    const {NETWORK} = require('../../utils/Error/utils_Errors');

    require('express-async-errors');
    var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
    },

    filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
    },
    })
    router.post('/CreateNetwork', [auth,block], async function (req, res) {

    var upload = multer({
    storage: storage,
    limits: { fileSize: 10000000, },
    fileFilter: (req, file, res) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    res(null, true);
    } else {
    res(null, false);
    { 
    logger.error('create_Network==>'+NETWORK.ERROR_TYPE_IMG)
    return cb(NETWORK.ERROR_TYPE_IMG)};
    }
    },
    }).single('img');
    upload(req, res, async function (err) {
    if (err) { 
    logger.error('create_Network==>'+err)

    return res.end({ Error:err }); }
    if (req.file == undefined) { 
    logger.error('create_Network==>'+NETWORK.ADD_IMG)

    return res.status(404).json({ Error: NETWORK.ADD_IMG }) }
    NetworkController.CreateNetwork(req, res)
    });
    })

    router.get('/', [auth,block], NetworkController.getNetwork);
    router.get('/:_id', [auth,block], NetworkController.getNetworkById);
    router.get('/name/:na_A', [auth,block], NetworkController.getNetworkByName);
    router.get('/counts/ne', [auth,block], NetworkController.NetworksCount);



    module.exports = router;