const express = require('express');
require('express-async-errors');
const router = express.Router();
const AuthUser = require('../../controller/user/auth');
const Register = require('../../controller/user/register');
const DetailsUser = require('../../controller/user/details_User');
const Login = require('../../controller/user/login');
const Update_User = require('../../controller/user/update_User');





const auth=require('../../middleware/auth');
const isAdmin=require('../../middleware/admin');
const block=require('../../middleware/is_block')

router.post('/register',Register.createUser);
router.post('/DetailsUser',[auth,block,], DetailsUser.PostDetailsUser);
router.post('/login', Login.Login);
router.put('/updateUser/:_id',[auth,block], Update_User.UpdateUser);
//router.put('/updatePhoneUser/',auth, AuthUser.UpdatePhoneUser);
module.exports = router;

