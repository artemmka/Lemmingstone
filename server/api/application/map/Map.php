<?php
class Map {

    function generateMap() {
        $points = $this->generateRandomPoints(100, 0, 100, -10, 10);
        $coeffs = $this->getSpline($points);
        print_r($points);
        print_r($coeffs);
        return [
            'coeffs' => $coeffs,
            'points' => $points
        ];
    }

    function generateRandomPoints($numPoints, $xMin, $xMax, $yMin, $yMax) {
        $points = [];
        for ($i = 0; $i < $numPoints; $i++) {
            $x = rand($xMin * 100, $xMax * 100) / 100.0;
            $y = rand($yMin * 100, $yMax * 100) / 100.0;
            $points[] = ['x' => $x, 'y' => $y];
        }
        return $points;
    }

    function getSpline($points) {
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
}
