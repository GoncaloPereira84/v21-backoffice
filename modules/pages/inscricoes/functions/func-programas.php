<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/functions/mysql_funcs.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/tools.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
    case 'getListaCategorias':
        getListaCategorias();
        break;
    case 'getProgramas':
        getProgramas();
        break;
    case 'getAllProgramasByIdPrograma':
        getAllProgramasByIdPrograma();
        break;
    case 'savePrograma':
        savePrograma();
        break;
    case 'deletePrograma':
        deletePrograma();
        break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getListaCategorias()
{
    $sqlCmd = "SELECT * from inscricoes_categorias";
    $formacao_details = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($formacao_details);
}

function getProgramas()
{
    $sqlCmd = "SELECT * from inscricoes
    order by id DESC";
    $noticias = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($noticias);
}

function getAllProgramasByIdPrograma()
{
    $sqlCmd = " SELECT * from inscricoes
    WHERE id = " . $_REQUEST['id_programa'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function savePrograma()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $categoria_id = $_REQUEST['categoria_id'];
    $data_inicio = $_REQUEST['data_inicio'];
    $data_fim = $_REQUEST['data_fim'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $link_noticia = $_REQUEST['link_noticia'];
    $link_google_forms = $_REQUEST['link_google_forms'];
    $align = $_REQUEST['align'];
    $ref = CleanToRef($titlePT);

    if ($id == 'undefined') {
        echo 'false||Para inserir um novo progama terá de aceder a Inscrições > Adicionar programa.';
    } else {
        if (isset($_FILES['file'])) {
            $errors = [];
            $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/inscricoes/'; //to BO path
            // $path1 = 'https://beta.v21.pt/uploads/inscricoes/'; //to website path
            $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/inscricoes/'; //to website path
            print_r($path1);
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
                    $sql_update = "UPDATE inscricoes
                        SET title = '" . $titlePT . "',
                        title_en = '" . $titleEN . "',
                        categoria_id = '" . $categoria_id . "',
                        data_inicio = '" . $data_inicio . "',
                        data_fim = '" . $data_fim . "',
                        text = '" . $textPT . "',
                        text_en = '" . $textEN . "',
                        link_noticia = '" . $link_noticia . "',
                        link_form = '" . $link_google_forms . "',
                        img_src = 'https://www.v21.pt/uploads/inscricoes/" . $file_name . "',
                        img_align = '" . $align . "',
                        ref = '" . $ref . "'
                        WHERE id = " . $id;

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
            $sql_update = "UPDATE inscricoes
                SET title = '" . $titlePT . "',
                title_en = '" . $titleEN . "',
                categoria_id = '" . $categoria_id . "',
                data_inicio = '" . $data_inicio . "',
                data_fim = '" . $data_fim . "',
                text = '" . $textPT . "',
                text_en = '" . $textEN . "',
                link_noticia = '" . $link_noticia . "',
                link_form = '" . $link_google_forms . "',
                img_align = '" . $align . "',
                ref = '" . $ref . "'
                WHERE id = " . $id;

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
    }
}

function deletePrograma()
{
    $sql_delete = "DELETE from inscricoes 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Programa apagado com sucesso.";
}