<?php
require("sql.php");
// 先从数据表中把数据读取出来
$char = "set names 'utf8'";
$sql = "select * from codes where used = 0 limit 1";
$conn->query($char);
$result = $conn->query($sql);
$names_had = [];
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
    	$id = $row['id'];
    	$code = $row["codes"];
    }
} else {
    echo "0 结果";
}
// var_dump($names_had[0]);

$sql = "update codes set used=1 where id=".$id.";";
// 将数据库中的这个code设置为已用
$result = $conn->query($sql);
echo json_encode($code);
?>