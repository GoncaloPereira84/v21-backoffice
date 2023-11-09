<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getMissaoInfo':
        getMissaoInfo();
        break;
    case 'updateMissaoInfo':
        updateMissaoInfo();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getMissaoInfo()
{
    $sqlCmd = " SELECT * from v21_missao";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateMissaoInfo()
{
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $introPT = $_REQUEST['introPT'];
    $introEN = $_REQUEST['introEN'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];


    $sql_update = "UPDATE v21_missao
        SET title = '" . $titlePT . "',
        title_en = '" . $titleEN . "',
        intro = '" . $introPT . "',
        intro_en = '" . $introEN . "',
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