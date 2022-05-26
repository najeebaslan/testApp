const { mongoose, ObjectId } = require("../utils/utils");
/*  <<<// Documentation log_Operation >>>
1- userId = User Profile Id
2- da_Ad = Date Add
3- de_St = Device Status
4- ip = ip address
5- de_Na device name 
6- de_Mo =device Model
7- ty_Api=type api
8- ty_st= type status
9-we =weather
10-cl=cloud 
11- te=Temperature
12-pl-place
13-de =description Operation
14-de_Ne = device name 
15-
16-
17-
18-
19-
20-

*/

const LogsSchema = mongoose.Schema(
  {
    
    userId: { type: ObjectId, ref: "User" ,required:false},
    ip:{ type: String, required:true,trim:true},
    de_Ne:{ type: String, required:true,trim:true},
    de_Mo:{ type: String, required:true,trim:true},
    ty_st:{ type: String, required:false,trim:true},/* type status  {400 - 404 - 500 - 403}*/
    we:{/* weather */
    cl:{ type: String, required:true,trim:true},/* Clouds */
    te:{ type: String, required:true,trim:true},/*  Temperature*/
    we_st:{ type: String, required:true,trim:true},/* weather status { a clear sky- Rainy - clouds and rain} */
    pl:{ type: String, required:true,trim:true},/* place */
    },
    da_Ad: { type: Date, default: Date.now() },
    /* THIS IS DETAILS REQUEST  */
    host:{ type: String, required:true,trim:true},
    sec_ch_ua_platform:{ type: String, required:false,trim:true},
    sec_ch_ua:{ type: String, required:false,trim:true},
    sec_ch_ua_mobile:{ type: String, required:false,trim:true},
    user_agent:{ type: String, required:false,trim:true},
    url:{ type: String, required:true,trim:true},
    method:{ type: String, required:true,trim:true},
    query:{ type: Object, required:false,trim:true},
    ip_Re:{ type: String, required:true,trim:true},/* ip from  Request */
    // de_St: { type: ObjectId, ref: "devices_status", required: false },

  },

  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("log_Operation", LogsSchema);
