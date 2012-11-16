var fs = require('fs'),
    run = require('comandante');


exports.showpage = function(req,res){
  var folder = req.params.folder;   
  

  geticerik(folder,function(icerik){
    res.render('root',{
      title : 'Repoxplorer',
      htmlcontent : icerik      
    });
  });      
}


function geticerik(folder,cb){
  //var rootFolder="/tank/dev";
  var rootFolder="/Users/macbookpro/projects";
  if (typeof(folder)=='undefined') {
    rootFolder+='/';     
    folder='';
  } else {    
    rootFolder=rootFolder+folder.replace(/;/g,'/');    
  }
  console.log('folder:'+folder+'     realfolder:'+rootFolder);
  var dirList = '';
  var gitList = '';
  fs.readdir(rootFolder, function (err, files) {    
    var fcount = files.length;
    if (err) throw err;
    files.forEach(function(file){
      var workingFolder=rootFolder+'/'+file;
      fs.stat(workingFolder,function(err,stats){
        if (err) throw err;
        var isitNormalFolder = stats.isDirectory() && (file.substring(0,1)!='.');
        if (isitNormalFolder){
          if (fs.existsSync(workingFolder+'/description')){
            gitList+='<li>'+file+'</li>';
            run('git', [ 'log' ]).pipe(process.stdout);
          } else {
            dirList+='<li><a href='+folder+';'+file+'>'+file+'</a></li>';
          }
        }
        fcount-=1;        
        if (fcount<=0){
          cb(dirList);
        }
      });      
    });
  });
}


