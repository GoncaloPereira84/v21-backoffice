<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getListaCategorias':
        getListaCategorias();
        break;
    case 'getGallery':
        getGallery();
        break;
    case 'getAllFotosByIdFoto':
        getAllFotosByIdFoto();
        break;
    case 'updateGallery':
        updateGallery();
        break;
    case 'deleteFotografia':
        deleteFotografia();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getListaCategorias()
{
    $sqlCmd = "SELECT * from galeria_categorias";
    $formacao_details = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($formacao_details);
}

function getGallery()
{
    $sqlCmd = "SELECT * from galeria_fotos
    order by id DESC";
    $galeria = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($galeria);
}

function getAllFotosByIdFoto()
{
    $sqlCmd = " SELECT * from galeria_fotos
    WHERE id = " . $_REQUEST['id_foto'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function updateGallery()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $align = $_REQUEST['align'];
    $categoria_id = $_REQUEST['categoria_id'];

    if ($id == 'undefined') {
        echo 'false||Para inserir uma nova fotografia terá de aceder a Galeria > Adicionar fotografia.';
    } else {
        if (isset($_FILES['file'])) {
            $errors = [];
            $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/galeria-geral/'; //to BO path
            // $path1 = 'https://beta.v21.pt/uploads/galeria-geral/'; //to website path
            $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/galeria-geral/'; //to website path
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
                $errors[] = 'O tamanho do ficheiro excede o limite de 400KBs: ' . $file_name . ' ' . $file_size;
            }

            if ($file_size == 0) {
                $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
            }

            if (empty($errors)) {
                move_uploaded_file($file_tmp, $file);
                copy($file, $file1);

                if ($file) {
                    $sql_update = "UPDATE galeria_fotos
                        SET title = '" . $titlePT . "',
                        img_src = 'https://www.v21.pt/uploads/galeria-geral/" . $file_name . "',
                        img_align = '" . $align . "',
                        categoria_id = '" . $categoria_id . "'
                        WHERE id = " . $id;

                    include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
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
            $sql_update = "UPDATE galeria_fotos
            SET title = '" . $titlePT . "',
            img_align = '" . $align . "',
            categoria_id = '" . $categoria_id . "'
            WHERE id = " . $id;

            include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
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
}

function deleteFotografia()
{
    $sql_delete = "DELETE from galeria_fotos 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Fotografia apagada com sucesso.";
}