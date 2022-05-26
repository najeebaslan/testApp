
const { mongoose, ObjectId, Joi } = require('../utils/utils');
/*
1- use= username
2-pas = password
3-ser = se_Nu
4-is_Ac= isActive
5-pac_Pr =packagePrice 
6-net_Id=network_Id
7-pac_Id = packageId
8-us_Bu=user_Buyer
9-bu_Ar = Buyer area
10- bu_Da= buying_date
 
 */
const CsvSchema = mongoose.Schema(
    {
        _id: { type: Object },
        use: { type: String, trim: true, required: true },/* username */
        pas: { type: String, trim: true, required: false },/* password */
        ser: { type: String, trim: true, required: true },/* serial Number */
        is_Ac: { type: Boolean, default: true, },/* is Active */
        Is_new: { type: Boolean, default: true, },
        pac_Pr: { type: Number, trim: true, required: true },/* package Price */
        net_Id: { type: ObjectId, ref: "network" },/* ne Id */
        pac_Id: { type: ObjectId, ref: "Package" },/* package Id */
        us_Bu: { type: ObjectId, ref: "user", },/* user Buying */
        bu_Ar: { type: String, required: false, },/* buying Area */
        bu_Da: Date,/* buying Data */

    }, { timestamps: true, versionKey: false }
);




module.exports = mongoose.model("card", CsvSchema);






