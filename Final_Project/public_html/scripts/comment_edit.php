<?php
include('config.php');
$image_num = $_POST['image'];
$text_file = $_POST['comments'];

$file_path = $path .'/comments_image'. strval($image_num) . '.txt';
file_put_contents($file_path, $text_file);
header("Location: ../index.php");
exit();