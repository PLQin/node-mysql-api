const mysql = require('mysql');
const config = require('./index.js');


// 创建一个连接池并直接使用它
// 解决了 express mysql Error: Cannot enqueue Query after fatal error. 的问题
// 见： https://github.com/mysqljs/mysql#pooling-connections
let connection = mysql.createPool(Object.assign(config, {

  // 启用后，您可以通过用分号 multipleStatements 分隔每个语句来对多个语句执行查询。结果将是每个语句的数组。
  // 见： https://www.itranslater.com/qa/details/2582855167196529664
  multipleStatements: true,
}));


module.exports = connection;
