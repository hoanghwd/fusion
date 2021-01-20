<?php

class links
{
    /**
     * @var PDO $conn
     */
    private $conn;

    // Table
    private $db_table = "links";

    // Db connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    /**
     * @param string $id
     * @return false|PDOStatement
     */
    public function getLinks($id = '')
    {
        $sqlQuery = "SELECT id, section_id, name FROM " . $this->db_table . "";

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
     * @param $sectionId
     * @param $name
     * @return bool
     */
    public function addLink($sectionId, $name)
    {
        $sqlQuery = "INSERT INTO ". $this->db_table ."
                     SET
                        section_id = :section_id, 
                        name = :name";
        $stmt = $this->conn->prepare($sqlQuery);

        $mySectionId = htmlspecialchars(strip_tags($sectionId));
        if( $mySectionId != '' && is_numeric($mySectionId) && $mySectionId > 0 ) {
            $myName = htmlspecialchars(strip_tags($name));
            if( $myName != '' ) {
                $stmt->bindParam(":section_id", $mySectionId);
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
    public function deleteLink($id)
    {
        $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE id = ?";
        $stmt = $this->conn->prepare($sqlQuery);

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
     * @param $linkId
     * @param $sectionId
     * @param $name
     * @return bool
     */
    public function editLink($linkId, $sectionId, $name)
    {

        $sqlQuery = "UPDATE
                        ". $this->db_table ."
                    SET
                        section_id = :section_id, 
                        name = :name                        
                    WHERE 
                        id = :id";
        $stmt = $this->conn->prepare($sqlQuery);

        $mySectionId = htmlspecialchars(strip_tags($sectionId));
        $myName = htmlspecialchars(strip_tags($name));
        $myLinkId = htmlspecialchars(strip_tags($linkId));

        if( $mySectionId != '' && is_numeric($mySectionId) && $myName != ''  ) {
            $stmt->bindParam(":section_id", $mySectionId);
            $stmt->bindParam(":name", $myName);
            $stmt->bindParam(":id", $myLinkId);

            if ($stmt->execute()) {
                return ($stmt->rowCount() > 0);
            }
        }

        return false;
    }

}//End of class