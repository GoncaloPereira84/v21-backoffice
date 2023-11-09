<!DOCTYPE html>
<html lang="en">

<?php
include '../../includes/header.php';
error_reporting(E_ALL);
ini_set('display_errors', '1');
?>

<body id="page-top">

  <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <?php
    include '../../components/sidebar.php'
    ?>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <?php
        include '../../includes/topbar.php'
        ?>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <div class="d-sm-flex align-items-center justify-content-between mb-4" style="flex-direction: column; align-items: flex-start !important;">
            <h1 class="h1 mb-0 text-gray-800">Missão</h1>
          </div>

          <div class="row">
            <div class="col-lg-12 mb-4">
              <div id="missao-cont" class="card shadow mb-4">
                <div class="card-header py-3">
                  <h4 class="m-0 font-weight-bold text-primary"></h4>
                </div>
                <div class="card-body">
                  <div id="missaoInfo" class="row">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="title-pt">Título:</label>
                        <input id="title-pt" class="form-control" type="text">
                        <span class="title-pt erro"></span>
                      </div>
                      <div class="form-group col-lg-6">
                        <label for="title-en">Tradução:</label>
                        <input id="title-en" class="form-control" type="text">
                        <span class="title-en erro"></span>
                      </div>
                    </div>

                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="missao-intro-pt">Introdução</label>
                        <div id="missao-intro-pt"></div>
                        <span class="characters missao-intro-pt">caracteres: <span>250</span></span>
                        <span class="intro-pt erro"></span>
                      </div>
                      <div class="form-group col-lg-6">
                        <label for="missao-intro-en">Tradução</label>
                        <div id="missao-intro-en"></div>
                        <span class="characters missao-intro-en">caracteres: <span>250</span></span>
                        <span class="intro-en erro"></span>
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="missao-text-pt">Texto</label>
                        <div id="missao-text-pt"></div>
                        <span class="characters missao-text-pt">caracteres: <span>900</span></span>
                        <span class="texto-pt erro"></span>
                      </div>
                      <div class="form-group col-lg-6">
                        <label for="missao-text-en">Tradução</label>
                        <div id="missao-text-en"></div>
                        <span class="characters missao-text-en">caracteres: <span>900</span></span>
                        <span class="texto-en erro"></span>
                      </div>
                    </div>
                  </div>

                  <div class="row" style="justify-content: flex-end;">
                    <div class="col-auto">
                      <a id="updateMissao" class="btn btn-success btn-icon-split float-right">
                        <span class="icon text-white-50">
                          <i class="fas fa-check"></i>
                        </span>
                        <span class="text" style="color: #fff;">Guardar</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <?php
      include '../../includes/footer.php'
      ?>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <?php
  include '../../components/scroll-to-top-btn.php'
  ?>

  <!-- Logout Modal-->
  <?php
  include '../../components/logout-modal.php'
  ?>

  <?php
  include '../../includes/js-includes.php'
  ?>
  <script src="js/missao.js"></script>

</body>

</html>