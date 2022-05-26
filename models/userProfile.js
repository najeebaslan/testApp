

// const { privateKey, Joi, mongoose, jwt, ObjectId } = require('../utils/utils');
// /*  <<<// Documentation names //>>>
// 1-pas =password
// 2-use =  username
// 3-is_Ac =  is Active
// 4-op_Nu = operation number 
// 5-de_st = devices status
// 6-bu_Da = buying Date
// 7-de_Id =device Id
// 8-pac_Pr= Package price
// 9-se_Nu = serial Number
// 10-ca_Nu = Card Number
// 11-pac_Id= package Id
// 12-bu_Ar =Buying Area
// 13-fr_Us = From User
// 14-to_Us = To User
// 15-ne= ne
// 16 -em =email
// 17- no = notice
// 18- am =amount

      
      
// */


// const UserProFileSchema = mongoose.Schema(
//   {
   

//     userId: {
//       type: ObjectId,
//       ref: "User"
//     },
   



//   },
//   { timestamps: true, versionKey: false }//this versionKey: false for not save ( __v  ) in database
// );

// UserProFileSchema.methods.generateTokens = function () {
//   const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, privateKey);
//   return token;

// }



// module.exports = mongoose.model('User', UserProFileSchema);
