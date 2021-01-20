<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../class/links.php';

$database = new Database();
$db = '';
$success = false;
$_REQUEST = array_merge($_POST, $_GET);

if( $database->getConnection() ) {
    $sectionId = isset($_REQUEST['sectionId']) ? $_REQUEST['sectionId'] : '';
    $name = isset($_REQUEST['sectionId']) ? $_REQUEST['name'] : '';
    $db = $database->getConnection();
    $links = new links($db);
    $success = $links->addLink($sectionId, $name);
}

echo json_encode(
    array(
        "success" => $success,
        "message" => $success ? 'Successfully added new record' : 'Failed to add record',
    )
);