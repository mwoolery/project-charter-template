var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; 
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
if(month==9 && day<=31 && year==2018){
    $(window).on('load',function(){
        $('#myModal').modal('show');
    });
    document.getElementsByClassName('modalbtn').style.visibility = 'visible';
}
else{
    document.getElementsByClassName('modalbtn').style.visibility = 'hidden';
}


