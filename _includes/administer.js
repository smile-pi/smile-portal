$ (document).ready(function(){
  jQuery.post( "/smileService/usage", { who: localStorage.getItem("who"), who_uuid: localStorage.getItem("who_uuid"), what: "opened", message: "the administer page" } );
  
    // get ethernet IP if available
  jQuery.get("/assets/scripts/get-eth0ip.php", function(data) {
      if (data) {
        $("#ethernet-ip").text(data.trim());
      };      
  });

  // get wifi mac if possible
  jQuery.get("/assets/scripts/get-wifimac.php", function(data) {
      if (data) {
        $("#wifi-mac").text(data.trim());
      };   
  });
  
  function isTeacher(e) {
    var userName = localStorage.getItem("who");
    
    if (userName && userName.toLowerCase().includes('teacher') === true) {
      return true; 
    }
    return false;
  };

  function powerOff(e) {
    // check for teacher
    var proceed = isTeacher();
    var userName = (localStorage.getItem("who")) ? localStorage.getItem("who") : 'blank';
  
    if (proceed) {
      // make the post to turn off plug
      jQuery.post("/assets/scripts/service-goodnight.php");
    } else {
      window.alert('You must be a teacher to perform this task. If you are a teacher, add the word teacher to your name, which is currently ' + userName + '.');
    }
    return this;
  };

  let reachable = hostReachable();
  if(reachable){
    $('#internet_connection_state').css('color','green');
    $('#internet_connection_state').text('Connected');
  } else {
    $('#internet_connection_state').css('color','red');
    $('#internet_connection_state').text('Disconnected');
  };
  
  
  $("#plug-power-off").on('click', function(e){
    powerOff();
  });

  $("#sync-system-date").on('click', function(e){
    syncSystemDate();
  });  
});

//     In the actual plug, replace http://localhost:5984/smile with /couchdb
//     For testing locally, replace http://localhost:5984/couchdb with /smile
$('#couchdb-export').on('click', function(){
  var localTime = new Date();
  var url = '/couchdb/_all_docs?include_docs=true'; 
  $.get(url,function (result)
  {
      var blob=new Blob([result]);
      var link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.download="smile_db_dump_"+localTime.getFullYear()+""+("0" + (localTime.getMonth() + 1)).slice(-2)+""+("0" + localTime.getDate()).slice(-2)+""+localTime.getHours()+""+localTime.getMinutes()+".txt";
      link.click();
  
  });      
});

function hostReachable() {

  // Handle IE and more capable browsers
  var xhr = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );

  // Open new request as a HEAD to the root hostname with a random param to bust the cache
  xhr.open( "HEAD", "//analysis.smile-pi.org/reachable?rand=" + Math.floor((1 + Math.random()) * 0x10000), false );

  // Issue request and handle response
  try {
    xhr.send();
    return ( xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304) );
  } catch (error) {
    return false;
  }

};