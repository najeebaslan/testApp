const { Joi } = require('../utils')
Joi.objectId = require('joi-objectid')(Joi)
const { cu_V } = require('./custom_val');
const { MyLogger ,} = require('../find_utils');


/*  <<<// Documentation names //>>>
1-use = username
2-pas=password
3-se_Nu=serialNu
4-is_Ac=isActive
5-net_Id=networkId
6-pac_Id=packageId
7-pac_Pr=package price
8- v_B_C =  Validation  Buy Cards  
9-v_A_C = Validation  Add Cards  
10-
11-
12-
13-
14-
15-

      
      
*/

function v_B_C(res, body) {
      const Schema = {/* this is validation cards request  */
            packageId: Joi.objectId().required(),
            user_Buying: Joi.objectId().required(),
            network_Id: Joi.objectId().required(),
            status: Joi.string().valid(['buyCard',]).min(3).max(44).required(),
            notice: Joi.string().min(3).max(100).required(),
            buying_Area: Joi.string().min(3).max(44).required(),
      }

      const { error } = cu_V(body, Schema);
      if (error) {
            MyLogger(' Validation Buy Cards ', error.details[0].message)
            return res.status(400).json({ Error: error.details[0].message })
      }


}
function v_A_C(res, body) {
      const Schema = {
            username: Joi.string().min(5).max(44).required(),
            password: Joi.string().min(5).max(44).required(),
            serial_Number: Joi.string().min(3).max(44).required(),
            package_Id: Joi.objectId().required(),
            network_Id: Joi.objectId().required(),
      }
      const { error } = cu_V(body, Schema);
      if (error) {
            MyLogger(' Validation  Add Cards ', error.details[0].message)

            return res.status(400).json({ Error: error.details[0].message })
      }
}
module.exports.v_B_C = v_B_C
module.exports.v_A_C = v_A_C
