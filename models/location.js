
const {mongoose}=require('../utils/utils');
    /*  <<<// Documentation names //>>>
1-
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
    const streetSchema = mongoose.Schema(
    {name: { type: String, required: true, },});

    const citySchema = mongoose.Schema(
    {name: { type: String, required: true, },streets: [streetSchema],});

    const governorateSchema = mongoose.Schema(
    {governorate: { type: String, required: true, }, cities: [citySchema], },
    { timestamps: true, versionKey: false });
    
    
    
  
  
    module.exports = mongoose.model('location', governorateSchema);
