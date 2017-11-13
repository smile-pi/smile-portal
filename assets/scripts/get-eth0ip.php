<?php  	
   $ip = shell_exec("/sbin/ifconfig | grep -A1 eth0 | sed -n '1!p' |  awk '{ print $2}'");
   echo $ip;
?>