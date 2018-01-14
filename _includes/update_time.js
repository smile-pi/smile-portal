//https://stackoverflow.com/a/4428396/178673
Date.prototype.isSameDateAs = function(pDate) {
  return (
    this.getFullYear() === pDate.getFullYear() &&
    this.getMonth() === pDate.getMonth() &&
    this.getDate() === pDate.getDate()
  );
}

// https://stackoverflow.com/questions/20269657/right-way-to-get-web-server-time-and-display-it-on-web-pages
function srvTime(){
  return $.ajax().getResponseHeader( 'Date' ); 
};

function syncSystemDate(){
    $.when( srvTime() ).then(function(st){
    var serverTime = new Date(st);
    var localTime = new Date();
    console.log(localTime);
    console.log(serverTime);
    $('#client_time').html(localTime);
    $('#server_time').html(serverTime);
    
    // Check twice if server time is updated.
    for(i = 0; i < 2; i++) { 
      if (!localTime.isSameDateAs(serverTime)) {
        console.log("Update Server Time");
        $.get("/assets/scripts/update_clock.php?year="+localTime.getFullYear()+"&month="+(localTime.getMonth()+1)+"&day="+localTime.getDate()+"&hour="+localTime.getHours()+"&minute="+localTime.getMinutes()); 
      } else {
        console.log("Server Date Matches Device Date.")
      };
    };
  });
};

syncSystemDate();


