<?php
    if (isset($_GET['year']) && isset($_GET['month']) && isset($_GET['day']) && isset($_GET['hour']) && isset($_GET['minute'])) {
      $year = $_GET['year'];
      echo $year;
      $month = $_GET['month'];
      echo $month;
      $day = $_GET['day'];
      echo $day;
      $hour = $_GET['hour'];
      echo $hour;
      $minute = $_GET['minute'];
      echo $minute;
      $datetime = shell_exec("sudo date -s \"{$year}-{$month}-{$day} {$hour}:{$minute}:00.00\"");
      $save_date = shell_exec('sudo fake-hwclock save force');
      if ($datetime) {
        echo "success";
      }
      echo $datetime;
    } else {
      echo "datetime URL parameters required";
    }
?>
