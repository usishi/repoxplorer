
function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) val = "0" + val;
  return val;
};


function TurkceTarih(_date){
   // Günler
   var weekday = new Array(7);
   weekday[1] = 'Pazar';
   weekday[2] = 'Pazartesi';
   weekday[3] = 'Salı';
   weekday[4] = 'Çarşamba';
   weekday[5] = 'Perşembe';
   weekday[6] = 'Cuma';
   weekday[7] = 'Cumartesi';
   // Aylar
   var month = new Array(12);
   month[1] = 'Ocak';
   month[2] = 'Şubat';
   month[3] = 'Mart';
   month[4] = 'Nisan';
   month[5] = 'Mayıs';
   month[6] = 'Haziran';
   month[7] = 'Temmuz';
   month[8] = 'Ağustos';
   month[9] = 'Eylül';
   month[10] = 'Ekim';
   month[11] = 'Kasım';
   month[12] = 'Aralık';

   yr_st = " 19";
   yr = _date.getYear();
   if ( yr > 99 )
   {
   yr_st =" ";
   if ( yr < 2000 ) yr += 1900;
   }
   
   return _date.getDate() + ' ' 
          + month[_date.getMonth()+1] + ' ' 
          + yr_st+ yr + ' ' 
          + pad(_date.getHours(),2) + ":" + pad(_date.getMinutes(),2) + ":" + pad(_date.getSeconds(),2) // + ','
          //+ weekday[_date.getDay()+1] 
}

function getOValue(objname) {
  var obj = document.getElementById(objname);
  if (obj.type=='checkbox'){
    if (obj.checked) { return 'on';  } else { return 'off'; }
  } else {
    return document.getElementById(objname).value;   
  }
 
}


function postData(url,data, callback) {
    $.ajax(url, {
        type: 'POST',
        contentType: 'application/json',
        dataType:'json',
        data: JSON.stringify(data),
        cache:false,
        
        success: function(data, textStatus, jqXHR) {
          var obj = jQuery.parseJSON(jqXHR.responseText);
          callback(obj);          
        },
        error  : function() { if ( callback ) callback(undefined); }
    });
}


function getLog(repo,str) {

  $('#divGitLogTitle').empty();
  $('#divGitLogTitle').append('Log for ['+repo+'] /// Loading ...');
  $('#tblGitLog').empty();
  postData('/ask/gitLog/',{folder:str},function(retVal){
    var objarr = JSON.parse(retVal);
    var ocount=objarr.length;
    $.each(objarr,function(i,itm){      
      $('#tblGitLog').append("<tr><td>"+itm.author+"</td><td>"+itm.message+"</td><td>"+TurkceTarih(new Date(itm.date*1000))+"</td></tr>");
      ocount-=1;
      if (ocount<=0) {
        $('#divGitLogTitle').empty();
        $('#divGitLogTitle').append('Log for ['+repo+']');
      }
    });     
    $('#divGitLog').show();
  });
}


function showPath(str){
  alert(str);
}