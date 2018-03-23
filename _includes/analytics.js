// In the actual plug, get replace `http://localhost:5984/smile` with `/couchdb`
$.get('/couchdb/_design/usage/_view/all?descending=true&include_docs=true&stale=update_after', function( data ) {
  response = $.parseJSON(data);
  $(function() {
      $.each(response.rows, function(i, item) {
          var $tr = $('<li class="user '+item.doc.who_uuid+'" data-filter-name="'+item.doc.who+'">').append(
              '<a class="toggle-user" data-filter-uuid="'+ item.doc.who_uuid +'">'+item.doc.who +'</a> ',
              item.doc.what, ' ',
              item.doc.message, ' ',
              timeSince(item.doc.when)
          ).appendTo('#usage-log');
          $('.toggle-user').on('click', toggleUser);
      });
  });
});

function timeSince(date) {
      var seconds = Math.floor((new Date() - new Date(date)) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval >= 1) {
          return date;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
          return date;
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
          return interval + " day" + (interval !== 1 ? 's' : '' )+ " ago";
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
          return interval + " hour" + (interval !== 1 ? 's' : '' )+ " ago";
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
          return interval + " minute" + (interval !== 1 ? 's' : '' )+ " ago";
      }
      interval = Math.floor(seconds);
      return interval + " second" + (interval !== 1 ? 's' : '' )+ " ago";
  };  
  
  $("#user-filter").keyup(function(e) {
      var string = e.target.value.toLowerCase();
      console.log(string);

      // hide all lines
      $("#usage-log li.user").hide();

      // loop through all lines
      $("#usage-log li.user").each(function(index) {
          // if includes search string, show
          if ($(this).data('filter-name').toLowerCase().includes(string)) {
              $(this).show();
          }
      });
  });
  
  function toggleUser (ev) {
    
        var uuid = $(ev.currentTarget).data('filter-uuid');
        console.log(uuid);
        // hide opacity for user ids
        $("#usage-log li.user").css("opacity", 0.2);
        $("#usage-log li.user." + uuid).css("opacity", 1);
  };