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
`var url = 'http://localhost:5984/couchdb/_all_docs?include_docs=true';`
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