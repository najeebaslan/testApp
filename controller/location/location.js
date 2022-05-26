   const locationM = require("../../models/location");
   const {GOVERNORATE} = require("../../utils/Error/utils_Errors");
   const { findUser,MyLogger,changeLevel,checkAdd } = require('../../utils/find_utils')
   
   require('express-async-errors');
   const { logger, mongoose, ObjectId, } = require('../../utils/utils')
 
   class location {
      
   async carateLocation(req, res) {

   try {
   const body = req.body;
   const governorate = locationM(
   { governorate: body.governorate });
   governorate.save(function (err, data) {
   if (err) return res.json({ Error: err.message });
   return res.status(200).send({ governorate: governorate.governorate, _id: governorate._id })
   })
   }
   catch (error) {
   logger.error("carateLocation==>" + error);
   return res.status(404).json({ Error: error.message });
   }
   }
   
   async carateCity(req, res) {
     
   try {
    const idC = new mongoose.Types.ObjectId();
    const idS = new mongoose.Types.ObjectId();
   const body = req.body;
   let idCity,idStreet;
   const findGovernorate = await locationM.findOne({ _id:ObjectId(body.governorateId) })//Find Governorate By Id
   if (!findGovernorate) {
   res.status(401).json({ "Error":GOVERNORATE.NOTFOUND})
   return false;
   } else if (findGovernorate) {
   
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
   }]
   }}}}},
  { $unwind: "$list" },
  { $match: {"list.name": body.cityName.trim()}},
  { $project: { cities: "$list" } },
  
   ]).exec()
   if (city[0] == undefined) {// This for check if city is not exist do set city 
    idStreet=  idS;
    idCity=idC;
   await locationM.findOneAndUpdate({_id:body.governorateId},
   { $push: { cities: {_id:idCity, name: body.cityName.trim() }, } }, )
   .then(data => {
   SetStreet(res,body.streetName,body.cityName,idStreet,body.governorateId)
   return res.status(200).json({"idCity":idCity,"idStreet":idStreet,})
   });
   
   } else { //This for check if street is not exist do set street  
   idCity=city[0].cities._id;
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
   }}
   }},
   { $unwind: "$list" },
   {$replaceRoot:{newRoot:'$list',}},
   { $match: {"name":body.streetName.trim()}},
   ]).exec()
  
   
   if (street[0] == undefined) {
   SetStreet(res, body.streetName, body.cityName,idS,body.governorateId)
   return res.status(200).json({"idCity":idCity,"idStreet":idS,})
   }else{
    idStreet=street[0]._id;
    return res.status(200).json({"idCity":idCity,"idStreet":idStreet,})    
   } 
   }
   }
   
   } catch (error) {
   logger.error("carateCity==>" + error);
   return res.status(404).json({ Error: error.message });
   }
   }
   async  SetStreet(res, streetName, cityName,idSt,idCity) {try {
      
      console.log(cityName);
      console.log(idSt);
   await locationM.updateOne(
   { "cities.name": cityName.trim() , "_id": idCity.trim() ,},
   { $push: { "cities.$.streets": { "name": streetName.trim(),"_id":idSt     } } }
   ).then(data => {
   
   }).catch(error => {
      console.log(error);
   logger.error("SetStreet==>" + error);
   return res.status(404).json({ Error: error.message });
   })
   
   } catch (error) {
      console.log(error);
   logger.error("SetStreet==>" + error);
   return res.status(404).json({ Error: error.message });


   }
};


async getGovernorateByName(req, res) {
   try {
     const id = req.query.governorate;
   
     const findArea = await locationM.aggregate([//Find City By Id Governorate
     { $match: { "governorate": id} },
      //  {
   //    $project: {
   //    list: {
   //    $filter: {
   //    input: '$cities', as: 'item',
   //    // cond: {
   //    // $and: [{
   //    // $eq: ['$$item.name', body.cityName.trim()]
   //    // }]
   //    // }
   // }}}
   // },
   //   { $unwind: "$list" },
   //   { $match: {"list.name": body.cityName.trim()}},
   //   { $project: { cities: "$list" } },
     
      ]).exec()
      
   //   locationM.find({ governorate: id })
   //   .select('governorate')
     console.log(findArea+'========>');
     if(!findArea){
       MyLogger('getAllArea',AREA.AREAS_NOTFOUND)
       return res.status(404).json({Error:AREA.AREAS_NOTFOUND});
       }
     // .select('name net_Id')

     return res.status(200).send(findArea)   
   
   } catch (error) {
   MyLogger('getAllAreaByIdNetwork',error.message)
   console.log(error);
    return res.status(400).json({ "Error":error.message})
   }
 }
 async getCityByIdGovernorate(req, res) {
   try {
     const id = req.query.governorate;
   
     const findArea = await locationM.find({ governorate: id })
     .select('governorate')
     console.log(findArea+'========>');
     if(!findArea){
       MyLogger('getAllArea',AREA.AREAS_NOTFOUND)
       return res.status(404).json({Error:AREA.AREAS_NOTFOUND});
       }
     // .select('name net_Id')

     return res.status(200).send(findArea)   
   
   } catch (error) {
   MyLogger('getAllAreaByIdNetwork',error.message)
   console.log(error);
    return res.status(400).json({ "Error":error.message})
   }
 }
   }
   
   
   async function SetStreet(res, streetName, cityName,idSt,idCity) {try {
      
      console.log(cityName);
      console.log(idSt);
   await locationM.updateOne(
   { "cities.name": cityName.trim() , "_id": idCity.trim() ,},
   { $push: { "cities.$.streets": { "name": streetName.trim(),"_id":idSt     } } }
   ).then(data => {
   
   }).catch(error => {
      console.log(error);
   logger.error("SetStreet==>" + error);
   return res.status(404).json({ Error: error.message });
   })
   
   } catch (error) {
      console.log(error);
   logger.error("SetStreet==>" + error);
   return res.status(404).json({ Error: error.message });


   }
};
   module.exports = new location();

