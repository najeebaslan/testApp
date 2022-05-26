const { Joi } = require('../utils')
Joi.objectId = require('joi-objectid')(Joi)
const SchemaLog = {


      /* VALIDATION LOGGER */

      userId: Joi.objectId().required(),
      ip: Joi.string().min(7).max(22).required(),/* ip address */
      de_Ne: Joi.string().min(4).max(22).required(),/* device name */
      de_Mo: Joi.string().min(7).max(22).required(),/* device Model */
      ty_api: Joi.string().min(7).max(10).required(),/* type api {post - get - update - delete - put - patch}*/
      ty_st: Joi.string().min(7).max(40).required(),/* type status  {400 - 404 - 500 - 403}*/
      lat: Joi.string().min(7).max(40).required(),/* latitude */
      lon: Joi.string().min(7).max(40).required(),/* longitude */
      de: Joi.string().min(3).max(22).required(),/* description */

      we: Joi.array().items(Joi.object().keys({/* weather */
            cl: Joi.string().min(1).max(22).required(),/* cloud */
            te: Joi.string().min(1).max(22).required(),/* temperature */
            we_st: Joi.string().min(3).max(22).required(),/* weather status */
            pl: Joi.string().min(3).max(22).required(),/* place */
      })).required(),



};



module.exports = { SchemaLog, };