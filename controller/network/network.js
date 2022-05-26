    require('express-async-errors');
    const ne = require("../../models/network");
    const PhoneModel = require("../../models/phones");
    const locationM = require('../../models/location');
    const { n_D_V } = require('../../utils/validation/network_val');
    const user = require("../../models/users");
    const { d_I_F_F_U } = require('../../utils/delete_pathFiles')
    const { GOVERNORATE,NETWORK,USER } = require('../../utils/Error/utils_Errors')
    const { Joi, ObjectId, mongoose, } = require('../../utils/utils')
    const { SetStreet } = require('../location/location');//lo Controller
    const { findUser,MyLogger,changeLevel,checkAdd } = require('../../utils/find_utils')
    const { levelCheck, } = require('../../utils/validation/level_val');

    /*  <<<// Documentation names //>>>

    1- nV = ne Validation
    2- ph_Va =Phone Validation 
    3- n_D_V = ne Data Validation  

    */
    /*  <<<// Documentation names //>>>
    1-na_A= name Arabic
    2-na_E= name English
    3-name=allCoverage_Area
    4-ph=phones
    5-us_In=user_initiate
    6-ad=address
    7-pac=packages
    8-is_Ac=isActive
    9-lo=location
    10-go_Id=governorateId
    11-ci_Id=cityId
    12-st_Id=streetId
    13- nV = ne Validation
    14- ph_Va =Phone Validation 
    15-n_D_V = ne Data Validation  

    */

    class network_Controller {

    async getNetwork(req, res) {
    try {
        
    await ne.find(
    function (error, data) {

    if (error) {
    MyLogger("PostDetailsPackage=",  error.message);
    return res.status(404).json({ Error: error.message })
    }

    return res.json(data);
    })
    .populate('coverage_area pac name')
    .populate({ path: 'name', select: "name -_id" })
    .populate({ path: 'coverage_area', select: "-networks -_id -createdAt -updatedAt -updatedAt -is_Ac -us_In -__v" })
    .populate({
    path: 'pac ', populate: {
    path: 'package_PriceId',
    select: "pac_Pr -_id"
    },//🤨🤨🤨🤨🤨🤨🤨🤨
    populate: { path: 'package_PriceId', select: 'pac_Pr -_id', },//🤨🤨🤨🤨🤨🤨🤨🤨
    select: 'pac_Pr -_id',
    })
    } catch (error) {
        MyLogger("getNetwork", error.message);
        return res.status(404).json({ Error: error.message })
    }

    }




    async getNetworkById(req, res) {
    const id = req.params;
    try {
    const oneNetwork = await ne.findById(id).
    select('-pac ')
    // .populate( { path: "pac", select: "info -_id" })
    // populate('pac','info._id')
    // .populate('us_In', 'name -_id')
    .populate({ path: "name", select: "name -_id" })
    // .select('name name')
    .populate('coverage_area', '-name -networks-_id -ad -us_In -createdAt -updatedAt -__v');
    if (!oneNetwork) {
    MyLogger("getNetworkById", NETWORK.NOTFOUND);

    console.log(NETWORK.NOTFOUND + id);
    return res.status(404).json({"Error":NETWORK.NOTFOUND});
    }
    const result = {
    _id: id,
    img: oneNetwork.img,
    na_A: oneNetwork.na_A,
    };
    return res.status(200).json([oneNetwork]);
    } catch (error) {
    MyLogger("getNetworkById",  error.message);
    console.log(error.message);
    return res.status(404).json({ Error: error.message })
    }
    }





    async getNetworkByName(req, res) {
    const searchData = req.params.na_A;
    console.log(searchData);
    try {
    await ne.find({ na_A: { $regex: searchData }, is_Ac: true, },
    function (err, data) {
    if (err) {
    MyLogger("getNetworkByName",  error.message);
    return res.status(404).json({ Error: err.message });
     }
    if (data[0] == null) {
    MyLogger("getNetworkByName",  NETWORK.NO_NETWORK_BY_NAME + searchData);
    console.log("oneNetwork not found ! " + searchData);
    return res.status(404).json({ Error: NETWORK.NO_NETWORK_BY_NAME + searchData });
    }
    return res.status(200).json(data);
    }).select("-pac -coverage_area -name -ph -us_In -createdAt -updatedAt");
    } catch (error) {
    MyLogger("getNetworkByName", error.message);
    console.log(error.message);
    return res.status(404).json({ Error: error.message })
    }
    }






    async NetworksCount(req, res) {

    try {

    const network1 = await ne.countDocuments({},
    function (err, count) {
    if (err) return res.status(401).json({ "Error": err.message })
    return count
    });
    if (!network1) {
    MyLogger("NetworksCount", NETWORK.NOTFOUND);
    return res.status(404).json({"Error":NETWORK.NOTFOUND});
     }
    return res.status(200).json({ "networks": network1 });
    } catch (error) {
    MyLogger("NetworksCount", error.message);
    console.log(error.message);
    return res.status(404).json({ Error: error.message })
    }
    }
    }





    async function CreateNetwork(req, res) {
    try {
    const id = new mongoose.Types.ObjectId();
    const idPone = new mongoose.Types.ObjectId();
    const idS = new mongoose.Types.ObjectId();
    const idC = new mongoose.Types.ObjectId();
    const body = req.body;
    
    const error = await n_D_V(req, res)
    if (error) return error
    const errorUser = await findUser(body.user_Initiate)
    if (errorUser[0] == null || errorUser[0] == undefined || errorUser[0] == true) {
    await   d_I_F_F_U(req)
    MyLogger("CreateNetwork",USER.NOTFOUND);
    return res.status(400).json({ "Error": USER.NOTFOUND});
    }

     /* CHECK IF YOT ALREADY ADD Network */
     const hasN = await checkAdd(user.findOne({ _id: body.user_Initiate }))
     console.log(hasN);
    
     if (hasN.ne != null) {
    MyLogger("CreateNetwork",NETWORK.HAVENETWORK);
     return res.status(400).json({ "Error":NETWORK.HAVENETWORK })
     }

//     /*CHECK LEVEL USER*/
    const level= await levelCheck(res, body.user_Initiate, 1)
    
   if(!level[0]){
    await   d_I_F_F_U(req)
    return level
 
   }

    let idCity, idStreet;
    const findGovernorate = await locationM.findOne({ _id: ObjectId(body.governorateId) })//Find Governorate By Id
    if (!findGovernorate) {
    await   d_I_F_F_U(req)
    MyLogger("CreateNetwork",GOVERNORATE.NOTFOUND);

    res.status(401).json({ "Error": GOVERNORATE.NOTFOUND })
    return false;
    } else if (findGovernorate) {
   /* CHECK IF YOUR ALREADY ADD DETAILS USER */
    const findUser = await checkAdd(user.findOne({ _id: body.user_Initiate }))
    if (!findUser) {
    MyLogger("CreateNetwork",USER.NOTFOUND);
    res.status(400).json({ "Error":USER.NOTFOUND, });
    return false;
    }
    // if(findUser.us_Ty||findUser.sex){/* this is check if you already add data return this data */
    // return res.status(200).json({ "user_Type": findUser.us_Ty, });
    // }
    const findSameDetailsNetwork = await ne.find({
    na_A: body.name_A, "lo.go_Id": body.governorateId,
    }).populate({
    path: 'location',
    populate: { path: 'go_Id', model: 'location' },
    }).select('go_Id')
    if (findSameDetailsNetwork[0]) {
    /* this for search name city  in database if find same name which sended it user return error */
    const findCity = findSameDetailsNetwork[0].lo.go_Id.cities.filter(element => element.name == body.cityName);
    /* this for search name street  in database if find same name Which sended it user return error */
    if (findCity[0]) {
    const findStreet = findCity[0].streets.filter(element => element.name == body.streetName);
    if (findStreet != null || findStreet != undefined) {
    await   d_I_F_F_U(req)
    MyLogger("CreateNetwork",NETWORK.EXIST_NETWORK_DETAILS);
    return res.status(404).json({ "Error": NETWORK.EXIST_NETWORK_DETAILS })
    }

    }
    }
    const city = await locationM.aggregate([//Find City By Id Governorate
    { $match: { "_id": ObjectId(body.governorateId) } },
    {
    $project: {
    list: {
    $filter: {
    input: '$cities', as: 'item',
    cond: {
    $and: [{
    $eq: ['$$item.name', body.cityName.trim()]
    }]
    }
    }
    }
    }
    },
    { $unwind: "$list" },
    { $match: { "list.name": body.cityName.trim() } },
    { $project: { cities: "$list" } },

    ]).exec()
    if (city[0] == undefined) {// This for check if city is not exist do set city 
    idStreet = idS;
    idCity = idC;
    await locationM.findOneAndUpdate({_id:body.governorateId},
    { $push: { cities: { _id: idCity, name: body.cityName.trim() }, } })
    .then(data => {
    SetStreet(res, body.streetName, body.cityName, idStreet, body.governorateId)
    saveNetwork(id, idPone, req, res, body.governorateId, idCity, idStreet,)
    });

    } else { //This for check if street is not exist do set street  
    idCity = city[0].cities._id;
    const street = await locationM.aggregate([[
    { $unwind: "$cities" },
    { $match: { "cities._id": ObjectId(city[0].cities._id) } },
    {
    $project: {
    list: {
    $filter: {
    input: '$cities.streets', as: 'item',
    cond: {
    $and: [{
    $eq: ['$$item.name', body.streetName.trim()]
    }]
    }
    }
    }
    }
    },
    { $unwind: "$list" },
    { $replaceRoot: { newRoot: '$list', } },
    { $match: { "name": body.streetName.trim() } },
    ]]).exec()
    console.log(street[0]);

    if (street[0] == undefined) {

    SetStreet(res, body.streetName, body.cityName, idS, body.governorateId)
    saveNetwork(id, idPone, req, res, body.governorateId, idCity, idS,)

    } else {
    saveNetwork(id, idPone, req, res, body.governorateId, idCity, street[0]._id,)
    }
    }
    }

    } catch (error) {
    await   d_I_F_F_U(req)
    MyLogger("CreateNetwork", error.message);
    console.log(error.message);
     return res.status(404).json({ Error: error.message })
    }

    }




    async function setIdNetworkInUserProfile(networksId, userId,) {
   return await user.findOneAndUpdate({_id:userId}, { $set: { ne: networksId, isAdmin: true }, }, { new: true, });
    };

    async function saveNetwork(id, idPone, req, res, go_Id, ci_Id, st_Id,) {try {
    const network1 = new ne({
        _id: id,
        na_A: req.body.name_A,
        na_E: req.body.name_E,
        img: req.file.filename,
        // img: `http://172.16.0.8:3000/${req.file.path}`,
        us_In: req.body.user_Initiate,
        ph: id,
        lo: {
        go_Id: go_Id,
        ci_Id: ci_Id,
        st_Id: st_Id,
        po_Ty:req.body.power_Type,
        // we_Id:weatherId,
        }
        });
         network1.save(function (err) {
        if (err) {
        MyLogger("CreateNetwork", err.message);
        return res.status(404).json(err.message)};
        var newArr = JSON.parse('' + [req.body.maintenancePhone].join() + '');
        let phoneNumber;
        if(newArr[0]||newArr){
        if(!newArr[0].number_tow){
        phoneNumber=newArr[0].number_one
        }else{
        phoneNumber =[ newArr[0].number_one, newArr[0].number_tow,];
        }

        }
        const Phone = PhoneModel(
        {
        _id: `${idPone}`,
        phone:phoneNumber,
        ne_In: id,/* this is for create phone for ne by id ne */
        });
        Phone.save(function (err) {
        setIdNetworkInUserProfile(network1._id, req.body.user_Initiate)
       
        if (err) { console.log(error.message);  
        MyLogger("saveNetwork", err.message);
        return res.status(404).json({Error:err.message});
        }
        const Level=changeLevel(req.body.user_Initiate,2)
        if(Level[0]==false){
            MyLogger("CreateNetwork", Level[1].message);
            return res.status(404).json({Error:Level[1].message})
        }
        return res.status(200).json({ "id": id, })}

        );})
        
    } catch (error) {
        MyLogger("saveNetwork", error.message);
        console.log(error.message);
        return res.status(404).json({ Error: error.message }) 
    }}

    module.exports = new network_Controller();
    module.exports.CreateNetwork = CreateNetwork;
