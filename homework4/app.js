var http = require('http'),
	express = require('express'),
	app = express(),
	path = require('path'),
	port = 3000,
	bodyParser = require('body-parser'),
	publicPath = path.resolve(__dirname, "public"),
	handlebars = require('express-handlebars')
					.create({defaultLayout:'main'});

var birds = [
		{quantity: 3, name: "Bald Eagle"}, 
		{quantity: 7, name: "Yellow Billed Duck"},
		{quantity: 4, name: "Great Cormorant"}
	];

// project set up
app.use(express.static(publicPath));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.text("defaultCharset"));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	console.log(req.method, req.path);
	console.log(req.body);
	next();
});

app.get('/', function(req, res){
	res.render('index');
});

app.get('/birds', function(req, res) {
	res.render('birds.handlebars', {'birds': birds});
});

app.listen(port);
console.log('Started server on port ' + port);

