<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../class/clients.php';

$database = new Database();
$db = '';
$success = false;
$_REQUEST = array_merge($_POST, $_GET);

if( $database->getConnection() ) {
    $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
    $db = $database->getConnection();
    $links = new clients($db);
    $success = $links->addClient($name);
}

echo json_encode(
    array(
        "success" => $success,
        "message" => $success ? 'Successfully added new record' : 'Failed to add record',
    )
);