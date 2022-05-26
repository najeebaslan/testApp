  
      const user = require("../../models/users");
      const locationM = require('../../models/location');
      const {changeLevel} = require('../../utils/find_utils')
      require('express-async-errors');
      const { levelCheck } = require('../../utils/validation/level_val');
      const { SetStreet } = require('../location/location')//location Controller
      const { Joi, ObjectId, mongoose, _, } = require('../../utils/utils')
      const { V_De_Us } = require("../../utils/validation/user_val");
      const { GOVERNORATE,USER } = require('../../utils/Error/utils_Errors')
      const { checkAdd,MyLogger,Save_De_St } = require("../../utils/find_utils");
      const { cu_V } = require("../../utils/validation/custom_val");
  
  
  /*<<<// Documentation For User //>>>
    1-de_st = devices status
    2-  userId = User  Id
    3-De_St=Device status
    4- V_De_Us =Validation Details User 
    5-us_Ty= User Type
    6- de_In_Id=Device Info Id
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
class DETAILS_USER{

      async PostDetailsUser(req, res) {
    try {
      const userId = req.body.userId;
      const age = req.body.age;
      const sex = req.body.sex;
      const us_Ty = req.body.user_Type;
      const body = req.body;
      /* VALIDATION Details USER */
      const error = V_De_Us(res, body);
      if (error) return error
  
      /* CHECK IF YOT ALREADY ADD Details User */
      const findUser = await checkAdd(user.findOne({ _id: userId }))
      if (!findUser) {
      MyLogger('PostDetailsUser',USER.NOTFOUND,)      
      res.status(400).json({ "Error": USER.NOTFOUND, });
      return false;
      }
      if(findUser.us_Ty||findUser.sex){/* this is check if you already add data return this data */
        return res.status(400).json({ "user_Type": findUser.us_Ty, });
      }
  
     
     
      const idC = new mongoose.Types.ObjectId();/* This is id City */
      const idS = new mongoose.Types.ObjectId();/* This is id Street */
      let idCity, idStreet;
      const findGovernorate = await locationM.findOne({ _id: ObjectId(body.governorateId) })//Find Governorate By Id
      console.log(findGovernorate);
      if (!findGovernorate) {
      MyLogger('PostDetailsUser',GOVERNORATE.NOTFOUND,)      
  
      res.status(401).json({ "Error": GOVERNORATE.NOTFOUND })
      return false;
      } else if (findGovernorate) {
      /*CHECK LEVEL USER*/
      const check_Level_user=await levelCheck(res, userId, 0);
      if (!check_Level_user[0]) return check_Level_user
      const city = await locationM.aggregate([//Find City By Id Governorate
      { $match: { "_id": ObjectId(body.governorateId) } },
      {
      $project: {
      list: {
      $filter: {
      input: '$cities', as: 'item',
      cond: {
      $and: [{
      $eq: ['$$item.name', body.cityName.trim()]
      }] } } }}},
      { $unwind: "$list" },
      { $match: { "list.name": body.cityName.trim() } },
      { $project: { cities: "$list", "_id": 0 } },
  
      ]).exec()
  
      if (city[0] == undefined) {// This for check if city is not exist do set city 
      idStreet = idS;
      idCity = idC;
      await locationM.findOneAndUpdate({_id:body.governorateId},
      { $push: { cities: { _id: idCity, name: body.cityName.trim() }, } })
      .then(async data=> {
        
      SetStreet(res, body.streetName, body.cityName, idStreet, body.governorateId)//this for set street
      setDetailsUserInProfile(res,userId, age,);
      await setDetailsUserInUser(res,userId, sex, us_Ty, body.governorateId, idCity, idStreet,body,findUser.de_In_Id)
      return res.status(200).json({ 'user_Type': us_Ty })
      });
  
      } else { //This for check if street is not exist do set street  
      idCity = city[0].cities._id;
  
      const street = await locationM.aggregate([
      { $unwind: "$cities" },
      { $match: { "cities._id": ObjectId(city[0].cities._id) } },
      {
      $project: {
      list: {
      $filter: {
      input: '$cities.streets', as: 'item',
      cond: {
      $and: [{
      $eq: ['$$item.name', body.streetName.trim()]
      }]
      }
      }
      }
      }
      },
      { $unwind: "$list" },
      { $replaceRoot: { newRoot: '$list', } },
      { $match: { "name": body.streetName.trim() } },
      ]).exec()
  
      console.log(street + 'street=====');
      if (street[0] == undefined) {
      SetStreet(res, body.streetName, body.cityName, idS, body.governorateId)
      setDetailsUserInProfile(res,userId, age,);
     await setDetailsUserInUser(res,userId, sex, us_Ty, body.governorateId, idCity, idS,body,findUser.de_In_Id)
      return res.status(200).json({ 'us_Ty': us_Ty })
      } else {
      setDetailsUserInProfile(res,userId, age,);
      await setDetailsUserInUser(res,userId, sex, us_Ty, body.governorateId, idCity, street[0]._id,body,findUser.de_In_Id)
      return res.status(200).json({ 'us_Ty': us_Ty })
      }
      }
      
      }
      } catch (error) {
      MyLogger('PostDetailsUser',error.message,)      
      return res.status(400).json({ "Error": error.message });
      }
      
      }
}


async function setDetailsUserInProfile(res,userId, age,) {
    
      await user.findOneAndUpdate({_id:userId}, { $set: { age: age, }},{  new: true,},);
    
      };
  
  
      async function setDetailsUserInUser(res,userId, sex, us_Ty, go_Id, ci_Id, st_Id,body,de_In_Id) {
        try {
        
     return await user.findOneAndUpdate({_di:userId}, {
      $set: {
      sex: sex,
      us_Ty: us_Ty,
      lo: {
      go_Id: go_Id,
      ci_Id: ci_Id,
      st_Id: st_Id,
      }
      },
      }, { new: true, },
      
    //  async function(err){
    //   if(err){
    //   MyLogger('PostDetailsUser-setDetailsUserInUser',error.message,)      
    //   return res.status(400).json({ "Error": error.message });
    //   }else{
    //   if(!de_In_Id){   /*THIS IS FOR CHECK DEVICE INFO ID */
        
    //   MyLogger("PostDetailsUser-setDetailsUserInUser",USER.NOTFOUND);
    //   return res.status(400).json({ "Error": USER.NOTFOUND });
    //   }else{
    //   /*THIS IS FOR CHANGE USER LEVEL */
    //   // const Level=
    //   await changeLevel(userId,2)
    //   // if(Level[0]==false){
    //   // MyLogger("PostDetailsUser-setDetailsUserInUser", Level[1].message);
    //   // return res.status(404).json({'Error':Level[1].message})
    //   // }
    //   /*THIS IS FOR SAVE DEVICE STATUS  */
    //   const de_st= Save_De_St(body,  userId, de_In_Id,'Login')
    //   if(de_st[0]==false){
    //   MyLogger('findDeviceInfo-Save_De_St',error.message,)      
    //   return res.status(400).json({ "Error": error.message });
    //   }
    //   }
        
        
    // // try {
    // //   const info = await findDeviceInfo(userId);
    // //   if (!info[0]) {
    // //     MyLogger("PostDetailsUser-setDetailsUserInUser",USER.NOTFOUND);
    // //     return res.status(400).json({ "Error": USER.NOTFOUND });
    // //   }
      
  
    // // /*THIS IS FOR SAVE DEVICE STATUS  */
    // // const de_St = De_St( body, userId, info._id, )
    
     
    // // } catch (error) {
    // //   MyLogger('PostDetailsUser-save deviseInfo & deviceStatus',error.message,)      
    // //   return res.status(400).json({ "Error": error.message });
    // //   }
    // }},
    ).then( async data =>{
  
      if(!de_In_Id){ 
      /*THIS IS FOR CHECK DEVICE INFO ID */
      MyLogger("PostDetailsUser-setDetailsUserInUser",USER.NOTFOUND);
      return res.status(400).json({ "Error": USER.NOTFOUND });
      }
      else{
  
      /*THIS IS FOR CHANGE USER LEVEL */
      const Level= changeLevel(userId,1).catch(error=>{
      MyLogger("PostDetailsUser-setDetailsUserInUser", error.message);
      return res.status(404).json({'Error':error.message})
      })
      if(Level[0]==false){
      MyLogger("PostDetailsUser-setDetailsUserInUser", Level[1].message);
      return res.status(404).json({'Error':Level[1].message})
      }
  
      /*THIS IS FOR SAVE DEVICE STATUS  */
      const de_st= Save_De_St(body,  userId, de_In_Id,'PostDetailsUser',)
      if(de_st[0]==false){
      MyLogger('findDeviceInfo-Save_De_St',error.message,)      
      return res.status(400).json({ "Error": error.message });
      }
    }})
      } catch (error) {
        MyLogger('findDeviceInfo-Save_De_St',error.message,)      
        return res.status(400).json({ "Error": error.message });
  
      }}
module.exports = new DETAILS_USER();