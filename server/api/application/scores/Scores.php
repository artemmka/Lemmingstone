<?php

class Scores {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    public function addPointsbyGoldCoin($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $points = $this->db->getPoints($user->id);
            if ($points) {
                $newPoints = $points->points + 2;
                $this->db->updatePoints($user->id, $newPoints);
            }
            return ['error' => 711];
        }
        return ['error' => 705];
    }

    public function addPointsbyFinishLevel($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $points = $this->db->getPoints($user->id);
            if ($points) {
                $newPoints = $points->points + 10;
                $this->db->updatePoints($user->id, $newPoints);
            }
            return ['error' => 711];
        }
        return ['error' => 705];
    }

    public function addDeath($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $status = $this->db->getStatus($user->id);
            if ($status->status == 'dead') {
                $currentDeath = $user->death;
                $newDeath = $currentDeath + 1;
                $this->db->updateDeath($user->id, $newDeath);
                return $newDeath;
            }
            return ['error' => 712];
        }
        return ['error' => 705];
    }
}