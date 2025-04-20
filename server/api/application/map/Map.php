<?php


class Map {
    private $db;
    function __construct($db) {
        $this->db = $db;
    }
    private function generateRandomPoints($numPoints, $xMin, $xMax, $yMin, $yMax) {
        $points = [];
        for ($i = 0; $i < $numPoints; $i++) {
            $x = $i*2;
            $y = rand($yMin * 100, $yMax * 100) / 100.0;
            $points[] = ['x' => $x, 'y' => $y];
        }
        return $points;
    }

    private function getSpline($points) {
        $n = count($points) - 1;
        $a = array_map(function($p) { return $p['y']; }, $points);
        $h = [];
        for ($i = 0; $i < $n; $i++) {
            $h[$i] = $points[$i + 1]['x'] - $points[$i]['x'];
        }

        $alpha = [0];
        for ($i = 1; $i < $n; $i++) {
            $alpha[$i] = (3 / $h[$i] * ($a[$i + 1] - $a[$i])) - (3 / $h[$i - 1] * ($a[$i] - $a[$i - 1]));
        }

        $l = [1];
        $mu = [0];
        $z = [0];
        for ($i = 1; $i < $n; $i++) {
            $l[$i] = 2 * ($points[$i + 1]['x'] - $points[$i - 1]['x']) - $h[$i - 1] * $mu[$i - 1];
            $mu[$i] = $h[$i] / $l[$i];
            $z[$i] = ($alpha[$i] - $h[$i - 1] * $z[$i - 1]) / $l[$i];
        }

        $c = array_fill(0, $n + 1, 0);
        $b = array_fill(0, $n, 0);
        $d = array_fill(0, $n, 0);

        for ($j = $n - 1; $j >= 0; $j--) {
            $c[$j] = $z[$j] - $mu[$j] * $c[$j + 1];
            $b[$j] = ($a[$j + 1] - $a[$j]) / $h[$j] - $h[$j] * ($c[$j + 1] + 2 * $c[$j]) / 3;
            $d[$j] = ($c[$j + 1] - $c[$j]) / (3 * $h[$j]);
        }
    
        return [
            'a' => $a,
            'b' => $b,
            'c' => $c,
            'd' => $d,
            'h' => $h
        ];
    }

    function generateMap() {
        $points = $this->generateRandomPoints(50, 0, 100, 5, 10);
        $coeffs = $this->getSpline($points);
        $pointsJson = json_encode($points);
        $coeffsJson = json_encode($coeffs);
        $this->db->saveMap($pointsJson, $coeffsJson);
        // return [
        //     'coeffs' => $coeffs,
        //     'points' => $points
        // ];
    }

    public function saveMap($startTime, $points, $coeffs) {
       $map = $this->db->checkMap();
        if ($map) {
            $result = $this->db->updateMap($startTime, $points, $coeffs);
        } else {
            $generatedMap = $this->generateMap(); 
            $pointsJson = json_encode($generatedMap['points']);
            $coeffsJson = json_encode($generatedMap['coeffs']);
            $result = $this->db->saveMap($startTime, $pointsJson, $coeffsJson);
        }
    
        if ($result) {
            return ['success' => true];
        }
        return ['success' => false, 'error' => 'Failed to save map'];
    }

    public function respawnObjects($existingObjects, $numNewObjects, $xMin, $xMax, $yMin, $yMax) {
        $existingObjects = array_filter($existingObjects, function($object) {
            return !$object['removed']; 
        });

        $newObjects = $this->generateRandomPoints($numNewObjects, $xMin, $xMax, $yMin, $yMax);

        return array_merge($existingObjects, $newObjects);
    }

    public function getMap() {
        if(!empty($this->db->checkMap())) {
            return $this->db->getMap();
        }
        $this->generateMap();
        return $this->getMap();
    }

    public function setMapChange($params) {
        $this->db->setMapChange($params);
        $this->db->updateMapHash(md5(rand()));
    }

    public function getMapChanges($hash) {
        $currentHash = $this->db->getChatHash();
        if ($hash === $currentHash->game_hash) {
            return [
                'hash' => $hash
            ];
        }
        $changes = $this->db->getMapChanges();
        return [
            'changes' => $changes,
            'hash' => $currentHash->game_hash
        ];
    }

    public function teleportLemming($lemmingId){
        $result = $this->db->teleportLemming($lemmingId);
        return $result;
    }

    public function spawnGate() {
        return $this->db->spawnGate();
    }

    public function spawnKey() {
        return $this->db->spawnKey();
    }

    public function checkKeyAndOpenGate($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $userId = $user->id;
            $userCoordinates = $this->db->getUserCoordinatesById($userId);
            if ($userCoordinates) {
                $userX = $userCoordinates->x;
                $userY = $userCoordinates->y;
                $keyCoordinates = $this->db->getKeyCoordinates();
                if ($keyCoordinates) {
                    $keyX = $keyCoordinates->x;
                    $keyY = $keyCoordinates->y;
                    if ($userX == $keyX && $userY == $keyY) {
                        $this->db->openGate();
                        return true;
                    }
                }
                return ['error' => 722];
            }
            return ['error' => 723];
        }
        return ['error' => 705];
    }
}
