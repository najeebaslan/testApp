const { mongoose, ObjectId } = require("../../utils/utils");
/* <<<// Documentation >>>

1- us_In = us_In
2- ad_Ti = Add Time

*/

const Data_Search_Stor_Schema = mongoose.Schema(
  {
    word: { type: String, trim: true },
    us_In: { type: ObjectId, ref: "User" },
    ad_Ti: { type: Date, default: Date.now },
    sr_Co:{type:Number},/* this is for a lote search for user*/
  },
  { versionKey: false }
);

module.exports = mongoose.model("word_Search", Data_Search_Stor_Schema);
