var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({'defaultLayout':'main'})

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.render('home');
});

app.listen(port, function(){
    console.log('estou rodando na porta' + port);
});
