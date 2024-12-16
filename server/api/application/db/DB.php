<?php

class DB {
    private $pdo;

    function __construct() {
        $host = 'mysql-8.2';
        $port = '3306';
        $user = 'root';
        $pass = '';
        $db = 'lemmingstone';
        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        $this->pdo = new PDO($connect, $user, $pass);
    }



    public function __destruct() {
        $this->pdo = null;
    }

    // выполнить запрос без возвращения данных
    private function execute($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        return $sth->execute($params);
    }

    // получение ОДНОЙ записи
    private function query($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetch(PDO::FETCH_OBJ);
    }

    // получение НЕСКОЛЬКИХ записей
    private function queryAll($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserByLogin($login) {
        return $this->query("SELECT * FROM users WHERE login=?", [$login]);
    }

    public function getUserByToken($token) {
        return $this->query("SELECT * FROM users WHERE token=?", [$token]);
    }

    public function updateToken($userId, $token) {
       $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $userId]);
    }

    public function registration($login, $hash, $name) {
        $this->execute("INSERT INTO users (login,password,name) VALUES (?, ?, ?)",[$login, $hash, $name]);
        return $this->getUserByLogin($login);
    }

    public function changeName($userId, $name){
       $this->execute("UPDATE users SET name=? WHERE id=?", [$name, $userId]);
    }

    public function changePassword($userId,$hash){
        $this->execute("UPDATE users SET password=? WHERE id=?", [$hash, $userId]);
    }

    public function getChatHash() {
        return $this->query("SELECT * FROM hashes WHERE id=1");
    }

    public function updateChatHash($hash) {
        $this->execute("UPDATE hashes SET chat_hash=? WHERE id=1", [$hash]);
    }

    public function addMessage($userId, $message) {
        $this->execute('INSERT INTO messages (user_id, message, created) VALUES (?,?, now())', [$userId, $message]);
    }

    public function getMessages() {
        return $this->queryAll("SELECT u.name AS author, m.message AS message,
                                to_char(m.created, 'yyyy-mm-dd hh24:mi:ss') AS created FROM messages as m 
                                LEFT JOIN users as u on u.id = m.user_id 
                                ORDER BY m.created DESC"
        );
    }

    public function getLemmings() {
        $sql = "SELECT id, name, hp, speed, slots_count, image FROM lemming_type";
        return $this->queryAll($sql);
    }

    public function getCatalog() {
        $sql = "SELECT id, type_id, cost FROM market";
        return $this->queryAll($sql);
    }

    public function getPosition($userId) {
        $sql = "SELECT * FROM user_lemming";
        return $this->queryAll($sql);
    }

    public function givePosition($userId, $lemmingId, $x, $y, $direction, $status) {
        $this->execute("UPDATE user_lemming SET x=?, y=?, direction=?, status=? WHERE user_id = ?", [$x, $y, $direction, $status, $userId]);
    }

    public function setLemmingForUser($userId, $lemmingId) {
        return true;
    }

    public function addLemming($userId, $lemmingId, $x, $y, $direction, $status) {
        $sql = "INSERT INTO user_lemming (user_id, lemming_id, x, y, direction, status) 
                VALUES (?, ?, ?, ?, ?, ?)";
        $this->execute($sql, [$userId, $lemmingId, $x, $y, $direction, $status]);
    }

    public function removeLemming($userId) {
        $this->execute("DELETE FROM user_lemming WHERE user_id = ?", [$userId]);
    }
    public function getStatus($userId) {
        return $this->query("SELECT status FROM user_lemming WHERE id=?", [$userId]);
    }

    public function updateDeath($userId, $deathCount) {
        $this->execute("UPDATE users SET death=? WHERE id=?", [$deathCount, $userId]);
    }

    public function getPoints($userId) {
        return $this->query("SELECT points FROM users WHERE id=?", [$userId]);
    }

    public function updatePoints($userId, $pointsCount) {
        $this->execute("UPDATE users SET death=? WHERE id=?", [$pointsCount, $userId]);
    }
}