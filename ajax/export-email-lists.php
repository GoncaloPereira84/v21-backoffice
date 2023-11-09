<?php
if(isset($_POST['export_v21'])){
    $host = "www.v21.pt";
    $user = "admin_db";
    $password = "Zmw148u*";
    $dbname = "v21";

    $conn = new mysqli($host, $user, $password, $dbname);

    $conn->set_charset("utf-8");
    $conn->query("SET NAMES 'utf8'");

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=lista-subscricoes-noticias-v21.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('E-mails'));
    $query = 'SELECT email from email_news_subscriptions
    WHERE noticias_categoria_id = 1';
    $result = mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($result)){
        fputcsv($output, $row);
    }

    fclose($output);
}

if(isset($_POST['export_ss'])){
    $host = "www.v21.pt";
    $user = "admin_db";
    $password = "Zmw148u*";
    $dbname = "v21";

    $conn = new mysqli($host, $user, $password, $dbname);

    $conn->set_charset("utf-8");
    $conn->query("SET NAMES 'utf8'");

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=lista-subscricoes-noticias-startup-school.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('E-mails'));
    $query = 'SELECT email from email_news_subscriptions
    WHERE noticias_categoria_id = 2';
    $result = mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($result)){
        fputcsv($output, $row);
    }

    fclose($output);
}

if(isset($_POST['export_mf'])){
    $host = "www.v21.pt";
    $user = "admin_db";
    $password = "Zmw148u*";
    $dbname = "v21";

    $conn = new mysqli($host, $user, $password, $dbname);

    $conn->set_charset("utf-8");
    $conn->query("SET NAMES 'utf8'");

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=lista-subscricoes-noticias-moving-forward.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('E-mails'));
    $query = 'SELECT email from email_news_subscriptions
    WHERE noticias_categoria_id = 3';
    $result = mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($result)){
        fputcsv($output, $row);
    }

    fclose($output);
}

if(isset($_POST['export_yl'])){
    $host = "www.v21.pt";
    $user = "admin_db";
    $password = "Zmw148u*";
    $dbname = "v21";

    $conn = new mysqli($host, $user, $password, $dbname);

    $conn->set_charset("utf-8");
    $conn->query("SET NAMES 'utf8'");

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=lista-subscricoes-noticias-young-leaders.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('E-mails'));
    $query = 'SELECT email from email_news_subscriptions
    WHERE noticias_categoria_id = 4';
    $result = mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($result)){
        fputcsv($output, $row);
    }

    fclose($output);
}

if(isset($_POST['export_gerais'])){
    $host = "www.v21.pt";
    $user = "admin_db";
    $password = "Zmw148u*";
    $dbname = "v21";

    $conn = new mysqli($host, $user, $password, $dbname);

    $conn->set_charset("utf-8");
    $conn->query("SET NAMES 'utf8'");

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=lista-subscricoes-noticias-gerais.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('E-mails'));
    $query = 'SELECT email from email_news_subscriptions
    WHERE noticias_categoria_id = 5';
    $result = mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($result)){
        fputcsv($output, $row);
    }

    fclose($output);
}

if(isset($_POST['export_ibr'])){
    $host = "www.v21.pt";
    $user = "admin_db";
    $password = "Zmw148u*";
    $dbname = "v21";

    $conn = new mysqli($host, $user, $password, $dbname);

    $conn->set_charset("utf-8");
    $conn->query("SET NAMES 'utf8'");

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=lista-inscricoes-incubadora-base-rural.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('E-mail promotor', 'E-mail empresa'));
    $query = 'SELECT iss.email_promotor, iss.email_empresa from inscricoes_submissoes iss
    inner join inscricoes i
    on i.id = iss.programa_id
    where iss.programa_id = 1';
    $result = mysqli_query($conn, $query);

    while($row = mysqli_fetch_assoc($result)){
        fputcsv($output, $row);
    }

    fclose($output);
}

if(isset($_POST['export_v21_insc'])){
    $host = "www.v21.pt";
    $user = "admin_db";
    $password = "Zmw148u*";
    $dbname = "v21";

    $conn = new mysqli($host, $user, $password, $dbname);

    $conn->set_charset("utf-8");
    $conn->query("SET NAMES 'utf8'");

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=lista-inscricoes-v21.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('E-mail promotor', 'E-mail empresa'));
    $query = 'SELECT iss.email_promotor, iss.email_empresa from inscricoes_submissoes iss
    inner join inscricoes i
    on i.id = iss.programa_id
    where iss.programa_id = 2';
    $result = mysqli_query($conn, $query);

    while($row = mysqli_fetch_assoc($result)){
        fputcsv($output, $row);
    }

    fclose($output);
}