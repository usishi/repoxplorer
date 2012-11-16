var express = require('express'),  
  router  = require('./lib/router'),    
  http      = require('http');

var app = express();


app.configure(function() {
  app.set('port',process.env.PORT || 8085);
  app.use(express.favicon());
  app.use('/static',express.static(__dirname + '/static'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade'); 
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(app.router);  
});

app.configure('development', function () {
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
  }));
  app.use(express.logger({ format: 'PORTAL REQUEST :status [:date] :method :url' }));
  app.use(express.logger('dev'));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

app.get('/', router.showpage);
app.get('/:folder', router.showpage);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});