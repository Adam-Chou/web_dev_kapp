<?php
include('config.php');

if(!isset($_POST['username']) || !isset($_POST['password'])){
    header("Location: index.php");
    exit();
}
//make data array
$login = array($_POST['username'], $_POST['password']);
// Grab IP
$ip_address_user = $_SERVER['REMOTE_ADDR'];
// Grab Access Time
date_default_timezone_set('America/New_York');
$access_time = date("Y-m-d H:i:s");

if($login[0] == 'adam' && $login[1] == 'whatever'){
    setCookie('login', 'admin',time() + (86400 * 30),"/");

    $items = 'Successful' .':' . $_SERVER['REMOTE_ADDR'] . ":" . $access_time;

    $file_path = $path .'/admin_log.txt';
    file_put_contents( $file_path, $items. "\n", FILE_APPEND);

    header("Location: ../index.php");
    exit();
}else{
    $items = 'Unsuccessful' .':' . $_SERVER['REMOTE_ADDR'] . ":" . $access_time;

    $file_path = $path .'/admin_log.txt';
    file_put_contents( $file_path, $items. "\n", FILE_APPEND);

    header("Location: ../index.php");
    exit();
}

