
<?php
$servername="localhost";
$dbusername="root";
$dbpassword="toor";
$dbname="personinfo";

$conn=new mysqli($servername,$dbusername,$dbpassword,$dbname);

if($conn->connect_error){
	die("Connection failed: ".$conn->connect_error);
}


$stmt = $conn->prepare("SELECT * FROM reg_details WHERE username");
$stmt->bind_param("ss",$username,$password);


$username=$_POST['username'];
$password=$_POST['password'];


$stmt->execute();


echo "[+]Added a new row!";


$mongodClient = new MongoDB\Client('mongodb://localhost:27017');

$stmt->close();
$conn->close();

?>