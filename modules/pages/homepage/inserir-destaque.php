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

          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4" style="flex-direction: column; align-items: flex-start !important;">
            <h1 class="h1 mb-0 text-gray-800">Inserir Destaque</h1>
          </div>

          <div class="row">
            <div class="col-lg-12 mb-4">
              <div id="destaques" class="card shadow mb-4">
                <div class="card-body">
                  <div id="destaqueInfo" class="row">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="destaque-title-pt">Título:</label>
                        <input id="destaque-title-pt" class="form-control" type="text">
                        <span class="title-pt erro"></span>
                      </div>
                      <div class="form-group col-lg-6">
                        <label for="destaque-title-en">Tradução:</label>
                        <input id="destaque-title-en" class="form-control" type="text">
                        <span class="title-en erro"></span>
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="destaque-text-pt">Texto:</label>
                        <div id="destaque-text-pt"></div>
                        <span class="text-pt erro"></span>
                      </div>
                      <div class="form-group col-lg-6">
                        <label for="destaque-text-en">Tradução:</label>
                        <div id="destaque-text-en"></div>
                        <span class="text-en erro"></span>
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-12">
                        <label for="destaque-link">Link:</label>
                        <input id="destaque-link" class="form-control" type="text">
                        <span class="link erro"></span>
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="destaque-img">Imagem:</label>
                        <input id="destaque-img" class="form-control" name="slide-img" type="file">
                        <span class="img erro"></span>
                      </div>
                      <div class="col-lg-6" style="display: flex; flex-direction: column;">
                        <div class="form-group col-lg-12">
                          <label>Alinhamento da imagem</label>
                        </div>
                        <div class="form-group col-lg-12" style="display: flex;flex-wrap: wrap;">
                          <div class="col-lg-12" style="display: flex;flex-wrap: wrap;">
                            <div class="img-align-cell">
                              <span>&#8592;</span>
                              <input type="hidden" name="center-left" value="center-left">
                            </div>
                            <div class="img-align-cell">
                              <span>&#8226;</span>
                              <input type="hidden" name="center-center" value="center-center">
                            </div>
                            <div class="img-align-cell">
                              <span>&#8594;</span>
                              <input type="hidden" name="center-right" value="center-right">
                            </div>
                          </div>
                        </div>
                        <span class="align erro"></span>
                      </div>
                    </div>
                  </div>

                  <div class="row" style="justify-content: flex-end;">
                    <div class="col-auto">
                      <a id="saveDestaque" class="btn btn-success btn-icon-split float-right">
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
  <script src="js/inserir-destaque.js"></script>

</body>

</html>