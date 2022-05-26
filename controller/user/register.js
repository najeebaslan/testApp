      const user = require("../../models/users");
      const roles_user = require("../../models/roles_User");
      const phoneNumber = require("../../models/phones");
      const async = require('async');
      const bcrypt = require('bcryptjs');
      const {operationLog}= require("../log");
      require('express-async-errors');
      const { Joi, ObjectId, mongoose, _, } = require('../../utils/utils')
      const { validationRegister,V_De_Us } = require("../../utils/validation/user_val");
      const { GOVERNORATE,NETWORK,USER,PHONE } = require('../../utils/Error/utils_Errors')
      const { De_In } = require('../../controller/devices/devices_info');
      const { De_St } = require('../../controller/devices/devices_status');
      const { checkAdd,MyLogger,Save_De_St } = require("../../utils/find_utils");
      const  {parse}  = require("../../controller/weathers/weather");


      /*<<<// Documentation For User //>>>
      1-pas =password
      2-use =  username
      3-is_Ac =  is Active
      4-op_Nu = operation number 
      5-de_st = devices status
      6-bu_Da = buying Date
      7-de_Id =device Id
      8-pac_Pr= Package price
      9-se_Nu = serial Number
      10-ca_Nu = Card Number
      11-pac_Id= package Id
      12-bu_Ar =Buying Area
      13-fr_Us = From User
      14-to_Us = To User
      15-ne= ne
      16 -em =email
      17- no = notice
      18- am =amount
      19-find_Nu_Ac = find Number Account     
      20- dev_St_Id = Devices Status Id
      21-  userId = User  Id
      22-De_St=Device status
      23-info_val = info validation
      24- st_val=status validation
      25- V_De_Us =Validation Details User 
      26-us_Ty= User Type
      27- de_In_Id=Device Info Id
      */

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


      */

      class REGISTER{
      async createUser(req, res,next) { 
      try {
       
      const body = req.body;
      const id = new mongoose.Types.ObjectId();
      const phone_Id = new mongoose.Types.ObjectId();
      const phone = req.body.phone;
      const em = req.body.email;
      const id_In = new mongoose.Types.ObjectId();
      let nu_Ac;
      
      /* VALIDATION REGISTER */
      const error = validationRegister(res, body);
      if (error) return error
      operationLog({
        userId:undefined, 
        ty_st:undefined,
        cl:'cl',
        te:'te',
        we_st:'we_st',
        pl:'pl',
       req:req,
    
        })
      /* find number account : This is to create an account number sequentially*/
      const find_Nu_Ac = await user.findOne({}, {}, { sort: { 'createdAt': -1 } },)
      if (find_Nu_Ac == null || find_Nu_Ac.nu_Ac == undefined || find_Nu_Ac.nu_Ac == null || find_Nu_Ac.nu_Ac == undefined) {
      nu_Ac = 1000000001;
      } else {
      nu_Ac = find_Nu_Ac.nu_Ac + 1;
      }

      /* check if phone number already exist or no  */
      const phoneExists = await phoneNumber.findOne({ phone: phone });
      if (phoneExists) {
      MyLogger('createUser',PHONE.ALREADY_EXIST)
      res.status(400).json({ "Error": PHONE.ALREADY_EXIST, });
      return false;
      }

      /* check if email already exist or no */
      const EmailExists = await user.findOne({ em: em });
      if (EmailExists) {
      res.status(400).json({ "Error": USER.EMAIL_EXIST, });
      MyLogger('createUser',USER.EMAIL_EXIST)
      return false;
      }

      /* THIS IS DATA USER */
      var dataUser = {
      "_id": id,
      "phoneId": phone_Id,
      "em": body.email,
      "pas": body.password,
      "use": body.username,
      'nu_Ac': nu_Ac,
      'roles_User':id,
      'de_In_Id':id_In,
      "timestamps": true
      };

      /* has password */
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      dataUser.pas = await bcrypt.hash(dataUser.pas, salt);

      const my_User = user(_.pick(dataUser, [
      '_id', 'phoneId','em','pas','use','nu_Ac','roles_User','de_In_Id',"timestamps"
      ]));


      /*THIS IS DATA ROLES USER */
      var roles_Data = {
      "_id": id,
      "userId": id,
      "level": 0,
      'language':body.language??'English',
      "timestamps": true,
      };

      let roles = new roles_user(_.pick(roles_Data, ['_id', 'userId', 'level','language',"timestamps",]))

      /*THIS IS DATA PHONE NUMBER  */
      var phoneNumbers = {
      "_id":my_User.phoneId,
      "phone": req.body.phone,
      "us_In": id,
      "is_Ac": true,
      "timestamps": true
      };
      
      const phoneNum = new phoneNumber(_.pick(phoneNumbers, ['_id','phone', 'us_In', 'is_Ac', 'timestamps',]))
      /*THIS IS FOR SAVE DEVICE INFO  */
      const de_In = De_In(my_User.de_In_Id,body, id,)

      /*THIS IS FOR SAVE DEVICE STATUS  */
      const de_St = De_St( body, id, de_In._id, )

      var all_Collection = [my_User, phoneNum, roles, de_In, de_St];/* this is each models  */
      
      /* THIS IS OPERATION LOG  */
      operationLog({
        userId:my_User._id, 
        ty_st:undefined,
        cl:'cl',
        te:'te',
        we_st:'we_st',
        pl:'pl',
       req:req,



      
        })
       /* THIS IS GENERATE_TOKEN  AND RESPONSE  */
        const token = roles.generateTokens()
        const pickDate = _.pick(my_User, [
        '_id', 'em', 'use', 'nu_Ac','de_In_Id',]);
        const result = {
        '_id': pickDate._id,
        'username':pickDate.use,
        'email': pickDate.em,
        'number_Account': pickDate.nu_Ac,
        'de_In_Id':pickDate.de_In_Id,
        }

      async.eachSeries(all_Collection, async function (collection, asyncDone) {/* this is save each series  كل سلسلة*/
      await collection.save(asyncDone);
      },

      function (err) {
      try {
      if (err) {
      MyLogger('createUser',err)      
      return res.status(400).json({ "Error": err.message });
      }
    
      return res.header('Authorization', 'Bearer ' + token).status(200).json(result)

      } catch (error) {
      console.log(error);


      return res.status(400).json({ "Error": error.message });
      }
      });
      } catch (error) {
      console.log(error);
      MyLogger('createUser',error.message)      
      return res.status(400).json({ "Error": error.message });
      }
      }  
      }


      module.exports = new REGISTER();
