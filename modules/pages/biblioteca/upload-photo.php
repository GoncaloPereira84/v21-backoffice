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

if (isset($_FILES['file'])) {
    $errors = [];
    $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/biblioteca-multimedia/'; //to BO path
    $path1 = explode('beta-bo.v21.pt',$_SERVER['DOCUMENT_ROOT'])[0] . 'beta.v21.pt/uploads/biblioteca-multimedia/'; //to website path
    $extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

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

        $date = date('Y-m-d H:i:s');

        if ($file) {
            $sql_select_image = "SELECT file_name
            from uploaded_files
            where file_name = '" . $file_name . "'";
            $imagem = execQueryMySQL($sql_select_image);

            if(!empty($imagem)){
                echo "false||Esse nome de ficheiro já existe.";
            } else {
                $sql_insert = "INSERT INTO uploaded_files
                (file_title,
                file_name,
                file_url,
                content_table,
                content_table_id,
                upload_date)
                VALUES
                ('" . $file_ext[0] . "',
                '" . $file_name . "',
                'https://beta.v21.pt/uploads/biblioteca-multimedia/" . $file_name . "',
                '',
                '',
                '" . $date . "')";

                if ($result = $connection->query($sql_insert)) {
                    $db->commitAndClose();
                    echo "true||" . json_encode($result);
                } else {
                    // $db->rollbackAndClose();
                    echo "false||Erro na inserção dos dados.";
                }
            }
        }
    } else {
        echo 'false||' . $errors[0];
    }
}