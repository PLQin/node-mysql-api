/**
 * 用户信息 | 2020年8月2日 21:09:54
 * 
 */

const router = require('express').Router()
const validate = require('express-validation')
const Joi = require('joi')
const mysqlConnection = require('../config/database.js');


/**
 * @api {get} /admin/user/statistics  
 * @apiDescription 用户统计
 * @apiGroup user    
 * @apiName user
 * @apiParam {string} 
 * 
 */
router.get('/admin/user/statistics', async (req, res) => {
  // 累积使用（注册）用户
  const nums = await mysqlConnection(res, `SELECT COUNT(*) AS nums FROM ims_zhtc_user;`)

  // 今日访客
  const tvrs = await mysqlConnection(res, `SELECT * FROM ims_zhtc_user where date(create_time) = curdate();`)

  res.json({
    code: 200,
    data: {
      nums: nums[0],
      today_visitors: tvrs.length,
    }
  });
});


/**
 * @api {get} /admin/user/list  
 * @apiDescription 用户列表
 * @apiGroup user    
 * @apiName user
 * @apiParam {string} 
 * 
 */
router.get('/admin/user/list', async (req, res) => {
  let { page_size = 20, page_num = 1, id, nickname } = req.query;
  let params = []
  let sql = `SELECT * FROM ims_zhtc_user WHERE 1 = 1`

  if (id) {
    sql += ` AND id = ?`
    params.push(Number(id))
  }
  if (nickname) {
    sql += ` AND nickname = ?`
    params.push(nickname)
  }

  sql += ` limit ${(Number(page_num) - 1) * Number(page_size)},${Number(page_size)}`

  const rows = await mysqlConnection(res, sql, params)
  res.json({ code: 200, data: rows });
});


/**
 * @api {get} /admin/user/detail  
 * @apiDescription 用户详情
 * @apiGroup user    
 * @apiName user
 * @apiParam {string} 
 * 
 */
router.get('/admin/user/detail', async (req, res) => {
  let {
    id
  } = req.query;

  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    let params = []
    let sql = `SELECT * FROM ims_zhtc_user WHERE 1 = 1`
    if (id) {
      sql += ` AND id = ?`
      params.push(Number(id))
    }

    connection.query(sql, params, (err, rows, fields) => {
      if (!err) {
        if (rows && rows[0]) {
          res.json({ code: 200, data: rows[0] });
        } else {
          res.json({ code: 100001, data: {}, message: '没有更多的数据' });
        }
      } else {
        console.log(err);
        res.json({ code: 500, message: err.code });
      }

      connection.release();
    });
  });
});


/**
 * @api {post} /admin/user/ban  
 * @apiDescription 封禁单个用户
 * @apiGroup user    
 * @apiName user
 * @apiParam {string} 
 * 
 */
router.post('/admin/user/ban', async (req, res) => {
  let { id, status } = req.body;
  let params = []
  let sql = `UPDATE ims_zhtc_user`
  if (status) {
    sql += ` SET status=?`
    params.push(Number(status))
  }
  sql += ` WHERE id=?`;
  params.push(Number(id))

  const rows = await mysqlConnection(res, sql, params)
  if (rows.affectedRows) {
    res.json({ code: 200, data: {}, message: '' });
  } else {
    res.json({ code: 100001, data: {}, message: '找不到对应的数据' });
  }
});


module.exports = router

