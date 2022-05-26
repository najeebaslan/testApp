
const { Joi, mongoose, ObjectId } = require('../utils/utils');
/*  <<<// Documentation names //>>>
1-use = username
2-pas=password
3-se_Nu=serialNu
4-is_Ac=isActive
5-net_Id=networkId
6-pac_Id=packageId
7-pac_Pr=package price
8-
9-
10-
11-
12-
13-
14-
15-

      
      
*/
const CardsSchema = mongoose.Schema(
  {
    _id: { type: Object },
    use: {
      type: String, type: String, trim: true,
      required: true
    },

    pas: {
      type: String, type: String, trim: true,
      required: false
    },

    se_Nu: {/* serial number */
      type: String, trim: true, required: true
    },

    is_Ac: { type: Boolean, default: true, },/* is Active */

    Is_new: { type: Boolean, default: true, },

    net_Id: { type: ObjectId, ref: "network" },/* networkId */

    pac_Id: { type: ObjectId, ref: "Package" },/* packageId */

    pac_Pr: {/* package price */
      type: Number, trim: true,
      required: true
    },

  },
  {
    timestamps: true, versionKey: false
  }
);

const validationPrintCards = data => {
  const Schema = {
    packageId: Joi.string().min(3).max(44).required(),
    networkId: Joi.string().min(3).max(44).required(),
    package_Price: Joi.number().min(12).max(1234567).required(),
    countCards: Joi.number().min(1).required(),

  }; return Joi.validate(data, Schema)
};

module.exports = mongoose.model("cards", CardsSchema);
module.exports.validationPrintCards = validationPrintCards;



