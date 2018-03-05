<?php
$myfile = fopen("db.txt", "r") or die("Unable to open file!");
$res = fread($myfile,filesize("db.txt"));
echo json_encode($res);
fclose($myfile);
?>