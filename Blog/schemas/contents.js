/**
 * Created by penny on 2017/5/31.
 */

var mongoose = require('mongoose');
//module.exports对外提供
module.exports = new mongoose.Schema({
    //关联字段-分类信息
    category:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    //内容标题
    title: String,
    //关联字段-用户
   user:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //发帖时间
    addTime:{
        type:Date,
        default:new Date()
    },
    //阅读数，点击量
    views:{
        type:Number,
        default:0
    },
    description:{
        type:String,
        default:''
    },
//内容
    content:{
        type:String,
        default:''
    },
    //评论
    comments:{
        type:Array,//有评论内容，评论时间等
        default:[]
    }
});
