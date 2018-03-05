<?php
	require('./sql.php');
	$code  = $_REQUEST['code'];

	$char = "set names 'utf8'";
	$sql = 'select * from cnts where code =  "'.$code.'" limit 1';
	$conn->query($char);
	$result = $conn->query($sql);
	$res = '';
	if ($result->num_rows > 0) {
	    // 输出数据
	    while($row = $result->fetch_assoc()) {
	    	$res = $row['content'];
	    }
	} else {
	    echo "0 结果";
	}
	echo json_encode($res);

?>