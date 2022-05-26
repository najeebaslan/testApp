      const { cu_V } = require('./custom_val');
      const { Joi } = require('../utils')
      Joi.objectId = require('joi-objectid')(Joi)
      const { MyLogger } = require('../find_utils');
      const {SchemaStatus,SchemaInfo} = require('./schema_devices');

      /*  <<<// Documentation names //>>>

      1- cu_V =Custom validation
      2- V_De_Us= Validation Details User

      */

      const V_De_Us = (res, body) => {
      const Schema = {
      age: Joi.number().integer().min(12).max(100).required(),
      user_Type: Joi.string().valid(['network_Owner', 'network_Engineer', 'Client']).min(9).required(),
      sex: Joi.string().valid(['Custom', 'Female', 'Male']).min(3).required(),
      streetName: Joi.string().min(3).max(15).required(),
      governorateId: Joi.objectId().required(),
      cityName: Joi.string().min(3).max(15).required(),
      userId: Joi.objectId().required(),
      };
      
      const { error } = cu_V(body, {...Schema,...SchemaStatus});
      if (error) { 
      MyLogger(' Validation Details User', error.details[0].message) 
      return res.status(404).json({ 'Error': error.details[0].message })}
      };







      function validationRegister(res, body) {
      const Schema = {
      /* VALIDATION DATA REGISTER */
      username: Joi.string().min(3).max(35).required(),
      email: Joi.string().regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).min(6).max(255).required().email(),
      password: Joi.string().min(8).max(1024).required(),// وضعته 1024 لسبب التشفير
      phone: Joi.string().regex(/^[0-9]{9}$/).min(9).max(9).required(),
      language:Joi.string().valid(['English', 'Arabic']).min(9).required(),
      lat: Joi.string().min(3).max(20).required(),// وضعته 1024 لسبب التشفير
      lon: Joi.string().min(3).max(20).required(),
      
      };
      const { error } = cu_V(body, {...Schema,...SchemaStatus,...SchemaInfo});/* this is for join tow objects */
      if (error) {
            console.log(error);
      MyLogger('validationRegister', error.details[0].message)
      return res.status(404).json({ 'Error': error.details[0].message })
      }

      // const ph_Val = ph_Va(res, body.phone, true)
      // if (ph_Val) return ph_Val
      };


      function validationLogin(res, body) {
            const Schema = {
            /* VALIDATION DATA LOGIN */
            email: Joi.string().min(6).max(255).required().email(),
            password: Joi.string().min(8).max(255).required(),
            };
            const { error } = cu_V(body, {...Schema,...SchemaStatus,...SchemaInfo});/* this is for join tow objects */
            if (error) {
            MyLogger('validationLogin', error.details[0].message)
            return res.status(404).json({ 'Error': error.details[0].message })
            }
            };

      module.exports = { validationRegister, V_De_Us,validationLogin }