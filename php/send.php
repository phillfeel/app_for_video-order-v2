
<?php
// Файлы phpmailer
require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

// Переменные, которые отправляет пользователь
$name = trim($_POST["main-duration"]);
$phone = trim($_POST["main-colors"]);
//s$file = $_FILES;


// Формирование самого письма

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host = 'ssl://smtp.gmail.com';
    $mail->Port = 465;                
    $mail->Username = 'sites1mt'; //  Ваш логин в Яндексе. Именно логин, без @yandex.ru
    $mail->Password = 'an315795andrey7gz'; // Ваш пароль
    $mail->SMTPSecure = 'ssl';                            
    $mail->setFrom('sites1mt@gmail.com' , 'Video order'); // Ваш Email
    $mail->addAddress('fil.bikov@yandex.ru'); 

    // Прикрипление файлов к письму

    function reArrayFiles(&$file_post){
        $isMulti    = is_array($file_post['name']);
        $file_count    = $isMulti?count($file_post['name']):1;
        $file_keys    = array_keys($file_post);
    
        $file_ary    = [];    //Итоговый массив
        for($i=0; $i<$file_count; $i++)
            foreach($file_keys as $key)
                if($isMulti)
                    $file_ary[$i][$key] = $file_post[$key][$i];
                else
                    $file_ary[$i][$key]    = $file_post[$key];
    
        return $file_ary;
    }


foreach( $_FILES as $key => $filee) {
 
    if ( $key == "extra-files" ){
        $file_ary = reArrayFiles($filee);
         foreach ($file_ary as $fil) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($fil['name']));
            $filename = $fil['name'];
            if (move_uploaded_file($fil['tmp_name'], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "Файл $filename прикреплён";
            } else {
                $rfile[].= 'Не удалось прикрепить файл ' . $uploadfile;
            }
           } 
    }else{
        $a .= $key;
        $b .= $filee;
        $uploadfile = tempnam(sys_get_temp_dir(), sha1( $filee['name']));
        $regexp = "/.+\./ui";
        $replacement = preg_replace( $regexp , "" , $filee['name']);
        $filename = $key . "." . $replacement;
        $d .= $filename;
        if (move_uploaded_file($filee['tmp_name'], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[].= 'Не удалось прикрепить файл ' . $uploadfile;
        }
   };
};
 
    
   $arr=array();
   $arr=$_POST;
   foreach ($arr as $key => $value) {
     $allForm .= "$key".'='."$value". "<br>";
   };

   $title = "Заголовок письма";
   $body = "
   <h2>Новое письмо</h2>
   <b>Имя:</b> $name<br>
   <b>Почта:</b>$a<br><br>
   <b>Сообщение:</b>$allForm<br>
   ";


// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $allForm;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status, "name_files" => $a , "files" => $b, "extra_input" => $c, "name_in_extra"=>$d]);
 