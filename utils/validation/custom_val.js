const { Joi } = require('../utils')

/* this is custom Validation */
const cu_V = (body, MySchema) => {
      const schema = Joi.object(MySchema)
      return Joi.validate(body, schema)
};


module.exports.cu_V = cu_V



