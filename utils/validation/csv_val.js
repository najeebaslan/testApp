
       const { Joi } = require('../utils')
       Joi.objectId = require('joi-objectid')(Joi)
       const { cu_V } = require('./custom_val');
       const { d_I_F_F_U } = require('../delete_pathFiles')
       const { MyLogger } = require('../find_utils');

       /*  <<<// Documentation names //>>>

       1- vFCFa = validation Find Cards From Array
       2-vFC = validation Find Cards
       3- v_C_U_C =  Validation of Cards Csv Utils  

       */
       const vFC = (body, greaterThanTen, typeSaveData) => {

       if (greaterThanTen[0].have_Password == true) {
       if (greaterThanTen[0].equalUAP == false && greaterThanTen[0].equalUAP != null) {/* check if package cards not Equal use And pas*/

       typeSaveData = {
       network_Id: body.network_Id,
       username: body.username,
       password: body.password,
       serial_Number: body.serial_Number,

       }
       } else if (greaterThanTen[0].equalUAP == true && greaterThanTen[0].equalUAP != null) {
       typeSaveData = {
       network_Id: body.network_Id,
       username: body.username,
       /* <//<<pas: item.pas>>//> i am  disable Search this pas because do error because not found pas in database because equalUAP =true */
       serial_Number: body.serial_Number,
       }
       }
       } else {
       typeSaveData = {
       network_Id: body.network_Id,
       username: body.username,
       /* <//<<pas: { $in: findByUsername },>>//> i am  disable Search this pas =false */
       serial_Number: body.serial_Number,
       }
       }
       return typeSaveData
       }



       function vFCFa(
       body, greaterThanTen, resultSearch,
       findByUsername, findByPassword, findBySerialNor) {
       if (greaterThanTen[0].have_Password == true) {

       if (greaterThanTen[0].equalUAP == false && greaterThanTen[0].equalUAP != null) {/* check if package cards not Equal use And pas*/

       resultSearch = {
       network_Id: body.network_Id,
       username: { $in: findByUsername },
       password: { $in: findByPassword },
       serial_Number: { $in: findBySerialNor },

       }

       } else if (greaterThanTen[0].equalUAP == true && greaterThanTen[0].equalUAP != null) {
       resultSearch = {
       network_Id: body.network_Id,
       username: { $in: findByUsername },
       /* <//<<pas: item.pas>>//> i am  disable Search this pas because do error because not found pas in database because equalUAP =true */
       serial_Number: { $in: findBySerialNor },
       }

       }
       } else {
       resultSearch = {
       network_Id: body.network_Id,
       username: { $in: findByUsername },
       /* <//<<pas: { $in: findByUsername },>>//> i am  disable Search this pas =false */
       serial_Number: { $in: findBySerialNor },
       }

       }
       console.log(resultSearch.network_Id);
       return resultSearch


       }
       const validationArrayCsv = data => {

       let service = Joi.object().keys({
       username: Joi.string().min(3).max(44).required(),
       password: Joi.string().min(3).max(44).required(),
       serial_Number: Joi.string().min(3).max(44).required(),

       })

       let Schema = Joi.array().items(service)
       return Joi.validate(data, Schema)
       };

       async function v_C_U_C(res, req) {

       const schema = { network_Id: Joi.objectId().required(), package_Id: Joi.objectId().required(), }

       var bodyData = {
       network_Id: req.body.network_Id,
       package_Id: req.body.package_Id,
       }

       const { error } = cu_V(bodyData, schema);
       if (error) {
       await d_I_F_F_U(req);
       MyLogger('Validation of Cards Csv Utils', error.details[0].message)

       return res.status(400).json({ 'Error': error.details[0].message })
       }

       }

       module.exports.vFC = vFC
       module.exports.vFCFa = vFCFa
       module.exports.validationArrayCsv = validationArrayCsv
       module.exports.v_C_U_C = v_C_U_C



