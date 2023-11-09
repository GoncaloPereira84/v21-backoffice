<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/functions/mysql_funcs.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getMorada1':
        getMorada1();
        break;
    case 'updateMorada1':
        updateMorada1();
        break;
    case 'getMorada2':
        getMorada2();
        break;
    case 'updateMorada2':
        updateMorada2();
        break;
    case 'getContacts':
        getContacts();
        break;
    case 'updateContacts':
        updateContacts();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getMorada1()
{
    $sqlCmd = " SELECT title1, coords1, morada1, google_maps_code from contactos";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateMorada1()
{
    $nome = $_REQUEST['nome'];
    $morada = $_REQUEST['morada'];
    $coordenadas = $_REQUEST['coordenadas'];
    $googleMaps = $_REQUEST['googleMaps'];


    $sql_update = "UPDATE contactos
        SET title1 = '" . $nome . "',
        coords1 = '" . $coordenadas . "',
        morada1 = '" . $morada . "',
        google_maps_code = '" . $googleMaps . "'";

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

function getMorada2()
{
    $sqlCmd = " SELECT title2, coords2, morada2 from contactos";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateMorada2()
{
    $nome = $_REQUEST['nome'];
    $morada = $_REQUEST['morada'];
    $coordenadas = $_REQUEST['coordenadas'];


    $sql_update = "UPDATE contactos
        SET title2 = '" . $nome . "',
        coords2 = '" . $coordenadas . "',
        morada2 = '" . $morada . "'";

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

function getContacts()
{
    $sqlCmd = "SELECT email, tlf, facebook, instagram, linkedin, twitter, youtube from contactos";
    $missao = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($missao);
}

function updateContacts()
{
    $email = $_REQUEST['email'];
    $telefone = $_REQUEST['telefone'];
    $facebook = $_REQUEST['facebook'];
    $instagram = $_REQUEST['instagram'];
    $linkedin = $_REQUEST['linkedin'];
    $twitter = $_REQUEST['twitter'];
    $youtube = $_REQUEST['youtube'];


    $sql_update = "UPDATE contactos
        SET email = '" . $email . "',
        tlf = '" . $telefone . "',
        facebook = '" . $facebook . "',
        instagram = '" . $instagram . "',
        linkedin = '" . $linkedin . "',
        twitter = '" . $twitter . "',
        youtube = '" . $youtube . "'";

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