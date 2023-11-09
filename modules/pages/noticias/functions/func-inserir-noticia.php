<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/functions/mysql_funcs.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/tools.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getImagensBiblioteca':
        getImagensBiblioteca();
        break;
    case 'getPDFBiblioteca':
        getPDFBiblioteca();
        break;
    case 'getImagensBibliotecaGaleria':
        getImagensBibliotecaGaleria();
        break;
    case 'getListaCategorias':
        getListaCategorias();
        break;
    case 'saveNoticia':
        saveNoticia();
        break;
    case 'publishNoticia':
        publishNoticia();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getImagensBiblioteca()
{
    $sqlCmd = "SELECT * from uploaded_files
    where content_table like 'noticias%'
    and file_type like 'image/%'
    order by id DESC";
    $noticias = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($noticias);
}

function getAllImagensByIdImagem()
{
    $sqlCmd = " SELECT * from uploaded_files
    WHERE id = " . $_REQUEST['id_ficheiro'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function getPDFBiblioteca()
{
    $sqlCmd = "SELECT * from uploaded_files
    where content_table = 'noticias'
    and file_type like 'application/pdf'
    order by id DESC";
    $noticias = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($noticias);
}

function getAllPDFsByIdPDF()
{
    $sqlCmd = " SELECT * from uploaded_files
    WHERE id = " . $_REQUEST['id_ficheiro'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function getImagensBibliotecaGaleria()
{
    $sqlCmd = "SELECT * from uploaded_files
    where content_table like 'noticias%'
    and file_type like 'image/%'
    order by id DESC";
    $noticias = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($noticias);
}

function getAllBGsByIdBG()
{
    $sqlCmd = " SELECT * from uploaded_files
    WHERE id = " . $_REQUEST['id_ficheiro'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function getListaCategorias()
{
    $sqlCmd = "SELECT * from noticias_categorias";
    $formacao_details = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($formacao_details);
}

function saveNoticia()
{
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $categoria_id = $_REQUEST['categoria_id'];
    $data = date('Y-m-d');
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $align = $_REQUEST['align'];
    $ref = CleanToRef($titlePT);
    $img = $_REQUEST['img'];
    $img_id = $_REQUEST['img_id'];
    $pdfs = $_REQUEST['pdfs'];
    $gallery_ids = $_REQUEST['gallery_ids'];

    if($img == ''){
        echo "false||Por favor, inserir imagem.";
    } else {
        $sql_update = "INSERT INTO noticias
        (title,
        title_en,
        categoria_id,
        pdf_file_id,
        img_id,
        photo_gallery_ids,
        data_inicio,
        data_fim,
        text,
        text_en,
        is_visible,
        img_src,
        img_align,
        ref)
        VALUES
        (
            '" . $titlePT . "',
            '" . $titleEN . "',
            '" . $categoria_id . "',
            '" . $pdfs . "',
            '" . $img_id . "',
            '" . $gallery_ids . "',
            '" . $data . "',
            '" . $data . "',
            '" . $textPT . "',
            '" . $textEN . "',
            0,
            '" . $img . "',
            '" . $align . "',
            '" . $ref . "'
        )";

        include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
        $db = Database::getInstance();
        $connection = $db->getConnection();

        if ($result = $connection->query($sql_update)) {
            $last_ins_id = "SELECT LAST_INSERT_ID()";

            $updateImg = "UPDATE uploaded_files 
            SET content_table_id = (".$last_ins_id.")
            where id = ".$img_id;

            if ($result1 = $connection->query($updateImg)) {
                $pdfIDs = explode(",", $pdfs);
                foreach ($pdfIDs as $p) {
                    $updatePDFS = "UPDATE uploaded_files 
                    SET content_table_id = (".$last_ins_id.")
                    where id = ".$p;

                    if ($result2 = $connection->query($updatePDFS)) {
                        
                    }
                }
                $db->commitAndClose();
            }
            $db->commitAndClose();
            echo "true||" . json_encode($result);
        } else {
            echo "false||Erro na inserção dos dados.";
        }
    }
}

function publishNoticia()
{
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $categoria_id = $_REQUEST['categoria_id'];
    $data = date('Y-m-d');
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $align = $_REQUEST['align'];
    $ref = CleanToRef($titlePT);
    $img = $_REQUEST['img'];
    $img_id = $_REQUEST['img_id'];
    $pdfs = $_REQUEST['pdfs'];
    $gallery_ids = $_REQUEST['gallery_ids'];

    if($img == ''){
        echo "false||Por favor, inserir imagem.";
    } else {
        $sql_update = "INSERT INTO noticias
        (title,
        title_en,
        categoria_id,
        pdf_file_id,
        img_id,
        photo_gallery_ids,
        data_inicio,
        data_fim,
        text,
        text_en,
        is_visible,
        img_src,
        img_align,
        ref)
        VALUES
        (
            '" . $titlePT . "',
            '" . $titleEN . "',
            '" . $categoria_id . "',
            '" . $pdfs . "',
            '" . $img_id . "',
            '" . $gallery_ids . "',
            '" . $data . "',
            '" . $data . "',
            '" . $textPT . "',
            '" . $textEN . "',
            1,
            '" . $img . "',
            '" . $align . "',
            '" . $ref . "'
        )";

        include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
        $db = Database::getInstance();
        $connection = $db->getConnection();

        if ($result = $connection->query($sql_update)) {
            $last_ins_id = "SELECT LAST_INSERT_ID()";

            $updateImg = "UPDATE uploaded_files 
            SET content_table_id = (".$last_ins_id.")
            where id = ".$img_id;

            if ($result1 = $connection->query($updateImg)) {
                $pdfIDs = explode(",", $pdfs);
                foreach ($pdfIDs as $p) {
                    $updatePDFS = "UPDATE uploaded_files 
                    SET content_table_id = (".$last_ins_id.")
                    where id = ".$p;

                    if ($result2 = $connection->query($updatePDFS)) {
                        
                    }
                }
                $db->commitAndClose();
            }
            $db->commitAndClose();
            echo "true||" . json_encode($result);
        } else {
            echo "false||Erro na inserção dos dados.";
        }
    }
}
