<?php

//$headers = "From: " . $_POST['contact_email']

//mail("hola@bufalo.com", $_POST['contact_subject'], $_POST['contact_message'], $headers);

$headers = "From: brunomartintenaglia@gmail.com";
$headers = array(
    'From' => 'brunomartintenaglia@gmail.com'
);

echo 'hfhfg';

$send = mail("brunomartintenaglia@gmail.com", 'Contacto sitio web', 'dfsfs f sdf sdf sd fsd fsd', "From: brunomartintenaglia@gmail.com");

if( $send) {
    echo "OK";
} else {
    echo "no";
}

?>