
    const user = require("../../models/users");
    require('express-async-errors');
    const _ = require("lodash");/*input تعمل علا محاربة الهاكر من ناحية ال  */
    const moment = require('moment')
    const op_Nu = moment().format("hmmss");
    const {MyLogger } = require('../../utils/find_utils')
    const myRnId = () => parseInt(Math.random() * op_Nu);
    const { GOVERNORATE,NETWORK,USER,PHONE } = require('../../utils/Error/utils_Errors')

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
    class UserController {



    async getOneUser(req, res) {
    const id = req.params;
    try {
    const oneUser = await user.findById(id).populate({ path: 'phone', select: "phone -_id" });
    if (!oneUser) {
    MyLogger('getOneUser',USER.NOTFOUND)
    console.log(USER.NOTFOUND);
    return res.status(404).json({"Error":USER.NOTFOUND});
    }
    return res.status(200).json(oneUser);
    }
    catch (error) {
    MyLogger('getOneUser',error.message)
    console.log(error.message);
    return res.status(400).json({ "Error": error.message })
    }
    }




    async userAccount(req, res) {
    const data = req.body;
    try {
    const users = await user.countDocuments(data, function (err, count) {
    console.log('there are %d users', count); });
    if (!users) {
    MyLogger('userAccount',USER.NOTFOUND)
     return res.json({"Error":USER.NOTFOUND}); }
    return res.status(200).json({"count":users});
    } catch (error) {
    MyLogger('userAccount',error.message)
   console.log(error.message);
    return res.status(400).json({ "Error": error.message })
    }
    };




    async getUserProfile(req, res) {
    const id = req.params;
    try {
    const User = await user.findById(id).populate({ path: "userId" })
    if (!User) {
    MyLogger('getUserProfile',error.message)
   return res.status(404).json({"Error":USER.NOTFOUND});}
    else {
        user.aggregate([{ $match: { _id: User._id } },
    {
    $project: {
    inCome: { $sum: "$inCome.am" },
    outCome: { $sum: "$outCome.am" }}
    }, 
    { $addFields: { balance: { $add: ["$inCome", "$outCome"] } } }
    ]).exec((error, result) => {
    if (error) {
    MyLogger('getUserProfile',error.message)

    return res.status(500).json({ Error: error.message })
    } else {
    let profile = result[0] || { inCome: 0, outCome: 0 };
    const bls = profile.inCome;
    const mins = profile.outCome;
    const results = bls - mins;
    return res.status(200).json([{ "use": User.use, "_id": User._id, "balance": results, "nu_Ac": User.userId.nu_Ac,'exports':mins,"imports": bls}]);
    }})}
    } catch (error) {
    MyLogger('getUserProfile',error.message)
    console.log(error.message);
    return res.status(400).json({ "Error": error.message })
    }
    }
    }



    module.exports = new UserController();


    //..........  collback في ال  populate كود استخدام اكثر من  .........//

    // const opts = [{ path: 'data.[1].pac_Pr' ,
    // // select:"package_PriceId -_id",
    // populate:{path:'package_PriceId',
    // // select:"pac_Pr -_id"
    // }}];
    // const optsusers = [{ path: 'userId' ,
    // // select:"Village Governorate City -_id",
    // //  match: { Village: { $sum: 1 } }
    // }];

    // const promise = pac.populate(result, opts)
    // promise.then(data=>{
    // const promise1 = users.  populate(data,optsusers);
    // promise1.then(datas=>{}