<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getListaCategorias':
        getListaCategorias();
        break;
    case 'getTestemunhosCategorias':
        getTestemunhosCategorias();
        break;
    case 'getAllCategoriasByIdCategoria':
        getAllCategoriasByIdCategoria();
        break;

    case 'getTestemunhos':
        getTestemunhos();
        break;
    case 'getAllTestemunhosByIdTestemunho':
        getAllTestemunhosByIdTestemunho();
        break;
    case 'saveTestemunho':
        saveTestemunho();
        break;
    case 'deleteTestemunho':
        deleteTestemunho();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getListaCategorias()
{
    $sqlCmd = "SELECT * from pp_testemunhos_categoria";
    $formacao_details = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($formacao_details);
}

function getTestemunhosCategorias()
{
    $sqlCmd = "SELECT * from pp_testemunhos_categoria";
    $blog_posts = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($blog_posts);
}

function getAllCategoriasByIdCategoria()
{
    $sqlCmd = " SELECT * from pp_testemunhos_categoria
    WHERE id = " . $_REQUEST['id_categoria'];
    $post = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($post);
}


function getTestemunhos()
{
    $sqlCmd = "SELECT * from pp_testemunhos";
    $blog_posts = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($blog_posts);
}

function getAllTestemunhosByIdTestemunho()
{
    $sqlCmd = " SELECT * from pp_testemunhos
    WHERE id = " . $_REQUEST['id_testemunho'];
    $post = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($post);
}

function saveTestemunho()
{
    $id = $_REQUEST['id'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $autor = $_REQUEST['autor'];
    $video = $_REQUEST['video'];
    $cat_id = $_REQUEST['categoria_id'];


    if ($id == 'undefined') {
        echo 'false||Para adicionar novo testemunho, acedar à página "Adicionar Testemunho".';
    } else {
        $sql_update = "UPDATE pp_testemunhos
            SET text = '" . $textPT . "',
            text_en = '" . $textEN . "',
            autor = '" . $autor . "',
            video_src = '" . $video . "',
            categoria_id = '" . $cat_id . "'
            WHERE id = " . $id;

        include_once('../connection/class.connection.php');
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

function deleteTestemunho()
{
    $sql_delete = "DELETE from pp_testemunhos 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Testemunho apagado com sucesso.";
}
