
const {Joi,mongoose,ObjectId}=require('../utils/utils');
/*  <<<// Documentation names //>>>
1-net_Id = ne id
2-
3-
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
const name = mongoose.Schema(
  {
    name: { type: String, required: true, lowercase: true,  },
    net_Id: { type: ObjectId, ref: "network", required: true, },
  },{versionKey: false}

);

module.exports = mongoose.model("coverage", name);
