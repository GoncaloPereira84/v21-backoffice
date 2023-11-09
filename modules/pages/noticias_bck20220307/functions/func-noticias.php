<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/functions/mysql_funcs.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/tools/tools.php');

date_default_timezone_set('EUROPE/LISBON');
$cmdEval = $_REQUEST['cmdEval'];

switch ($cmdEval) {
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
    case 'getNoticiaGaleria':
        getNoticiaGaleria();
        break;
    case 'getAllFotosByIdFoto':
        getAllFotosByIdFoto();
        break;
    case 'saveFotoGaleria':
        saveFotoGaleria();
        break;
    case 'deleteFotoGaleria':
        deleteFotoGaleria();
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
    $files_gallery_nr = explode(',',$_REQUEST['files_gallery_nr']);
    $files_gallery_names = explode(',',$_REQUEST['files_gallery_names']);
    $pdf_title = $_REQUEST['pdf_title'];

    if($_REQUEST['files_gallery_nr'] == 0) {
        if ($id == 'undefined') {
            echo 'false||Para inserir uma nova notícia terá de aceder a Notícias > Adicionar notícia.';
        } else {
            if (isset($_FILES['file'])) {
                $errors = [];
                $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'; //to BO path
                // $path1 = 'https://www.v21.pt/uploads/noticias/'; //to website path
                $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/noticias/'; //to website path
                // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/noticias/');
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

        
                $errors_pdf = [];
                if (isset($_FILES['pdf'])) {
                    $path_pdf = $_SERVER['DOCUMENT_ROOT'] . '/uploads/pdfs/'; //to BO path
                    // $path1 = 'https://beta.v21.pt/uploads/noticias/'; //to website path
                    $path1_pdf = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/pdfs/'; //to website path
                    $extensions_pdf = ['pdf', 'PDF'];
            
                    $file_name_pdf = 'https://www.v21.pt/uploads/pdfs/'.$_FILES['pdf']['name'];
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
                } else if($pdf_title != '') {
                    $file_name_pdf = $pdf_title;
                } else {
                    $file_pdf = null;
                    $file1_pdf = null;
                    $file_name_pdf = null;
                }

                if (empty($errors) && empty($errors_pdf)) {
                    move_uploaded_file($file_tmp, $file);
                    copy($file, $file1);

                    if ($file) {
                        $sql_update = "UPDATE noticias
                            SET title = '" . $titlePT . "',
                            title_en = '" . $titleEN . "',
                            categoria_id = '" . $categoria_id . "',
                            pdf_file = '" . $file_name_pdf . "',
                            text = '" . $textPT . "',
                            text_en = '" . $textEN . "',
                            is_visible = 0,
                            img_src = 'https://www.v21.pt/uploads/noticias/" . $file_name . "',
                            data_inicio = '" . $data . "',
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
                $errors_pdf = [];
                if (isset($_FILES['pdf'])) {
                    $path_pdf = $_SERVER['DOCUMENT_ROOT'] . '/uploads/pdfs/'; //to BO path
                    // $path1 = 'https://beta.v21.pt/uploads/noticias/'; //to website path
                    $path1_pdf = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/pdfs/'; //to website path
                    $extensions_pdf = ['pdf', 'PDF'];
            
                    $file_name_pdf = 'https://www.v21.pt/uploads/pdfs/'.$_FILES['pdf']['name'];
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
                } else if($pdf_title != '') {
                    $file_name_pdf = $pdf_title;
                } else {
                    $file_pdf = null;
                    $file1_pdf = null;
                    $file_name_pdf = null;
                }

                $sql_update = "UPDATE noticias
                    SET title = '" . $titlePT . "',
                    title_en = '" . $titleEN . "',
                    categoria_id = '" . $categoria_id . "',
                    pdf_file = '" . $file_name_pdf . "',
                    text = '" . $textPT . "',
                    text_en = '" . $textEN . "',
                    is_visible = 0,
                    data_inicio = '" . $data . "',
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
    } else {
        $all_files = count($_FILES['files_gallery']['tmp_name']);
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'; //to BO path
        // $path1 = 'https://www.v21.pt/uploads/noticias/'; //to website path
        $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/noticias/'; //to website path
        // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/noticias/');
        $extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG'];

        for ($i = 0; $i < $all_files; $i++) {
            $file_name = $_FILES['files_gallery']['name'][$i];
            $file_tmp = $_FILES['files_gallery']['tmp_name'][$i];
            $file_type = $_FILES['files_gallery']['type'][$i];
            $file_size = $_FILES['files_gallery']['size'][$i];
            $file_ext = explode('.', $_FILES['files_gallery']['name'][$i]);
            $ext = end($file_ext);

            $file = $path . $file_name;
            $file1 = $path1 . $file_name;

            if (!in_array($ext, $extensions)) {
                $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size > 2097152) {
                $errors[] = 'O tamanho do ficheiro excede o limite de 2MB: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size == 0) {
                $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
            }

            if (empty($errors)) {
                move_uploaded_file($file_tmp, $file);
                copy($file, $file1);

                if ($file) {
                    $sql_insert = "INSERT INTO noticias_galeria
                    (title,
                    img_src,
                    noticias_id)
                    VALUES
                    ('" . $files_gallery_names[$i] . "',
                    'https://www.v21.pt/uploads/noticias/" . $file_name . "',
                    '" . $id . "');";

                    include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
                    $db = Database::getInstance();
                    $connection = $db->getConnection();

                    if ($result = $connection->query($sql_insert)) {
                        $db->commit();
                        echo "true||" . json_encode($result);
                    } else {
                        // $db->rollbackAndClose();
                        echo "false||Erro na inserção dos dados.";
                    }
                }
            } else {
                echo 'false||' . $errors[0];
            }
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
    $files_gallery_nr = explode(',',$_REQUEST['files_gallery_nr']);
    $files_gallery_names = explode(',',$_REQUEST['files_gallery_names']);
    $pdf_title = $_REQUEST['pdf_title'];

    if($_REQUEST['files_gallery_nr'] == 0) {
        if ($id == 'undefined') {
            echo 'false||Para inserir uma nova notícia terá de aceder a Notícias > Adicionar notícia.';
        } else {
            if (isset($_FILES['file'])) {
                $errors = [];
                $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'; //to BO path
                // $path1 = 'https://www.v21.pt/uploads/noticias/'; //to website path
                $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/noticias/'; //to website path
                // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/noticias/');
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
                        $sql_update = "UPDATE noticias
                            SET title = '" . $titlePT . "',
                            title_en = '" . $titleEN . "',
                            categoria_id = '" . $categoria_id . "',
                            pdf_file = 'https://www.v21.pt/uploads/pdfs/" . $file_name_pdf . "',
                            text = '" . $textPT . "',
                            text_en = '" . $textEN . "',
                            is_visible = 1,
                            img_src = 'https://www.v21.pt/uploads/noticias/" . $file_name . "',
                            data_inicio = '" . $data . "',
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
                $errors_pdf = [];
                if (isset($_FILES['pdf'])) {
                    $path_pdf = $_SERVER['DOCUMENT_ROOT'] . '/uploads/pdfs/'; //to BO path
                    // $path1 = 'https://beta.v21.pt/uploads/noticias/'; //to website path
                    $path1_pdf = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/pdfs/'; //to website path
                    $extensions_pdf = ['pdf', 'PDF'];
            
                    $file_name_pdf = 'https://www.v21.pt/uploads/pdfs/'.$_FILES['pdf']['name'];
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
                } else if($pdf_title != '') {
                    $file_name_pdf = $pdf_title;
                } else {
                    $file_pdf = null;
                    $file1_pdf = null;
                    $file_name_pdf = null;
                }

                $sql_update = "UPDATE noticias
                    SET title = '" . $titlePT . "',
                    title_en = '" . $titleEN . "',
                    categoria_id = '" . $categoria_id . "',
                    pdf_file = '" . $file_name_pdf . "',
                    text = '" . $textPT . "',
                    text_en = '" . $textEN . "',
                    is_visible = 1,
                    data_inicio = '" . $data . "',
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
    } else {
        $all_files = count($_FILES['files_gallery']['tmp_name']);
        $errors = [];
        $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'; //to BO path
        // $path1 = 'https://www.v21.pt/uploads/noticias/'; //to website path
        $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/noticias/'; //to website path
        // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/noticias/');
        $extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG'];

        for ($i = 0; $i < $all_files; $i++) {
            $file_name = $_FILES['files_gallery']['name'][$i];
            $file_tmp = $_FILES['files_gallery']['tmp_name'][$i];
            $file_type = $_FILES['files_gallery']['type'][$i];
            $file_size = $_FILES['files_gallery']['size'][$i];
            $file_ext = explode('.', $_FILES['files_gallery']['name'][$i]);
            $ext = end($file_ext);

            $file = $path . $file_name;
            $file1 = $path1 . $file_name;

            if (!in_array($ext, $extensions)) {
                $errors[] = 'Extensão de ficheiro não permitida: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size > 2097152) {
                $errors[] = 'O tamanho do ficheiro excede o limite de 2MB: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size == 0) {
                $errors[] = 'Não é possível ler o ficheiro: ' . $file_name . ' ' . $file_type;
            }

            if (empty($errors)) {
                move_uploaded_file($file_tmp, $file);
                copy($file, $file1);

                if ($file) {
                    $sql_insert = "INSERT INTO noticias_galeria
                    (title,
                    img_src,
                    noticias_id)
                    VALUES
                    ('" . $files_gallery_names[$i] . "',
                    'https://www.v21.pt/uploads/noticias/" . $file_name . "',
                    '" . $id . "');";

                    include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
                    $db = Database::getInstance();
                    $connection = $db->getConnection();

                    if ($result = $connection->query($sql_insert)) {
                        $db->commit();
                        echo "true||" . json_encode($result);
                    } else {
                        // $db->rollbackAndClose();
                        echo "false||Erro na inserção dos dados.";
                    }
                }
            } else {
                echo 'false||' . $errors[0];
            }
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



function getNoticiaGaleria()
{
    $sqlCmd = "SELECT * from noticias_galeria WHERE noticias_id = " . $_REQUEST['id_noticia'];
    $noticias = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($noticias);
}

function getAllFotosByIdFoto()
{
    $sqlCmd = " SELECT * from noticias_galeria
    WHERE id = " . $_REQUEST['id_foto'];
    $slide = execQueryMySQL($sqlCmd);
    echo "true||" . json_encode($slide);
}

function saveFotoGaleria()
{
    $id = $_REQUEST['id'];
    $titlePT = $_REQUEST['titlePT'];
    $noticia_id = $_REQUEST['noticia_id'];

    if ($id == 'undefined' || $id == '') {
        if (isset($_FILES['file'])) {
            $errors = [];
            $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'; //to BO path
            // $path1 = 'https://www.v21.pt/uploads/noticias/'; //to website path
            $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/noticias/'; //to website path
            // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/noticias/');
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

                if ($file) {
                    $sql_update = "INSERT INTO noticias_galeria
                    (title,
                    img_src,
                    noticias_id)
                    VALUES
                    ('" . $titlePT . "',
                    '" . $file1 . "',
                    '" . $noticia_id . "')";

                    include_once($_SERVER['DOCUMENT_ROOT'] . '/connection/class.connection.php');
                    $db = Database::getInstance();
                    $connection = $db->getConnection();

                    if ($result = $connection->query($sql_update)) {
                        $db->commit();
                        echo "true||" . json_encode($result);
                    } else {
                        // $db->rollbackAndClose();
                        echo "false||Erro na inserção dos dados.";
                    }
                }
            } else {
                echo 'false||' . $errors[0];
            }
        } else {
            echo 'false||Por favor, inserir imagem.';
        }
    } else {
        if (isset($_FILES['file'])) {
            $errors = [];
            $path = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'; //to BO path
            // $path1 = 'https://www.v21.pt/uploads/noticias/'; //to website path
            $path1 = explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'v21.pt/uploads/noticias/'; //to website path
            // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/noticias/');
            // print_r(explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'uploads/noticias/');
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

                if ($file) {
                    $sql_update = "UPDATE noticias_galeria
                        SET title = '" . $titlePT . "',
                        img_src = '" . $file1 . "'
                        WHERE id = " . $id;

                    // print_r($sql_update);

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
            $sql_update = "UPDATE noticias_galeria
                SET title = '" . $titlePT . "'
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

function deleteFotoGaleria()
{
    $sql_delete = "DELETE from noticias_galeria 
    where id='" . $_REQUEST["id"] . "'";
    execIUQueryMySQL($sql_delete);

    echo "true||Fotografia apagada com sucesso.";
}