<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');

if(isset($_POST)) {
    
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $link = $_REQUEST['link'];
    $align = $_REQUEST['align'];

    $errors = [];
    $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/slideshow/'; //to BO path
    $path1 = 'https://beta.v21.pt/uploads/slideshow/'; //to website path
    $extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG'];

    $file_name = $_FILES['file']['name'];
    $file_tmp = $_FILES['file']['tmp_name'];
    $file_type = $_FILES['file']['type'];
    $file_size = $_FILES['file']['size'];
    $file_ext = explode('.', $_FILES['file']['name']);
    $ext = end($file_ext);

    $file = $path . $file_name;
    $file1 = $path1 . $file_name;

    if (!in_array($ext, $extensions)) {
        $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ' ' . $file_type;
    }

    if ($file_size > 153600) {
        $errors[] = 'O tamanho do ficheiro excede o limite de 150KBs: ' . $file_name . ' ' . $file_type;
    }

    if ($file_size == 0) {
        $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
    }

    if (empty($errors)) {
        move_uploaded_file($file_tmp, $file);
        copy($file, $file1);

        if ($file) {
            $lastRecordSql = 'SELECT MAX(display_order) 
                FROM slideshow_home';
            $lastRecord = execQueryMySQL($lastRecordSql);

            if ($lastRecord[0] == NULL) {
                $sql_insert = "INSERT INTO slideshow_home 
                        (title,
                        title_en,
                        text,
                        text_en,
                        link,
                        img_src,
                        img_align,
                        display_order) 
                        VALUES
                        ('" . $titlePT . "',
                        '" . $titleEN . "',
                        '" . $textPT . "',
                        '" . $textEN . "',
                        '" . $link . "',
                        '" . $file1 . "',
                        '" . $align . "',
                        '0');";
            } else {
                $select_count = 'SELECT count(*) 
                FROM slideshow_home';
                $count = execQueryMySQL($select_count);

                if($count >= 3) {
                    echo "false||Já atingiu o número máximo de destaques.";
                } else {
                    $sql_insert = "INSERT INTO slideshow_home 
                        (title,
                        title_en,
                        text,
                        text_en,
                        link,
                        img_src,
                        img_align,
                        display_order) 
                        VALUES
                        ('" . $titlePT . "',
                        '" . $titleEN . "',
                        '" . $textPT . "',
                        '" . $textEN . "',
                        '" . $link . "',
                        '" . $file1 . "',
                        '" . $align . "',
                        " . $lastRecord[0]["MAX(display_order)"] . " + 1);";
                }
            }

            include_once($_SERVER['DOCUMENT_ROOT']. '/connection/class.connection.php');
            $db = Database::getInstance();
            $connection = $db->getConnection();
            if ($result = $connection->query($sql_insert)) {
                $db->commitAndClose();
                echo "true||" . json_encode($result);
            } else {
                // $db->rollbackAndClose();
                //echo "false||Erro na inserção dos dados.";
            }
        }
    } else {
        echo 'false||' . $errors[0];
    }
}