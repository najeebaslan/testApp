    const pac = require('../../models/packages');
    const { Joi } = require('../../utils/utils');
    const { findNetwork, MyLogger } = require('../../utils/find_utils');
    const { cu_V, } = require('../../utils/validation/custom_val');
    Joi.objectId = require('joi-objectid')(Joi)
    const { GOVERNORATE, NETWORK, USER, PACKAGE } = require('../../utils/Error/utils_Errors')



    /*  <<<// Documentation names //>>>
    1-pac_Pr =package Price
    2-Pac_Da = Package data
    3- de_Da = details data
    4-pac_Ti= Package_time 
    5-de_Ti = details_time
    6-pac_Va =package_validity
    7-de_Va =details_validity
    8-ha_Pa = havePassword
    9-equalUAP
    10-is_Ac = is Active
    11-se_Co =services_Commission
    12-co_Us_Ty1 =commission_User_Type1
    13-co_Us_Ty2=commission_User_Type2
    14-net_Id= networkId
    15-us_In= user_initiate
    16-va=validity
    17-pI = pac_Id
    18-com = commission
    19-cUT1 = co_Us_Ty1
    20-cUT2 = co_Us_Ty2
    21-sC = se_Co=> الن
    22-fP = findPackage



    */
    class Package_Commission {
    async createCommission(req, res) {
    try {

    const body = req.body
    const sC = 10;/* this default Commission for owner system */
    const schema = {
    net_Id: Joi.objectId().required(),
    pac_Id: Joi.objectId().required(),
    commissionType1: Joi.number().integer().min(10).max(3000).required(),
    commissionType2: Joi.number().integer().min(10).max(3000).required(),
    }

    const { error } = cu_V(body, schema);
    if (error) {
    MyLogger("createCommission", error.details[0].message);
    return res.status(404).json({ "Error": error.details[0].message })
    }
    const findN = await findNetwork(body.network_Id)
    if (findN[0] == true) {
    MyLogger("createCommission" , NETWORK.NOTFOUND);

    return res.status(404).json({ "Error": NETWORK.NOTFOUND })
    }

    const fP = findN[1].pac.filter(element => element._id == body.package_Id);
    if (fP[0] == null || fP[0] == undefined) {

    MyLogger("createCommission" , PACKAGE.NOTFOUND);

    return res.status(404).json({ "Error": PACKAGE.NOTFOUND });
    }
    const result = await pac.findOneAndUpdate({ _id: body.package_Id }, {
    $set: {
    se_Co: sC,
    co_Us_Ty1: body.commissionType1,
    co_Us_Ty2: body.commissionType2,
    },
    }, { new: true, });
    return res.status(200).json(result)
    } catch (error) {
    MyLogger("PostDetailsPackage",error.message);
    console.log(error.message);
    return res.status(400).json({ "Error": error.message })
    }
    }
    }

    module.exports = new Package_Commission();