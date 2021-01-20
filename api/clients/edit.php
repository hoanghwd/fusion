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
    $clientId = isset($_REQUEST['clientId']) ? $_REQUEST['clientId'] : '';
    $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
    $db = $database->getConnection();
    $sections = new clients($db);
    $success = $sections->editClient($clientId, $name);
}

echo json_encode(
    array(
        "success" => $success,
        "message" => $success ? 'Success' : 'Failed!',
    )
);