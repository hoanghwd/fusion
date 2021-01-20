<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../class/sections.php';

$database = new Database();
$db = '';
$success = false;
$_REQUEST = array_merge($_POST, $_GET);

if( $database->getConnection() ) {
    $sectionId = isset($_REQUEST['sectionId']) ? $_REQUEST['sectionId'] : '';
    $clientId = isset($_REQUEST['clientId']) ? $_REQUEST['clientId'] : '';
    $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
    $db = $database->getConnection();
    $sections = new sections($db);
    $success = $sections->editSection($sectionId, $clientId, $name);
}

echo json_encode(
    array(
        "success" => $success,
        "message" => $success ? 'Success' : 'Failed!',
    )
);