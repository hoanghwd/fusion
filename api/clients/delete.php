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
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
    $db = $database->getConnection();
    $section = new clients($db);
    $success = $section->deleteClient($id);
}

echo json_encode(
    array(
        "success" => $success,
        "message" => $success ? 'Successfully delete record.' : 'Failed to delete record.',
    )
);