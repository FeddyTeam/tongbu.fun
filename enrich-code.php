<?php
// 丰富数据表中的取字码
require('sql.php');

// 先从数据表中把数据读取出来
$char = "set names 'utf8'";
$sql = "select * from codes";
$conn->query($char);
$result = $conn->query($sql);
$names_had = [];
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
    	array_push($names_had, $row["codes"]);
    }
} else {
    echo "0 结果";
}


// 然后读取文件中的名称数据
$myfile = fopen("./data/codes.txt", "r") or die("Unable to open file!");
$res = fread($myfile,filesize("./data/codes.txt"));
$temp_str = $res;
$names = explode('|', $temp_str);
fclose($myfile);
for($i=0;$i<count($names);$i++){
	if (in_array($names[i], $names_had)){
		continue;
	}else{
		// 插入到code表中
		$sql = 'insert into codes values(NULL,"'.$names[$i].'",0);';
		// 插入到cnt表中
		$sql1 = 'insert into cnts values(NULL,"'.$names[$i].'","");';
		$conn->query($char);
		$result = $conn->query($sql);
		$result = $conn->query($sql1);
	}
}
?>