<?php

class clients
{
    /**
     * @var PDO $conn
     */
    private $conn;

    // Table
    private $db_table = "clients";

    // Db connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    /**
     * @param string $id
     * @return false|PDOStatement
     */
    public function getClients($id = '')
    {
        $sqlQuery = "SELECT id, name FROM " . $this->db_table . "";

        /**
         * Id must be numeric and greater than 0
         */
        if ($id != '' && is_numeric($id) && $id > 0) {
            $sqlQuery .= " WHERE id = $id ";
        }

        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();

        return $stmt;
    }

    /**
     * @param $name
     * @return bool
     */
    public function addClient($name)
    {
        $sqlQuery = "INSERT INTO " . $this->db_table . "
                     SET name = :name";
        $stmt = $this->conn->prepare($sqlQuery);
        $myName = htmlspecialchars(strip_tags($name));

        if ($myName != '') {
            $stmt->bindParam(":name", $myName);

            if ($stmt->execute()) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param $id
     * @return bool
     */
    public function deleteClient($id)
    {
        $query = "DELETE FROM " . $this->db_table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);

        $myId = htmlspecialchars(strip_tags($id));
        if( $myId != '' && is_numeric($myId) && $myId > 0 ) {
            $stmt->bindParam(1, $myId);
            if( $stmt->execute() ) {
                return ($stmt->rowCount() > 0);
            }
        }

        return false;
    }

    /**
     * @param $clientId
     * @param $name
     * @return bool
     */
    public function editClient($clientId, $name)
    {
        $sqlQuery = "UPDATE ". $this->db_table ."
                     SET name = :name                        
                     WHERE id = :id";
        $stmt = $this->conn->prepare($sqlQuery);

        $myClientId = htmlspecialchars(strip_tags($clientId));
        $myName = htmlspecialchars(strip_tags($name));

        if( $myName != '' ) {
            $stmt->bindParam(":name", $myName);
            $stmt->bindParam(":id", $myClientId);

            if ($stmt->execute()) {
                return ($stmt->rowCount() > 0);
            }
        }

        return false;
    }


}//End of class