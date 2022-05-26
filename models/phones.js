    const { mongoose, ObjectId } = require('../utils/utils');

   /*  <<<// Documentation names //>>>
1-is_Ac =is Active
2-us_In = User Initial
3-ne_In = ne initial
4-
5-
6-
7-
8-
9-
10-
11-
12-
13-
14-
15-
  
*/

    const phonesSchema = mongoose.Schema(
    {
    phone: { type: Array, required: true, },
    is_Ac: { type: Boolean, default: true, },
    us_In: { type: ObjectId, ref: "User" },
    ne_In: { type: ObjectId, ref: "network" },/* this is for save id ne in collection phone by this name ne_In   so doing that when create phone when post or create ne . else save by name us_In */
    }, { timestamps: true, versionKey: false }
    );



    module.exports = mongoose.model("phone", phonesSchema);
