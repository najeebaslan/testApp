const { Joi, mongoose, jwt, ObjectId } = require('../utils/utils');
const URL = require('../config/db_config.json');

const isActiveSchema = mongoose.Schema(
      {

            userId: {
                  type: ObjectId,
                  ref: "User"
            },

            isAdmin: {
                  type: Boolean,
                  default: false,
            },
            is_Ac: {
                  type: Boolean,
                  default: false,/* i am disable this because is user already not has balance and if user has balance this is is_Ac = true . */
            },
            level: {
                  type: Number,
                  default: 0,
            },
            isBlock: {
                  type: Boolean,
                  default: false,
            },
            language: {
                  type: String,
                  enum: ['English', 'Arabic', 'network_Engineer',],
                  default:'English',
            },

      },{ timestamps: true, versionKey: false })

      isActiveSchema.methods.generateTokens = function () {
      const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin,isBlock:this.isBlock,language:this.language }, URL.privateKey);
      return token;

}
module.exports = mongoose.model("roles_user", isActiveSchema);
