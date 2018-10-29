var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; 
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
if(month<=11 && day<=30 && year===2018){
    $(window).on('load',function(){
        $('#myModal').modal('show');
    });
    document.getElementById('modalvis').style.display= 'block';
}
else{
    document.getElementById('modalvis').style.display= 'none';
}


