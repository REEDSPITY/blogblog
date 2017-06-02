/**
 * Created by penny on 2017/5/22.
 */
//user模型类
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User',usersSchema);