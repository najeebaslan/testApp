const { mongoose, ObjectId } = require("../../utils/utils");

/* <<<// Documentation >>>

1- na = name
2- ci_Id = City Id 
3-lon = Longitude
4-lat =Altitude
5-dt= Date
6-we = Weather
7-we_De= Weather description 
8-te = Temperature
9-hu =Humidity
10-wi=Wind
11-sp =Speed
12-de=Degree
13-cl=Clouds
14-us_In = User Id
15-ic=Icon
16-


*/

/* //--------------------->>>  يتم حفظ هذه البيانات فقط عندما يكون مالك الشبكة محدد انه شبكته تشتغل علا الواح شمسية فقط واذا مالم يم الاستعلام عن حالة الطقس لاي مستخدم من دون حفظ هذه البيانات <--------------------- */

const Weather_Schema = mongoose.Schema(
  {
    na: { type: String, trim: true, },/* name */
    ci_Id: { type: String, trim: true, },/* city id */
    lon: { type: String, trim: true, },/* longitude */
    lat: { type: String, trim: true, },/* altitude */
    dt: { type: String, trim: true, },/* date */
    sunrise: { type: String, trim: true, },/* شروق الشمس*/
    sunset: { type: String, trim: true, },/* الغروب */
    pop: { type: String, trim: true, },/* احتمالية هطول الأمطار */

    we: {/* weather */
      we_De: { type: String, trim: true, },/*weather description  */
      ic: { type: String, trim: true, },/* icon */
      te: { type: String, trim: true, },/* temperature */
      hu: { type: String, trim: true, },/* humidity */

    },

    wi: {/* wind */
      sp: { type: String, trim: true, },/* speed */
      de: { type: String, trim: true, },/* Degree */
    },

    cl: { type: String, trim: true, },/* clouds   سحاب*/
    us_Id: { type: ObjectId, ref: "User", required: true, },

  },
  { versionKey: false }
);

module.exports = mongoose.model("weather", Weather_Schema);
