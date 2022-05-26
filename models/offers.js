
const {Joi,mongoose,ObjectId}=require('../utils/utils');
/*  <<<// Documentation names //>>>
1-pac_Pr=packagePrice
2-of_De=details_offers
3-net_Id=networkId
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
const offersSchema = mongoose.Schema(
    {
    pac_Pr: { type: Number, required: true,},/* package Price */
    of_De: {type: String,  required: true,},/* Offer details */
    net_Id: { type: ObjectId, ref: "network" ,required: true,},/* ne Id */
    // data: { type: String, required: true,},
    // de_Da: { type: String,  required: true,},
    // time: {type: String,required: true,},
    // de_Ti: { type: String,required: true,},
    // va: {type: String, required: true,},
    // de_Va: {type: String, required: true,},
    // limitUptime: { type: String, required: true,},
    // details_limitUptime: {type: String,required: true,},

    },{ timestamps:true, versionKey: false});


// { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } },

module.exports = mongoose.model('offers', offersSchema);
