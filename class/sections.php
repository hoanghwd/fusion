<?php


class sections
{
    /**
     * @var PDO $conn
     */
    private $conn;

    // Table
    private $db_table = "sections";

    // Db connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    /**
     * @param string $id
     * @return false|PDOStatement
     */
    public function getSections($id = '')
    {
        $sqlQuery = "SELECT id, client_id, name FROM " . $this->db_table . "";

        /**
         * Id must be numeric and greater than 0
         */
        if( $id != '' && is_numeric($id) && $id > 0 ) {
            $sqlQuery .= " WHERE id = $id ";
        }

        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();

        return $stmt;
    }

    /**
     * @param $clientId
     * @param $name
     * @return bool
     */
    public function addSection($clientId, $name)
    {
        $sqlQuery = "INSERT INTO ". $this->db_table ."
                     SET
                        client_id = :client_id, 
                        name = :name";
        $stmt = $this->conn->prepare($sqlQuery);

        $myClientId = htmlspecialchars(strip_tags($clientId));
        if( $myClientId != '' && is_numeric($myClientId) && $myClientId > 0 ) {
            $myName = htmlspecialchars(strip_tags($name));
            if( $myName != '' ) {
                $stmt->bindParam(":client_id", $myClientId);
                $stmt->bindParam(":name", $myName);

                if( $stmt->execute() ){
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * @param $id
     * @return bool
     */
    public function deleteSection($id)
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
     * @param $sectionId
     * @param $clientId
     * @param $name
     * @return bool
     */
    public function editSection($sectionId, $clientId, $name)
    {

        $sqlQuery = "UPDATE
                        ". $this->db_table ."
                    SET
                        client_id = :client_id, 
                        name = :name                        
                    WHERE 
                        id = :id";
        $stmt = $this->conn->prepare($sqlQuery);

        $mySectionId = htmlspecialchars(strip_tags($sectionId));
        $myClientId = htmlspecialchars(strip_tags($clientId));
        $myName = htmlspecialchars(strip_tags($name));


        if( $myClientId != '' && is_numeric($myClientId) && $myName != ''  ) {
            $stmt->bindParam(":id", $mySectionId);
            $stmt->bindParam(":client_id", $myClientId);
            $stmt->bindParam(":name", $myName);

            if ($stmt->execute()) {
                return ($stmt->rowCount() > 0);
            }
        }

        return false;
    }

}//End of class