
const {ObjectId,logger,mongoose,Joi}=require('../utils/utils')
const {cu_V}=require('../utils/validation/custom_val')
const {findNetwork,MyLogger}=require('../utils/find_utils')
    const { GOVERNORATE,NETWORK,USER,PHONE,GLOBAL,AREA } = require('../utils/Error/utils_Errors')


const coverage = require("../models/allCoverage_Area");
const ne = require("../models/network");
const AllCoverage = require("../models/allCoverage_Area");

require('express-async-errors');

class Coverage_area_Controller {

  async PostAllCoverage(req, res,) {
   
    try {
    const id = new mongoose.Types.ObjectId();
    const body=req.body;
    const Schema = {
    name: Joi.string().min(3).max(44).required(),
    net_Id: Joi.string().required(),
    };
    const {error}=cu_V(body,Schema);
    if(error){
    MyLogger('PostAllCoverage',error.details[0].message)
    return res.status(404).json({Error:error.details[0].message})
    }
    const findN =await findNetwork(body.net_Id)
    console.log(findN);
    if(findN[0]==true){
    MyLogger('PostAllCoverage',NETWORK.NOTFOUND)
    return res.status(404).json({"Error":NETWORK.NOTFOUND})}

    const findArea=await AllCoverage.findOne({net_Id: body.net_Id,name: body.name,})
    if(findArea){
    MyLogger('PostAllCoverage',AREA.EXIST)
    return res.status(402).json({'Error':AREA.EXIST})}
/*CHECK LEVEL USER*/
const level = levelCheck(res, body.user_initiate, 3,)
if (!level[0]) {
return level
}
    const name = new AllCoverage({
    _id: id,net_Id: body.net_Id,
    name: body.name,
    })
    const idNetwork = body.net_Id;
    await name.save()
    await ne.findOneAndUpdate({_id:idNetwork},
    {$addToSet: {name: id,},});
    const Level=changeLevel(body.user_initiate,4)
    if(Level[0]==false){
        MyLogger("PostAllCoverage", Level[1].message);
        return res.status(404).json({'Error':Level[1].message})
    }
   const getAllArea= await AllCoverage.
   find({net_Id:idNetwork})
   .select('name')
    return res.status(200).send(getAllArea)
    } catch (error) {
    MyLogger('PostAllCoverage',error.message)
    console.log(error);
    return  res.status(400).send({"Error":error.message})
    }
  };




  async getAllAreaByIdNetwork(req, res) {
    try {
      const id = req.params;
      console.log(id);
      const findArea = await AllCoverage.find({ net_Id: req.params }).select('-net_Id')
      console.log(findArea);
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




  async UpdateArea(req, res) {
    const updates = Object.keys(req.body);
    try {
      const area = await AllCoverage.
      findOneAndUpdate({_id:req.params.id}, req.body.name)
      if (!area) {
      MyLogger('UpdateArea',AREA.NOTFOUND)
      return res.status(404).json({ Error: AREA.NOTFOUND })
      }
      updates.forEach((update) => area[update] = req.body[update])
      area.save()
      res.status(200).send({ "status": true })
    } catch (error) {
      MyLogger('UpdateArea',error.message)
     return res.status(400).send({ "Error": error.message })
    }
  }



  async getAllArea(req, res) {
    try {
    const findArea = await coverage.find()
    .select('-net_Id')
    console.log(findArea);
    // .populate({ path: "ne", select: "name ad" });
    // if(findArea!=null||findArea!=[]||findArea!=[0]||findArea!=undefined){
    if(!findArea){
    MyLogger('getAllArea',AREA.AREAS_NOTFOUND)
    return res.status(404).json({Error:AREA.AREAS_NOTFOUND});
    }
    return res.status(200).json(findArea);
  } 
    catch (error) {
      MyLogger('getAllArea',error.message)
      return res.status(404).json({"Error":error.message});
  
    } }




  async findAreaByIdAndDelete(req, res) {
   
    try {
      const id = req.params;
      console.log(id);
    await AllCoverage.findOneAndDelete(id,function(error,data){
    if(error){
    MyLogger('findAreaByIdAndDelete',error.message)
    return res.status(400).json({Error:error.message});}
    if(data==null){
    MyLogger('findAreaByIdAndDelete',AREA.NOTFOUND)
    return res.status(400).json({"Error":AREA.NOTFOUND});
  }
    return res.status(200).json(data);
    })
    } catch (error) {
    MyLogger('findAreaByIdAndDelete',error.messag)
    return res.status(400).json({Error:error.message});
    }}




  async getAreaByName(req, res) {
    const names = req.query.governorate;
    try {
   await coverage.find({governorate: { $regex: names },},
    function (err, coverage) {
    if (err) {
   MyLogger('getAreaByName',err.message)
  return res.status(400).json({Error:err.message});
  }
    if(coverage[0]==null){
   MyLogger('getAreaByName',AREA.NOTFOUND + `(${names})`)
    return res.json({"Error":AREA.NOTFOUND + `(${names})`});
  }
    return res.status(200).json(coverage);
    })
    } catch (error) {
      MyLogger('getAreaByName',error.message)
      return res.status(404).json({"Error":error.message});
    }
  }
  //.....................................فلتر حسب سعر الفئة



  async findAreaById(req, res) {
    try {
      console.log(""+ req.params);
      const area_name = await coverage.findById({ _id: req.params }, function (err) {
      if (err){ 
      MyLogger('findAreaById',err.message)
      return res.status(404).json({Error:err.message})};
    });
    if(area_name==undefined){
      MyLogger('findAreaById',AREA.NOTFOUND)
      return res.status(404).json({Error:AREA.NOTFOUND})
    }
    return res.json(area_name);   
    } catch (error) {
      MyLogger('findAreaById',error.message)
      return res.status(404).json({"Error":error.message})
    }
  
  }




  async CoveragesCount(req, res) {

    const Coverages = await coverage.countDocuments({},
      function (err, count) {
      if(err){
      MyLogger('CoveragesCount',err.message)
      return res.status(401).json({Error:err.message})
    }
       return count
      });
    if (!Coverages) {
      MyLogger('CoveragesCount',AREA.NOTFOUND)
      return res.status(401).json({Error:AREA.NOTFOUND});
    }
    return res.status(200).json({"Coverages":Coverages});
  }
}



async function setPackageInNetwork(AllCoverageId, net_Id) {
  await ne.findOneAndUpdate({_id:net_Id}, {
    $addToSet: { name: AllCoverageId, },
   
  },{ new: true});
};
async function findAreaName(areaName, net_Id) {

  const area_name = await coverage.findOne({ name: areaName }, function (err) {
    if (err) {
    MyLogger('findAreaName',err.message)
    return res.json({"Error":err.message})};
  });
  const areaId = area_name.body._id
  console.log(areaId)
  if (area_name) {
    await coverage.findOneAndUpdate({_id:areaId}, {
      $addToSet: {
        networks: net_Id,
      },
    });
    await ne.findOneAndUpdate({_id:net_Id}, {

      $addToSet: {
        coverage_areaId: areaId,
      },
    });
    console.log(net_Id, areaId)
    console.log(areaName)
    return res.json(areaName);
  }
}

module.exports = new Coverage_area_Controller();
