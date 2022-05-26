      const { Joi } = require('../utils')
      Joi.objectId = require('joi-objectid')(Joi)
      const SchemaStatus= {
    /*<======== THIS IS INFORMATION IS VARIABLE =======>*/


      /* VALIDATION BATTERY */
      level: Joi.string().min(1).max(22).required(),
      status: Joi.string().min(1).max(22).required(),
      temperature: Joi.string().min(1).max(22).required(),
      capacity: Joi.string().min(1).max(22).required(),
      /* VALIDATION NETWORK */
      ip_Address: Joi.string().min(1).max(22).required(),
      gateway: Joi.string().min(1).max(22).required(),
      interface: Joi.string().min(1).max(22).required(),
      dbm: Joi.string().min(1).max(22).required(),
      /* VALIDATION APPS */
      Apps: Joi.array().items(Joi.object().keys({
      Apps_Name: Joi.string().min(1).max(22).required(),
      version: Joi.string().min(1).max(22).required(),
      installing_Date: Joi.string().min(1).max(22).required(),
      })).required(),
      /* VALIDATION MEMORY */
      ram: Joi.string().min(1).max(22).required(),
      system_Storage: Joi.string().min(1).max(22).required(),
      external_Storage: Joi.string().min(1).max(22).required(),
      external_Storage: Joi.string().min(1).max(22).required(),

      };
      
      const SchemaInfo= {
    /*<======== THIS IS INFORMATION IS STATIC =======>*/



      /*VALIDATION DEVICE INFO  */
      devices_Name: Joi.string().min(1).max(22).required(),
      model: Joi.string().min(1).max(22).required(),
      Manufacturer: Joi.string().min(1).max(22).required(),
      Device_Id: Joi.string().min(1).max(22).required(),
      mac_Address: Joi.string().min(1).max(22).required(),
      releasedBase: Joi.string().min(1).max(22).required(),
      }

      module.exports={SchemaStatus,SchemaInfo} ;