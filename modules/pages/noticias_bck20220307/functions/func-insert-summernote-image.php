<?php 

if ($_FILES['file']['name']) {
    if (!$_FILES['file']['error']) {
      $name = md5(rand(100, 200));
      $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
      $filename = $name.
      '.'.$ext;
      $destination = $_SERVER['DOCUMENT_ROOT'] . '/uploads/noticias/'.$filename; //change this directory
      $location = $_FILES["file"]["tmp_name"];
      move_uploaded_file($location, $destination);
      echo explode('backoffice.v21.pt', $_SERVER['DOCUMENT_ROOT'])[0] . 'httpdocs/uploads/noticias/'.$filename; //change this URL
    } else {
      echo $message = 'Ooops!  Your upload triggered the following error:  '.$_FILES['file']['error'];
    }
  }