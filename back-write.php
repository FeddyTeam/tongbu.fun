<?php
$data = $_GET["data"];
$myfile = fopen("db.txt", "w") or die("Unable to open file!");
// clear
fwrite($myfile,"");
// write new string
fwrite($myfile, $data);
echo json_encode("success");
?>