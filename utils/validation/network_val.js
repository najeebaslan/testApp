      const { Joi, } = require('../utils')
      Joi.objectId = require('joi-objectid')(Joi)
      const { cu_V } = require('./custom_val');
      const { MyLogger } = require('../find_utils');
      const { GOVERNORATE, NETWORK, USER, PHONE, GLOBAL, BLOCK, LEVEL } = require('../../utils/Error/utils_Errors')

      const { d_I_F_F_U } = require('../delete_pathFiles')
      /*  <<<// Documentation names //>>>


      1-na_A= name Arabic
      2-na_E= name English
      3-name=allCoverage_Area
      4-ph=phones
      5-us_In=user_initiate
      6-ad=address
      7-pac=packages
      8-is_Ac=isActive
      9-lo=location
      10-go_Id=governorateId
      11-ci_Id=cityId
      12-st_Id=streetId
      13-nV = ne Validation
      14-n_D_V =  network Data Validation

      */


      const nV = (body) => {/* this is check validation request*/
      console.log(body);
      const Schema = {
      name_A: Joi.string().min(3).max(44).required(),
      name_E: Joi.string().min(3).max(44).required(),
      user_Initiate: Joi.objectId().required(),
      governorateId: Joi.objectId().required(),
      cityName: Joi.string().min(3).max(15).required(),
      streetName: Joi.string().min(3).max(15).required(),
      maintenancePhone: Joi.array().items(Joi.object().keys({
      number_one:Joi.string().regex(/^[0-9]{9}$/).min(9).max(9).required(),
      number_tow:Joi.string().regex(/^[0-9]{9}$/).min(9).max(9)
      })).required(),
      // Weather_Schema:Joi.string().min(9).max(9).required(),
      power_Type:Joi.string().valid(['Solar_Energy','Electricity']).min(9).required(),

      }
      return cu_V(body, Schema);
      };


      async function n_D_V(req, res) {
      try {
      /* this is for check correct all data for ne*/
      const { error } = nV(req.body);
            
      if (error) {
      return res.status(400).json({ Error: error.details[0].message })

      }
      // function errors(Errors) {/* response custom errors */
      // if (error.details[0].message == Errors) {
      // return true;
      // // } else return false;
      // // }

      // await d_I_F_F_U(req)

      // // if (errors(`\"0\"${PHONE.NUMBER_LENGTH}`,))
      // return res.status(400).json({ "Error": `\"maintenancePhone[0]\"${PHONE.NUMBER_LENGTH}` })

      // if (errors(`\"1\"${PHONE.NUMBER_LENGTH}`,))
      // return res.status(400).json({ "Error": `\"maintenancePhone[1]\"${PHONE.NUMBER_LENGTH}` })

      // if (errors(`\"0\" ${PHONE.IS_STRING}`))
      // return res.status(400).json({ "Error": `\"maintenancePhone[0]\"${PHONE.IS_STRING}` })

      // if (errors(`\"1\" ${PHONE.IS_STRING}`))
      // return res.status(400).json({ "Error": `\"maintenancePhone[1]\"${PHONE.IS_STRING}` })

      // return res.status(400).json({ Error: error.details[0].message })

      // }

      // const ph_Val = ph_Va(res, req.body.maintenancePhone, false)
      // if (ph_Val) {
      // await d_I_F_F_U(req)
      // return ph_Val
      // }

      } catch (error) {
      MyLogger('Validation_Network', error.message)
      return res.status(401).json({ Error: error.message });
      }
      }


      module.exports.n_D_V = n_D_V

