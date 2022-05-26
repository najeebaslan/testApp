      const level_M = require('../models/roles_User')/* level Model */
      const { MyLogger } = require('../utils/find_utils')
      const {  USER } = require('../utils/Error/utils_Errors')

      function logout(res, userId,) {

      try {

      const logout = await level_M.findOneAndUpdate({ _id: userId },
      { $max: { level: 0 } },
      { new: true }, function (err) {
      if (err) {
      MyLogger('logout', err.message)
      return res.status(404).json({ "Error": err.message })
      }
      })

      if (logout) {
      return res.status(200).json({ "status": true })
      } else {
      MyLogger('logout', USER.NOTFOUND)
      return res.status(404).json({ "Error": USER.NOTFOUND })
      }

      } catch (error) {
      console.log(error);
      MyLogger('logout', error.message)
      return res.status(404).json({ "Error": error.message })
      }

      }
      module.exports.logout = logout;


