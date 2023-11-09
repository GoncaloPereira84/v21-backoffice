<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getV21Rural':
        getV21Rural();
        break;
    case 'updateV21Rural':
        updateV21Rural();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getV21Rural()
{
    $sqlCmd = "SELECT * from pp_v21_rural";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateV21Rural()
{
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $text1PT = $_REQUEST['text1PT'];
    $text1EN = $_REQUEST['text1EN'];
    $text2PT = $_REQUEST['text2PT'];
    $text2EN = $_REQUEST['text2EN'];
    $text3PT = $_REQUEST['text3PT'];
    $text3EN = $_REQUEST['text3EN'];
    $link = $_REQUEST['link'];
    $align = $_REQUEST['align'];

    if (isset($_FILES['file'])) {
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/pp-v21-rural/'; //to BO path
        // $path1 = 'https://beta.v21.pt/uploads/pp-v21-rural/'; //to website path
        $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/pp-v21-rural/'; //to website path
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

            if ($file) {
                $sql_update = "UPDATE pp_v21_rural
                    SET title = '" . $titlePT . "',
                    title_en = '" . $titleEN . "',
                    text1 = '" . $text1PT . "',
                    text1_en = '" . $text1EN . "',
                    text2 = '" . $text2PT . "',
                    text2_en = '" . $text2EN . "',
                    text3 = '" . $text3PT . "',
                    text3_en = '" . $text3EN . "',
                    link = '" . $link . "',
                    img_src = 'https://www.v21.pt/uploads/pp-v21-rural/" . $file_name . "',
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
        $sql_update = "UPDATE pp_v21_rural
            SET title = '" . $titlePT . "',
            title_en = '" . $titleEN . "',
            text1 = '" . $text1PT . "',
            text1_en = '" . $text1EN . "',
            text2 = '" . $text2PT . "',
            text2_en = '" . $text2EN . "',
            text3 = '" . $text3PT . "',
            text3_en = '" . $text3EN . "',
            link = '" . $link . "',
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