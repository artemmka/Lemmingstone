<?php

class Inventory {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    public function changeItem($userId, $oldTypeId, $newTypeId) {
        $result = $this->db->changeItem($userId, $oldTypeId, $newTypeId);
        return $result;
    }
}