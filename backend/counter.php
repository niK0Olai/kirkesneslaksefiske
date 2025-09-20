<?php
header('Content-Type: application/json');

$file = "visits.json";

if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

$data = json_decode(file_get_contents($file), true);

$today = date("Y-m-d");

if (isset($data[$today])) {
    $data[$today]++;
} else {
    $data[$today] = 1;
}

file_put_contents($file, json_encode($data));

echo json_encode([
    "today" => $data[$today],
    "all" => $data
]);
