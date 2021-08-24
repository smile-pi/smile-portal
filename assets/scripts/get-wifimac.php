<?php
 $ip = shell_exec("/sbin/ifconfig | grep -A3 wlan0 | awk '/ether(.*$)/' |  awk '{ print $2}' | tail -1  | sed s/://g | tr '[:lower:]' '[:upper:]' | tail -c 5");
 echo $ip;
?>