var fs = require('fs'),
    run = require('comandante');


exports.showpage = function(req,res){
  var folder = req.params.folder;   
  

  geticerik(folder,function(dirlist,gitlist){
    res.render('root',{
      title : 'Repoxplorer',
      dirlist : dirlist,
      gitlist : gitlist
    });
  });      
}


function geticerik(folder,cb){
  
  var rootFolder=Config.gitRepoFolder;
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
          if ((fs.existsSync(workingFolder+'/description')) || (fs.existsSync(workingFolder+'/.git'))){
            gitList+='<tr><td>Git Repo : '+file+'</td><td>';
            gitList+='<a href="javascript:getLog(\''+file+'\',\''+folder+';'+file+'\');">- Log</a> &nbsp;';
            gitList+='<a href="javascript:showPath(\''
              +Config.gitUrlRoot+workingFolder.slice(Config.gitRepoFolder.length+1).replace('//','/')+'\')">- Path</a>';
            gitList+='</td></tr>';
          } else {
            dirList+='<li><a href='+folder+';'+file+'>'+file+'</a></li>';
          }
        }
        fcount-=1;        
        if (fcount<=0){
          cb(dirList,gitList);
        }
      });      
    });
  });
}


