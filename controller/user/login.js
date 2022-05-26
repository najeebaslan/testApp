
      const user = require("../../models/users");
      const roles_user = require("../../models/roles_User");
      const phoneNumber = require("../../models/phones");
      const locationM = require('../../models/location');
      const roles_User = require('../../models/roles_User');
      const async = require('async');
      const bcrypt = require('bcryptjs');
      const {operationLog}= require("../log");
      const {changeLevel} = require('../../utils/find_utils')
      require('express-async-errors');
      const { levelCheck } = require('../../utils/validation/level_val');
      const { SetStreet } = require('../location/location')//location Controller
      const { Joi, ObjectId, mongoose, _, } = require('../../utils/utils')
      const { validationLogin } = require("../../utils/validation/user_val");
      const { GOVERNORATE,NETWORK,USER,PHONE } = require('../../utils/Error/utils_Errors')
      const { De_In } = require('../../controller/devices/devices_info');
      const { De_St } = require('../../controller/devices/devices_status');
      const { checkAdd,MyLogger,Save_De_St } = require("../../utils/find_utils");
      const { cu_V } = require("../../utils/validation/custom_val");

      /*<<<// Documentation For User //>>>
      1-pas =password
      2-use =  username
      3-is_Ac =  is Active
      4-op_Nu = operation number 
      5-de_st = devices status
      6-bu_Da = buying Date
      7-de_Id =device Id
      8-pac_Pr= Package price
      9-se_Nu = serial Number
      10-ca_Nu = Card Number
      11-pac_Id= package Id
      12-bu_Ar =Buying Area
      13-fr_Us = From User
      14-to_Us = To User
      15-ne= ne
      16 -em =email
      17- no = notice
      18- am =amount
      19-find_Nu_Ac = find Number Account     
      20- dev_St_Id = Devices Status Id
      21-  userId = User  Id
      22-De_St=Device status
      23-info_val = info validation
      24- st_val=status validation
      25- V_De_Us =Validation Details User 
      26-us_Ty= User Type
      27- de_In_Id=Device Info Id
      */

      /*  <<<// Documentation log_Operation >>>
      1- userId = User Profile Id
      2- da_Ad = Date Add
      3- de_St = Device Status
      4- ip = ip address
      5- de_Na device name 
      6- de_Mo =device Model
      7- ty_Api=type api
      8- ty_st= type status
      9-we =weather
      10-cl=cloud 
      11- te=Temperature
      12-pl-place
      13-de =description Operation

      */

      class LOGIN{
      async Login(req, res) {

      try {
      const em = req.body.email;
      const passwordUser = req.body.password;
      console.log(em+'email');
      const body=req.body;
      /* VALIDATION LOGIN */
      const error = validationLogin(res, body);
      if (error) return error
      if (error){
      MyLogger('Login',error.details[0].message,) 
      return res.status(404).json({ "Error": error.details[0].message })}
      var User = await user.findOne({ em: em })
      .populate('roles_User','-createdAt -updatedAt')
      .select('_id , em , pas , use , ne , roles_User , us_Ty , nu_Ac , de_In_Id');//isAdmin لان التوكن يتضمن  Token  فسيحدث خطاء في ال isAdmin اذا تم حذف 
      console.log(User);
      if (!User) {
      MyLogger('Login','not found this user') 
      return res.status(404).json({ "Error": 'not found this user' })
      }
    
      const chickPassword = await bcrypt.compare(passwordUser, User.pas);
      if (!chickPassword) {
      MyLogger('Login',USER.EMAIL_OR_PASS_ERR,) 
      console.log(USER.EMAIL_OR_PASS_ERR);
      return res.status(401).json({ "Error": USER.EMAIL_OR_PASS_ERR, });
      }

      let roles_user = await roles_User.findOne({ userId: User.roles_User.userId })
      const token = roles_user.generateTokens()
      console.log(User.ne);
      // Language(roles_user.language)
      // LANGUAGE=roles_user.language;/* THIS IS FOR SELECT USER LANGUAGE */

      /*THIS IS FOR GET DEVICE INFO  */
      const info = User.de_In_Id;
      if (!info) {
      MyLogger("Login-findDeviceInfo",USER.NOTFOUND);
      return res.status(400).json({ "Error": USER.NOTFOUND });
      }

      /*THIS IS FOR SAVE DEVICE STATUS  */
      const de_st= Save_De_St(body, User._id, User.de_In_Id,'Login',req)
      if(de_st[0]==false){
      MyLogger('findDeviceInfo-Save_De_St',error.message,)      
      return res.status(400).json({ "Error": error.message });
      }

      //   const de_St = De_St( body,  User._id, User.de_In_Id, )
      //  await de_St.save(async function(err){
      //     if(err){
      //     MyLogger('PostDetailsUser-save deviseInfo & deviceStatus',error.message,)      
      //     return [false,err]
      //     //res.status(400).json({ "Error": error.message });
      //    };else{;

      //      //'Login'
      //     operationLog( User._id,op_Log,de_St._id)
      //     return[true]
      //    }})
      const dataResult = {
      "network": User.ne,
      "_id": User._id,
      "email": User.em,
      "username": User.use,
      "user_Type": User.us_Ty,
      "number_Account": User.nu_Ac,
      "token": token
      }

      return  res.status(200).json(dataResult);
      } catch (error) {

      MyLogger('Login',error.message) 
      console.log(error);
      return res.status(401).json({ "Error": error.message });
      
      }
      }
      }

      module.exports = new LOGIN();
