const { mongoose, ObjectId } = require("../../../utils/utils");
/* <<<// Documentation >>>

1- userId = User Profile Id
2- ne_Id = ne Id
3- ne_Na = ne Name Einglish
4- lo = location
5- co_Ae = Covarage Area
6- ne_Im = ne Image
7- de = Delete
8- ed = Edit
9- ad =Add Cards
10- vi = View Profile_Network
11-
12-
13-

*/

const Roles_Profile_Network = mongoose.Schema(
  {
    ne_Id: { type: ObjectId, ref: "networks" },
    userId: { type: ObjectId, ref: "User" },
    ne_Na: { type: Boolean, default: false },
    lo: { type: Boolean, default: false },
    co_Ae: {
      ed: { type: Boolean, default: true },
      ad: { type: Boolean, default: true },
      de: { type: Boolean, default: true },
      vi: { type: Boolean, default: true },
    },
    ne_Im: { type: Boolean, default: true },
  },

  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("roles_Pro_network", Roles_Profile_Network);
