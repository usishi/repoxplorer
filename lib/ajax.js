var spawn = require('child_process').spawn;
var jsonstr = "";

var sendReturn = function(res,returnVal) {
    res.contentType('application/json');    
    res.send(JSON.stringify(returnVal));
    console.log('return sent');
};

exports.getAnswer = function(req,res){
  var rootFolder=Config.gitRepoFolder;
  var folder = req.body.folder;
  if (typeof(folder)=='undefined') {
    rootFolder+='/';     
    folder='';
  } else {    
    rootFolder=rootFolder+folder.replace(/;/g,'/').replace('//','/');
  }
  console.log("Log for :"+rootFolder);
  jsonstr="";

  var ps = spawn('git', ["log","--pretty=format:{%n  \"commit\": \"%H\",%n  \"author\": \"%an <%ae>\",%n  \"date\": \"%at\",%n  \"message\": \"%s\"%n},","."],{cwd:rootFolder});
    
    ps.stdout.on('data', function (data) {
      jsonstr+=data;
    });
    ps.on('exit', function (code) {
      sendReturn(res,'['+jsonstr.slice(0,-1)+']');  
    });    
}