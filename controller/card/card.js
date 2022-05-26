      const { vFC} = require('../../utils/validation/csv_val');
      const { cu_V} = require('../../utils/validation/custom_val');
      const { findN, fC, findBy, resDa } = require('../../controller/card/csv');
      const { mongoose, Joi } = require('../../utils/utils');
      const { findUser,MyLogger } = require('../../utils/find_utils')
      const userPro = require("../../models/users");
      const pac = require("../../models/packages");
      const modelCsv = require("../../models/csv");
      const card = require("../../models/cards");
      Joi.objectId = require('joi-objectid')(Joi)
      const _ = require("lodash");/*input تعمل علا محاربة الهاكر من ناحية ال  */
      require('express-async-errors');
      const { v_B_C,v_A_C} = require('../../utils/validation/card_val');
      const { GOVERNORATE,NETWORK,USER,PACKAGE,CARD,CSV } = require('../../utils/Error/utils_Errors')



      /*  <<<// Documentation //>>>

      1- existC = existCards  
      2- existD = exist Data Cards
      3- resultR = resultResponse
      4- resDa = response Data
      5- resultU = resultUsername
      6- resultP = resultPassword
      7- resultS = resultSerialNumber
      8- resP = response pas
      9- resU = response use
      10- resS = response se_Nu
      11- mRS = myResultSearch
      12- findN= find ne
      13- fC = find Cards
      14- getN = getNetwork
      15- vFC = validation Find Card
      16- v_B_C = validation  Buy Cards
      17- v_A_C = validation  Add Cards

      */

      class cards_controller {
      async buyCard(req, res, next) {
  
      try {
      const body = req.body;
      const pac_Id = req.body.package_Id;
      const net_Id = req.body.network_Id;
      const bu_Ar = req.body.buying_Area;
      const us_Bu = req.body.user_Buying;
      const no = req.body.notice;
      const statusData = req.body.status;

      let findTypeUser;
      const inEr = await v_B_C(res,body)/* check invalid Error */
        if (inEr) return inEr
      var getN = await findN(res, body)
       console.log(getN[0]);
      if (getN[0] == true) {
      MyLogger("buyCard",NETWORK.NOTFOUND);
     return res.status(404).json({ "Error": NETWORK.NOTFOUND })}
      const fP = getN[1].pac.filter(element => element._id==body.package_Id);
      if(fP[0]==null||fP[0]==undefined)
     { 
      MyLogger("buyCard",PACKAGE.NOTFOUND);
       return res.status(404).json({"Error":PACKAGE.NOTFOUND});}
      const profilePackage = await findUser(us_Bu);
      if (profilePackage[0] ==true||profilePackage[0]== null || profilePackage[0] == undefined) {
     {
      MyLogger("buyCard",USER.NOTFOUND);
      return res.status(400).json({ "Error": USER.NOTFOUND });}
      }
      const typeUser = profilePackage[1].us_Ty;
      const findType = await pac.findOne({ _id: pac_Id, },)
      if (!findType) {
      MyLogger("buyCard",CARD.NOTFOUND);
      res.status(400).json({ Error: CARD.NOTFOUND}); return false; }

      if (typeUser == 'Client') { findTypeUser = findType.co_Us_Ty1; }
      if (typeUser == 'network_Owner') { findTypeUser = findType.co_Us_Ty2; }
      const packageUser_initiate = findType.us_In;
      var resultOutCome = fP[0].pac_Pr - findTypeUser;
      const findCard = await modelCsv.findOneAndUpdate(
      { Is_new: true, pac_Pr: fP[0].pac_Pr, net_Id: net_Id, pac_Id: pac_Id },
      { Is_new: false, us_Bu: us_Bu, bu_Ar: bu_Ar, bu_Da: Date.now() })
      if (!findCard) {
         MyLogger("buyCard",CARD.N_F_C_P + fP[0].pac_Pr);
         return res.status(400).json({ Error: CARD.N_F_C_P + fP[0].pac_Pr });
         }
         /* NOT FOUND CARD AT THE MOMENT FOR THUS PACKAGE */

      userPro.aggregate([{ $match: { _id: profilePackage[1]._id } },
      {
      $project: {
      inCome: { $sum: "$inCome.am" },
      outCome: { $sum: "$outCome.am"},
      }
      }, { $addFields: { balance: { $add: ["$inCome", "$outCome"] } } }

      ]).exec((error, result) => {
      console.log(pac_Id)
      console.log(packageUser_initiate)

      let profile = result[0] || { inCome: 0, outCome: 0 };
      const bls = profile.inCome;
      const mins = profile.outCome;
      const results = bls - mins;
      // const result =   mins-bls;
      console.log(mins);
      console.log(bls);

      if (results <= resultOutCome || mins > bls) {
        MyLogger("buyCard",USER.YOUR_BALANCE_IS + results + USER.YOUR_BALANCE_NOT_ENOUGH);
      res.json({ Error:USER.YOUR_BALANCE_IS + results + USER.YOUR_BALANCE_NOT_ENOUGH }); return false;
      }
      else {
      if (error) {
        MyLogger("buyCard",error.message);
      res.status(500).json({ Error: error.message })
      return false;
      } else {
      console.log(packageUser_initiate);
      const use = findCard.use;
      const se_Nu = findCard.se_Nu;
      const pas = findCard.pas;

     
      //........شراء كرت
      if (statusData == 'buyCard') {
      addNewOutCome(no, resultOutCome, us_Bu, packageUser_initiate, statusData, use, se_Nu, pas, fP[0].pac_Pr, pac_Id);//....خصم الرصيد من حساب المرسل
      addNewInCome(no,resultOutCome, us_Bu, packageUser_initiate, statusData, fP[0].pac_Pr, pac_Id, bu_Ar)
      } 
       /* NAJEEB */
      const resultBuying = {"Balance":results, "use": findCard.use, "pas": findCard.pas??findCard.use, "se_Nu": findCard.se_Nu }
      res.status(200).json(resultBuying)

      }
      }
      })

      } catch (error) {
        MyLogger("buyCard",error.message);
      return res.status(404).json({ Error: error.message });
      }

      function rand(len) {
      var x = '';
      for (var i = 0; i < len; i++) { x += Math.floor(Math.random() * 10); }
      return x;
      }
      function rand2(len) {
      var x = '';
      for (var i = 0; i < len; i++) { x += Math.floor(Math.random() * 10); }
      return x;
      }


      const operation_numbers = Number(rand(6))
      const operation_numbers2 = Number(rand2(6))

      async function addNewOutCome(no, am, OutcomeId, toUser, status, ca_Nu, se_Nu, pas, pac_Pr, pac_Id,) {
      const newOutcome = {
      no: no, am: am,
      to_Us: toUser,
      status: status,
      bu_Da: Date.now(),
      ca_Nu: ca_Nu,
      se_Nu: se_Nu,
      pas: pas,
      pac_Pr: pac_Pr,
      pac_Id: pac_Id,
      op_Nu: operation_numbers2,
      };
      await new userPro.findOneAndUpdate({_id:OutcomeId}, {
      $addToSet: { outCome: newOutcome },
    
      },{  new: true,});
      }

      async function addNewInCome(no,am, fromUser, packageUser_initiate, status, pac_Pr, pac_Id, bu_Ar) {
      const newIncome = {
      no: no,
      am: am,
      fr_Us: fromUser,
      status: status,
      bu_Da: Date.now(),
      pac_Pr: pac_Pr,
      pac_Id: pac_Id,
      bu_Ar: bu_Ar,
      op_Nu: operation_numbers,
      };
      await userPro.findOneAndUpdate({_id:packageUser_initiate}, {
      $addToSet: { inCome: newIncome },
      },{  new: true,});
      }

      }



      async addCards(req, res) {
      const id = new mongoose.Types.ObjectId();
      try {
      const body = req.body;
      let typeSaveData;

      const inEr = await v_A_C(res,body)/* check invalidError */
      if (inEr) return inEr 

      var getN = await findN(res, body)
      if (getN[0] == true) {
        MyLogger("addCards",NETWORK.NOTFOUND);
        return res.status(404).json({ "Error": NETWORK.NOTFOUND})}
      //search in pac for  same Package id who received you from FrontEnd
      const greaterThanTen = getN[1].pac.filter(element => element._id == body.pac_Id);
      if (greaterThanTen[0] == null || greaterThanTen[0] == undefined)
{ 
  MyLogger("addCards",PACKAGE.NOTFOUND);
  
  return res.status(404).json({ "Error": PACKAGE.NOTFOUND})}
      var exist = await existD(res,greaterThanTen, body.network_Id, body.username, body.password, body.serial_Number)
      if (exist) return exist

      var pac_Pr = greaterThanTen[0].pac_Pr;
      var myRS = vFC(body, greaterThanTen, typeSaveData)
      if (!myRS) return myRS;
      var dataCard = {
      "usr": myRS.use,
      "pas": myRS.pas,
      "ser": myRS.se_Nu,
      "pac": body.package_Id,
      "net": body.network_Id,
      "pacP": pac_Pr,
      "Is_new": true,
      "isA": true,
      "timestamps": true,
      "_id": id,
      };
      let creatCard = new card(
      _.pick(dataCard, [
      '_id', 'use', 'pas', 'ser',
      'pac', 'net', 'Is_new',
      'pacP', "isA", "timestamps"
      ]))
      creatCard.save(function (err) {
      if (err) {   MyLogger("addCards",error.message);
      return res.status(404).json(err.message); }
      let result = _.pick(dataCard, ['use', 'pas', 'ser',]);
      result = {
      /* NAJEEB */
      use: result.use,
      pas: result.pas ?? result.use,/* i am do if value password equal null give it value username because maybe password and username equal or password equal false */
      se_Nu: result.se_Nu,
      }
      return res.status(200).json(result)
      })
      } catch (error) {
      console.log(error);
      MyLogger("addCards",error.message);
      return res.status(400).json({ "Error": error.message });
      }
      }



      async getAllCards(req, res) {
      try {
      const net_Id = req.query.network_Id;
      await  card.find({ net: net_Id }, function (error, result) {
      if (error) {
      MyLogger("getAllCards",error.message);
      return res.status(400).json({ "Error": error.message })
      }
      if (result[0] == null) {
      MyLogger("getAllCards",CARD.NOTFOUND);
      return res.status(400).json({ "Error": CARD.NOTFOUND })
      }
      return res.status(200).json(result)
      });
      } catch (error) {
      console.log(error);
      MyLogger("getAllCards",error.message);
      return res.status(401).json({ Error: error.message });
      }
      }
      }
      async function existD(res,greaterThanTen, net_Id, use, pas, se_Nu) {
      const resultU = await fC({ net_Id: net_Id, use: use })
      const resultP = await fC({ net_Id: net_Id, pas: pas })
      const resultS = await fC({ net_Id: net_Id, se_Nu: se_Nu })


      if (resultU[0]) {

      var resU = findBy(resultU,)/* this is response details */
      return resDa(res, resU, CARD.EXIST_CARD_USERNAME)/* this is custom response */
      } if(greaterThanTen[0].equalUAP != true && greaterThanTen[0].equalUAP != null||greaterThanTen[0].ha_Pa==false){
      if (resultP[0]) {
      var resP = findBy(resultP)
      MyLogger("existD",CARD.EXIST_CARD_USERNAME);
      return resDa(res, resP, CARD.EXIST_CARD_USERNAME)
      }}
      if (resultS[0]) {
      var resS = findBy(resultS,)
      MyLogger("existD",CARD.EXIST_CARD_SIR_NUMBER);
      
      return resDa(res, resS,  CARD.EXIST_CARD_SIR_NUMBER)
      }
      }
   
      module.exports = new cards_controller();

