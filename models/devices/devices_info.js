const { mongoose, ObjectId } = require("../../utils/utils");

/* <<<// Documentation >>>

  1- De_StSchema = Devices Status Schema
  2- dev_St_Id = Devices Status Id
  3- De_In = Devices Info
  4- de_Na = Devices Name
  5-  ma = Manufacturer  الشركة المصنعة
  6- de_Id= Device Id 
  7- mac =Mac ad
  8- api_le= Api Level رقم النسخة ال 
  9- re_Ba = released base  النطاق الاساسي
  10- userId = User  Id
  11- da_Ad =Date Add
  */

const De_StSchema = mongoose.Schema(
  {
    de_Na: { type: String, trim: true, },
    model: { type: String, trim: true, },
    ma: { type: String, trim: true, },
    de_Id: { type: String, trim: true, },
    mac: { type: String, trim: true, },
    re_Ba: { type: String, trim: true, },
    userId: { type: ObjectId, ref: "User" } /* تضاف هذا لمرة واحدة فقط */,
    dev_St_Id: { type: ObjectId, ref: "devices_status", } /* تضاف هذا المرة واحدة فقط */,
    da_Ad: { type: Date, default: Date.now() },

  },

  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("devices_info", De_StSchema);
