/**
 * Created by penny on 2017/5/21.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');
/*router.get('/user',function (req,res,next) {
    res.send('User');
});*/

router.use(function (req,res,next) {
    if(!req.userInfo.isAdmin){
        //如果当前用户是非管理员
        res.send('对不起，只有管理员才可以进入后台');
        return;
    }
   next();
});
/*首页*/
router.get('/',function (req,res,next) {
    //res.send('后台管理首页');
    res.render('admin/index',{
        userInfo:req.userInfo
    });//渲染
});
/*用户管理*/
router.get('/user',function (req,res) {
    /*从数据库中读取所有用户的数据
    * limit(Number):限制获取的数据条数,进行分页
    * skip()：忽略数据的条数
    * 每页显示两条
    * 1：1--2 skip:0
    * 2:3--4 skip:2
    *
    * */
    var page = Number(req.query.page || 1);//?page=2
    var limit = 10;
    var pages;//总页数
    var uname="user";

    User.count().then(function (count) {
        pages = Math.ceil(count/limit);//向上取整
        page = Math.min(page,pages);//取值不能超过pages
        page = Math.max(page,1);//page不能小于1
        var skip = (page - 1)*limit;
        /*1.升序
        -1.降序
         .sort({_id:1})
        */
        User.find().limit(limit).skip(skip).then(function (users) {
            //console.log(users);
            res.render('admin/user_index',{
                userInfo:req.userInfo,
                users:users,

                count:count,
                pages:pages,
                limit:limit,
                page:page,
                uname:uname
            });//渲染
        });
    });
});

/*分类首页*/
router.get('/category',function (req,res) {
  /* res.render('admin/category_index',{
       userInfo :req.userInfo
   });*/
    var page = Number(req.query.page || 1);//?page=2
    var limit = 10;
    var pages;//总页数
    var uname="category";
    Category.count().then(function (count) {
        pages = Math.ceil(count/limit);//向上取整
        page = Math.min(page,pages);//取值不能超过pages
        page = Math.max(page,1);//page不能小于1
        var skip = (page - 1)*limit;
        Category.find().limit(limit).skip(skip).then(function (categories) {
            //console.log(users);
            res.render('admin/category_index',{
                userInfo:req.userInfo,
                categories:categories,

                count:count,
                pages:pages,
                limit:limit,
                page:page,
                uname:uname
            });//渲染
        });
    });
});
/*分类的添加*/
router.get('/category/add',function (req,res) {
   res.render('admin/category_add',{
       userInfo :req.userInfo
   });
});
/*分类的保存*/
router.post('/category/add',function (req,res) {
   //console.log(req.body);
    var name = req.body.name || '';
    if(name == ''){
        res.render('admin/error',{
            userInfo :req.userInfo,
            message:'名称不能为空'
        });
        return;//return，空名字没必要查
    }
   //数据库只能够是否已经存在分类名称
    Category.findOne({
        name:name
    }).then(function (rs) {
        if(rs){
            //数据库已经存在该分类
            res.render('admin/error',{
                userInfo :req.userInfo,
                message:'分类已经存在了'
            });
            return Promise.reject();//这里会报错，返回就没错
        }else{
            //数据库中不存在该分类，可以保存
            return new Category({
                name:name
            }).save();
        }
    }).then(function (newCategory) {
        res.render('admin/success',{
            userInfo :req.userInfo,
            message:'分类保存成功',
            url:'/admin/category'
        });
    });
});

/*分类修改*/
router.get('/category/edit',function (req,res) {
    //获取要修改的分类信息并且用表单的形式展示出来
    var id = req.query.id || '';//获取数据库的id

    Category.findOne({
        _id:id
    }).then(function (category) {
        if(!category){
            res.render('admin/error',{
                userInfo :req.userInfo,
                message:'分类信息不存在'
            });
            return Promise.reject();
        }else {
            //分类信息存在
            res.render('admin/category_edit',{
                userInfo :req.userInfo,
                category:category//吧分类信息保存进去
            });
        }
    })
});
/*分类修改保存*/
router.post('/category/edit',function (req,res) {
    var id = req.query.id || '';
    //获取post提交过来的名称
    var name = req.body.name || '';

    Category.findOne({
        _id:id
    }).then(function (category) {
        if(!category){
            res.render('admin/error',{
                userInfo :req.userInfo,
                message:'分类信息不存在'
            });
            return Promise.reject();
        }else {
            //分类信息存在
            //当用户没有做任何修改提交的时候
            if (name == category.name){
                res.render('admin/success',{
                    userInfo :req.userInfo,
                    message:'修改成功',
                    url:'/admin/category'
                });
                return Promise.reject();
            }else {
                //要修改的分类名称在数据库中存在
               return Category.findOne({
                    _id:{$ne:id},
                    name:name
                });
            }

        }
    }).then(function (sameCategory) {
        if(sameCategory){
            res.render('admin/error',{
                userInfo :req.userInfo,
                message:'数据库中已经存在同名分类'
            });
            return Promise.reject();
        }else {
            //调用保存
            Category.update({
                _id:id
            },{
                name:name
            });
        }
    }).then(function () {
        res.render('admin/success',{
            userInfo :req.userInfo,
            message:'修改成功',
            url:'/admin/category'
        });
    })
});

router.get('/category/delete',function (req,res) {

    var id = req.query.id || '';

    Category.remove({
       _id: id
    }).then(function () {
        res.render('admin/success',{
            userInfo :req.userInfo,
            message:'删除成功',
            url:'/admin/category'
        });
    });
});

/*内容首页*/
router.get('/content',function (req,res) {
    /*res.render('admin/content_index',{
        userInfo :req.userInfo
    })*/
    var page = Number(req.query.page || 1);//?page=2
    var limit = 10;
    var pages;//总页数
    var uname="content";
    Content.count().then(function (count) {
        pages = Math.ceil(count/limit);//向上取整
        page = Math.min(page,pages);//取值不能超过pages
        page = Math.max(page,1);//page不能小于1
        var skip = (page - 1)*limit;
        Content.find().limit(limit).skip(skip).populate(['category','user']).sort({addTime:-1}).then(function (contents) {
            //console.log(users);
            //console.log(contents);
            res.render('admin/content_index',{
                userInfo:req.userInfo,
                contents:contents,

                count:count,
                pages:pages,
                limit:limit,
                page:page,
                uname:uname
            });//渲染
        });
    });
});
/*内容添加*/
router.get('/content/add',function (req,res) {

    Category.find().then(function (categories) {
        res.render('admin/content_add',{
            userInfo :req.userInfo,
            categories:categories
        })
    });
});

/*内容保存*/
router.post('/content/add',function (req,res) {
   //console.log(res.body);
    if(req.body.category == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容分类不能为空'
        });
        return;
    }

    if(req.body.title == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容标题不能为空'
        });
        return;
    }
    //保存数据到数据库
    new Content({
       category:req.body.category,
        title:req.body.title,
        user:req.userInfo._id.toString(),
        description:req.body.description,
        content:req.body.content
    }).save().then(function (rs) {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message:'内容保存成功'
        });
    });
});

/*内容修改*/
router.get('/content/edit',function (req,res) {
    var id = req.query.id || '';
    Category.find().then(function (categories) {
        Content.findOne({
            _id: id
        }).populate('category').then(function (content) {
            if (!content) {
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '指定内容不存在'
                });
                return Promise.reject();
            }else {
                res.render('admin/content_edit',{
                    userInfo: req.userInfo,
                    content:content,
                    categories:categories
                })
            }
        });
    });
});

/*修改内容保存*/
router.post('/content/edit',function (req,res) {
    var id = req.query.id || '';

    if(req.body.category == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容分类不能为空'
        });
        return;
    }

    if(req.body.title == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message:'内容标题不能为空'
        });
        return;
    }

    //调用保存
    Content.update({
        _id:id
    },{
        category:req.body.category,
        title:req.body.title,
        description:req.body.description,
        content:req.body.content
    }).then(function () {
        res.render('admin/success',{
            userInfo :req.userInfo,
            message:'修改成功',
            url:'/admin/content'
        });
    });
});

/*内容删除*/
router.get('/content/delete',function (req,res) {

    var id = req.query.id || '';

    Content.remove({
        _id: id
    }).then(function () {
        res.render('admin/success',{
            userInfo :req.userInfo,
            message:'删除成功',
            url:'/admin/content'
        });
    });
});

//将路由对象返回出来
module.exports = router;