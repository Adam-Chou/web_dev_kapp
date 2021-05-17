<?php
include('config.php');
$userlog = $_POST['userlog'];

$file_path = $path .'/admin_log.txt';
file_put_contents($file_path, $userlog);
header("Location: ../index.php");
exit();