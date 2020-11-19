const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/database.js');

// GET all Employees
router.get('/', (req, res) => {
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    connection.query('SELECT * FROM employee', (err, rows, fields) => {
      if (!err) {
        res.json({ data: rows });
      } else {
        res.json({ code: 500, message: err.code });
        console.log(err);
      }

      connection.release();
    });
  });
});


/**
 * @api {post} /:id 
 * @apiDescription GET An Employee
 * @apiGroup *
 * @apiName :id  
 * 
 */
router.get('/:id', (req, res) => {
  const { id } = req.query;
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    connection.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        res.json({ code: 500, message: err.code });
        console.log(err);
      }

      connection.release();
    });
  });
});


// DELETE An Employee
router.delete('/:id', (req, res) => {
  const { id } = req.query;
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    connection.query('DELETE FROM employee WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Employee Deleted' });
      } else {
        console.log(err);
        res.json({ code: 500, message: err.code });
      }

      connection.release();
    });
  });
});


// INSERT An Employee
router.post('/', (req, res) => {
  const { id, name, salary } = req.body;
  console.log(id, name, salary);
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    connection.query(query, [id, name, salary], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Employeed Saved' });
      } else {
        console.log(err);
        res.json({ code: 500, message: err.code });
      }

      connection.release();
    });
  });
});


/**
 * @api {post} /user/add 
 * @apiDescription 添加一个用户 | INSERT An User
 * @apiGroup user
 * @apiName add
 * @apiParam {string} user_data 
 * 
 */
router.post('/user/add', (req, res) => {
  let {
    openid = 0,
    name,
    salary
  } = req.query;
  let params = [openid, name, salary]
  let query = `insert into ims_zhtc_user (openid) values(?);`;

  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err; // not connected!

    connection.query(query, params, (err, rows, fields) => {
      if (!err) {
        res.json({ data: {}, code: 200 });
      } else {
        console.log(err);
        res.json({ code: 500, message: err.code });
      }

      connection.release();
    });
  });
});


// post 和 put请求方法区别点简析
// https://www.jianshu.com/p/e0b39b52672c
router.put('/:id', (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.query;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;

  mysqlConnection.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    connection.query(query, [id, name, salary], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Employee Updated' });
      } else {
        console.log(err);
        res.json({ code: 500, message: err.code });
      }

      connection.release();
    });
  });
});


module.exports = router;
