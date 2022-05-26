      const level_M = require('../../models/roles_User')/* level Model */
      const { d_I_F_F_U } = require('../../utils/delete_pathFiles')
      const { MyLogger } = require('../find_utils');
      const { GOVERNORATE,NETWORK,USER,PHONE,GLOBAL,BLOCK, LEVEL } = require('../../utils/Error/utils_Errors')

      /*  <<<// Documentation names //>>>

      1- lev = Level 
      2- cu_V =Custom validation
      3- V_De_Us= Validation Details User


      */

      /*  <<<// Documentation check Details //>>>

      1- 0 = Register  User
      2- 1 =Post Details User
      3- 2= Create network
      4- 3 =Post Coverage Area ne
      5- 4=Post Package 
      6- 5= Post Commission 
      7- 6= Post CSV Card 

      l
      */
      async function levelCheck (res, userId, level,)  {
     

      try {
      let Err;
      const lev = await level_M.findOne({ userId: userId }).select('level , isAdmin , is_Ac , isBlock')
            if (lev) {
              console.log(level);

              if(level==lev.level){
                console.log(lev.level);
              }
              // console.log(lev.level);
        if(lev.isBlock==true){/* check if user is block */
          Err=BLOCK.IS_BLOCK
          MyLogger('levelCheck', Err)
         return res.status(400).json({ "Error": Err })
       }  

      if (lev.level == level) {

        return [true, lev]
      } else {

      if (lev.level == 0) {
      Err = LEVEL.FIRST_REGISTER
      MyLogger('Find_Level_User', Err)
      return res.status(400).json({ "Error": Err })
      } if (lev.level == 1) {

      Err = LEVEL.FIRST_DETAILS_USER
      MyLogger('Find_Level_User', Err)
      return res.status(400).json({ "Error": Err })
      } if (lev.level == 2) {
       console.log(Err);
      Err =LEVEL.FIRST_NETWORK
      MyLogger('Find_Level_User', Err)

      return res.status(400).json({ "Error": Err })
      } if (lev.level == 3) {

      Err =  LEVEL.FIRST_COVERAGE_AREA
      MyLogger('Find_Level_User', Err)
      return res.status(400).json({ "Error": Err })
      } if (lev.level == 4) {

      Err = LEVEL.FIRST_PACKAGE
      MyLogger('Find_Level_User', Err)
      return res.status(400).json({ "Error": Err })
      } if (lev.level == 5) {

      Err = LEVEL.FIRST_COMMISSION
      MyLogger('Find_Level_User', Err)
      return res.status(400).json({ "Error": Err })
      } if (lev.level == 6) {

      Err = LEVEL.FIRST_CSV
      MyLogger('Find_Level_User', Err)
      return res.status(400).json({ "Error": Err })
      }
      }
      } else {
      MyLogger('Find_Level_User', USER.NOTFOUND)
      return res.status(400).json({ "Error":USER.NOTFOUND })}
      return;
      } catch (error) {
      console.log(error);
      MyLogger('Find_Level_User', error.message)
      return res.status(404).json({ "Error": error.message })

      }
      }
      module.exports.levelCheck = levelCheck;


