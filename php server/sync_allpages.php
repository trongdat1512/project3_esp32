<?php
if(isset($_POST["val_button"])){
    // ################## Đọc file json để cập nhật stt ##################################
    $jsonString = file_get_contents("test/test.json");
    $data = json_decode($jsonString, true);
    if ($data['capture'] == 'on'){
        echo "TAKING PHOTO...";
    }
    else if ($data['capture'] == 'off'){
        echo "DONE!";
    }
}
?>
