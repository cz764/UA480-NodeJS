var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Cat = mongoose.model('Cat');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Cats' });
});

router.get('/cats', function(req, res) {
	Cat.find(function(err, cats, count) {
		res.render( 'cats', {
			cats: cats
		});
	});
});

router.get('/cat/create', function(req, res) {
  res.render('create');
});

router.post('/cat/create', function(req, res) {
	console.log(req.body.catName);
	new Cat({
		name: req.body.catName,
		updated_at : Date.now()
	}).save(function(err, cat, count){
		res.redirect('/cats');
	});
});

router.get('/forms', function(req, res) {
	res.render('forms', { title: 'Express' });
});

router.post('/forms', function(req, res) {
	console.log('=====\n', req.body, '\n=====');
	res.redirect('/forms');
});

module.exports = router;
