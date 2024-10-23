<?php
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once('application/Answer.php');
require_once('application/Application.php');

function result($params) {
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            // user
            case 'login': return $app->login($params);
            case 'logout': return $app->logout($params);
            case 'registration': return $app->registration($params);
            // chat
            case 'sendMessage': return $app->sendMessage($params);
            case 'getMessages': return $app->getMessages($params); // loop
            // prototype
            case 'generateMap': return $app->generateMap();

            // lobby
            case 'getLemmings': return $app->getLemmings($params);
            case 'startGame': return $app->startGame($params);
            // settings
            case 'changeName': return $app->changeName($params);
            case 'changePassword': return $app->changePassword($params);
            // game
            case 'getMap': return $app->getMap($params);
            case 'updateScene': return $app->updateScene($params); // loop
            case 'move': return $app->move($params);
            case 'action': return $app->action($params); // подорваться или построить мост
            case 'respawn': return $app->respawn($params);
            case 'endGame': return $app->endGame($params);
            // shop
            case 'getCatalog': return $app->getCatalog($params);
            case 'buy': return $app->buy($params);
            // score
            case 'getScores': return $app->getScores($params);

            default: return ['error' => 102];
        }
    }
    return ['error' => 101];
}

echo json_encode(Answer::response(result($_GET)), JSON_UNESCAPED_UNICODE);
