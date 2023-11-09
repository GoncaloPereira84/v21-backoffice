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
    case 'getServicos':
        getServicos();
        break;
    case 'getAllServicosByIdServico':
        getAllServicosByIdServico();
        break;
    case 'updateServicos':
        updateServicos();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getTextoIntrodutorio()
{
    $sqlCmd = "SELECT * from inc_servicos_intro";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateTextoIntrodutorio()
{
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['text1PT'];
    $textEN = $_REQUEST['text1EN'];

    $sql_update = "UPDATE inc_servicos_intro
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

function getServicos()
{
    $sqlCmd = " SELECT * from inc_servicos_cards";
    $home_slideshow = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($home_slideshow);
}

function getAllServicosByIdServico()
{
    $sqlCmd = " SELECT * from inc_servicos_cards
    WHERE id = " . $_REQUEST['id_servico'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function updateServicos()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];

    $sql_update = "UPDATE inc_servicos_cards
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