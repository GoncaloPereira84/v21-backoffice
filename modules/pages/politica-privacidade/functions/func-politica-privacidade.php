<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getPoliticaPrivacidade':
        getPoliticaPrivacidade();
        break;
    case 'getAllInfoByIdTopic':
        getAllInfoByIdTopic();
        break;
    case 'saveTopic':
        saveTopic();
        break;
    case 'deletePoliticaPrivacidade':
        deletePoliticaPrivacidade();
        break;
    case 'saveOrderTopics':
        saveOrderTopics();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getPoliticaPrivacidade()
{
    $sqlCmd = " SELECT * from politica_privacidade_itens
    order by display_order asc";
    $pp = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($pp);
}

function getAllInfoByIdTopic()
{
    $sqlCmd = " SELECT * from politica_privacidade_itens
    WHERE id = " . $_REQUEST['id_pp'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function saveTopic()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];

    // print_r($_REQUEST);

    if ($id == 'undefined' || $id == '') {
        $lastRecordSql = 'SELECT MAX(display_order) 
        FROM politica_privacidade_itens';

        $lastRecord = execQueryMySQL($lastRecordSql);

        if ($lastRecord[0] == NULL) {
            $sql_insert = "INSERT INTO politica_privacidade_itens 
                        (title,
                        title_en,
                        text,
                        text_en,
                        display_order) 
                        VALUES
                        ('" . $titlePT . "',
                        '" . $titleEN . "',
                        '" . $textPT . "',
                        '" . $textEN . "',
                        '0');";
        } else {
            $sql_insert = "INSERT INTO politica_privacidade_itens 
                        (title,
                        title_en,
                        text,
                        text_en,
                        display_order) 
                        VALUES
                        ('" . $titlePT . "',
                        '" . $titleEN . "',
                        '" . $textPT . "',
                        '" . $textEN . "',
                        " . $lastRecord[0]["MAX(display_order)"] . " + 1);";
        }

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
        $sql_update = "UPDATE politica_privacidade_itens
                        SET title = '" . $titlePT . "',
                        title_en = '" . $titleEN . "',
                        text = '" . $textPT . "',
                        text_en = '" . $textEN . "'
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

function deletePoliticaPrivacidade()
{
    $sql_delete = "DELETE from politica_privacidade_itens 
    where id='" . $_REQUEST["id"] . "'";
    $deleted = execIUQueryMySQL($sql_delete);

    if ($deleted)
        echo "true||Tópico apagado com sucesso.";
    else
        echo "false||Não foi possível apagar o tópico. Tente novamente mais tarde.";
}

function saveOrderTopics()
{
    $i = 0;
    foreach ($_REQUEST['pp'] as $value) {
        $sql = "UPDATE politica_privacidade_itens SET display_order = $i WHERE id = $value";
        execIUQueryMySQL($sql);
        $i++;
    }
}