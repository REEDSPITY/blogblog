/**
 * Created by penny on 2017/5/21.
 */
var express = require('express');
var router = express.Router();
var Category = require('../models/Category')
var Content = require('../models/Content');
//若用/uesr则指定网页目录user下index生效
/*处理通用数据*/
var data;
router.use(function (req,res,next) {
    data = {
        userInfo:req.userInfo,
        categories:[]
    };
    Category.find().then(function (categories){
        data.categories=categories;
        next();
    });
});

/*首页*/
router.get('/',function (req,res,next) {
    //res.send('首页');
    //views目录下的
    //console.log(req.userInfo);
    //读取所有分类信息，然后显示主页

    data.category=req.query.category || '';
    data.page = Number(req.query.page || 1);//?page=2
    data.category=req.query.category || '';

    data.limit = 10;
    data.pages=0;//总页数
    data.count=0;
    data. contents=[];

    var where ={};
    if(data.category){
        where.category=data.category;
    }

    Content.count().where(where).then(function (count) {

        data.count=count;

        data.pages = Math.ceil(data.count/data.limit);//向上取整
        data.page = Math.min(data.page,data.pages);//取值不能超过pages
        data.page = Math.max(data.page,1);//page不能小于1
        var skip = (data.page - 1)*data.limit;

        return  Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user']).sort({addTime:-1});//后添加的在最前面

    }).then(function (contents) {
        data.contents = contents;
        //console.log(data);
        res.render('main/index',data);
    });

});

router.get('/view',function (req,res) {
   var contentId = req.query.contentid || '';

   Content.findOne({
       _id:contentId
   }).then(function (content) {
       data.content=content;
       content.views++;//每当用户访问这个页面，访问量+1
       content.save();
       //.log(data);
        res.render('main/view',data);
   })
});

//将路由对象返回出来
module.exports = router;