const { mongoose, ObjectId } = require("../../../utils/utils");
/* <<<// Documentation >>>
1- userId = User Profile Id
2- ne_Id = ne Id
3- re= Reports
4- vi = View Offers
5- da_Ad = Date Add
6- of = Offers
7- sh_Lo = Show Log 
8- cm_Du= Commission Duty
9- sh_Ba_Ne = Show Balance ne
10- al_Tr_Fr_Ba_Ne =Allow Transfer From Balance ne
11-ye= thisYear
12-da=thisDay
13-mo=thisMonth
*/

const Roles_Reports = mongoose.Schema(
  {
    ne_Id: { type: ObjectId, ref: "networks" },
    userId: { type: ObjectId, ref: "User" },
    //Reports
    re: {
      vi: {
        ye: { type: Boolean, default: true },
        da: { type: Boolean, default: true },
        mo: { type: Boolean, default: true },
      },
    },

    //Log
    sh_Lo: { type: Boolean, default: true },

    //Commission
    cm_Du: { type: Boolean, default: true },

    //Offers
    of: {
      ed: { type: Boolean, default: true },
      ad: { type: Boolean, default: true },
      de: { type: Boolean, default: true },
      vi: { type: Boolean, default: true },
    },

    //Balances
    sh_Ba_Ne: { type: Boolean, default: true },
    al_Tr_Fr_Ba_Ne: { type: Boolean, default: false },
    da_Ad: { type: Date, default: Date.now },
  },

  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("roles_Others", Roles_Reports);
