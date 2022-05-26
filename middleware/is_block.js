const { logger } = require("../utils/utils");
const {IS_BLOCK} = require('../utils/Error/utils_Errors')
     
     module.exports= function (req,res,next) {
      if (req.user.isBlock) {
      console.log(req.user.isBlock);
      logger.error('isBlock==>'+IS_BLOCK.IS_BLOCK)
      res.status(403).json({ 'Error': IS_BLOCK.IS_BLOCK });/* status 403 means forbidden */
      return;}
      next();
      }