const { unlink } = require('fs').promises
const { MyLogger } = require('./find_utils');

  /* 1-  d_I_F_F_U = delete Image From File Uploads */

async function d_I_F_F_U(req) {
  try {
   return await unlink(`./public/uploads/${req.file.filename}`)
  } catch (error) {
    console.error('there was an error:', error.message);
    
    MyLogger('delete Image From File Uploads', error.message)
    return ;
  }
}

module.exports.d_I_F_F_U = d_I_F_F_U;
