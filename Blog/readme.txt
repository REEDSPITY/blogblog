��Ŀ�ṹ����
Ŀ¼�ṹ
db	���ݿ�洢Ŀ¼
models	���ݿ�ģ���ļ�Ŀ¼
node_modules	node������ģ��Ŀ¼
public	�����ļ�Ŀ¼��css��js��image)��
routers	·���ļ�Ŀ¼
schemas	���ݿ�ṹ�ļ�Ŀ¼
views	ģ����ͼ�ļ�Ŀ¼
app.js	Ӧ�ã�����������ļ�
package.json

�����������
	·�ɰ󶨣�ͨ��get(),post()��app.get('/',function(req,res,next){})
		 req:request���󣬱���ͻ�������
		 res:�����
		 next��������ִ����һ����·��ƥ��ĺ���
	���������res.send(string);�������ݵ��ͻ���


ʹ��ģ��swig������߼���ҳ����ַ���--ǰ��˷���


����ģ�飺ǰ̨����̨��API��app.use()����ģ�黮�֣�


ǰ̨·�ɼ�ģ�壺
	mainģ�飺/��ҳ		/view����ҳ
	apiģ�飺/��ҳ	/registerע��	/login��¼	
		/comment���ۻ�ȡ	/comment/post�����ύ


��̨·�ɼ�ģ�壺
	adminģ�飺/��ҳ

	�û�����/user�û��б�
	�������/category�����б�	/category/add�������
		 /category/edit�����޸�	/category/delete����ɾ��
	�������ݹ���
		/article�����б�	/article/add�������
		 /article/edit�����޸�	/article/delete����ɾ��
	�������ݹ���
		/comment�����б�	/commen/add�������
		 /commen/edit�����޸�	/commen/delete����ɾ��




���ܿ���˳���û� -> ��Ŀ -> ���� -> ����
����˳��	ͨ��Schema����������ݴ洢�ṹ->�����߼�->ҳ��չʾ







�û�ע�᣺
    UserSchema�ṹ���->ע�����->ע���߼���ajaxʵ��ע�ᣬapi�ӿڱ�д��

����mongodb���ݿ�����
F:
cd Program Files\MongoDB\Server\3.4\bin
mongod.exe --dbpath=F:\testallsoftware\webstorm\nodejs\Blog\db --port=27017


�˿�Ϊ8081

ʹ��localhost:8081����������