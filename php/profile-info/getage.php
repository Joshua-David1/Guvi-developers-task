<?php

$filter = array(
'username'=>$_POST['username']
);
$options = array('limit'=>1);
$query = new MongoDB\Driver\Query($filter,$options);

$manager = new MongoDB\Driver\Manager('mongodb://localhost:27017');
$result = $manager->executeQuery('db.personalInfo',$query);
foreach($result as $document) {
    print_r(get_object_vars($document)['age']);
}

?>
