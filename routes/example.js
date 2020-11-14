const express = require('express');
const router = express.Router();
const mysqlConnection = require('../config/database.js');

// GET all Employees
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
      res.json({ code: 500, message: err.code });
    }
  });
});


// GET An Employee
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      res.json({ code: 500, message: err.code });
    }
  });
});


// DELETE An Employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM employee WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Employee Deleted' });
    } else {
      console.log(err);
      res.json({ code: 500, message: err.code });
    }
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
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Employeed Saved' });
    } else {
      console.log(err);
      res.json({ code: 500, message: err.code });
    }
  });

});


router.put('/:id', (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;
    CALL employeeAddOrEdit(@id, @name, @salary);
  `;
  mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Employee Updated' });
    } else {
      console.log(err);
      res.json({ code: 500, message: err.code });
    }
  });
});


module.exports = router;
