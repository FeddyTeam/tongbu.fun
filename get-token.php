<?php
	$myfile = fopen("./data/tokens.txt", "r") or die("Unable to open file!");
	$res = fread($myfile,filesize("./data/tokens.txt"));
	echo json_encode($res);
	fclose($myfile);
?>