var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({'defaultLayout':'main'})
var mysql      = require('mysql');


function dbcomm(){
    var connection = mysql.createConnection({
        host: 'us-cdbr-iron-east-04.cleardb.net',
        user: 'bf7a479c9a0624',
        password: 'b00ad510',
        database: 'ad_77da0894d684a9d'
    });

    connection.connect(function(err){
        if(err){
            console.log('Deu pau na conexão com o banco de dados ' + err);
        }
    });
    return connection;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.render('home');
});

app.get('/contact/add', function(req, res){
    res.render('contactform');
});

app.get('/contact', function(req, res){
    var conn = dbcomm();

    conn.query('select id,name,email,phone from contact',
    		function(err,rows,fields){
    			console.log(rows);
    			res.render('contact',{data:rows});
    		}
	  );
});

app.get('/contact/update',function(req,res){
  	var id = req.query.id;
  	var conn = dbcomm();

    conn.query('select id,name,email,phone from contact where id = ?',
    		id,
    		function(err,rows,fields){
    			console.log(rows);

    			res.render('contactform',{data:rows[0]});
    		}
  	);
});

app.post('/contact/save', function(req, res){
    console.log(req.body);

    var conn = dbcomm();

    if (req.body.id == 0){
      conn.query('insert into contact(name, email, phone) values(?, ?, ?)',
          [req.body.name, req.body.email, req.body.phone],
          function(err, rows, fields){
              if(err)
                  console.log('Deu problema na inserção dos dados ' + err);
          });
    }else{
      conn.query('update contact set name=?,email=?,phone=? where id = ?' ,
        [req.body.name, req.body.email, req.body.phone, req.body.id],
        function(err,rows,fields){
          if(err)
            console.log('Deu problema na atualização dos dados '  + err);
        });
    }

    res.redirect('/contact');
});

app.listen(port, function(){
    console.log('estou rodando na porta' + port);
});
