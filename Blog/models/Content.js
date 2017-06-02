/**
 * Created by penny on 2017/5/31.
 */
/**
 * Created by penny on 2017/5/29.
 */


var mongoose = require('mongoose');
var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content',contentsSchema);