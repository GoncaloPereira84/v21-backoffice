<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getIntro':
        getIntro();
        break;
    case 'updateIntro':
        updateIntro();
        break;
    case 'getTopicos':
        getTopicos();
        break;
    case 'getAllTopicosByIdTopico':
        getAllTopicosByIdTopico();
        break;
    case 'updateTopicos':
        updateTopicos();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getIntro()
{
    $sqlCmd = "SELECT * from inc_v21";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateIntro()
{
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];

    $sql_update = "UPDATE inc_v21
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

function getTopicos(){
    $sqlCmd = "SELECT * from inc_v21_topicos";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function getAllTopicosByIdTopico()
{
    $sqlCmd = " SELECT * from inc_v21_topicos
    WHERE id = " . $_REQUEST['id_topico'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function updateTopicos()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];

    $sql_update = "UPDATE inc_v21_topicos
        SET title = '" . $titlePT . "',
        title_en = '" . $titleEN . "',
        text = '" . $textPT . "',
        text_en = '" . $textEN . "'
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