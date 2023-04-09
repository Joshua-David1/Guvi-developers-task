<?php

$bulk = new MongoDB\Driver\BulkWrite;

$username = $_POST['username'];
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$phone = $_POST['phone'];


$filter = array('username'=>$username);
$update = array('$set'=> array(
	"fullname"=>$fullname,
	"email"=>$email,
	"phone"=>$phone,
));

$options = array('multi'=>false,'upsert'=>false);
$bulk->update($filter,$update,$options);

$manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
$result = $manager->executeBulkWrite('db.personalInfo',$bulk);



$servername="localhost";
$dbusername="root";
$dbpassword="toor";
$dbname="personinfo";

$conn=new mysqli($servername,$dbusername,$dbpassword,$dbname);

if($conn->connect_error){
	die("Connection failed: ".$conn->connect_error);
}


$stmt = $conn->prepare("UPDATE reg_details SET email=? WHERE username=?");
$stmt->bind_param("ss",$email,$username);



$stmt->execute();

?>