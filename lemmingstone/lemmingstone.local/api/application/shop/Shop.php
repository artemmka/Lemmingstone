<?php

class Shop {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }
    
    public function getCatalog(){
        return $this->db->getCatalog();
    }

}
?>