<?php

$username = $_POST["username"];
$password = $_POST["password"];


$redis = new Redis(); 
$redis->connect('127.0.0.1', 6379);

$sessionId = uniqid();
$data = array(
'username'=>$username,
'password'=>$password
);

$redis->set('$sessionId', json_encode($data));
$redis->expire('$sessionId',600);
echo  $sessionId;

?>