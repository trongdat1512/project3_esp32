<?php
$jsonString = file_get_contents("test/test.json");
$data = json_decode($jsonString, true);
$received = file_get_contents('php://input');
$fileToWrite = "camera_upload/upload_esp32.jpg";
file_put_contents($fileToWrite, $received);

$data['capture'] = "off";
$newJsonString = json_encode($data);
file_put_contents("test/test.json", $newJsonString);
?>
