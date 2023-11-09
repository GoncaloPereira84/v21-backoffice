<?php
$splitURI = explode('/', $_SERVER['REQUEST_URI']);

$path = '';
if (!isset($_SESSION)) session_start();
if (!isset($_SESSION["login"])) $_SESSION["login"] = false;

  if (isset($splitURI[1])) {
    $path = '';
  }

  if (isset($splitURI[2])) {
    $path = '';
  }

  if (isset($splitURI[3])) {
    $path = '../../';
  }

  if (isset($splitURI[4])) {
    $path = '../../../';
  }

  //print_r($_SESSION);

  if ($_SESSION["login"] == '') {
    //header('location: /login.php');
  }

  if (!isset($_SESSION["user_id"]) && $_SESSION["login"] == false) {
    if ($splitURI[1] == '') {
      header('location: /login.php');
    }
  }

  // print_r(session_status());

  if(session_status() == 0 || session_status() == 1) {
    session_destroy();
    header('location: /login.php');
  }

include $path . 'tools/tools.php';
?>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>V21 - Gestão de Conteúdos</title>

  <!-- Custom fonts for this template-->
  <link href="<?php echo $path ?>vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="<?php echo $path ?>css/sb-admin-2.css" rel="stylesheet">
  <link href="<?php echo $path ?>css/main.css" rel="stylesheet">
  <link href="<?php echo $path ?>css/homepage.css" rel="stylesheet">

  <link href="<?php echo $path ?>vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">

  <link rel="stylesheet" href="<?php echo $path ?>dist/dist/summernote-bs4.css" />
  <link rel="stylesheet" href="<?php echo $path ?>dist/dist/summernote.css" />
  <link rel="stylesheet" href="<?php echo $path ?>dist/dist/summernote-lite.css" />

<link href="https://unpkg.com/filepond@^4/dist/filepond.css" rel="stylesheet" />

</head>