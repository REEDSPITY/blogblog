项目结构分析
目录结构
db	数据库存储目录
models	数据库模型文件目录
node_modules	node第三方模块目录
public	公共文件目录（css，js，image)）
routers	路由文件目录
schemas	数据库结构文件目录
views	模块视图文件目录
app.js	应用（启动）入口文件
package.json

处理请求输出
	路由绑定：通过get(),post()；app.get('/',function(req,res,next){})
		 req:request对象，保存客户端数据
		 res:服务端
		 next：方法，执行下一个和路径匹配的函数
	内容输出：res.send(string);发送内容到客户端


使用模板swig：后端逻辑和页面表现分离--前后端分离


划分模块：前台，后台，API（app.use()进行模块划分）


前台路由加模板：
	main模块：/首页		/view内容页
	api模块：/首页	/register注册	/login登录	
		/comment评论获取	/comment/post评论提交


后台路由加模板：
	admin模块：/首页

	用户管理：/user用户列表
	分类管理：/category分类列表	/category/add分类添加
		 /category/edit分类修改	/category/delete分类删除
	文章内容管理：
		/article内容列表	/article/add内容添加
		 /article/edit内容修改	/article/delete内容删除
	评论内容管理：
		/comment评论列表	/commen/add评论添加
		 /commen/edit评论修改	/commen/delete评论删除




功能开发顺序：用户 -> 栏目 -> 内容 -> 评论
编码顺序：	通过Schema定义设计数据存储结构->功能逻辑->页面展示







用户注册：
    UserSchema结构设计->注册界面->注册逻辑（ajax实现注册，api接口编写）

开启mongodb数据库服务端
F:
cd Program Files\MongoDB\Server\3.4\bin
mongod.exe --dbpath=F:\testallsoftware\webstorm\nodejs\Blog\db --port=27017


端口为8081

使用localhost:8081访问主界面