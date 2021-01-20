<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../class/clients.php';

$database = new Database();
$db = '';
$success = false;
$errorMsg = '';
$_REQUEST = array_merge($_POST, $_GET);

if( $database->getConnection() ) {
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
    $db = $database->getConnection();
    $client = new clients($db);

    $stmt = $client->getClients($id);
    $itemCounts = $stmt->rowCount();

    if( $itemCounts > 0 ) {
        $clientArr = array();
        $clientArr["body"] = array();
        $clientArr["itemCounts"] = $itemCounts;
        $clientArr["success"] = true;
        $success = true;

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $e = array(
                "id"   => $id,
                "name" => $name
            );

            array_push($clientArr["body"], $e);
        }//while

        echo json_encode($clientArr);
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