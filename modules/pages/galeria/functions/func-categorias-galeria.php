<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getCategorias':
        getCategorias();
        break;
    case 'getAllCategoriasByIdCategoria':
        getAllCategoriasByIdCategoria();
        break;
    case 'saveCat':
        saveCat();
        break;
    case 'deleteCategoria':
        deleteCategoria();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getCategorias()
{
    $sqlCmd = " SELECT * from galeria_categorias";
    $home_slideshow = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($home_slideshow);
}

function getAllCategoriasByIdCategoria()
{
    $sqlCmd = " SELECT * from galeria_categorias
    WHERE id = " . $_REQUEST['id_categoria'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function saveCat()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];

    if($id == 'undefined') {
        $sql_insert = "INSERT INTO galeria_categorias 
        (title,
        title_en) 
        VALUES
        ('" . $titlePT . "',
        '" . $titleEN . "');";

        include_once('../connection/class.connection.php');
        $db = Database::getInstance();
        $connection = $db->getConnection();
        if ($result = $connection->query($sql_insert)) {
            $db->commitAndClose();
            echo "true||" . json_encode($result);
        } else {
            // $db->rollbackAndClose();
            echo "false||Erro na inserção dos dados.";
        }
    } else {
        $sql_update = "UPDATE galeria_categorias
        SET title = '" . $titlePT . "',
        title_en = '" . $titleEN . "'
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

function deleteCategoria()
{
    $sql_delete = "DELETE from galeria_categorias 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Categoria apagada com sucesso.";
}