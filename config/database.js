const mysql = require('mysql');
const config = require('./index.js');


// 创建一个连接池并直接使用它
// 解决了 express mysql Error: Cannot enqueue Query after fatal error. 的问题
// 见： https://github.com/mysqljs/mysql#pooling-connections
// 其他参考资料： 
//    - [Node.js与数据库](https://itbilu.com/nodejs/npm/NyPG8LhlW.html#pool)
//    - [Node.js与连接池](https://blog.csdn.net/wb_001/article/details/79000522)
//    - [服务器关闭连接](https://stackoverflow.com/questions/13018227/reproduce-mysql-error-the-server-closed-the-connection-node-js)
let pool = mysql.createPool(Object.assign(config, {

  // 启用后，您可以通过用分号 multipleStatements 分隔每个语句来对多个语句执行查询。结果将是每个语句的数组。
  // 见: https://www.itranslater.com/qa/details/2582855167196529664
  // 见: https://www.runoob.com/nodejs/nodejs-mysql.html
  multipleStatements: true,
}));


/**
 * 
 * @param {*} res 
 * @param {*} sql sql语句
 * @param {*} params 
 */
let connection = (res, sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        // reject(err)
        res.json({ code: 500, message: err.code });
        connection.release()

        console.error(`CONNECTION ERROR : ----------------------------`);
        console.error(err);
        return
      }

      connection.query(sql, params, (err, rows) => {
        if (err) {
          // reject(err)
          res.json({ code: 500, message: err.code });
          connection.release()

          console.error(`SQL ERROR : ----------------------------`);
          console.error(err);
          return
        }

        resolve(rows)
        connection.release()
      })
    })
  })
}


module.exports = connection;
