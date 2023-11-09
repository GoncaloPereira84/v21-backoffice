<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getListaCategorias':
        getListaCategorias();
        break;
    case 'saveTestemunho':
        saveTestemunho();
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

function saveTestemunho()
{
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $autor = $_REQUEST['autor'];
    $video = $_REQUEST['video'];
    $cat_id = $_REQUEST['categoria_id'];

    $sql_insert = "INSERT INTO pp_testemunhos
    (text,
    text_en,
    autor,
    video_src,
    categoria_id)
    VALUES
    (
        '" . $textPT . "',
        '" . $textEN . "',
        '" . $autor . "',
        '" . $video . "',
        '" . $cat_id . "'
    )";

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
}