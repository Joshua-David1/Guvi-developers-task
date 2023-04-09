<?php

$sessionId = $_POST['sessionId'];

$redis = new Redis();
$redis->connect('127.0.0.1',6379);
$cachedEntry = $redis->get('$sessionId');

if($cachedEntry){
	echo $cachedEntry;
}else{
	echo '[-]Session Expired';
}

?>