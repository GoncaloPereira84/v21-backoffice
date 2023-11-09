<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getObjectivosInfo':
        getObjectivosInfo();
        break;
    case 'updateObjectivosInfo':
        updateObjectivosInfo();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getObjectivosInfo()
{
    $sqlCmd = "SELECT * from v21_objectivos";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateObjectivosInfo()
{
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $title1PT = $_REQUEST['title1PT'];
    $title1EN = $_REQUEST['title1EN'];
    $text1PT = $_REQUEST['text1PT'];
    $text1EN = $_REQUEST['text1EN'];
    $title2PT = $_REQUEST['title2PT'];
    $title2EN = $_REQUEST['title2EN'];
    $text2PT = $_REQUEST['text2PT'];
    $text2EN = $_REQUEST['text2EN'];
    $align = $_REQUEST['align'];

    if (isset($_FILES['file'])) {
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/v21-objectivos/'; //to BO path
        $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/v21-objectivos/'; //to website path
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

        if ($file_size > 409600) {
            $errors[] = 'O tamanho do ficheiro excede o limite de 150KBs: ' . $file_name . ' ' . $file_size;
        }

        if ($file_size == 0) {
            $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
        }

        if (empty($errors)) {
            move_uploaded_file($file_tmp, $file);
            copy($file, $file1);

            // print_r($file1);
            // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT']));

            if ($file) {
                $sql_update = "UPDATE v21_objectivos
                    SET title = '" . $titlePT . "',
                    title_en = '" . $titleEN . "',
                    title1 = '" . $title1PT . "',
                    title1_en = '" . $title1EN . "',
                    text1 = '" . $text1PT . "',
                    text1_en = '" . $text1EN . "',
                    title2 = '" . $title2PT . "',
                    title2_en = '" . $title2EN . "',
                    text2 = '" . $text2PT . "',
                    text2_en = '" . $text2EN . "',
                    img_src = 'https://www.v21.pt/uploads/v21-objectivos/" . $file_name . "',
                    img_align = '" . $align . "'";

                include_once($_SERVER['DOCUMENT_ROOT']. '/connection/class.connection.php'); 
                $db = Database::getInstance();
                $connection = $db->getConnection();

                if ($result = $connection->query($sql_update)) {
                    $db->commitAndClose();
                    echo "true||" . json_encode($result);
                } else {
                    // $db->rollbackAndClose();
                    echo "false||Erro na inserção dos dados.";
                }
            }
        } else {
            echo 'false||' . $errors[0];
        }
        // }
    } else {
        $sql_update = "UPDATE v21_objectivos
            SET title = '" . $titlePT . "',
            title_en = '" . $titleEN . "',
            title1 = '" . $title1PT . "',
            title1_en = '" . $title1EN . "',
            text1 = '" . $text1PT . "',
            text1_en = '" . $text1EN . "',
            title2 = '" . $title2PT . "',
            title2_en = '" . $title2EN . "',
            text2 = '" . $text2PT . "',
            text2_en = '" . $text2EN . "',
            img_align = '" . $align . "'";

        include_once($_SERVER['DOCUMENT_ROOT']. '/connection/class.connection.php');    
        $db = Database::getInstance();
        $connection = $db->getConnection();

        if ($result = $connection->query($sql_update)) {
            $db->commitAndClose();
            echo "true||" . json_encode($result);
        } else {
            // $db->rollbackAndClose();
            echo "false||Erro na inserção dos dados.";
        }
    }
}