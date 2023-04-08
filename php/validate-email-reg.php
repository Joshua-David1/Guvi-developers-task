<?php


$servername="localhost";
$dbusername="root";
$dbpassword="toor";
$dbname="personinfo";

$conn=new mysqli($servername,$dbusername,$dbpassword,$dbname);

if($conn->connect_error){
	die("Connection failed: ".$conn->connect_error);
}


$stmt = $conn->prepare("SELECT * FROM reg_details WHERE email=?");
$stmt->bind_param("s",$email);

$email=$_POST['email'];
$stmt->execute();
$result = $stmt ->get_result();

$count = 0;
while($row = $result->fetch_assoc()){
	$count = $count+1;
}

echo $count;

$stmt->close();
$conn->close();

?>