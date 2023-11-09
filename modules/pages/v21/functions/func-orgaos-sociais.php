<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getTitle':
        getTitle();
        break;
    case 'updateTitle':
        updateTitle();
        break;
    case 'getOrgaosSociais':
        getOrgaosSociais();
        break;
    case 'getAllOrgaosSociaisByIdOrgao':
        getAllOrgaosSociaisByIdOrgao();
        break;
    case 'updateOrgaosSociais':
        updateOrgaosSociais();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getTitle()
{
    $sqlCmd = "SELECT * from v21_orgaos_sociais_title";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateTitle()
{
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];

    $sql_update = "UPDATE v21_orgaos_sociais_title
        SET title = '" . $titlePT . "',
        title_en = '" . $titleEN . "'";

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

function getOrgaosSociais()
{
    $sqlCmd = "SELECT * from v21_orgaos_sociais";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function getAllOrgaosSociaisByIdOrgao()
{
    $sqlCmd = " SELECT * from v21_orgaos_sociais
    WHERE id = " . $_REQUEST['id_orgao'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function updateOrgaosSociais()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];

    $sql_update = "UPDATE v21_orgaos_sociais
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