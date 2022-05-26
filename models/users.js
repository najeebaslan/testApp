const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
/*  <<<// Documentation names //>>>


1-us_Ty = user Type
2-nu_Ac = number Account
3-lo = location
4- go_Id = governorate ID
5-ci_Id =City Id
6-st_Id =street Id
7-de_In_Id=Device info id

      
      
*/

const UserSchema = mongoose.Schema(
  {

    use: { type: String, lowercase: true, },
    em: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      sparse: true,

    },

    pas: {
      type: String,
      required: true,
      trim: true,


    },

    age: {
      type: Number,
      required: false,
    },

    phoneId: {
      type: ObjectId,
      ref: "phone",
      required: true,
    },
    roles_User: {
      type: ObjectId,
      ref: "roles_user",
      required: true,
    },
    
    us_Ty: {/*userType  */
      type: String,
      enum: ['Client', 'network_Owner', 'network_Engineer',],
      required: false, trim: true,
    },

    image: {
      type: String,
      required: false,
    },

    sex: {
      type: String,
      required: false,
      enum: ['ذكر', 'انثى', 'مخصص'],
      //default: 'مخصص',
    },

    nu_Ac: {
      type: Number,
      required: true,
    },
    de_In_Id: { type: ObjectId, ref: "devices_info", },

    lo: {
      go_Id: {
        type: ObjectId,
        ref: "location",
      },

      ci_Id: {
        type: ObjectId,
        ref: "location",
      },
      st_Id: { type: ObjectId, ref: "location", },
    }
  },

  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
