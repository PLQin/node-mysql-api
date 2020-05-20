const env2 = require('env2')

if (process.env.NODE_ENV === 'production') {
    env2('./.env.prod');

    // 很奇怪, 在服务器中env2使用不生效
    Object.assign(process.env, {
        MYSQL_HOST: "localhost",
        MYSQL_PORT: 3306,
        MYSQL_DB_NAME: "applet_overtime",
        MYSQL_USERNAME: "applet_overtime",
        MYSQL_PASSWORD: "7TLnFKsSrdYtRRp2",
    })
} else {
    env2('./.env')
}

const { env } = process

module.exports = {
    development: { // 开发环境 mysql 配置
        username: env.MYSQL_USERNAME,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DB_NAME,
        host: env.MYSQL_HOST,
        port: env.MYSQL_PORT,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        // dialectOptions: {
        // socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
        // },
    },
    production: { // 生产环境 mysql配置
        username: env.MYSQL_USERNAME,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DB_NAME,
        host: env.MYSQL_HOST,
        port: env.MYSQL_PORT,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        }
    }
}