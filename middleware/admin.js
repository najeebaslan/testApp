const {logger}=require('../utils/utils')
const {IS_ADMIN} = require('../utils/Error/utils_Errors')
     
     module.exports= function (req,res,next) {
      if (!req.user.isAdmin||!req.user) {
      logger.error('isAdmin==>'+IS_ADMIN.NOT_ADMIN)
      res.status(401).json({ 'Error':IS_ADMIN.NOT_ADMIN});
      return;}

      next();

      }
