<?php


$servername="localhost";
$dbusername="root";
$dbpassword="toor";
$dbname="personinfo";

$conn=new mysqli($servername,$dbusername,$dbpassword,$dbname);

if($conn->connect_error){
	die("Connection failed: ".$conn->connect_error);
}


$stmt = $conn->prepare("INSERT INTO reg_details VALUES(?,?,?)");
$stmt->bind_param("sss",$username,$email,$password);

$fullname=$_POST['fullname'];
$email=$_POST['email'];
$username=$_POST['username'];
$password=$_POST['password'];
$phone=$_POST['phone'];
$date=$_POST['date'];
$age=$_POST['age'];


$stmt->execute();


echo "[+]Added a new row!";


$mongodClient = new MongoDB\Client('mongodb://localhost:27017');

$stmt->close();
$conn->close();

?>