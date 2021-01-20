<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../class/links.php';

$database = new Database();
$db = '';
$success = false;
$errorMsg = '';
$_REQUEST = array_merge($_POST, $_GET);

if( $database->getConnection() ) {
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
    $db = $database->getConnection();
    $links = new links($db);

    $stmt = $links->getLinks($id);
    $itemCounts = $stmt->rowCount();

    if( $itemCounts > 0 ) {
        $linksArr = array();
        $linksArr["body"] = array();
        $linksArr["itemCounts"] = $itemCounts;
        $linksArr["success"] = true;
        $success = true;

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $e = array(
                "id"         => $id,
                "section_id" => $section_id,
                "name"       => $name
            );

            array_push($linksArr["body"], $e);
        }//while

        echo json_encode($linksArr);
    }//if item counts

    else{
        $errorMsg = "No record found.";
    }
}//if connection is made

else {
    $errorMsg = "Connection error";
}

if(!$success) {
    echo json_encode(
        array(
            "success" => false,
            "message" => $errorMsg
        )
    );
}