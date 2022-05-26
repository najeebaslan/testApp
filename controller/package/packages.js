      const { mongoose, logger } = require('../../utils/utils')

      const ne = require("../../models/network");
      const packageModel = require("../../models/packages");
      require('express-async-errors');
      const { validationPackage } = require("../../models/packages");
      const { levelCheck } = require('../../utils/validation/level_val');
      const { checkAdd,changeLevel } = require("../../utils/find_utils");
      const { PACKAGE, NETWORK, USER } = require('../../utils/Error/utils_Errors');
      const { findNetwork ,MyLogger} = require('../../utils/find_utils')

      /*  <<<// Documentation names //>>>
      1-pac_Pr =package_Price
      2-Pac_Da = Package_Data
      3- de_Da = details Data
      4-pac_Ti= Package_Time 
      5-de_Ti = details_Time
      6-pac_Va =package_Validity
      7-de_Va =details_Validity
      8-ha_Pa = havePassword
      9-equalUAP
      10-is_Ac = is Active
      11-se_Co =services_Commission
      12-co_Us_Ty1 =commission_User_Type1
      13-co_Us_Ty2=commission_User_Type2
      14-net_Id= networkId
      15-us_In= user_initiate
      16- va=validity



      */
      class Package_Controller {
      async PostDetailsPackage(req, res) {

      try {

      const body = req.body;
      const { error } = validationPackage(body);
      if (error) {
    MyLogger('PostDetailsPackage', error.details[0].message)
    return res.status(404).json({ Error: error.details[0].message })
      }

      /* CHECK IF YOT ALREADY ADD Package */
      const findUser = await checkAdd(packageModel.findOne({
      net_Id: body.networkId,
      pac_Pr: body.package_Price
      }))
      if (findUser) {

      MyLogger("PostDetailsPackage",  PACKAGE.ALREADY_ADD);
      res.status(400).json({ "Error": PACKAGE.ALREADY_ADD, });
      return false;
      }

      /*CHECK LEVEL USER*/
      const level = levelCheck(res, body.user_initiate, 4,)
      if (!level[0]) {
      return level

      }
     
      const findN = await findNetwork(body.network_Id)
    

      if (findN[0] == true) {
      MyLogger("PostDetailsPackage," , NETWORK.NOTFOUND);
      return res.status(404).json({ "Error": NETWORK.NOTFOUND })
      }
      if (findN[1].us_In != body.user_initiate) {
      console.log(findN[1]+'findN[1].us_In');

      MyLogger("PostDetailsPackage", USER.NOT_HAVE_THIS_NETWORK);
      return res.status(404).json({ "Error": USER.NOT_HAVE_THIS_NETWORK })
      }
      const phoneExists = await packageModel.findOne({ pac_Pr: body.package_Price });
      console.log(phoneExists);
      if (phoneExists) {
      MyLogger("PostDetailsPackage", PACKAGE.EXIST_PACKAGE_DETAILS);
      res.status(400).json({ "Error": PACKAGE.EXIST_PACKAGE_DETAILS, });
      return false;
      }
      let package_details;
      const id = new mongoose.Types.ObjectId();

      if (body.have_Password == true) {

      if (body.equalUAP == null || body.equalUAP == undefined) {
      MyLogger("PostDetailsPackage", PACKAGE.EQUAL_UAP );
      return res.status(401).json({ "Error": PACKAGE.EQUAL_UAP })
      }

      package_details = {
      _id: id,
      pac_Pr: body.package_Price,
      Pac_Da: body.data,
      pac_Ti: body.time,
      pac_Va: body.package_Validity,
      ha_Pa: body.have_Password,
      equalUAP: body.equalUAP,/* this equalUAP =EqualUsernameAndPassword */
      de_Ti: req.body.details_Time,
      de_Va: req.body.details_Validity,
      de_Da: body.details_Data,
      net_Id: body.network_Id,
      us_In: body.user_initiate,

      };
      } else if (body.ha_Pa == false) {
      if (body.equalUAP != null || body.equalUAP != undefined) {
      MyLogger("PostDetailsPackage",PACKAGE.EQUAL_UAP_NOT_ALLOWED);

      return res.status(404).json({ "Error": PACKAGE.EQUAL_UAP_NOT_ALLOWED })
      }
      package_details = {
      _id: id,
      pac_Pr: body.package_Price,
      Pac_Da: body.data,
      pac_Ti: body.time,
      pac_Va: body.package_Validity,
      ha_Pa: body.have_Password,
      de_Ti: req.body.details_Time,
      de_Va: req.body.details_Validity,
      de_Da: body.details_Data,
      net_Id: body.network_Id,
      us_In: body.user_initiate,

      };
      }
      const net_Id = req.body.network_Id;
      const package2 = new packageModel(package_details,)
      const thisPackageId = package2._id;
      setPackageInNetwork(thisPackageId, net_Id);
      package2.save(function (err) {
      console.log(err);
      if (err) {
      MyLogger("PostDetailsPackage" , err.message);
      return res.status(404).json({"Error":err.message})
      };
      const Level=changeLevel(body.user_initiate,5)
      if(Level[0]==false){
          MyLogger("PostDetailsPackage", Level[1].message);
          return res.status(404).json({'Error':Level[1].message})
      }
      return res.status(200).send({ "id": id, })
      });
      } catch (error) {
      MyLogger("PostDetailsPackage",err.message);
      console.log(error.message);
      return res.status(400).json({"Error": error.message })
      }

      }


      async UpdatePackage(req, res) {
      const pac_Id = req.body.package_Price;
      try {
      const Package = await packageModel.findOneAndUpdate({ _id: pac_Id }, {
      Pac_Da: req.body.data,
      pac_Ti: req.body.time,
      pac_Va: req.body.package_Validity,
      }, { new: true });
      console.log(Package);
      if (!Package) {

       MyLogger("UpdatePackage", PACKAGE.NOT_ADD);
      return res.status(400).json({ "Error": PACKAGE.NOT_ADD });
      }
      return res.status(200).json([Package]);
      } catch (error) {
      MyLogger("savePackage2", error.message);
      console.log(error.message);
      return res.status(400).json({ "Error": error.message })
      }
      };

      async getPackage11(req, res) {
      const id = req.params;
      const elementId = req.body._id;
      try {
      const findPackage = await packageModel.
      findById(id, { info: { "$elemMatch": { _id: elementId } } },)
      if (!findPackage) {
      MyLogger("getPackage11", PACKAGE.NOTFOUND);
      return res.status(404).json({ 'Error': PACKAGE.NOTFOUND })
      };

      return res.status(200).json(findPackage);
      } catch (error) {
     MyLogger("getPackage11", error.message);
      console.log(error.message);
      return res.status(400).json({  "Error": error.message })
      }


      };

      async getPackage(req, res) {
      const net_Id = req.query.network_Id;
      try {
      const findPackage = await packageModel
      .find({ net_Id: net_Id })
      .populate({ path: "package_PriceId", select: "pac_Pr ne _id isAdd" })//🤨🤨🤨🤨🤨🤨🤨🤨

      if (!findPackage) {
      MyLogger("getPackage11" , PACKAGE.NOTFOUND);
      return res.status(404).json({ 'Error': PACKAGE.NOTFOUND })
      }
      return res.status(200).json(findPackage);
      } catch (error) {
      MyLogger("getPackage11" , error.message);
      console.log(error.message);
      return res.status(400).json({"Error": error.message })
      }
      };

      async getAllPackage(req, res) {
      try {
      const findPackage = await packageModel.find().populate('pac_Pr pac_Pr')
      if (!findPackage) {
      MyLogger("getPackage11", PACKAGE.NOTFOUND);
      return res.status(404).json({ 'Error': PACKAGE.NOTFOUND })
      }
      return res.status(200).json(findPackage);
      } catch (error) {
      MyLogger("getPackage11" , error.message);
      console.log(error.message);
      return res.status(400).json({ "Error": error.message })
      }
      }
      };

      async function setPackageInNetwork(pac_Id, net_Id) {
      await ne.findOneAndUpdate({ _id: net_Id }, {
      $addToSet: { pac: pac_Id, },
      }, { new: true, });
      };
      // async function setPackageInPackagePrice(pac_Id, packagePrices) {
      //   await pac_Pr.findByIdAndUpdate(packagePrices, {
      //     $addToSet: { pac: pac_Id, },
      //     new: true,
      //   });
      // };

      module.exports = new Package_Controller();

