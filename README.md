

## nodejs-mysql-api

#### \# 基础知识

-   Express 的使用（ https://zhuanlan.zhihu.com/p/70825125 ）


#### \# package.json

-  debug 
    启动 node 服务后， 监听bug并输出在控制台

-  env2 

-  express 
    nodejs服务

-  express-validation 
    nodejs 服务验证, 配合 joi 使用更好

-  joi 
    参数校验

-  jsonwebtoken 
    生成 token 的库

-  mysql 
    连接 mysql

-  uuid 
    随机id

-  考虑使用 sequelize
    Sequelize是一款基于Nodejs功能强大的异步ORM框架。
    同时支持PostgreSQL, MySQL, SQLite and MSSQL多种数据库，很适合作为Nodejs后端数据库的存储接口，为快速开发Nodejs应用奠定扎实、安全的基础。
    相关文档：
    - [官网api文档](http://docs.sequelizejs.com/)

-   考虑使用 cookie-parser
    -   文档 ： https://www.npmjs.com/package/cookie-parser


## \# 数据库

#### \# 表

ims_zhtc_distribution
ims_zhtc_information
ims_zhtc_joinlist
ims_zhtc_gorder
ims_zhtc_user  # 用户表


## \# 微信

#### \# 接口

-   微信测试号
    -   https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index

-   step.1 网页授权
    -   https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html

-   step.2 获取用户基本信息(UnionID机制) 
    - url : https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html#UinonId
    - api : https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN


## Main function

- ✔ 注册与登录接口
- ✔ 支持JWT验证
- ✔ Joi参数校验
- ✔ 支持mysql的orm框架sequelize
- ✔ apidoc接口文档自动生成
- ✔ 全局参数配置
- ✔ 自动重启
- ❓ redis支持
- ❓ 自动化测试


## Folder Structure

```
  ├── README.md  // 说明文档
  ├── app.js  // express实例化文件
  ├── bin 
  │   └── www // 主入口文件
  ├── config
  │   ├── config.js // 数据库配置
  │   └── index.js // 全局参数配置
  ├── control // Controller层目录
  │   └── userControl.js
  ├── helper // 自定义API Error拋出错误信息
  │   └── AppError.js
  ├── joi-rule // Joi 参数验证规则
  │   └── user-validation.js
  ├── models // sequelize需要的数据库models
  │   ├── index.js // 处理当前目录的所有model
  │   └── user.js // user表的model
  ├── package-lock.json
  ├── package.json
  ├── public
  │   └── apidoc // 自动生成的apidoc文档
  ├── routes // 路由目录
  │   └── user.js
  ├── service // service层目录
  │   └── user.js
  └── until // jwt认证
      └── token.js
```


更详细的apidoc文档配置可以参考[https://www.jianshu.com/p/9353d5cc1ef8](https://www.jianshu.com/p/9353d5cc1ef8)或[官网](http://apidocjs.com/)。

Joi参数校验规则。
中文设置 : https://github.com/hapijs/joi/issues/598


## 相关工具介绍

-  sequelize

    Sequelize是一款基于Nodejs功能强大的异步ORM框架。

    同时支持PostgreSQL, MySQL, SQLite and MSSQL多种数据库，很适合作为Nodejs后端数据库的存储接口，为快速开发Nodejs应用奠定扎实、安全的基础。

    相关文档：
    - [官网api文档](http://docs.sequelizejs.com/)


-   apidoc

    apidoc是一款可以由源代码中的注释直接自动生成api接口文档的工具，它几乎支持目前主流的所有风格的注释。

    例如：Javadoc风格注释(可以在C#, Go, Dart, Java, JavaScript, PHP, TypeScript等语言中使用)

    相关文档：

    * [官网](http://apidocjs.com/)
    * [【ApiDoc】官方文档(翻译)](https://www.jianshu.com/p/9353d5cc1ef8)

-   JOI
    joi就好比是一个验证器，你可以自己规范schema来限制资料格式，有点像是正规表示法，这边来举个例子好了，利如PORT只允许输入数字若输入字串就会被阻挡PORT: Joi.number()，这样有好处万一有使用者不按照规范输入数值他会在middleware抛出一个错误告诉你这边有问题要你马上修正。

    相关文档：

    * [git](https://github.com/hapijs/joi/blob/v13.0.2/API.md)

-   JWT

    JWT是JSON Web Token的缩写，通常用来解决身份认证的问题，JWT是一个很长的base64字串在这个字串中分为三个部分别用点号来分隔，第一个部分为Header，里面分别储存型态和加密方法，通常系统是预设HS256杂凑演算法来加密，官方也提供许多演算法加密也可以手动更改加密的演算法，第二部分为有效载荷，它和会话一样，可以把一些自的定义数据存储在Payload里例如像是用户资料，第三个部分为Signature，做为检查码是为了预防前两部分被中间人伪照修改或利用的机制。

    Header（标头）：用来指定哈希算法（预设为HMAC SHA256）
    Payload（内容）：可以放一些自己要传递的资料
    Signature（签名）：为签名检查码用，会有一个serect string来做一个字串签署
    把上面三个用「。」接起来就是一个完整的JWT了！

    使用流程： 使用者登入-> 产生API Token -> 进行API 路径存取时先JWT 验证-> 验证成功才允许访问该API

    相关文档：

    * [官网](https://jwt.io/)
    * [JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)


## 鸣谢

-   https://github.com/ziad-saab/reddit-nodejs-api
-   https://github.com/restapiexample/nodejs-restapi-using-express-mysql
-   https://github.com/restapiexample/nodejs-restapi-using-express-mysql
-   https://github.com/YuLeven/nodejs-graphql-mysql-example
-   https://github.com/FaztWeb/mysql-nodejs-rest-api
-   https://github.com/srinivastamada/NodeRestful
-   https://github.com/chrisveness/koa-sample-web-app-api-mysql
-   https://github.com/LiangJunrong/Node
-   https://github.com/brianschardt/node_rest_api_mysql
-   https://github.com/bezkoder/nodejs-express-sequelize-mysql
-   https://github.com/bezkoder/nodejs-express-mysql
-   https://github.com/bezkoder/nodejs-express-mysql
-   https://github.com/restapiexample/nodejs-restapi-using-express-mysql
-   https://github.com/ziad-saab/reddit-nodejs-api
-   https://github.com/wclimb/video-admin



## 联系我

如果你有好的idea，欢迎联系我 

