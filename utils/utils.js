const mongoose = require('mongoose')
const logger = require("../config/logger");
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const _ = require("lodash");/*input تعمل علا محاربة الهاكر من ناحية ال  */

module.exports = { mongoose, logger, ObjectId, Joi, jwt ,_}