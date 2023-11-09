<?php
global $db;
global $connection;

$splitURI = explode('/', $_SERVER['REQUEST_URI']);

    if (isset($splitURI[1])) {
        $path = '';
    }

    if (isset($splitURI[2])) {
        $path = '../';
    }

    if (isset($splitURI[3])) {
        $path = '../../';
    }

    if (isset($splitURI[4])) {
        $path = '../../../';
    }

//instancia ligacao a BD
include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
$db = Database::getInstance();
$connection = $db->getConnection();

function execQueryMySQL($sqlCmd)
{
    global $db;
    global $connection;
    if ($result = $connection->query($sqlCmd)) {
        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
    } else {
        $db->rollback();
    }
    return $rows;
}

function execIUQueryMySQL($sqlCmd)
{
    global $db;
    global $connection;
    if ($result = $connection->query($sqlCmd)) {
        $db->commit();
    } else {
        $db->rollback();
    }
    return $result;
}
