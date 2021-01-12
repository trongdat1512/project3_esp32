<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!-- <meta http-equiv="refresh" content="3"> -->
    <title>He Thong Dieu Khien</title>
    <link rel = "stylesheet" type="text/css" href="style.css"/>

    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>

</head>
<body  align="center">
    <br />
    <header>

        <h2> <span style="color:#00F">HỆ THỐNG GIÁM SÁT QUA INTERNET SỬ DỤNG ESP32-CAMERA </span><br />
        </h2>
    </header>

    <?php
    //thực hiện ghi giá trị capture=on vào test.json nếu như có bản tin POST của user:admin
    // gửi đến chính file php này.
    $jsonString = file_get_contents("test/test.json");
    $data = json_decode($jsonString, true);
    if(isset($_POST['CAPTURE_ON']))
    {
        $data['capture'] = "on";
        $newJsonString = json_encode($data);
        file_put_contents("test/test.json", $newJsonString);
    }
    ?>
    <form>

        <table border="2" width=100% height="400px" align="center">
            <tr class="indam">
                <td bgcolor="#FFCC00">HÌNH ẢNH</td>
                <td bgcolor="#FFCC00">TRẠNG THÁI</td>
                <td bgcolor="#FFCC00"> ĐIỀU KHIỂN</td>

            </tr>
            <tr>

                <td><img id="myImage" src="camera_upload/upload_esp32.jpg?time=111" width="800" height="600"></td>
                <td id="hh" >
                    Hello!
                </td>
                <td>
                    <button type="button" style='height:60px; width:60px;' onclick="takePhoto()">TAKE PHOTO</button>
                </td>
            </tr>
        </table>
    </form>
    <script >
        var checkInterval = false;
        function takePhoto(){
            $.ajax({
                url:"esp32_cam_upload_control.php",
                type:"POST",
                data:"CAPTURE_ON=",
                success:function(kq){
                    checkInterval = true;
                }
            });
        }
        var t = setInterval(()=>{
            if(checkInterval){
                $.ajax({
                    url:"sync_allpages.php",
                    type:"POST",
                    data:"val_button=",
                    success:function(kq){
                        document.getElementById('hh').innerHTML = kq;
                        if(kq == "DONE!"){
                            $("#myImage").attr("src", "camera_upload/upload_esp32.jpg?time="+Date.now());
                            checkInterval = false;
                        }
                    }
                });
            }
        },1000);

    </script>
</body>
