const logM = require('../models/Log')
const  logger  = require('../config/logger')


/*  <<<// Documentation log_Operation >>>
1- userId = User Profile Id
2- da_Ad = Date Add
3- de_St = Device Status
4- ip = ip address
5- de_Na device name 
6- de_Mo =device Model
7- ty_Api=type api
8- ty_st= type status
9-we =weather
10-cl=cloud 
11- te=Temperature
12-pl-place
13-de =description Operation
14-de_Ne = device name 
15- me=method


*/

async function operationLog({
  userId:userId, 
   ty_st:ty_st,
   cl:cl,
   te:te,
   we_st:we_st,
   pl:pl,
  req:req,
  
  }) {
  try {
  
    const log_Operation = new logM({
      userId: userId,
      ip:req.body.ip_Address??'',/* this is ip inside bod  */
      de_Ne:req.body.devices_Name??'',
      de_Mo:req.body.model??'',
      ty_st:ty_st,/* type status  {400 - 404 - 500 - 403}*/
      we:{/* weather */
      cl:cl,/* Clouds */
      te:te,/*  Temperature*/
      we_st:we_st,/* weather status { a clear sky- Rainy - clouds and rain} */
      pl:pl/* place */
      },

     /* THIS IS DETAILS REQUEST  */
      host:req.headers.host,
      sec_ch_ua_platform:req.headers.sec_ch_ua_platform,
      sec_ch_ua:req.headers.sec_ch_ua,
      sec_ch_ua_mobile:req.headers.sec_ch_ua_mobile,
      user_agent:req.headers.user_agent|undefined,
      url:req.url,
      method:req.method,/* type api {post - get - update - delete - put - patch}*/
      query:req.query,
      ip_Re:req.ip,/* this is ip from  Request */
    })
     await log_Operation.save(function (err) {
      if (err) {
        console.log(err);
        logger.error('Save_log_Operation', err.message)
        // return res.status(404).json({ "Error": err.message })
      }
    })


  } catch (error) {
    console.log(error);

    logger.error('Save_log_Operation',+ error.message)
    // return res.status(404).json({ "Error": error.message })

  }
}


module.exports.operationLog = operationLog;