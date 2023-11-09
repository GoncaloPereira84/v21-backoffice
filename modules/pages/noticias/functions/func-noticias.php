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
    case 'getNoticias':
        getNoticias();
        break;
    case 'getAllNoticiasByIdNoticia':
        getAllNoticiasByIdNoticia();
        break;
    case 'saveNoticia':
        saveNoticia();
        break;
    case 'publishNoticia':
        publishNoticia();
        break;
    case 'deleteNoticia':
        deleteNoticia();
        break;
    // case 'getNoticiaGaleria':
    //     getNoticiaGaleria();
    //     break;
    // case 'getAllFotosByIdFoto':
    //     getAllFotosByIdFoto();
    //     break;
    // case 'saveFotoGaleria':
    //     saveFotoGaleria();
    //     break;
    // case 'deleteFotoGaleria':
    //     deleteFotoGaleria();
    //     break;
    default:
        echo "error||[\"missing arguments\"]";
        exit;
        break;
}

function getImagensBiblioteca()
{
    $sqlCmd = "SELECT * from uploaded_files
    where content_table = 'noticias'
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
    where content_table = 'noticias_galeria'
    and file_type like 'image/%'
    order by id DESC";
    $noticias_galeria = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($noticias_galeria);
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

function getNoticias()
{
    $sqlCmd = "SELECT * from noticias
    order by id DESC";
    $noticias = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($noticias);
}

function getAllNoticiasByIdNoticia()
{
    $sqlCmd = " SELECT * from noticias
    WHERE id = " . $_REQUEST['id_noticia'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function saveNoticia()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $categoria_id = $_REQUEST['categoria_id'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $align = $_REQUEST['align'];
    $data = $_REQUEST['data'];
    $ref = CleanToRef($titlePT);
    $img = $_REQUEST['img'];
    $img_id = $_REQUEST['img_id'];
    $pdfs = $_REQUEST['pdfs'];
    $gallery_ids = $_REQUEST['gallery_ids'];

    if($img == ''){
        echo "false||Por favor, inserir imagem.";
    } else {
        $sql_update = "UPDATE noticias
            SET title = '" . $titlePT . "',
            title_en = '" . $titleEN . "',
            categoria_id = '" . $categoria_id . "',
            pdf_file_id = '" . $pdfs . "',
            img_id = '".$img_id."',
            photo_gallery_ids = '" . $gallery_ids . "',
            text = '" . $textPT . "',
            text_en = '" . $textEN . "',
            is_visible = 0,
            img_src = '".$img."',
            data_inicio = '" . $data . "',
            img_align = '" . $align . "',
            ref = '" . $ref . "'
            WHERE id = " . $id;

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
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $titleEN = $_REQUEST['titleEN'];
    $categoria_id = $_REQUEST['categoria_id'];
    $textPT = $_REQUEST['textPT'];
    $textEN = $_REQUEST['textEN'];
    $align = $_REQUEST['align'];
    $data = $_REQUEST['data'];
    $ref = CleanToRef($titlePT);
    $img = $_REQUEST['img'];
    $img_id = $_REQUEST['img_id'];
    $pdfs = $_REQUEST['pdfs'];
    $gallery_ids = $_REQUEST['gallery_ids'];

    if($img == ''){
        echo "false||Por favor, inserir imagem.";
    } else {
        $sql_update = "UPDATE noticias
            SET title = '" . $titlePT . "',
            title_en = '" . $titleEN . "',
            categoria_id = '" . $categoria_id . "',
            pdf_file_id = '" . $pdfs . "',
            img_id = '".$img_id."',
            photo_gallery_ids = '" . $gallery_ids . "',
            text = '" . $textPT . "',
            text_en = '" . $textEN . "',
            is_visible = 1,
            img_src = '".$img."',
            data_inicio = '" . $data . "',
            img_align = '" . $align . "',
            ref = '" . $ref . "'
            WHERE id = " . $id;

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

function deleteNoticia()
{
    $sql_delete = "DELETE from noticias 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Notícia apagada com sucesso.";
}



// function getNoticiaGaleria()
// {
//     $sqlCmd = "SELECT * from noticias_galeria WHERE noticias_id = " . $_REQUEST['id_noticia'];
//     $noticias = execQueryMySQL($sqlCmd);
//     echo "true||" . json_encode($noticias);
// }

// function getAllFotosByIdFoto()
// {
//     $sqlCmd = " SELECT * from noticias_galeria
//     WHERE id = " . $_REQUEST['id_foto'];
//     $slide = execQueryMySQL($sqlCmd);
//     echo "true||" . json_encode($slide);
// }

// function saveFotoGaleria()
// {
//     $id = $_REQUEST['id'];
//     $titlePT = $_REQUEST['titlePT'];
//     $noticia_id = $_REQUEST['noticia_id'];

//     if ($id == 'undefined' || $id == '') {
//         if (isset($_FILES['file'])) {
//             $errors = [];
//             $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'; //to BO path
//             // $path1 = 'https://www.v21.pt/uploads/noticias/'; //to website path
//             $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/noticias/'; //to website path
//             // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/noticias/');
//             $extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

//             $file_name = $_FILES['file']['name'];
//             $file_tmp = $_FILES['file']['tmp_name'];
//             $file_type = $_FILES['file']['type'];
//             $file_size = $_FILES['file']['size'];
//             $file_ext = explode('.', $_FILES['file']['name']);
//             $ext = end($file_ext);

//             $file = $path . $file_name;
//             $file1 = $path1 . $file_name;

//             if (!in_array($ext, $extensions)) {
//                 $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ' ' . $file_type;
//             }

//             if ($file_size > 409600) {
//                 $errors[] = 'O tamanho do ficheiro excede o limite de 400KBs: ' . $file_name . ' ' . $file_size;
//             }

//             if ($file_size == 0) {
//                 $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
//             }

//             if (empty($errors)) {
//                 move_uploaded_file($file_tmp, $file);
//                 copy($file, $file1);

//                 if ($file) {
//                     $sql_update = "INSERT INTO noticias_galeria
//                     (title,
//                     img_src,
//                     noticias_id)
//                     VALUES
//                     ('" . $titlePT . "',
//                     '" . $file1 . "',
//                     '" . $noticia_id . "')";

//                     include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
//                     $db = Database::getInstance();
//                     $connection = $db->getConnection();

//                     if ($result = $connection->query($sql_update)) {
//                         $db->commit();
//                         echo "true||" . json_encode($result);
//                     } else {
//                         // $db->rollbackAndClose();
//                         echo "false||Erro na inserção dos dados.";
//                     }
//                 }
//             } else {
//                 echo 'false||' . $errors[0];
//             }
//         } else {
//             echo 'false||Por favor, inserir imagem.';
//         }
//     } else {
//         if (isset($_FILES['file'])) {
//             $errors = [];
//             $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'; //to BO path
//             // $path1 = 'https://www.v21.pt/uploads/noticias/'; //to website path
//             $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/noticias/'; //to website path
//             // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/noticias/');
//             // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/noticias/');
//             $extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

//             $file_name = $_FILES['file']['name'];
//             $file_tmp = $_FILES['file']['tmp_name'];
//             $file_type = $_FILES['file']['type'];
//             $file_size = $_FILES['file']['size'];
//             $file_ext = explode('.', $_FILES['file']['name']);
//             $ext = end($file_ext);

//             $file = $path . $file_name;
//             $file1 = $path1 . $file_name;

//             if (!in_array($ext, $extensions)) {
//                 $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ' ' . $file_type;
//             }

//             if ($file_size > 409600) {
//                 $errors[] = 'O tamanho do ficheiro excede o limite de 400KBs: ' . $file_name . ' ' . $file_size;
//             }

//             if ($file_size == 0) {
//                 $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
//             }

//             if (empty($errors)) {
//                 move_uploaded_file($file_tmp, $file);
//                 copy($file, $file1);

//                 if ($file) {
//                     $sql_update = "UPDATE noticias_galeria
//                         SET title = '" . $titlePT . "',
//                         img_src = '" . $file1 . "'
//                         WHERE id = " . $id;

//                     // print_r($sql_update);

//                     include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
//                     $db = Database::getInstance();
//                     $connection = $db->getConnection();

//                     if ($result = $connection->query($sql_update)) {
//                         $db->commitAndClose();
//                         echo "true||" . json_encode($result);
//                     } else {
//                         // $db->rollbackAndClose();
//                         echo "false||Erro na inserção dos dados.";
//                     }
//                 }
//             } else {
//                 echo 'false||' . $errors[0];
//             }
//             // }
//         } else {
//             $sql_update = "UPDATE noticias_galeria
//                 SET title = '" . $titlePT . "'
//                 WHERE id = " . $id;

//             include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
//             $db = Database::getInstance();
//             $connection = $db->getConnection();

//             if ($result = $connection->query($sql_update)) {
//                 $db->commitAndClose();
//                 echo "true||" . json_encode($result);
//             } else {
//                 // $db->rollbackAndClose();
//                 echo "false||Erro na inserção dos dados.";
//             }
//         }
//     }
// }

// function deleteFotoGaleria()
// {
//     $sql_delete = "DELETE from noticias_galeria 
//     where id='" . $_REQUEST["id"] . "'";
//     execIUQueryMySQL($sql_delete);

//     echo "true||Fotografia apagada com sucesso.";
// }