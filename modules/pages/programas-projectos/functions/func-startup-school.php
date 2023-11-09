<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getStartupSchool':
        getStartupSchool();
        break;
    case 'updateStartupSchool':
        updateStartupSchool();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getStartupSchool()
{
    $sqlCmd = "SELECT * from pp_startup_school";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateStartupSchool()
{
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $link = $_REQUEST['link'];
    $align = $_REQUEST['align'];

    if (isset($_FILES['file'])) {
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/pp-startup-school/'; //to BO path
        // $path1 = 'https://beta.v21.pt/uploads/pp-startup-school/'; //to website path
        $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/pp-startup-school/'; //to website path
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
                $sql_update = "UPDATE pp_startup_school
                    SET title = '" . $titlePT . "',
                    title_en = '" . $titleEN . "',
                    text = '" . $textPT . "',
                    text_en = '" . $textEN . "',
                    link = '" . $link . "',
                    img_src = 'https://www.v21.pt/uploads/pp-startup-school/" . $file_name . "',
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
        $sql_update = "UPDATE pp_startup_school
            SET title = '" . $titlePT . "',
            title_en = '" . $titleEN . "',
            text = '" . $textPT . "',
            text_en = '" . $textEN . "',
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