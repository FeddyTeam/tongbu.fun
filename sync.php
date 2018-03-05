<?php
	require('./sql.php');
	// 准备要插入的数据
	$code  = $_REQUEST['code'];
	$content  = $_REQUEST['content'];
	$char = "set names 'utf8'";

	$sql = 'update cnts set content = "'.$content.'" where code = "'.$code.'"';
	$conn->query($char);
	$result = $conn->query($sql);
	echo json_encode($result)
?>