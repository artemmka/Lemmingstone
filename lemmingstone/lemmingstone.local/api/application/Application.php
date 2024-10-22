<?php
require_once ('db/DB.php');
require_once ('user/User.php');
require_once ('chat/Chat.php');
require_once('map/Map.php');
require_once('lobby/Lobby.php');
require_once('game/Game.php');
require_once('shop/Shop.php');

class Application {
    private $user;
    private $chat;
    private $map;
    private $lobby;
    private $game;
    private $shop;
    
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        //$this->chat = new Chat($db);
        $this->map = new Map();
        $this->lobby = new Lobby($db);
        $this->game = new Game($db);
        $this->shop = new Shop($db);
    }

    public function login($params) {
        if ($params['login'] && $params['hash'] && $params['rnd']) {
            return $this->user->login($params['login'], $params['hash'], $params['rnd']);
        }
        return ['error' => 242];
    }

    public function logout($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->logout($params['token']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function registration($params) {
        if ($params['login'] && $params['password'] && $params['name']) {
            return $this->user->registration($params['login'], $params['password'], $params['name']);
        }
        return ['error' => 242];
    }

    public function sendMessage($params) {
        if ($params['token'] && $params['message']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->sendMessage($user->id, $params['message']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getMessages($params) {
        if ($params['token'] && $params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->getMessages($params['hash']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    // жалкая пародия
    public function generateMap() {
        return $this->map->generateMap();
    }

    public function getCatalog(){
        return $this->shop->getCatalog();
    }

    // неповторимый оригинал
    public function getLemmings($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->lobby->getLemmings();
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function startGame($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->lobby->startGame($user->id, $params['lemmingId']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }
}