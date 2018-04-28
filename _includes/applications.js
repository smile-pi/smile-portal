$( document ).ready( function() {
  var savedUser = localStorage.getItem("who");
  if (savedUser) { $("#username").attr('value', savedUser); };  
});

//     In the actual plug, get replace http://localhost:5984/smile with /couchdb
// Generate UUID
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};   

var uuid = localStorage.getItem("who_uuid");
if (!uuid) {
  localStorage.setItem("who_uuid", uuidv4());
};

$("#username").keyup(function changeName(event) {
  localStorage.setItem("who", event.target.value);
  $("#registered_username").val(event.target.value);
}); 

$('.resource-btn').on('click', function(ev) {
  console.log(ev);
  
  // get app ID and title
  var id = ev.currentTarget.getAttribute("data-app-id");
  var title = ev.currentTarget.getAttribute("data-app-title");

  // check to see if username exists
  if ( !$("input#username").val() ) {
    window.alert('Please enter your name first!');
    $('input#username').focus();
    $('input#username').css('border', '1px solid #8c1515');
    return false;
  };
  
  // post to the database that the user opened the app.
  console.log({who: localStorage.getItem("who"), who_uuid: localStorage.getItem("who_uuid"), what: "opened", message: "the " + id + " app"});
  $.ajax({
    type:"POST",
    url: "/smileService/usage", 
    data: { who: localStorage.getItem("who"), who_uuid: localStorage.getItem("who_uuid"), what: "opened", message: "the " + id + " app" }
  });
  if ($(this).next("span.app_link").attr('id') === "smile") {
    var smileUsername = localStorage.getItem("who");
    var smileUUID = localStorage.getItem("who_uuid");
    var smileLink = "/smileService/auth/lti?user=" + smileUsername + "&UUID=" + smileUUID;
    window.open(smileLink);
  } else {
    window.open($(this).next("span.app_link").text());
  }
});