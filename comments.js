// Create web server
var express = require('express');
var router = express.Router();
var db = require('./db');

// GET /comments
router.get('/', function(req, res, next) {
  res.send('Comments');
});

// GET /comments/list
router.get('/list', function(req, res, next) {
  db.query('SELECT * FROM comments', function(err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

// GET /comments/add
router.get('/add', function(req, res, next) {
  res.send('Add comment');
});

// POST /comments/add
router.post('/add', function(req, res, next) {
  var comment = req.body;
  db.query('INSERT INTO comments SET ?', comment, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// GET /comments/edit/1
router.get('/edit/:id', function(req, res, next) {
  res.send('Edit comment ' + req.params.id);
});

// POST /comments/edit/1
router.post('/edit/:id', function(req, res, next) {
  var comment = req.body;
  db.query('UPDATE comments SET ? WHERE id = ?', [comment, req.params.id], function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// GET /comments/delete/1
router.get('/delete/:id', function(req, res, next) {
  res.send('Delete comment ' + req.params.id);
});

// POST /comments/delete/1
router.post('/delete/:id', function(req, res, next) {
  db.query('DELETE FROM comments WHERE id = ?', req.params.id, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;