
const express = require('express')
const router = express.Router()
const validate = require('express-validation')
const Joi = require('joi')
const https = require('https')


/**
 * @api {post} /admin/user/get_access_token 
 * @apiDescription 通过code换取网页授权access_token
 * @apiGroup overtime
 * @apiParam {string} code 
 * 
 */
router.get('/user/get_access_token', (req, res) => {
    const { code } = req.query;
    const wx_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx0ffa68eeb51a122f&secret=556638ad7b0eaeec6ea3ce4fc3d787ec&code=${code}&grant_type=authorization_code`
    https.get(wx_url, function (wx_res) {
        wx_res.setEncoding('utf8');
        let rawData = '';
        wx_res.on('data', function (chunk) {
            rawData += chunk;
        });
        wx_res.on('end', function (err) {
            try {
                const parsedData = JSON.parse(rawData);
                res.json({ data: parsedData, code: 200 });
            } catch (e) {
                res.json(e);
            }
        });
    });
});


/**
 * @api {post} /admin/user/get_userinfo
 * @apiDescription 通过 access_token 拉取用户信息
 * @apiGroup overtime
 * @apiParam {string} access_token 
 * 
 */
router.get('/user/get_userinfo', (req, res) => {
    const { access_token, openid } = req.query;
    const wx_url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
    https.get(wx_url, function (wx_res) {
        wx_res.setEncoding('utf8');
        let rawData = '';
        wx_res.on('data', function (chunk) {
            rawData += chunk;
        });
        wx_res.on('end', function (err) {
            try {
                const parsedData = JSON.parse(rawData);
                res.json({ data: parsedData, code: 200 });
            } catch (e) {
                res.json(e);
            }
        });
    });
});


module.exports = router