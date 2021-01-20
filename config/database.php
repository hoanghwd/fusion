<?php
include_once "config.php";

class Database
{
    public $conn;

    /**
     * @return PDO|null
     */
    public function getConnection()
    {
        $this->conn = null;

        try{
            $this->conn = new PDO("mysql:host=" . HOST . ";dbname=" . DB, DB_USR, DB_PASS);
            $this->conn->exec("set names utf8");
        }
        catch(PDOException $exception){
            echo "Database could not be connected: " . $exception->getMessage();
        }

        return $this->conn;
    }
}

/*
$testConn = new Database();
if( $testConn->getConnection() ) {
    echo "Connection made";
}
else {
    echo "Connection failed";
}
*/