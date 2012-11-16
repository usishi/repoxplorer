var fs = require('fs');


exports.showpage = function(req,res){
  var folder = req.params.folder;   
  

  geticerik(folder,function(icerik){
    console.log("gelen:"+icerik);
    res.render('root',{
      title : 'Repoxplorer',
      htmlcontent : icerik      
    });
  });      
}


function geticerik(folder,cb){
  var rootFolder="/tank/dev";
  if (typeof(folder)=='undefined') {
    rootFolder+='/';     
    folder='';
  } else {    
    rootFolder=rootFolder+folder.replace(/_/g,'/');    
  }
  console.log('folder:'+folder+'     realfolder:'+rootFolder);
  var html = '';
  fs.readdir(rootFolder, function (err, files) {    
    var fcount = files.length;
    if (err) throw err;
    files.forEach(function(file){
      fs.stat(rootFolder+'/'+file,function(err,stats){
        if (err) throw err;
        var isitGitFolder = stats.isDirectory() && (file.substring(0,1)!='.');
        if (isitGitFolder){
          html+='<li><a href='+folder+'_'+file+'>'+file+'</a>';
        }
        fcount-=1;        
        if (fcount<=0){
          cb(html);
        }
      });      
    });
  });
}


