const express = require('express');
const app = express();
require('env2')('./.env')


// port
const port = process.env.PORT || 4000
app.set('port', port);


/**
 * 针对POST和PUT请求, 处理前端 send 的 json 数据
 * https://expressjs.com/en/api.html
 * 
 */
app.use(express.json());


/**
 * https://wiki.jikexueyuan.com/project/express-guide/express-behind-proxies.html
 * 
 */
app.set('trust proxy', function (ip) {
    if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
    else return false;
})


// routes
app.use(require('./routes/user'));


/**
 * starting the server
 * 
 */
app.listen(port, () => {
    console.log(`http server start, please visit http://localhost:${port} or http://localhost:${port}/apidoc`)
});

