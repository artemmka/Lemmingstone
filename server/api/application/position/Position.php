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

    public function addLemming($params) {
        $this->db->addLemming($params['userId'], $params['lemmingId'], $params['x'], $params['y'], $params['direction'], $params['status']);
    }
    
    public function removeLemming($params) {
        $this->db->removeLemming($params['userId']);
    }

}