/**
 * Created by penny on 2017/5/29.
 */

//user模型类
var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('Category',categoriesSchema);