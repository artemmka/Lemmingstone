<?php

class Shop {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    public function getCatalog(){
        return $this->db->getCatalog();
    }

    public function buyItem($token, $itemId) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $item = $this->db->getItemInfo($itemId);
            if ($item) {
                $userScores = $this->db->getUserPoints($user->id);
                if ($userScores >= $item->value) {
                    $this->db->addItemToInventory($user->id, $item->id);
                    $this->db->updateUserPoints($user->id, -$item->value);
                    return true;
                }
                return ['error' => 711]; // points is not found
            }
            return ['error' => 721]; // Skin is not found
        }
        return ['error' => 705]; // User is not found
    }
}