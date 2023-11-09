<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/functions/mysql_funcs.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/tools.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getFicheiros':
        getFicheiros();
        break;
    case 'deleteFicheiro':
        deleteFicheiro();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getFicheiros()
{
    $sqlCmd = "SELECT * from uploaded_files
    order by id DESC";
    $noticias = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($noticias);
}

function getAllFicheirosByIdFicheiro()
{
    $sqlCmd = " SELECT * from uploaded_files
    WHERE id = " . $_REQUEST['id_ficheiro'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

// function saveFicheiro()
// {
//     $id = $_REQUEST['id'];
//     $titlePT = $_REQUEST['file_title'];
//     $name = $_REQUEST['file_name'];
//     $url = $_REQUEST['file_url'];
//     $content_id = $_REQUEST['main_content_id'];
//     $upload_date = date('Y-m-d H:i:s');
// }

function deleteFicheiro()
{
    $sql_delete = "DELETE from uploaded_files 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Ficheiro apagado com sucesso.";
}