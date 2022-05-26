const { mongoose, ObjectId } = require("../../utils/utils");

/* <<<// Documentation >>>

  1- De_StSchema = Devices Status Schema
  2- de_In_Id = Devices Info Id
  3- ip_Ad = Ip ad
  4- in = Interface
  5- ap_Na = Apps Name
  6- st = Status
  7- ca = Capacity
  8- da_Ad =Date Add 
  9- ge = Getaway
  10- ve = Version
  11- te = Temperature 
  12- sy_st = System Storage
  13= ex_st = External Storage
 14- userId = User Profile Id
 15-in_Da=installing Date
 16-  de_In_Id=Device info id

  */


/* this is apps running and details them */
const AppsSchema = new mongoose.Schema({
  ap_Na: { type: String, trim: true, required: true },
  ve: { type: String, trim: true, required: true },
  in_Da: { type: String, trim: true, required: true },/* installing Date */
  da_Ad: { type: Date, default: Date.now() },
});

const NetworkSchema = new mongoose.Schema({
  ip_Ad: { type: String, trim: true, required: true },
  ge: { type: String, trim: true, required: true },
  in: { type: String, trim: true, required: true, lowercase: true },
  dbm: { type: String, trim: true, required: true },
  da_Ad: { type: Date, default: Date.now() },
});

const BatterySchema = new mongoose.Schema({

  level: { type: String, trim: true, required: true },
  st: { type: String, trim: true, required: true },
  te: { type: String, trim: true, required: true },
  ca: { type: String, trim: true, required: true },
  da_Ad: { type: Date, default: Date.now() },
});

const MemorySchema = new mongoose.Schema({
  ram: { type: String, trim: true, required: true },
  sy_St: { type: String, trim: true, required: true },
  ex_st: { type: String, trim: true, required: true },
  da_Ad: { type: Date, default: Date.now() },
});

const De_StSchema = mongoose.Schema(
  {
    De_St: [{
      battery: [BatterySchema],
      ne: [NetworkSchema],
      apps: [AppsSchema],
      memory: [MemorySchema],
    },],
    userId: { type: ObjectId, ref: "User" } /* تضاف هذا لمرة واحدة فقط */,
    de_In_Id: { type: ObjectId, ref: "devices_info", } /* تضاف هذا المرة واحدة فقط */,

  },

  { timestamps: true, versionKey: false }

);

module.exports = mongoose.model("devices_status", De_StSchema);
