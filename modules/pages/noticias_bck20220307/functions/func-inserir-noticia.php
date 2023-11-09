<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/functions/mysql_funcs.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/tools.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
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

    if (isset($_FILES['file'])) {
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'; //to BO path
        // $path1 = 'https://beta.v21.pt/uploads/noticias/'; //to website path
        $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/noticias/'; //to website path
        $extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG'];

        $file_name = $_FILES['file']['name'];
        $file_tmp = $_FILES['file']['tmp_name'];
        $file_type = $_FILES['file']['type'];
        $file_size = $_FILES['file']['size'];
        $file_ext = explode('.', $_FILES['file']['name']);
        $ext = end($file_ext);

        $file = $path . $file_name;
        $file1 = $path1 . $file_name;

        if (!in_array($ext, $extensions)) {
            $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ' ' . $file_type;
        }

        if ($file_size > 409600) {
            $errors[] = 'O tamanho do ficheiro excede o limite de 400KBs: ' . $file_name . ' ' . $file_size;
        }

        if ($file_size == 0) {
            $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
        }

        
        $errors_pdf = [];
        if (isset($_FILES['pdf'])) {
            $path_pdf = $_SERVER['DOCUMENT_ROOT'] . '/uploads/pdfs/'; //to BO path
            // $path1 = 'https://beta.v21.pt/uploads/noticias/'; //to website path
            $path1_pdf = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/pdfs/'; //to website path
            $extensions_pdf = ['pdf', 'PDF'];
    
            $file_name_pdf = $_FILES['pdf']['name'];
            $file_tmp_pdf = $_FILES['pdf']['tmp_name'];
            $file_type_pdf = $_FILES['pdf']['type'];
            $file_size_pdf = $_FILES['pdf']['size'];
            $file_ext_pdf = explode('.', $_FILES['pdf']['name']);
            $ext_pdf = end($file_ext_pdf);
    
            $file_pdf = $path_pdf . $file_name_pdf;
            $file1_pdf = $path1_pdf . $file_name_pdf;
    
            if (!in_array($ext_pdf, $extensions_pdf)) {
                $errors_pdf[] = 'Extensão de ficheiro não permitida: ' . $file_name_pdf . ' ' . $file_type_pdf;
            }
    
            if ($file_size_pdf > 1048576) {
                $errors_pdf[] = 'O tamanho do ficheiro excede o limite de 1024KBs: ' . $file_name_pdf . ' ' . $file_size_pdf;
            }
    
            if ($file_size_pdf == 0) {
                $errors_pdf[] = 'Não é possível ler o ficheiro: ' . $file_name_pdf . ' ' . $file_type_pdf;
            }

            // print_r($errors_pdf);

            if (empty($errors_pdf)) {
                move_uploaded_file($file_tmp_pdf, $file_pdf);
                copy($file_pdf, $file1_pdf);
            } else {
                echo 'false||' . $errors_pdf[0];
            }
        } else {
            $file_pdf = null;
            $file1_pdf = null;
            $file_name_pdf = null;
        }

        if (empty($errors) && empty($errors_pdf)) {
            move_uploaded_file($file_tmp, $file);
            copy($file, $file1);

            if ($file) {
                $sql_update = "INSERT INTO noticias
                (title,
                title_en,
                categoria_id,
                pdf_file,
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
                    'https://www.v21.pt/uploads/pdfs/" . $file_name_pdf . "',
                    '" . $data . "',
                    '" . $data . "',
                    '" . $textPT . "',
                    '" . $textEN . "',
                    0,
                    'https://www.v21.pt/uploads/noticias/" . $file_name . "',
                    '" . $align . "',
                    '" . $ref . "'
                )";

                include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
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
        } else {
            echo 'false||' . $errors[0];
        }
        // }
    } else {
        echo 'false||Por favor, inserir imagem.';
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

    if (isset($_FILES['file'])) {
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'; //to BO path
        // $path1 = 'https://beta.v21.pt/uploads/noticias/'; //to website path
        $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/noticias/'; //to website path
        $extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG'];

        $file_name = $_FILES['file']['name'];
        $file_tmp = $_FILES['file']['tmp_name'];
        $file_type = $_FILES['file']['type'];
        $file_size = $_FILES['file']['size'];
        $file_ext = explode('.', $_FILES['file']['name']);
        $ext = end($file_ext);

        $file = $path . $file_name;
        $file1 = $path1 . $file_name;

        if (!in_array($ext, $extensions)) {
            $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ' ' . $file_type;
        }

        if ($file_size > 409600) {
            $errors[] = 'O tamanho do ficheiro excede o limite de 400KBs: ' . $file_name . ' ' . $file_size;
        }

        if ($file_size == 0) {
            $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
        }

        if (empty($errors)) {
            move_uploaded_file($file_tmp, $file);
            copy($file, $file1);

            if ($file) {
                $sql_update = "INSERT INTO noticias
                (title,
                title_en,
                categoria_id,
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
                    '" . $data . "',
                    '" . $data . "',
                    '" . $textPT . "',
                    '" . $textEN . "',
                    1,
                    'https://www.v21.pt/uploads/noticias/" . $file_name . "',
                    '" . $align . "',
                    '" . $ref . "'
                )";

                include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
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
        } else {
            echo 'false||' . $errors[0];
        }
        // }
    } else {
        echo 'false||Por favor, inserir imagem.';
    }
}
