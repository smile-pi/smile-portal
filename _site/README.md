# README #

### What is this repository for? ###

* This repository is for a multi-lingual portal page for the SMILE-pi project (www.smile-pi.org) and for the SMILEpi Raspberry Pi-based devices.

### How do I get set up? ###

Needs Jekyll (www.jekyllrb.com)

### Who do I talk to? ###

* Reuben Thiessen (rthiessen@edify.org)

### Deployment Instructions

Edit the `/_includes/administer.js` file, line 53. 
Change from: `var url = 'http://localhost:5984/smile/_all_docs?include_docs=true';` to 
`var url = '/couchdb/_all_docs?include_docs=true';`
(note the change from `/smile` to `/couchdb`)

Build the site into `/_site`

`bundle exec jekyll build`

Copy to the SMILEpi.

`scp -r _site pi@192.168.12.1:~`

On the Raspian-based SMILEpi device, Edit sudoers and allow access to `date` without a password

`sudo visudo -f /etc/sudoers`

Add this to the sudoers file so that you can update the date without `sudo`

    ALL ALL=NOPASSWD: /sbin/fake-hwclock
    ALL ALL=NOPASSWD: /bin/date
    
 
#### NOTE THIS CURRENTLY ISN'T WORKING, BUT IT'S CLOSE!   
To delete all data (when making a fresh plug) open a console windows in Chrome and copy-paste the following code into the console:
```
var couchUrl = "";
$.getJSON("http://localhost:5984/smile/_design/usage/_view/all/", function(data) {
    data.rows.forEach(function (doc) {
	$.getJSON("http://localhost:5984/smile/"+doc.id, function(d) {
         $.ajax({
            url: 'http://localhost:5984/smile/' + d.id + '?rev=' + d.rev,
            type: 'DELETE',
            success: function(result) {
                console.log("Deleted document with id " + d.id);
            }
          });
        console.log(d);
	});
    });
});
```