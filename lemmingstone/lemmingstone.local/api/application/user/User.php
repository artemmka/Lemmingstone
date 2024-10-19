<?php

class User {
     private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getUser($token) {
        return $this->db->getUserByToken($token);
    }

    public function login($login, $hash, /*$rnd*/) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            if ($user->password === $hash) {
                $token = md5(rand());
                $this->db->updateToken($user->id, $token);
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'token' => $token
                ];
            }
            return ['error' => 1002];
        }
        return ['error' => 1005];
    }

    public function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            return true;
        }
        return ['error' => 1003];
    }

   public function registration($login, $password, $name) {
    $hash = md5($login . $password); 
    $user = $this->db->getUserByLogin($login); // Убедитесь, что здесь второй параметр убран
    if ($user) {
        return ['error' => 1001]; // Ошибка, если пользователь уже существует
    }
   
    $this->db->registration($login, $hash, $name); // Убедитесь, что передаете хешированный пароль
    $user = $this->db->getUserByLogin($login); // Получаем пользователя по логину
    if ($user) {
        $token = md5(rand());
        $this->db->updateToken($user->id, $token);
        return [
            'id' => $user->id,
            'name' => $user->name,
            'token' => $token
        ];
    }
    return ['error' => 1004]; // Ошибка, если не удалось зарегистрировать
}

}