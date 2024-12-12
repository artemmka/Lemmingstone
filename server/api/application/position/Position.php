<?php

class Position {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    public function getPosition($userId){
        return $this->db->getPosition($userId);
    }

    public function givePosition($userId, $lemminigId, $x, $y, $direction, $status){
        $this->db->givePosition($userId, $lemminigId, $x, $y, $direction, $status);
        return true;
    }

}