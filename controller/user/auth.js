    // const user = require("../../models/users");
    // const roles_user = require("../../models/roles_User");
    // const phoneNumber = require("../../models/phones");
    // const locationM = require('../../models/location');
    // const roles_User = require('../../models/roles_User');
    // const async = require('async');
    // const bcrypt = require('bcryptjs');
    // const {operationLog}= require("../log");
    // const {changeLevel} = require('../../utils/find_utils')
    // require('express-async-errors');
    // const { levelCheck } = require('../../utils/validation/level_val');
    // const { SetStreet } = require('../location/location')//location Controller
    // const { Joi, ObjectId, mongoose, _, } = require('../../utils/utils')
    // const { validationRegister,V_De_Us } = require("../../utils/validation/user_val");
    // const { GOVERNORATE,NETWORK,USER,PHONE } = require('../../utils/Error/utils_Errors')
    // const { De_In } = require('../../controller/devices/devices_info');
    // const { De_St } = require('../../controller/devices/devices_status');
    // const { checkAdd,MyLogger,Save_De_St } = require("../../utils/find_utils");
    // const { cu_V } = require("../../utils/validation/custom_val");

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

    /*  <<<// Documentation For Log //>>>
    1- userId = User Profile Id
    2- da_Ad = Date Add
    3- de_St = Device Status
    4-logM=log model

    
    */

    class UserController {


    // async createUser(req, res) {
    // try {
    // const body = req.body;
    // const id = new mongoose.Types.ObjectId();
    // const phone_Id = new mongoose.Types.ObjectId();
    // const phone = req.body.phone;
    // const em = req.body.email;
    // const id_In = new mongoose.Types.ObjectId();

    // let nu_Ac;

    // /* VALIDATION REGISTER */
    // const error = validationRegister(res, body);
    // if (error) return error
    // /* find number account : This is to create an account number sequentially*/
    // const find_Nu_Ac = await user.findOne({}, {}, { sort: { 'createdAt': -1 } },)
    // if (find_Nu_Ac == null || find_Nu_Ac.nu_Ac == undefined || find_Nu_Ac.nu_Ac == null || find_Nu_Ac.nu_Ac == undefined) {
    // nu_Ac = 1000000001;
    // } else {
    // nu_Ac = find_Nu_Ac.nu_Ac + 1;
    // }

    // /* check if phone number already exist or no  */
    // const phoneExists = await phoneNumber.findOne({ phone: phone });
    // if (phoneExists) {
    // MyLogger('createUser',PHONE.ALREADY_EXIST)
    // res.status(400).json({ "Error": PHONE.ALREADY_EXIST, });
    // return false;
    // }

    // /* check if email already exist or no */
    // const EmailExists = await user.findOne({ em: em });
    // if (EmailExists) {
    // res.status(400).json({ "Error": USER.EMAIL_EXIST, });
    // MyLogger('createUser',USER.EMAIL_EXIST)
    // return false;
    // }

    // // if (error) {
    // //   MyLogger('createUser',error.details[0].message)      
    // //   return res.status(404).json({ "Error": error.details[0].message })
    // // }

    // /* THIS IS DATA USER */
    // var dataUser = {
    // "_id": id,
    // "phoneId": phone_Id,
    // "em": body.email,
    // "pas": body.password,
    // "use": body.username,
    // 'nu_Ac': nu_Ac,
    // 'roles_User':id,
    // 'de_In_Id':id_In,
    // "timestamps": true
    // };
    // /* hash password */
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // dataUser.pas = await bcrypt.hash(dataUser.pas, salt);

    // const my_User = user(_.pick(dataUser, [
    //   '_id', 'phoneId','em','pas','use','nu_Ac','roles_User','de_In_Id',"timestamps"
    // ]));
    // console.log(my_User.de_In_Id+'111111111');


    // /*THIS IS DATA ROLES USER */
    // var roles_Data = {
    // "_id": id,
    // "userId": id,
    // "level": 1,
    // 'language':body.language||'English',
    // "timestamps": true,
    // };

    // let roles = new roles_user(_.pick(roles_Data, ['_id', 'userId', 'level','language',"timestamps",]))

    // /*THIS IS DATA PHONE NUMBER  */
    // var phoneNumbers = {
    // "_id":my_User.phoneId,
    // "phone": req.body.phone,
    // "us_In": id,
    // "is_Ac": true,
    // "timestamps": true
    // };
    // const phoneNum = new phoneNumber(_.pick(phoneNumbers, ['_id','phone', 'us_In', 'is_Ac', 'timestamps',]))
    // /*THIS IS FOR SAVE DEVICE INFO  */
    // const de_In = De_In(my_User.de_In_Id,body, id,)

    // /*THIS IS FOR SAVE DEVICE STATUS  */
    // const de_St = De_St( body, id, de_In._id, )

    // var all_Collection = [my_User, phoneNum, roles, de_In, de_St];/* this is each models  */

    // async.eachSeries(all_Collection, async function (collection, asyncDone) {/* this is save each series  كل سلسلة*/
    // await collection.save(asyncDone);
    // },

    // function (err) {
    // try {
    // if (err) {
    //   MyLogger('createUser',err)      
    //  return res.status(400).json({ "Error": err.message });
    // }
    // operationLog(my_User._id,'register',de_St._id)/* THIS IS OPERATION LOG  */

    // const token = roles.generateTokens()
    // const pickDate = _.pick(my_User, [
    // '_id', 'em', 'use', 'nu_Ac','de_In_Id',]);
    // const result = {
    // '_id': pickDate._id,
    // 'username':pickDate.use,
    // 'email': pickDate.em,
    // 'number_Account': pickDate.nu_Ac,
    // 'de_In_Id':pickDate.de_In_Id,
    // }

    // return res.header('Authorization', 'Bearer ' + token).status(200).json(result)


    // } catch (error) {
    //   console.log(error);
    //   MyLogger('createUser',error.message)      

    // return res.status(400).json({ "Error": error.message });
    // }
    // });
    // } catch (error) {
    // console.log(error);
    // MyLogger('createUser',error.message)      
    // return res.status(400).json({ "Error": error.message });
    // }
    // }









  //   async PostDetailsUser(req, res) {

  //   try {
  //   const userId = req.body.userId;
  //   const age = req.body.age;
  //   const sex = req.body.sex;
  //   const us_Ty = req.body.user_Type;
  //   const body = req.body;
  //   /* VALIDATION Details USER */
  //   const error = V_De_Us(res, body);
  //   if (error) return error

  //   /* CHECK IF YOT ALREADY ADD Details User */
  //   const findUser = await checkAdd(user.findOne({ _id: userId }))
  //   if (!findUser) {
  //   MyLogger('PostDetailsUser',USER.NOTFOUND,)      
  //   res.status(400).json({ "Error": USER.NOTFOUND, });
  //   return false;
  //   }
  //   if(findUser.us_Ty||findUser.sex){/* this is check if you already add data return this data */
  //     return res.status(400).json({ "user_Type": findUser.us_Ty, });
  //   }

   
   
  //   const idC = new mongoose.Types.ObjectId();/* This is id City */
  //   const idS = new mongoose.Types.ObjectId();/* This is id Street */
  //   let idCity, idStreet;
  //   const findGovernorate = await locationM.findOne({ _id: ObjectId(body.governorateId) })//Find Governorate By Id
  //   console.log(findGovernorate);
  //   if (!findGovernorate) {
  //   MyLogger('PostDetailsUser',GOVERNORATE.NOTFOUND,)      

  //   res.status(401).json({ "Error": GOVERNORATE.NOTFOUND })
  //   return false;
  //   } else if (findGovernorate) {
  //   /*CHECK LEVEL USER*/
  //   const check_Level_user=await levelCheck(res, userId, 1);
  //   if (!check_Level_user[0]) return check_Level_user
  //   const city = await locationM.aggregate([//Find City By Id Governorate
  //   { $match: { "_id": ObjectId(body.governorateId) } },
  //   {
  //   $project: {
  //   list: {
  //   $filter: {
  //   input: '$cities', as: 'item',
  //   cond: {
  //   $and: [{
  //   $eq: ['$$item.name', body.cityName.trim()]
  //   }] } } }}},
  //   { $unwind: "$list" },
  //   { $match: { "list.name": body.cityName.trim() } },
  //   { $project: { cities: "$list", "_id": 0 } },

  //   ]).exec()

  //   if (city[0] == undefined) {// This for check if city is not exist do set city 
  //   idStreet = idS;
  //   idCity = idC;
  //   await locationM.findOneAndUpdate({_id:body.governorateId},
  //   { $push: { cities: { _id: idCity, name: body.cityName.trim() }, } })
  //   .then(async data=> {
      
  //   SetStreet(res, body.streetName, body.cityName, idStreet, body.governorateId)//this for set street
  //   setDetailsUserInProfile(res,userId, age,);
  //   await setDetailsUserInUser(res,userId, sex, us_Ty, body.governorateId, idCity, idStreet,body,findUser.de_In_Id)
  //   return res.status(200).json({ 'user_Type': us_Ty })
  //   });

  //   } else { //This for check if street is not exist do set street  
  //   idCity = city[0].cities._id;

  //   const street = await locationM.aggregate([
  //   { $unwind: "$cities" },
  //   { $match: { "cities._id": ObjectId(city[0].cities._id) } },
  //   {
  //   $project: {
  //   list: {
  //   $filter: {
  //   input: '$cities.streets', as: 'item',
  //   cond: {
  //   $and: [{
  //   $eq: ['$$item.name', body.streetName.trim()]
  //   }]
  //   }
  //   }
  //   }
  //   }
  //   },
  //   { $unwind: "$list" },
  //   { $replaceRoot: { newRoot: '$list', } },
  //   { $match: { "name": body.streetName.trim() } },
  //   ]).exec()

  //   console.log(street + 'street=====');
  //   if (street[0] == undefined) {
  //   SetStreet(res, body.streetName, body.cityName, idS, body.governorateId)
  //   setDetailsUserInProfile(res,userId, age,);
  //  await setDetailsUserInUser(res,userId, sex, us_Ty, body.governorateId, idCity, idS,body,findUser.de_In_Id)
  //   return res.status(200).json({ 'us_Ty': us_Ty })
  //   } else {
  //   setDetailsUserInProfile(res,userId, age,);
  //   await setDetailsUserInUser(res,userId, sex, us_Ty, body.governorateId, idCity, street[0]._id,body,findUser.de_In_Id)
  //   return res.status(200).json({ 'us_Ty': us_Ty })
  //   }
  //   }
    
  //   }
  //   } catch (error) {
  //   MyLogger('PostDetailsUser',error.message,)      
  //   return res.status(400).json({ "Error": error.message });
  //   }
  //   }




  //   async Login(req, res) {
  //   try {
  //   const em = req.body.email;
  //   const passwordUser = req.body.password;
  //   let User = await user.findOne({ em: em })
  //   .populate('roles_User','-createdAt -updatedAt')
  //   // .
  //   // select('_id , em , pas , use , ne , roles_User , us_Ty , nu_Ac','de_In_Id');//isAdmin لان التوكن يتضمن  Token  فسيحدث خطاء في ال isAdmin اذا تم حذف 
  //   console.log(User);
  //   if (!User) {
  //   const Schema = {
  //   email: Joi.string().min(6).max(255).required().email(),
  //   password: Joi.string().min(8).max(255).required(),
  //   };
  //   const { error } = cu_V(req.body,Schema);
  //   if (error){
  //     MyLogger('Login',error.details[0].message,) 
  //   return res.status(404).json({ "Error": error.details[0].message })}

  //   }
  //   const chickPassword = await bcrypt.compare(passwordUser, User.pas);
  //   if (!chickPassword) {
  //   MyLogger('Login',USER.EMAIL_OR_PASS_ERR,) 
  //   console.log(USER.EMAIL_OR_PASS_ERR);
  //   return res.status(401).json({ "Error": USER.EMAIL_OR_PASS_ERR, });
  //   }
    
  //  let roles_user = await roles_User.findOne({ userId: User.roles_User.userId })
  //   const token = roles_user.generateTokens()
  //   console.log(User.ne);
  //   // Language(roles_user.language)
  //   // LANGUAGE=roles_user.language;/* THIS IS FOR SELECT USER LANGUAGE */

  //    /*THIS IS FOR GET DEVICE INFO  */
  //    console.log( User.de_In_Id+'ffffff');
  //   const info = User.de_In_Id;
  //     if (!info) {
  //       MyLogger("Login-findDeviceInfo",USER.NOTFOUND);
  //       return res.status(400).json({ "Error": USER.NOTFOUND });
  //     }

  //     /*THIS IS FOR SAVE DEVICE STATUS  */
  //    const de_st= Save_De_St(body,  User._id, User.de_In_Id,'Login')
  //    if(de_st[0]==false){
  //     MyLogger('findDeviceInfo-Save_De_St',error.message,)      
  //     return res.status(400).json({ "Error": error.message });
  //    }
     
  //   //   const de_St = De_St( body,  User._id, User.de_In_Id, )
  //   //  await de_St.save(async function(err){
  //   //     if(err){
  //   //     MyLogger('PostDetailsUser-save deviseInfo & deviceStatus',error.message,)      
  //   //     return [false,err]
  //   //     //res.status(400).json({ "Error": error.message });
  //   //    };else{;
         
  //   //      //'Login'
  //   //     operationLog( User._id,op_Log,de_St._id)
  //   //     return[true]
  //   //    }})
  //   const dataResult = {
  //   "network": User.ne,
  //   "_id": User._id,
  //   "email": User.em,
  //   "username": User.use,
  //   "user_Type": User.us_Ty,
  //   "number_Account": User.nu_Ac,
  //   "token": token
  //   }

  // return  res.status(200).json(dataResult);
  //   } catch (error) {
  //   MyLogger('Login',error.message) 
  //   console.log(error);
  //   return res.status(401).json({ "Error": error.message });
  //   }
  //   }





    // async UpdateUser(req, res) {

    // try {
     
    // const userId = req.params._id;
    // const body = req.body;
    // /* NAJEEB */
    // const em = body.email ?? null;
    // const newPhone = body.newPhone ?? null;
    // const oldPhone = body.oldPhone ?? null;
    // let findOldPhone, resultPhone;
    // const findEmail = await user.findOne({ em: em, });
    // console.log(findOldPhone);
    // if (findEmail) {
    // MyLogger('UpdateUser',USER.EMAIL_EXIST) 
    // return res.status(404).json({ Error: USER.EMAIL_EXIST }) 
    //   }
    // if (newPhone != null && oldPhone != null) {
    // console.log('test');
    // findOldPhone = await phoneNumber.findOne({ phone: oldPhone, });
    // console.log(findOldPhone);
    // if (!findOldPhone) { return res.status(404).json({ Error: PHONE.NOTFOUND_OLD }) }
    // const phoneExists = await phoneNumber.findOne({ phone: newPhone, });
    // if (phoneExists) { return res.status(404).json({ Error: PHONE.EXIST }) }
    // if (oldPhone != null || oldPhone != undefined && newPhone != null || newPhone != undefined) {
    // if (findOldPhone.phone[0] == oldPhone && findOldPhone.us_In == userId) {

    // resultPhone = await UpdatePhoneUser(req, userId);//this do update phone number
    // operationLog( findEmail._id,'UpdateUser',de_St._id)

    // console.log(resultPhone);
    // if (resultPhone == true) {
    // MyLogger('UpdateUser',PHONE.SEND_OLD_NUMBER_PH) 

    // return res.status(200).json({ "Error": PHONE.SEND_OLD_NUMBER_PH })
    // } else if (resultPhone == 'not found') {
    // MyLogger('UpdateUser',`not found ${newPhone}`) 
    // return res.status(404).json({ "Error": `not found ${newPhone}` })
    // }
    // }
    // }
    // }

    // var data = {
    // /* NAJEEB */
    // em: body.email ?? null,
    // use: body.username ?? null,
    // pas: body.password ?? null,
    // age: body.age ?? null,
    // }
    // if (data.pas != null || data.pas != undefined) {//this for bcrypt password
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // data.pas = await bcrypt.hash(data.pas, salt);
    // }

    // function clean(obj) {//check object if value equal null remove that value
    // for (var propName in obj) {
    // if (obj[propName] === null || obj[propName] === undefined) {
    // delete obj[propName];
    // }
    // }
    // return obj
    // }
    // console.log(clean(data));

    // const userUpdate = await user.findOneAndUpdate({_id:userId},
    //  clean(data), { new: true },
    // function (err) {
    // if (err) {
    // MyLogger('UpdateUser',err) 
    // return res.status(400).json({ "Error": err.message });
    // }
    // })
    // if (userUpdate == null){
    // MyLogger('UpdateUser',USER.NOTFOUND) 
    // return res.status(400).json({ "Error":USER.NOTFOUND })}
    // let result;
    // if (resultPhone == null) {
    // result = {
    // 'age': userUpdate.age,
    // "email": userUpdate.em,
    // 'password': userUpdate.pas,
    // "username": userUpdate.use,
    // };
    // }
    // result = {
    // 'age': userUpdate.age,
    // "email": userUpdate.em,
    // 'password': userUpdate.pas,
    // "username": userUpdate.use,
    // "phone": resultPhone
    // };

    // return res.status(200).json(result)

    // } catch (error) {
    // MyLogger('UpdateUser',error.message) 
    // console.log(error);
    // return res.status(401).json({ "Error": error.message });
    // }
    // }
    }





    // async function UpdatePhoneUser(req, id) {
    // console.log(id);
    // const oldPhone = req.body.oldPhone;
    // const newPhone = req.body.newPhone;
    // if (oldPhone == null || oldPhone == undefined) { return true }
    // const userUpdate = await phoneNumber.updateOne(
    // { us_In: id, phone: oldPhone },
    // { $set: { "phone.$": newPhone } }
    // ); console.log(userUpdate);
    // if (userUpdate.n == 1) return newPhone; else return `not found`;

    // }



  //   async function setDetailsUserInProfile(res,userId, age,) {
    
  //   await user.findOneAndUpdate({_id:userId}, { $set: { age: age, }},{  new: true,},);
  
  //   };


  //   async function setDetailsUserInUser(res,userId, sex, us_Ty, go_Id, ci_Id, st_Id,body,de_In_Id) {
  //     try {
      
  //  return await user.findOneAndUpdate({_di:userId}, {
  //   $set: {
  //   sex: sex,
  //   us_Ty: us_Ty,
  //   lo: {
  //   go_Id: go_Id,
  //   ci_Id: ci_Id,
  //   st_Id: st_Id,
  //   }
  //   },
  //   }, { new: true, },
  // //  async function(err){
  // //   if(err){
  // //   MyLogger('PostDetailsUser-setDetailsUserInUser',error.message,)      
  // //   return res.status(400).json({ "Error": error.message });
  // //   }else{
  // //   if(!de_In_Id){   /*THIS IS FOR CHECK DEVICE INFO ID */
      
  // //   MyLogger("PostDetailsUser-setDetailsUserInUser",USER.NOTFOUND);
  // //   return res.status(400).json({ "Error": USER.NOTFOUND });
  // //   }else{
  // //   /*THIS IS FOR CHANGE USER LEVEL */
  // //   // const Level=
  // //   await changeLevel(userId,2)
  // //   // if(Level[0]==false){
  // //   // MyLogger("PostDetailsUser-setDetailsUserInUser", Level[1].message);
  // //   // return res.status(404).json({'Error':Level[1].message})
  // //   // }
  // //   /*THIS IS FOR SAVE DEVICE STATUS  */
  // //   const de_st= Save_De_St(body,  userId, de_In_Id,'Login')
  // //   if(de_st[0]==false){
  // //   MyLogger('findDeviceInfo-Save_De_St',error.message,)      
  // //   return res.status(400).json({ "Error": error.message });
  // //   }
  // //   }
      
      
  // // // try {
  // // //   const info = await findDeviceInfo(userId);
  // // //   if (!info[0]) {
  // // //     MyLogger("PostDetailsUser-setDetailsUserInUser",USER.NOTFOUND);
  // // //     return res.status(400).json({ "Error": USER.NOTFOUND });
  // // //   }
    

  // // // /*THIS IS FOR SAVE DEVICE STATUS  */
  // // // const de_St = De_St( body, userId, info._id, )
  
   
  // // // } catch (error) {
  // // //   MyLogger('PostDetailsUser-save deviseInfo & deviceStatus',error.message,)      
  // // //   return res.status(400).json({ "Error": error.message });
  // // //   }
  // // }},
  // ).then( async data =>{

  //   if(!de_In_Id){ 
  //   /*THIS IS FOR CHECK DEVICE INFO ID */
  //   MyLogger("PostDetailsUser-setDetailsUserInUser",USER.NOTFOUND);
  //   return res.status(400).json({ "Error": USER.NOTFOUND });
  //   }
  //   else{

  //   /*THIS IS FOR CHANGE USER LEVEL */
  //   const Level= changeLevel(userId,1).catch(error=>{
  //   MyLogger("PostDetailsUser-setDetailsUserInUser", error.message);
  //   return res.status(404).json({'Error':error.message})
  //   })
  //   if(Level[0]==false){
  //   MyLogger("PostDetailsUser-setDetailsUserInUser", Level[1].message);
  //   return res.status(404).json({'Error':Level[1].message})
  //   }

  //   /*THIS IS FOR SAVE DEVICE STATUS  */
  //   const de_st= Save_De_St(body,  userId, de_In_Id,'PostDetailsUser')
  //   if(de_st[0]==false){
  //   MyLogger('findDeviceInfo-Save_De_St',error.message,)      
  //   return res.status(400).json({ "Error": error.message });
  //   }
  // }})
  //   } catch (error) {
  //     MyLogger('findDeviceInfo-Save_De_St',error.message,)      
  //     return res.status(400).json({ "Error": error.message });

  //   }}
    
    // module.exports = new UserController();