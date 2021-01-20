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
    $linkId = isset($_REQUEST['linkId']) ? $_REQUEST['linkId'] : '';
    $sectionId = isset($_REQUEST['sectionId']) ? $_REQUEST['sectionId'] : '';
    $name = isset($_REQUEST['name']) ? $_REQUEST['name'] : '';
    $db = $database->getConnection();
    $links = new links($db);
    $success = $links->editLink($linkId, $sectionId, $name);
}

echo json_encode(
    array(
        "success" => $success,
        "message" => $success ? 'Success' : 'Failed!',
    )
);