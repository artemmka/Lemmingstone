<?php

class Lobby {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

     public function getLemmings() {
        $lemmings = $this->db->getLemmings();
        foreach ($lemmings as &$lemming) {
            if (!empty($lemming['image'])) {
                $lemming['image'] = base64_encode($lemming['image']);
            } else {
                $lemming['image'] = null;
                }
            }
            return $lemmings;
        }

    public function startGame($userId, $lemmingId) {
        if ($this->db->setLemmingForUser($userId, $lemmingId)) {
            return true;
        }
        return ['error' => 2001];
    }
}