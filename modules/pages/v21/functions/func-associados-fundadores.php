<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getTextoIntrodutorio':
        getTextoIntrodutorio();
        break;
    case 'updateTextoIntrodutorio':
        updateTextoIntrodutorio();
        break;
    case 'getAssociados':
        getAssociados();
        break;
    case 'getAllAssociadosByIdAssociado':
        getAllAssociadosByIdAssociado();
        break;
    case 'updateAssociado':
        updateAssociado();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getTextoIntrodutorio()
{
    $sqlCmd = "SELECT * from v21_associados_intro";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateTextoIntrodutorio()
{
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['text1PT'];
    $textEN = $_REQUEST['text1EN'];

    $sql_update = "UPDATE v21_associados_intro
        SET title = '" . $titlePT . "',
        title_en = '" . $titleEN . "',
        text = '" . $textPT . "',
        text_en = '" . $textEN . "'";

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

function getAssociados()
{
    $sqlCmd = " SELECT * from v21_associados_cards";
    $home_slideshow = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($home_slideshow);
}

function getAllAssociadosByIdAssociado()
{
    $sqlCmd = " SELECT * from v21_associados_cards
    WHERE id = " . $_REQUEST['id_associado'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function updateAssociado()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $img_link = $_REQUEST['img_link'];
    // $align = $_REQUEST['align'];

    if (isset($_FILES['file'])) {
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/v21-associados/'; //to BO path
        // $path1 = 'https://beta.v21.pt/uploads/v21-associados/'; //to website path
        $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/v21-associados/'; //to website path
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
                $sql_update = "UPDATE v21_associados_cards
                        SET title = '" . $titlePT . "',
                        title_en = '" . $titleEN . "',
                        text = '" . $textPT . "',
                        text_en = '" . $textEN . "',
                        img_src = 'https://www.v21.pt/uploads/v21-associados/" . $file_name . "',
                        img_link = '" . $img_link . "'
                        WHERE id = " . $id;

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
        $sql_update = "UPDATE v21_associados_cards
            SET title = '" . $titlePT . "',
            title_en = '" . $titleEN . "',
            text = '" . $textPT . "',
            text_en = '" . $textEN . "',
            img_link = '" . $img_link . "'
            WHERE id = " . $id;

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