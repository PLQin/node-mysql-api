if (process.env.NODE_ENV === 'production') {
  require('env2')('./.env.prod')
} else {
  require('env2')('./.env')
}


const { env } = process;
const fs = require('fs')
const express = require('express');
const cors = require('cors')
const portfinder = require('./utils/port.js');
const app = express();


/**
 * set proxy
 * https://wiki.jikexueyuan.com/project/express-guide/express-behind-proxies.html
 * 
 */
app.set('trust proxy', function (ip) {
  if (env.NODE_ENV === 'development') return true
  if (ip === '127.0.0.1' || ip === '192.168.40.51') return true; // trusted IPs
  else return false;
})


/**
 * cross-domain
 * 
 * 使用 cors 可以解决 iphone6 无法跨域的问题
 */
app.use(cors());
app.options('*', cors());
app.all('*', cors());
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});


/**
 * 针对POST和PUT请求, 处理前端发送给后端的 json 数据(parse application/json)
 * https://expressjs.com/en/api.html
 * 
 * 当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
 * 想要post请求得到值，设置extended是必须的
 * 
 * 不再需要使用 app.use(bodyParser.json()) 或者 app.use(bodyParser.urlencoded({ extended: true }))
 * 
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routers
// Routes that are not in the whitelist are called by app.use
const routerFiles = fs.readdirSync("./routers");
const whiteRoute = ['example.js'];
for (let index = 0; index < routerFiles.length; index++) {
  const routerFile = routerFiles[index]
  if (!whiteRoute.includes(routerFile)) app.use(require('./routers' + '/' + routerFile));
}


/**
 * starting the server
 * 
 */
let port = env.API_PORD || 49152
portfinder(Number(port)).then((p) => {
  port = p
  app.listen(port, () => {
    console.log(`http server start, please visit http://localhost:${port}`)
  });
})
