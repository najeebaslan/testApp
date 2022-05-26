    const offers = require("../models/offers");
    require('express-async-errors');
    const { findNetwork, } = require('../utils/find_utils');
    const { mongoose, Joi } = require('../utils/utils');
    const { cu_V } = require('../utils/validation/custom_val');
    Joi.objectId = require('joi-objectid')(Joi)
    const { MyLogger } = require('../utils/find_utils')
    const { PACKAGE,NETWORK,USER,PHONE,GLOBAL,AREA,OFFER } = require('../utils/Error/utils_Errors')

 /* 
    <<<// Documentation names //>>>

    1- findN = find ne
    2- fP = find package

    */
    class offer {
    async createOffer(req, res) {
    try {
    const body = req.body;

    const Schema = {/* this is validation request */

    pac_Pr: Joi.number().integer().min(100).required(),
    offers: Joi.string().min(3).max(100).required(),
    data: Joi.string().required(),
    de_Da: Joi.string().required(),
    time: Joi.string().required(),
    de_Ti: Joi.string().required(),
    va: Joi.string().required(),
    de_Va: Joi.string().required(),
    limitUptime: Joi.string().required(),
    details_limitUptime: Joi.string().required(),
    net_Id: Joi.objectId().required(),
    pac_Id: Joi.objectId().required(),

    }

    const { error } = cu_V(req.body, Schema);
    if (error) {
    MyLogger('createOffer', error.details[0].message )
    return res.status(404).json({ Error: error.details[0].message })}
    const findN = await findNetwork(body.network_Id)
    if (findN[0] == true) {
    MyLogger('createOffer',NETWORK.NOTFOUND )

      return res.status(404).json({ "Error": NETWORK.NOTFOUND})}

    const fP = findN[1].pac.filter(element => element._id == body.package_Id);
    if (fP[0] == null || fP[0] == undefined)
    {
    MyLogger('createOffer', PACKAGE.NOTFOUND )
    return res.status(404).json({ "Error": PACKAGE.NOTFOUND });
  }
    const offer =  new offers({
    pac_Pr: req.body.package_Price,
    of_De: req.body.offer_Details,
   //  data: req.body.data,
   //  de_Da: req.body.de_Da,
   //  time: req.body.time,
   //  de_Ti: req.body.de_Ti,
   //  va: req.body.va,
   //  de_Va: req.body.de_Va,
   //  limitUptime: req.body.limitUptime,
   //  details_limitUptime: req.body.details_limitUptime,
    net_Id: req.body.network_Id,
    });

    await offer.save(function (error) {
    if (error) {
    MyLogger('createOffer', error.message )

   return res.status(400).json({ "Error": error.message, });}
    return res.status(200).json([offer])
    }); console.log(error);
    } catch (error) {
    MyLogger('createOffer', error.message )

    console.log(error.message);
    return res.status(404).json({ Error: error.message })
    }

    }




    async getOffer(req, res) {
    const id = req.query.network_Id;
    try {
    await offers
    .findOne({ net_Id: id }, function (error, result) {
    if (error) {
    MyLogger('getOffer', error.message )
      
    return res.status(400).json({ Error: error.message })}
    if (!result) {
    MyLogger('getOffer',OFFER.NOTFOUND_ALL )
    return res.status(401).json({ "Error":OFFER.NOTFOUND_ALL });
    }
    return res.status(200).json(result);
    }).populate({ path: "net_Id", select: "img na_A" })
    } catch (error) {
    MyLogger('getOffer',error.message )
    console.log(error.message);
    return res.status(404).json({"Error":error.message})
    }
    }





    async getAllOffer(req, res) {
    const id = req.params;
    try {
    const findPackage = await offers
    .find()
    .populate({ path: "net_Id", select: "img na_A" })

    if (!findPackage) {
    MyLogger('getAllOffer',PACKAGE.NOTFOUND )

    return res.status(401).json({ "Error": PACKAGE.NOTFOUND });
    }
    return res.status(200).json(findPackage);
    } catch (error) {
    MyLogger('getAllOffer',error.message)
    console.log(error.message);
    return res.status(404).json({'Error':error.message})
    }
    };

    }

    module.exports = new offer();
