<?php

class Lobby {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    public function getLemmings() {
        return $this->db->getLemmings();
    }

    public function startGame($userId, $lemmingId) {
        if ($this->db->setLemmingForUser($userId, $lemmingId)) {
            return true;
        }
        return ['error' => 2001];
    }
}