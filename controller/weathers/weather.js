
      const { MyLogger } = require('../../utils/find_utils')
      const weather_M = require('../../models/weather/weather')
      const request = require('request');
      const apiKey = `09f252a145335bb0b235c32212afaf60`;

      // const apiKey = `09f252a145335bb0b235c32212afaf60`;

      /* <<<// Documentation >>>

      1- na = name
      2- ci_Id = City Id 
      3-lon = Longitude
      4-lat =latitude 
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

/*  {مغيم - مشمس -سماء صافية}  سوف يتم عرض البيانات الرئيسية مثل حالة الطقس  Fronend  في ال 
ودرجة الحرارة ودرجة نسبة الغيوم وعند الضغط البيانات يتم اضهار بقية البيانات 
وايضا سيكون هنا كلمة المزيد عند الضغط عليها يتم نقلك الا صفحة جديدة يتم فيها عرض البيانات التنبؤية الطقس

*/

      class WEATHER {

      async getWeather(req, res,) {
      //this is for get weather icon 
      /* `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`, */
      var body = req.body;
      let lat = body.lat, lon = body.lon, userId = body.userId;

      const Logger_W = 'getWeather-';//this use inside my logger

      parse( userId, lat,lon).then(function (val) {
      if (val[0] == true) {
      MyLogger(`${Logger_W}Weather`, val.message)
      return res.status(400).json({ "Error": val[1].message })
      } else {return res.status(200).json(val[1])}
      
      }).catch(function (err) {
      console.log(err)
      MyLogger(`${Logger_W}Weather`, err[1].message)
      return res.status(400).json({ "Error": err[1].message })
      });
      }
      }




      const  parse=async ( userId, lat,lon)=> {
      return new Promise(function (resolve, reject) {
      let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&mode=json&appid=${apiKey}&lang=en&units=metric`;/* this is by lat and lang */

      request(url, async function (error, response, body) {

      if (error) {
      console.log(error);

      return reject([true, error]);
      }
      try {
      let weather = JSON.parse(body)
      if (response.statusCode != 200) return reject([true, weather])
      if (weather.cod != 200) return reject([true, weather.message])
      console.log(response.statusCode)

     
      return resolve([false, weather]);
      } catch (e) {
      return reject([true, e]);
      }

      })

      })
      .then(function (result) {
      /* this is to get  Weather forecast*/
      return new Promise(function (resolve, reject) {
      let url_We_forecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=en&units=metric`
      request(url_We_forecast, function (error, response, body) {

      if (error) {
      console.log(error);
      return reject([true, error]);
      }
      try {
      let weather = JSON.parse(body)
      if (response.statusCode != 200) return reject([true, weather])
      result = result[1]
      const dataWeather = new weather_M({
      ci_Id: result.id,
      lon: result.coord.lon,
      lat: result.coord.lat,
      dt: result.dt,
      sunrise: result.sys.sunrise,
      sunrise: result.sys.sunset,
      pop: weather.list[0].pop,
      we: {
      we_De: result.weather[0].description,
      ic: result.weather[0].icon,
      te: result.main.temp,
      hu: result.main.humidity,
      },
      wi: { sp: result.wind.speed, de: result.wind.deg },
      cl: result.clouds.all,
      us_Id: userId


      });
      dataWeather.save(function (err) {
      if (err) {
      console.log(err);
      MyLogger(`getWeather-save`, error.message)
      return resolve([true, error.message]);
      }
      })
      var wind = toTextualDescription(result.wind.deg)
      var Tody_We = { Description_wind: wind, ...result }
      let Data = { Tody_We, ...weather }
      return resolve([false, Data]);
      } catch (e) {
      return reject([true, e]);
      }
      })
      })
      })
      }


      function toTextualDescription(degree) {/* this is knowing wind direction */
      if (degree > 337.5) return 'Northerly';/* شمالية */
      if (degree > 292.5) return 'North Westerly';/* الشمال الغربي*/
      if (degree > 247.5) return 'Westerly';/* غربي */
      if (degree > 202.5) return 'South Westerly';/* الجنوب الغربي*/
      if (degree > 157.5) return 'Southerly';/* جنوبي */
      if (degree > 122.5) return 'South Easterly';/* جنوب شرقي	*/
      if (degree > 67.5) return 'Easterly';/* شرقي */
      if (degree > 22.5) {
      return 'North Easterly';/* شمال شرقي	*/
      }
      return 'Northerly';
      }

      /*
      // هذا لتنبؤ با الايام المقبلة
      `http://api.openweathermap.org/data/2.5/forecast?lat=14.887296&lon=43.473457&appid=09f252a145335bb0b235c32212afaf60&lang=ar&units=metric`

      //  الحصول علا حالة الطقس في الوقت الحالي



      `http://api.openweathermap.org/data/2.5/weather?lat=14.8904&lon=43.4762&appid=09f252a145335bb0b235c32212afaf60&lang=ar&units=metric` */


      module.exports.parse =parse;

      module.exports = new WEATHER();

