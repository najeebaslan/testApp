
const { Joi, mongoose, ObjectId } = require('../utils/utils');
/*  <<<// Documentation names //>>>
1-na_A= name Arabic
2-na_E= name English
3-name=allCoverage_Area
4-ph=phones
5-us_In=user_initiate
6-ad=address
7-pac=packages
8-is_Ac=isActive
9-lo=location
10-go_Id=governorateId
11-ci_Id=cityId
12-st_Id=streetId
13-po_Ty=Power Type
14-we_Id = Weather Id
15-

      
      
*/
const NetworkSchema = mongoose.Schema(
    {
        na_A: { type: String, required: true, lowercase: true, },/* name Arabic */
        na_E: { type: String, required: true, lowercase: true, },/* name English */
        name: [{ type: ObjectId, ref: "name", required: true, }],/* all coverage Area */
        ph: { type: ObjectId, ref: "phone", },/* phons */
        us_In: { type: ObjectId, ref: "User", required: true, },/* user initial */
        //coverage_area: [{ type: ObjectId, ref: "coverage",}],
        pac: [{ type: ObjectId, ref: "Package", },],/* packages */
        img: { type: String, required: true, },
        is_Ac: { type: Boolean, default: true, },/* is Active */
        po_Ty:{type: String,enum: ['Solar_Energy','Electricity'],},
        // we_Id:{ type: ObjectId, ref: "weather", required: true },

        /* هذا من اجل اذا كانت نوع الطاقة هي طاقة شمسية يتم ارسال تقارير لماك الشبكة با الاخذ با الاحتياطات المستلزمة لتوفير الشحن للبطاريات و وزن الاواح الشمسية اذا كان فصل الشتاء */

        lo: {/* location */
            go_Id: { type: ObjectId, ref: "location", },/* governorate Id */
            ci_Id: { type: ObjectId, ref: "location", },/* location Id */
            st_Id: { type: ObjectId, ref: "location", },/* street Id */
        }
    },
    { timestamps: true, versionKey: false },
);



module.exports = mongoose.model("network", NetworkSchema);

