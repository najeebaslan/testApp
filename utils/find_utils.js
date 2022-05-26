const user = require('../models/users');
const ne = require('../models/network');
const { ObjectId, logger } = require('../utils/utils');
const { De_St } = require('../controller/devices/devices_status');
const {operationLog}= require("../controller/log");
const  level_M =require('../models/roles_User')
const findNetwork = async (id) => {
  const findNetwork = await ne.findOne({ _id: ObjectId(id) })
    .populate({ path: 'pac', select: 'us_In pac_Pr ha_Pa equalUAP', })
    .select('_id pac na_A us_In')
  if (findNetwork) { return [false, findNetwork] } else { return [true] };
}

const findUser = async (id,) => {
  const findUser = await user.findOne({ _id: id });
  if (findUser) { return [false, findUser] } else { return [true] }

}


const findDeviceStatus = async (id) => {
 return await user.findOne({ userId: id },{},function(err,data){
    if(err){
    console.log(err);
    return [false,err];}
    else{
     return [true,data];
    }

  });

}
async function checkAdd(data) {/* this is check add data in data base or no  */
  const findUser = await data;
  return findUser
}
async function Save_De_St(body,userId,de_In_Id,op_Log,){
  /*THIS IS FOR SAVE DEVICE STATUS  */
  const de_St = De_St( body, userId, de_In_Id, )
  await de_St.save( function(err){
     if(err){
     return [false,err]
    }})
    operationLog( userId,op_Log,de_St._id,'','','',);
    // operationLog({
    //   userId:de_St._id, 
    //   ty_st:op_Log,
    //   cl:'cl',
    //   te:'te',
    //   we_st:'we_st',
    //   pl:'pl',
    //  req:req,
  
    //   })
    return [true]
}
function myMap(array, object) {
  return (array).map(function (data, index) {//this is doing mapping for eny array
    return (
      { [object]: data, }
    );
  });
}

 const MyLogger  =(first, last)=> {
  return logger.error(first + "-- " + last);/* this is for save error in local log and cloud log */
}

async function changeLevel(userId,updateLevel){
 try {
   /* this is doing update for level If the data is correct */
await   level_M.findOneAndUpdate( {userId: userId},{
    $max:{level:updateLevel}},{new:true},
    function(err){
      if(err){return [false,err]}  
    }) 
    return [true,data]  
 } catch (error) {
   return [false,error]
 }
    
}
module.exports = {
   findUser, findNetwork, myMap,
    checkAdd,
    MyLogger,
    Save_De_St,
    findDeviceStatus,changeLevel
  
  }

