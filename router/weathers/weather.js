const express = require('express');
require('express-async-errors');
const router = express.Router();
const WeatherController = require('../../controller/weathers/weather');
const auth=require('../../middleware/auth')
const block=require('../../middleware/is_block')

router.post('/',[auth,block],WeatherController.getWeather);
module.exports = router;