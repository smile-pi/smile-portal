//https://stackoverflow.com/a/4428396/178673
Date.prototype.isSameDateAs = function(pDate) {
  return (
    this.getFullYear() === pDate.getFullYear() &&
    this.getMonth() === pDate.getMonth() &&
    this.getDate() === pDate.getDate()
  );
}

function syncSystemDate(){
    $.ajax({
        success: function (data, status, xhr) {
          var st = xhr.getResponseHeader('Date');
          syncTheDates(st);
    	},
    	  failure: function (data, status, xhr) {
      	  var st = data.getResponseHeader('Date')
          syncTheDates(st);
      }
    });
};

function syncTheDates(st){
  var serverTime = new Date(st);
  var localTime = new Date();
  console.log(localTime);
  console.log(serverTime);
  var months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];   
  $('#client_time').html(localTime.getDate()+" "+months[localTime.getMonth()]+" "+localTime.getFullYear());
  $('#server_time').html(serverTime.getDate()+" "+months[serverTime.getMonth()]+" "+serverTime.getFullYear());
  
  // Check twice if server time is updated.
  for(i = 0; i < 2; i++) { 
    if (!localTime.isSameDateAs(serverTime)) {
      console.log("Update Server Time");
      $.get("/assets/scripts/update_clock.php?year="+localTime.getFullYear()+"&month="+(localTime.getMonth()+1)+"&day="+localTime.getDate()+"&hour="+localTime.getHours()+"&minute="+localTime.getMinutes()); 
    } else {
      console.log("Server Date Matches Device Date.")
    };
  };
}

syncSystemDate();

