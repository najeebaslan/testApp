
    const moment = require('moment')
    const op_Nu = moment().format("hmmss");
    const myRnId = () => parseInt(Math.random() * op_Nu);
    const userPro = require("../../models/users");
    const { Joi,} = require('../../utils/utils')
    const { findUser,MyLogger } = require('../../utils/find_utils')
    const { cu_V } = require('../../utils/validation/custom_val');
    Joi.objectId = require('joi-objectid')(Joi)
    const { GOVERNORATE,NETWORK,USER,PHONE,GLOBAL } = require('../../utils/Error/utils_Errors')

    /*  <<<// Documentation names //>>>
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

    */

    class sendBalance {

    async incomeBalanceSystemToUser(req, res) {
    try {
    const body = req.body;
    const fromUser = req.body.from_User;
    const toUser = req.body.to_User;
    const amounts = req.body.amount;
    const status = req.body.status;
    const newOutcome = { to_Us: toUser, am: amounts, status: status, op_Nu: myRnId() };
    const newIncome = { fr_Us: fromUser, am: amounts, status: status, op_Nu: myRnId() };
    const schema = {
    fr_Us: Joi.objectId().required(),
    to_Us: Joi.objectId().required(),
    am: Joi.number().integer().min(12).max(9999999999999999).required(),
    status: Joi.string().valid(['transfer', 'buyCard', 'commission']).min(9).required(),
    }

    const { error } = cu_V(body, schema);
    if (error) {
        MyLogger('incomeBalanceSystemToUser',USER.SAME_ID )
        return res.status(404).json({ 'Error': error.details[0].message })}
    if (body.fr_User == body.to_User) {
        MyLogger('incomeBalanceSystemToUser',USER.SAME_ID)
        return res.status(404).json({ "Error": USER.SAME_ID })}
    const result = await userPro.findOneAndUpdate({_Id:toUser}, {
    $addToSet: { inCome: newIncome },

    }, { new: true, });
    if (!result){ 
    MyLogger('incomeBalanceSystemToUser',USER.NOTFOUND )
    return res.status(400).json({ "Error":USER.NOTFOUND});
     }
    return res.status(200).json('تم الارسال بنجاح')

    } catch (error) {
    MyLogger('addNewInCome',error.message)
    
    console.log(error.message);
    return res.status(400).json({ "Error": error.message })
    }
    }




    async sendBalance(req, res) {
    const body = req.body;
    const fromUser = req.body.from_User;
    const toUser = req.body.to_User;
    const amounts = req.body.amount;
    const statute = req.body.status;
    const newOutcome = { to_Us: toUser, am: amounts, status: statute, bu_Da: Date.now(), op_Nu: myRnId() };
    const newIncome = { fr_Us: fromUser, am: amounts, status: statute, bu_Da: Date.now(), op_Nu: myRnId() };
    try {
    const schema = {
    fr_Us: Joi.objectId().required(),
    to_Us: Joi.objectId().required(),
    am: Joi.number().integer().min(12).max(9999999999999999).required(),
    status: Joi.string().valid(['transfer', 'buyCard', 'commission']).min(9).required(),


    }
    const { error } = cu_V(body, schema);
    if (error) {
   MyLogger('sendBalance', error.details[0].message )
    return res.status(404).json({ 'Error': error.details[0].message })}
    if (req.body.status != "transfer") {
   MyLogger('sendBalance',  USER.SELECT_TYPE_OPERATION  )
    return res.status(404).json({ "Error": USER.SELECT_TYPE_OPERATION + "{transfer}" })
    }

    const profilePackage = await userPro.findOne({ _id: fromUser })
    if (!profilePackage) {
   MyLogger('sendBalance',   USER.NOTFOUND  )
  return res.status(400).json({ "Error": USER.NOTFOUND })}
    const findToUser = await findUser({ _id: toUser })
    if (findToUser[0] ==true|| findToUser[0] ==null || findToUser[0] == undefined) return res.status(400).json({ "Error": 'not found this user' })
    userPro.aggregate([
    { $match: { _id: profilePackage._id } },
    {
    $project: {
    inCome: { $sum: "$inCome.am" },
    outCome: { $sum: "$outCome.am" }
    }
    },
    { $addFields: { balance: { $add: ["$inCome", "$outCome"] } } }
    ]).exec((error, result) => {
    let profile1 = result[0] || { inCome: 0, outCome: 0 };
    if (error) { res.status(500).json({ Error: error.message }) }
    const bls1 = profile1.inCome;
    const mins1 = profile1.outCome;
    let result1 = bls1 - mins1;
    console.log(bls1);
    console.log(mins1);
    if (mins1 > bls1) {
   MyLogger('sendBalance',   USER.YOUR_BALANCE_IS + result1 + USER.YOUR_BALANCE_NOT_ENOUGH )

    res.status(404).json({ "Error": USER.YOUR_BALANCE_IS + result1 + USER.YOUR_BALANCE_NOT_ENOUGH});
    return false;
    }
    else if (result1 < amounts || mins1 > bls1) {
   MyLogger('sendBalance',   USER.YOUR_BALANCE_IS + result1 + USER.YOUR_BALANCE_NOT_ENOUGH )

    res.status(404).json({ "Error":USER.YOUR_BALANCE_IS + result1 + USER.YOUR_BALANCE_NOT_ENOUGH });
    // res.json({ "Error":USER.YOUR_BALANCE_IS+ result1 + 'ريال غير كافي لاجراء هذه العملية ' });
    return false;
    }
    else
    SaveDataIncomeAndOutcome(res, fromUser, newOutcome, toUser, newIncome, amounts, profilePackage)
    })
    } catch (error) {
    MyLogger('sendBalance',error.message)
    console.log(error.message);
    return res.status(400).json({ "Error": error.message })
    }
    }

    }
    async function SaveDataIncomeAndOutcome(res, fromUser, newOutcome, toUser, newIncome, amounts, profilePackage,) {
    try {
    async function saveData(fromUser, newOutcome, toUser, newIncome) {
    const sendBalance = await userPro.findOneAndUpdate({_id:fromUser},
    { $addToSet: { outCome: newOutcome }, }, { new: true });
    if (!sendBalance) {
    MyLogger('SaveDataIncomeAndOutcome',GLOBAL.INVALID_DATA)

    res.status(401).json({ "Error": GLOBAL.INVALID_DATA });
    return false;
    }
    await userPro.findOneAndUpdate({_id:toUser}, { $addToSet: { inCome: newIncome }, }, { new: true }).
    then(data => {
    userPro.aggregate([
    { $match: { _id: profilePackage._id, } },
    {
    $project: {
    inCome: { $sum: "$inCome.am" },
    outCome: { $sum: "$outCome.am" },
    price: { $sum: "$outCome.pac_Pr" },
    outComes: {
    $filter: {
    input: '$outCome',
    as: 'item',/* الحصول علا اجمالي الحوالات الصادره */
    cond: { $and: [{ $eq: ['$$item.status', 'transfer'], },] },
    }
    },
    inComes: {
    $filter: {
    input: '$inCome',
    as: 'item',/* الحصول علا اجمالي  الحوالات الواردة */
    cond: { $and: [{ $eq: ['$$item.status', 'transfer'], },] },
    }
    },
    },
    },

    {
    $facet: {
    imports: [{ $project: { _id: 0, imports: { $sum: "$inComes.am" }, }, },],
    exports: [{ $project: { _id: 0, exports: { $sum: "$outComes.am" }, }, },],
    price: [{
    $project: {
    _id: 0, price: "$price",
    outCome: "$outCome",
    inCome: "$inCome",
    },
    },],
    },
    },
    { $unwind: "$price" },
    { $unwind: "$imports" },
    { $unwind: "$exports" },
    { $replaceRoot: { newRoot: { data: ["$price", "$exports", "$imports"], } } },
    ]).exec((error, result) => {
    const resultValidate = result[0] || { inCome: 0, outCome: 0, exports: 0, imports: 0 };
    if (error) { res.status(500).json({ Error: error }) }
    const bls2 = resultValidate.data[0].inCome;
    const mins2 = resultValidate.data[0].outCome;
    const exports = resultValidate.data[1].exports || 0;
    const imports = resultValidate.data[2].imports || 0;
    const resultData = bls2 - mins2 || 0;
    if (resultData < amounts || mins2 > bls2) {
    MyLogger('SaveDataIncomeAndOutcome',USER.YOUR_BALANCE_IS+ resultData +USER.YOUR_BALANCE_NOT_ENOUGH  )
    res.status(404).json({ 'Error': USER.YOUR_BALANCE_IS+ resultData +USER.YOUR_BALANCE_NOT_ENOUGH  });
   // res.json({ 'Error': ' رصيدك هو ' + resultData + 'ريال غير كافي لاجراء هذه العملية ' });
    return false;
    } else

    res.status(200).json({
    "Balance": resultData, "TheSales": mins2,
    "Purchases ": bls2, "Exports": exports, "Imports": imports
    })
    })
    }).catch(error => {
    MyLogger('SaveDataIncomeAndOutcome',error.message)
    console.log(error.message);
    return res.status(400).json({ "Error": error.message })
    })
    }
    saveData(fromUser, newOutcome, toUser, newIncome)
    }
    catch (error) {
    MyLogger('SaveDataIncomeAndOutcome',error.message)
    console.log(error.message);
    return res.status(400).json({ "Error": error.message })
    }
    }
    module.exports = new sendBalance();
    module.exports.SaveDataIncomeAndOutcome = SaveDataIncomeAndOutcome;