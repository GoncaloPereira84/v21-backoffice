<!DOCTYPE html>
<html lang="en">

<?php
include 'modules/includes/header.php';

$host = "www.anacarolinapereira.pt";
$user = "admin_db";
$password = "Zmw148u*";
$dbname = "v21";

$conn = new mysqli($host, $user, $password, $dbname);

$conn->set_charset("utf-8");
$conn->query("SET NAMES 'utf8'");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>

<body id="page-top">

  <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <?php
    include 'modules/components/sidebar.php'
    ?>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <?php
        include 'modules/includes/topbar.php'
        ?>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
            <!-- <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a> -->
          </div>

          <!-- Content Row -->

          <!-- <div class="row">
            <div class="col-xl-12 col-lg-12">
              <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Exportar lista de subscrições</h6>
                </div>
                <div class="card-body" style="min-height: 100px;">
                  <form method="post" action="ajax/export-email-lists.php">
                    <input type="submit" name="export_v21" value="Notícias V21" class="btn btn-success">
                  </form>

                  <form method="post" action="ajax/export-email-lists.php">
                    <input type="submit" name="export_ss" value="Notícias Startup School" class="btn btn-success">
                  </form>

                  <form method="post" action="ajax/export-email-lists.php">
                    <input type="submit" name="export_mf" value="Notícias Moving Forward" class="btn btn-success">
                  </form>

                  <form method="post" action="ajax/export-email-lists.php">
                    <input type="submit" name="export_yl" value="Notícias Young Leaders" class="btn btn-success">
                  </form>

                  <form method="post" action="ajax/export-email-lists.php">
                    <input type="submit" name="export_gerais" value="Notícias Gerais" class="btn btn-success">
                  </form>
                </div>
              </div>
            </div>
          </div> -->

        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <?php
      include 'modules/includes/footer.php'
      ?>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->
  </div>

  <!-- Scroll to Top Button-->
  <?php
  include 'modules/components/scroll-to-top-btn.php'
  ?>

  <!-- Logout Modal-->
  <?php
  include 'modules/components/logout-modal.php'
  ?>

  <?php
  include 'modules/includes/js-includes.php'
  ?>

  <script>
    // $('#v21').on('click', function(){
    //   // var categoria_id = 1;
    //   var cat = {
    //     categoria_id: 1
    //   }
    //   $.ajax(
    //     {
    //       url: "ajax/export-email-lists.php",
    //       type: "POST",
    //       data: cat,
    //       dataType: "json",
    //       success: function(result){
    //         // console.log(result);
    //         var emails = [];
    //         $.each(result, function(index,jsonObject){
    //             $.each(jsonObject, function(key,val){
    //                 emails.push('<span>' + val + '</span>');
    //             });
    //         });
    //         $('#lista-v21').html(emails);
    //       }
    //     }
    //   );
    // })
  </script>

</body>

</html>