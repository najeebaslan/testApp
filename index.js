'use strict';
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { mongoose, logger, _ } = require("./utils/utils");
const URL = require("./config/db_config.json");
const compression = require('compression');
const PORT = process.env.PORT || 3000;
const app = express();
let { errors } = require('celebrate') // handle celebrate joi errors

// Send JSON responses
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression())//===>request يعمل علا ضغط ال 
app.use(morgan('short'));
// Celebrate library error handler
app.use(errors())
app.use('/csv', require("./router/card/csv"));
app.use('/weather', require("./router/weathers/weather"));
app.use('/user', require("./router/user/user"));
app.use('/user', require("./router/user/sendBalance"));
app.use('/user', require("./router/user/auth"));
app.use('/user', require("./router/user/filter_user"));
app.use('/auth', require("./router/user/auth"));
app.use('/network', require("./router/network/network"));
app.use('/network', require("./router/network/filter_network"));
app.use('/package', require("./router/package"));
app.use('/area', require("./router/coverage"));
app.use('/card', require("./router/card/cards"));
app.use('/offer', require("./router/offers"));
app.use('/filter', require("./router/user/filter_user"));
app.use('/filter', require("./router/network/filter_network"));

app.get("/", (req, res) => {
  console.log(req.ip);
  res.send("النظام شغال")
});

app.use(express.static(__dirname + '/public/uploads/'));

global.__basedir = __dirname;
app.all('*', (req, res, next) => {
  res.status(404).json([{
    status: "false",
    Error: 'rout not found !'
  }])
})

// Custom server error handler
app.use((err, req, res, next) => {
  if (err) {
    console.error(err)
    if (!err.statusCode) { err.statusCode = 500 } // Set 500 server code error if statuscode not set
    return res.status(err.statusCode).send({
      statusCode: err.statusCode,
      Error: err.message
    })
  }

  next()
})

app.listen(
  PORT, () => {
    console.log("server is working in PORT " + `${PORT}`);
  });

/* This is Database Mongodb */

async function main() {
  await mongoose.connect(`${URL.host}${URL.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,  /* mongoose disable this in version ^6.0.10 */
    //useCreateIndex: true,    /* mongoose disable this in version ^6.0.10 */
  });
  console.log('connected to Database');
}

main().catch(err => {
  const customError = 'Error no connected to Database'
  logger.error(customError + err)
  console.error(customError + err)
});





//1- git add .

//2- git commit -m "My Massager13"


/*3- git push origin master -f */   // or //    /* 3- git push -u origin master */




/* اخر شي كنت اشتغل علية هو حق تسجيل لوج العمليات */










/* const expressWinston = require('express-winston');
const winston = require('winston');
// Log the whole request and response body
expressWinston.requestWhitelist.push('body')
expressWinston.responseWhitelist.push('body')
// const khgd=require('@yunnysunny/request-logging')
// Logger makes sense before the router
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.MongoDB({
        db: `${Uri.host}${Uri.database}`, //Your Db connection
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          poolSize: 2,
          // autoReconnect: true
        },
        collection:'logs',
        capped:true,
        metaKey:'meta',
        storeHost:true,
      })
    ],
    // handleExceptions: true,
    format: winston.format.json({ space: 2 }),
    meta: true,
    msg: "Request: HTTP {{req.method}} {{req.url}}; Username: {{req.body.username}}; ipAddress {{req.connection.remoteAddress}} ;",
    requestWhitelist: [
      'headers.host',
      'headers.sec-ch-ua-platform',
      'headers.sec-ch-ua',
      'headers.sec-ch-ua-mobile',
      'headers.user-agent',
      'headers.accept-languag',
      'headers.content-length',
        "url",
        "method",
        "httpVersion",
        "originalUrl",
        "query",
        "body",
        "ip"
      ],
      allowFilterOutWhitelistedRequestBody:true,
      bodyWhitelist:[/* Choose specific data from the response/
        'username',
        'devices_Name',
        'model',
        'lat',
        'lon',
        'ip_Address',
        '_id',

      ],
      responseWhitelist:[
        'body._id',
        'body.Error',
        'statusCode'

      ]
      // requestField:'Error',
      // responseField:'Error',
      // metaField:'Error'


    }))

    */