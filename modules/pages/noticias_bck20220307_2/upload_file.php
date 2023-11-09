<?php
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

date_default_timezone_set('EUROPE/LISBON');


$response = array();

$error = "";

if (isset($_FILES['filepond_pdf'])) {
    $errors = [];
    $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/biblioteca-multimedia/'; //to BO path
    $path1 = explode('backoffice.v21.pt',$_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/biblioteca-multimedia/'; //to website path
    $extensions = ['pdf', 'PDF'];

    $file_name = $_FILES['filepond_pdf']['name'];
    $file_tmp = $_FILES['filepond_pdf']['tmp_name'];
    $file_type = $_FILES['filepond_pdf']['type'];
    $file_size = $_FILES['filepond_pdf']['size'];
    $file_ext = explode('.', $_FILES['filepond_pdf']['name']);
    $ext = end($file_ext);

    $file = $path . $file_name;
    $file1 = $path1 . $file_name;

    if (!in_array($ext, $extensions)) {
        $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ', ' . $file_type;
    }

    if ($file_size > 1048576) {
        $errors[] = 'O tamanho do ficheiro excede o limite de 1024KBs: ' . $file_name . ', ' . $file_size . 'KB';
    }

    if ($file_size == 0) {
        $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ', ' . $file_type;
    }

    if (empty($errors)) {
        move_uploaded_file($file_tmp, $file);
        copy($file, $file1);

        $date = date('Y-m-d H:i:s');

        if ($file) {
            $sql_select_image = "SELECT file_name
            from uploaded_files
            where file_name = '" . $file_name . "'";
            $imagem = execQueryMySQL($sql_select_image);

            if(!empty($imagem)){
                $erro = 'Este nome de ficheiro já existe: ' . $file_name;
                $response["error"] = $erro;
            } else {
                $sql_insert = "INSERT INTO uploaded_files
                (file_title,
                file_type,
                file_name,
                file_url,
                content_table,
                content_table_id,
                upload_date)
                VALUES
                ('" . $file_ext[0] . "',
                '" . $file_type . "',
                '" . $file_name . "',
                'https://www.v21.pt/uploads/biblioteca-multimedia/" . $file_name . "',
                'noticias',
                '',
                '" . $date . "')";

                if ($result = $connection->query($sql_insert)) {
                    $db->commitAndClose();
                    // echo "true||" . json_encode($result);
                    // echo "true||https://beta.v21.pt/uploads/biblioteca-multimedia/" . $file_name;
                    $erro = 'Ficheiro(s) carregado(s) com sucesso.';
                    $response["success"] = $erro;
                } else {
                    // $db->rollbackAndClose();
                    // echo "false||Erro na inserção dos dados.";
                    $erro = 'Erro no carregamento do(s) ficheiro(s).';
                    $response["error"] = $erro;
                }
            }
        }
    } else {
        // echo 'false||' . $errors[0];
        $erro = $errors[0];
        $response["error"] = $erro;
    }

    echo json_encode($response);
    exit;
}