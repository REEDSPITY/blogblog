/**
 * Created by penny on 2017/5/21.
 */
//加载express模块
var express = require('express');
//加载模板
var swig = require('swig');
var mongoose = require('mongoose');

/*加载body-parser用来处理post提交过来的数据*/
var bodyParser = require('body-parser');
//加载cookie模块
var Cookies = require('cookies');

//创建app应用
var  app = express();

var User = require('./models/User');

/*在public目录下划分并存放好相关的静态文件资源
* 当用户访问的url以/public开始，那么直接返回对应__dirname + '/public'下的文件
* 设置静态文件托管css
*
* */
app.use('/public',express.static(__dirname + '/public'));


/*配置应用模板*/
//定义当前应用所用的模板引擎，模板文件的后缀，用于解析模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是相对目录
app.set('views','./views');
//注册模板引擎,第一个参数必须是view engine，第二个参数是前面写的模板文件后缀
app.set('view engine','html');
//可以同步
swig.setDefaults({cache:false});


/*bodyparser设置,调用此方法会在req上加一个body属性，body里面保存的就是post提交过来的数据*/
app.use(bodyParser.urlencoded({extended: true}));
//设置cookies
app.use(function (req,res,next) {
    req.cookies=new Cookies(req,res);
    //解析登录用户的cookie信息
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));//解析
            //获取当前用户是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch (e) {
            next();
        }
    }else {
    //console.log(req.cookies.get('userInfo'));
    next();
    }
});

app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

/*
/!**req:request对象，保存客户端数据
res:服务端
next：函数
 *!/
app.get('/',function (req,res,next) {
    // 发送内容到客户端
    // res.send('<h1>侯小佳的小窝</h1>')
/!*读取views目录下的指定文件，解析返回客户端，
* 第一个参数：表示文件，相对于views目录
*第二个参数：传递给模板使用的数据
* *!/
    res.render('index');
});
*/

//css加路由
/*app.get('/main.css',function (req,res,next) {
    res.setHeader('content-type','text/css');
    res.send('body{background:red}');
});*/
//监听http请求=>http.creatreServer();
mongoose.connect('mongodb://localhost:27017/Blog',function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(8081);
    }
});



/*用户发送http请求 -》 url -》 解析路由 -》找到匹配的规则 -》指定绑定函数，返回对应内容给客户端
* public -> 静态 -> 直接读取指定目录下的文件，返回给客户端
* -> 动态 -> 处理业务逻辑，加载模板，解析模板 -> 返回数据给客户端
* */
