      const profile = require("../../models/users");
     const { NETWORK } = require("../../utils/Error/utils_Errors");
     const {  MyLogger } = require('../../utils/find_utils');
     const {  Language } = require('../../middleware/language');

      require('express-async-errors'); 
      const { Joi, ObjectId, mongoose, } = require('../../utils/utils')

      class FilterSelling{
      async PackageBestSelling(req, res) {/* فلتر الاكثر باقات مبيعات */

      const reqQueryObject = req.query ;
      console.log(reqQueryObject);
      const userId = req.query.userId ;
      try {
      await profile.aggregate( [
      { $match: { "_id": ObjectId(userId), } },
      { $project: {list: { $filter: {input: '$outCome', as: 'item',
      cond: {
      $and: [ {$eq: ['$$item.status','buyCard'],},],},}, }, }},
      { $project: {outCome:"$list"}},
      {$unwind: { path: "$outCome", },},
      { $facet: { "outCome": [
      {$bucketAuto: {groupBy: "$outCome.pac_Pr", buckets: 1000000000,
      output: { "count": { $sum: 1 },
      outCome: { $sum: "$outCome.am" },/* اجمالي الرصيد الذي اشتريت به من هذه الفئة */
      } }},],}},
      {$unwind: '$outCome'}, 
      {$sort: {'outCome.count': -1}}, 
      {$group: {_id: '$_id', 'outCome': {$push: '$outCome'}}}
      ] ).exec((error ,result)=>{
      if (error){
      MyLogger('PackageBestSelling',error.message)
            
      return res.status(401).json({Error:error.message});}
      if(result[0]==undefined){
      MyLogger("PackageBestSelling",NETWORK.MATCHES_NO_FILTER);

      res.status(401).json({Error:NETWORK.MATCHES_NO_FILTER})
      return false;
      }
      res.json( result[0].outCome)
      })  
      } catch (error) {
     MyLogger("PackageBestSelling",error.message);
      return res.status(404).json({Error:error.message});
      }
      }}
   module.exports = new FilterSelling();
