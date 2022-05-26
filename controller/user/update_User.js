
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
    const { validationRegister,V_De_Us } = require("../../utils/validation/user_val");
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


class UPDATE_USER{
      
      async UpdateUser(req, res) {



            try {
     
                  const userId = req.params._id;
                  const body = req.body;
                  /* NAJEEB */
                  const em = body.email ?? null;
                  const newPhone = body.newPhone ?? null;
                  const oldPhone = body.oldPhone ?? null;
                  let findOldPhone, resultPhone;
                  const findEmail = await user.findOne({ em: em, });
                  console.log(findOldPhone);
                  if (findEmail) {
                  MyLogger('UpdateUser',USER.EMAIL_EXIST) 
                  return res.status(404).json({ Error: USER.EMAIL_EXIST }) 
                    }
                  if (newPhone != null && oldPhone != null) {
                  console.log('test');
                  findOldPhone = await phoneNumber.findOne({ phone: oldPhone, });
                  console.log(findOldPhone);
                  if (!findOldPhone) { return res.status(404).json({ Error: PHONE.NOTFOUND_OLD }) }
                  const phoneExists = await phoneNumber.findOne({ phone: newPhone, });
                  if (phoneExists) { return res.status(404).json({ Error: PHONE.EXIST }) }
                  if (oldPhone != null || oldPhone != undefined && newPhone != null || newPhone != undefined) {
                  if (findOldPhone.phone[0] == oldPhone && findOldPhone.us_In == userId) {
              
                  resultPhone = await UpdatePhoneUser(req, userId);//this do update phone number
                  operationLog( findEmail._id,'UpdateUser',de_St._id)
              
                  console.log(resultPhone);
                  if (resultPhone == true) {
                  MyLogger('UpdateUser',PHONE.SEND_OLD_NUMBER_PH) 
              
                  return res.status(200).json({ "Error": PHONE.SEND_OLD_NUMBER_PH })
                  } else if (resultPhone == 'not found') {
                  MyLogger('UpdateUser',`not found ${newPhone}`) 
                  return res.status(404).json({ "Error": `not found ${newPhone}` })
                  }
                  }
                  }
                  }
              
                  var data = {
                  /* NAJEEB */
                  em: body.email ?? null,
                  use: body.username ?? null,
                  pas: body.password ?? null,
                  age: body.age ?? null,
                  }
                  if (data.pas != null || data.pas != undefined) {//this for bcrypt password
                  const saltRounds = 10;
                  const salt = await bcrypt.genSalt(saltRounds);
                  data.pas = await bcrypt.hash(data.pas, salt);
                  }
              
                  function clean(obj) {//check object if value equal null remove that value
                  for (var propName in obj) {
                  if (obj[propName] === null || obj[propName] === undefined) {
                  delete obj[propName];
                  }
                  }
                  return obj
                  }
                  console.log(clean(data));
              
                  const userUpdate = await user.findOneAndUpdate({_id:userId},
                   clean(data), { new: true },
                  function (err) {
                  if (err) {
                  MyLogger('UpdateUser',err) 
                  return res.status(400).json({ "Error": err.message });
                  }
                  })
                  if (userUpdate == null){
                  MyLogger('UpdateUser',USER.NOTFOUND) 
                  return res.status(400).json({ "Error":USER.NOTFOUND })}
                  let result;
                  if (resultPhone == null) {
                  result = {
                  'age': userUpdate.age,
                  "email": userUpdate.em,
                  'password': userUpdate.pas,
                  "username": userUpdate.use,
                  };
                  }
                  result = {
                  'age': userUpdate.age,
                  "email": userUpdate.em,
                  'password': userUpdate.pas,
                  "username": userUpdate.use,
                  "phone": resultPhone
                  };
              
                  return res.status(200).json(result)
              
                  } catch (error) {
                  MyLogger('UpdateUser',error.message) 
                  console.log(error);
                  return res.status(401).json({ "Error": error.message });
                  }
                  

      }  
       
}
async function UpdatePhoneUser(req, id) {
      console.log(id);
      const oldPhone = req.body.oldPhone;
      const newPhone = req.body.newPhone;
      if (oldPhone == null || oldPhone == undefined) { return true }
      const userUpdate = await phoneNumber.updateOne(
      { us_In: id, phone: oldPhone },
      { $set: { "phone.$": newPhone } }
      ); console.log(userUpdate);
      if (userUpdate.n == 1) return newPhone; else return `not found`;
  
      }
module.exports = new UPDATE_USER();
