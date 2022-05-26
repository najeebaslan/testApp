const {jwt,logger}=require('../utils/utils')
const {AUTH} = require('../utils/Error/utils_Errors')
const URL = require('../config/db_config.json')


module.exports = function (req, res, next) {
  if (req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  } try {
    if (token == undefined) {
      logger.error('Auth==>'+AUTH.INVALID)
      res.status(401).json({ Error: AUTH.INVALID})
      return false;
    } else
    if (!token){
    logger.error('Auth==>'+AUTH.INVALID)
    return res.status(401).json({ Error: AUTH.INVALID})}/* status 401 means  Unauthorized */
    const decodeToken = jwt.verify(token, URL.privateKey);
    req.user = decodeToken;
    
    next();
  } catch (error) {
    logger.error('Auth==>'+error)
    return res.status(400).json({ 'Error': AUTH.WRONG })/* status 400 means bad request */
  }
}

