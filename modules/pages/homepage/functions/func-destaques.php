<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getFicheirosBiblioteca':
        getFicheirosBiblioteca();
        break;
    case 'getDestaques':
        getDestaques();
        break;
    case 'getAllDestaquesByIdDestaque':
        getAllDestaquesByIdDestaque();
        break;
    case 'updateDestaque':
        updateDestaque();
        break;
    case 'saveOrderDestaques':
        saveOrderDestaques();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getFicheirosBiblioteca()
{
    $sqlCmd = "SELECT * from uploaded_files
    where content_table = 'slideshow_home'
    order by id DESC";
    $noticias = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($noticias);
}

function getAllFicheirosByIdFicheiro()
{
    $sqlCmd = " SELECT * from uploaded_files
    WHERE id = " . $_REQUEST['id_ficheiro'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function getDestaques()
{
    $sqlCmd = " SELECT * from slideshow_home
    order by display_order asc";
    $home_slideshow = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($home_slideshow);
}

function getAllDestaquesByIdDestaque()
{
    $sqlCmd = " SELECT * from slideshow_home
    WHERE id = " . $_REQUEST['id_destaque'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function updateDestaque()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $link = $_REQUEST['link'];
    $img = $_REQUEST['img'];
    $align = $_REQUEST['align'];

    if($img != ''){
        $sql_update = "UPDATE slideshow_home
                SET title = '" . $titlePT . "',
                title_en = '" . $titleEN . "',
                text = '" . $textPT . "',
                text_en = '" . $textEN . "',
                link = '" . $link . "',
                img_src = '" . $img . "',
                img_align = '" . $align . "'
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
    } else {
        $sql_update = "UPDATE slideshow_home
            SET title = '" . $titlePT . "',
            title_en = '" . $titleEN . "',
            text = '" . $textPT . "',
            text_en = '" . $textEN . "',
            link = '" . $link . "',
            img_align = '" . $align . "'
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

    // if (isset($_FILES['file'])) {
    //     $errors = [];
    //     $path = $_SERVER['DOCUMENT_ROOT']. '/uploads/biblioteca-multimedia/'; //to BO path
    //     $path1 = 'https://beta.v21.pt/uploads/biblioteca-multimedia/'; //to website path
    //     // $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'beta.v21.pt/uploads/slideshow/'; //to website path
    //     $extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG'];

    //     $file_name = $_FILES['file']['name'];
    //     $file_tmp = $_FILES['file']['tmp_name'];
    //     $file_type = $_FILES['file']['type'];
    //     $file_size = $_FILES['file']['size'];
    //     $file_ext = explode('.', $_FILES['file']['name']);
    //     $ext = end($file_ext);

    //     $file = $path . $file_name;
    //     $file1 = $path1 . $file_name;

    //     if (!in_array($ext, $extensions)) {
    //         $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ' ' . $file_type;
    //     }

    //     if ($file_size > 409600) {
    //         $errors[] = 'O tamanho do ficheiro excede o limite de 400KBs: ' . $file_name . ' ' . $file_size;
    //     }

    //     if ($file_size == 0) {
    //         $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
    //     }

    //     if (empty($errors)) {
    //         move_uploaded_file($file_tmp, $file);
    //         copy($file, $file1);

    //         if ($file) {
    //             $sql_update = "UPDATE slideshow_home
    //                     SET title = '" . $titlePT . "',
    //                     title_en = '" . $titleEN . "',
    //                     text = '" . $textPT . "',
    //                     text_en = '" . $textEN . "',
    //                     link = '" . $link . "',
    //                     img_src = 'https://beta.v21.pt/uploads/biblioteca-multimedia/" . $file_name . "',
    //                     img_align = '" . $align . "'
    //                     WHERE id = " . $id;

    //             include_once($_SERVER['DOCUMENT_ROOT']. '/connection/class.connection.php'); 
    //             $db = Database::getInstance();
    //             $connection = $db->getConnection();

    //             if ($result = $connection->query($sql_update)) {
    //                 $db->commitAndClose();
    //                 echo "true||" . json_encode($result);
    //             } else {
    //                 // $db->rollbackAndClose();
    //                 echo "false||Erro na inserção dos dados.";
    //             }
    //         }
    //     } else {
    //         echo 'false||' . $errors[0];
    //     }
    //     // }
    // } else {
    //     $sql_update = "UPDATE slideshow_home
    //         SET title = '" . $titlePT . "',
    //         title_en = '" . $titleEN . "',
    //         text = '" . $textPT . "',
    //         text_en = '" . $textEN . "',
    //         link = '" . $link . "',
    //         img_align = '" . $align . "'
    //         WHERE id = " . $id;

    //     include_once($_SERVER['DOCUMENT_ROOT']. '/connection/class.connection.php');    
    //     $db = Database::getInstance();
    //     $connection = $db->getConnection();

    //     if ($result = $connection->query($sql_update)) {
    //         $db->commitAndClose();
    //         echo "true||" . json_encode($result);
    //     } else {
    //         // $db->rollbackAndClose();
    //         echo "false||Erro na inserção dos dados.";
    //     }
    // }
}

function saveOrderDestaques()
{
    $i = 0;
    foreach ($_REQUEST['destaque'] as $value) {
        $sql = "UPDATE slideshow_home SET display_order = $i WHERE id = $value";
        execIUQueryMySQL($sql);
        $i++;
    }
}