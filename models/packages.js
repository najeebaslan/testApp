
const { mongoose, ObjectId, Joi } = require('../utils/utils');
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
16- va=validity

          
      
*/
const packagesSchema = mongoose.Schema(
    {
        pac_Pr: { type: Number, },
        Pac_Da: { type: Number, },/* package_Price  */
        de_Da: { type: String, },/* details_data */
        pac_Ti: { type: Number, },/*Package_time  */
        de_Ti: { type: String, },/* details_time */
        pac_Va: { type: Number, },/* package_validity */
        de_Va: { type: String, },/* details_validity */
        ha_Pa: { type: Boolean },/* havePassword */
        equalUAP: { type: Boolean, },/* this equalUAP =EqualUsernameAndPassword */
        is_Ac: { type: Boolean, default: true, },
        se_Co: { type: Number,/* services_Commission */ },/* This is commission=  العمولة الخاصة بمالك النظام */
        co_Us_Ty1: { type: Number, /* commission_User_Type1 */ },/* co_Us_Ty1=عميل */
        co_Us_Ty2: { type: Number, },/* commission_User_Type2=مورد */
        net_Id: { type: ObjectId, ref: "network", },
        us_In: { type: ObjectId, ref: "User", },
        //package_PriceId: { type: ObjectId, ref: "pac_Pr" ,},

    },

    { timestamps: true, versionKey: false }
);
const validationPackage = data => {
    const Schema = {
        data: Joi.string().min(2).max(10).required(),
        details_Data: Joi.string().min(2).max(15).required(),
        time: Joi.string().required(),
        details_time: Joi.string().min(2).max(15).required(),
        validity: Joi.string().required(),/* validity */
        package_validity: Joi.string().min(2).max(15).required(),
        networkId: Joi.string().min(10).required(),
        package_Price: Joi.number().integer().min(11).max(999999999).required(),
        user_initiate: Joi.string().required(),
        havePassword: Joi.boolean().required(),
        equalUAP: Joi.boolean(),
    }; return Joi.validate(data, Schema)
};

module.exports = mongoose.model('Package', packagesSchema);
module.exports.validationPackage = validationPackage;