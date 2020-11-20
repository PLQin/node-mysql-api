const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/database.js');

// GET all Employees
router.get('/', async (req, res) => {
  const rows = await mysqlConnection(res, 'SELECT * FROM employee')
  res.json({ code: 200, data: rows });
});


/**
 * @api {post} /:id 
 * @apiDescription GET An Employee
 * @apiGroup *
 * @apiName :id  
 * 
 */
router.get('/:id', async (req, res) => {
  const { id } = req.query;
  const rows = await mysqlConnection(res, 'SELECT * FROM employee WHERE id = ?', [id])
  res.json({ code: 200, data: rows[0] });
});


// INSERT An Employee
router.post('/', async (req, res) => {
  const { id, name, salary } = req.body;
  const sql = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  const rows = await mysqlConnection(res, sql, [id, name, salary])
  res.json({ code: 200, data: rows });
});


/**
 * @api {post} /user/add 
 * @apiDescription 添加一个用户 | INSERT An User
 * @apiGroup user
 * @apiName add
 * @apiParam {string} user_data 
 * 
 */
router.post('/user/add', async (req, res) => {
  let { openid = 0, name, salary } = req.query;
  let params = [openid, name, salary]
  let sql = `insert into ims_zhtc_user (openid) values(?);`;

  const rows = await mysqlConnection(res, sql, params)
  res.json({ code: 200, data: rows });
});


// post 和 put请求方法区别点简析
// https://www.jianshu.com/p/e0b39b52672c
router.put('/:id', async (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.query;
  const sql = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;

  const rows = await mysqlConnection(res, sql, [id, name, salary])
  res.json({ code: 200, data: rows, message: 'Employee Updated' });
});


module.exports = router;
