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
            <h1 class="h1 mb-0 text-gray-800">Destaques</h1>
          </div>

          <div class="row">
            <div class="col-lg-12 mb-4">
              <!-- Destaques -->
              <div id="destaques-cont" class="card shadow mb-4">
                <div class="card-header py-3" style="width: 100%;">
                  <h4 class="m-0 font-weight-bold text-primary">Lista</h4>
                </div>
                <div class="card-body">
                  <div id="header" class="row">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="col-lg-2">Título</div>
                      <div class="col-lg-2">Texto</div>
                      <div class="col-lg-2">Link</div>
                      <div class="col-lg-2">Imagem</div>
                      <div class="col-lg-2">Alinhamento da imagem</div>
                    </div>
                  </div>
                  <div id="destaques" class="row">
                  </div>

                  <div class="row destaqueInfo" style="display: none;">
                    <div class="col-lg-12">
                      <h4 style="margin-top: 30px;">Informação do Destaque</h4>
                    </div>
                  </div>
                  <div id="destaqueInfo" class="row" style="display: none;">
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="destaque-title-pt">Título:</label>
                        <input id="destaque-title-pt" class="form-control" type="text">
                        <span class="title-pt erro"></span>
                      </div>
                      <div class="form-group col-lg-6">
                        <label for="destaque-title-en">Tradução:</label>
                        <input id="destaque-title-en" class="form-control" type="text">
                      </div>
                    </div>
                    <div class="col-lg-12" style="display: flex;">
                      <div class="form-group col-lg-6">
                        <label for="destaque-text-pt">Texto</label>
                        <div id="destaque-text-pt"></div>
                        <span class="characters destaque-text-pt">caracteres: <span>400</span></span>
                        <span class="text-pt erro"></span>
                      </div>
                      <div class="form-group col-lg-6">
                        <label for="destaque-text-en">Tradução</label>
                        <div id="destaque-text-en"></div>
                        <span class="characters destaque-text-en">caracteres: <span>400</span></span>
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
                      <div class="form-group col-lg-6" style="display:flex;flex-direction:column;align-items:flex-start;">
                        <!-- <label for="destaque-img">Imagem:</label>
                        <input id="destaque-img" class="form-control" name="files" type="file">
                        <span>Tamanho máximo da imagem: 400KB.</span>
                        <span class="img erro"></span> -->
                        <button type="button" class="btn btn-success btn-icon-split float-left" data-toggle="modal" data-target="#uploadPhotoModal">
                            <span class="icon text-white-50">
                                <i class="fas fa-camera"></i>
                            </span>
                            <span class="text" style="color: #fff;">Editar ficheiro</span>
                        </button>
                        <div id="imagem-selected">
                         <img style="width: 30%;" src="">
                        </div>
                        <span>Tamanho máximo da imagem: 400KB.</span>
                        <span class="img erro"></span>
                      </div>
                      <div class="col-lg-6" style="display: flex; flex-direction: column;">
                        <label>Alinhamento da imagem</label>
                        <div class="form-group col-lg-12" style="display: flex;flex-wrap: wrap;padding: 0;">
                          <div class="col-lg-12" style="display: flex;flex-wrap: wrap;padding: 0;padding-bottom: 5px;">
                            <div class="img-align-cell position-left">
                              <span>&#8592;</span>
                              <input type="hidden" name="position-left" value="position-left">
                            </div>

                            <div class="img-align-cell position-center-left">
                              <span>&#8592;&#8226;</span>
                              <input type="hidden" name="position-center-left" value="position-center-left">
                            </div>

                            <div class="img-align-cell position-center-center">
                              <span>&#8226;</span>
                              <input type="hidden" name="position-center-center" value="position-center-center">
                            </div>

                            <div class="img-align-cell position-center-right">
                              <span>&#8226;&#8594;</span>
                              <input type="hidden" name="position-center-right" value="position-center-right">
                            </div>

                            <div class="img-align-cell position-right">
                              <span>&#8594;</span>
                              <input type="hidden" name="position-right" value="position-right">
                            </div>
                          </div>
                        </div>
                        <span class="align erro"></span>
                      </div>
                    </div>

                    <div class="col-lg-12" style="justify-content: flex-end;">
                      <div class="col-auto">
                        <a id="updateDestaque" class="btn btn-success btn-icon-split float-right">
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

        </div>
        <!-- /.container-fluid -->

        <!-- Modal -->
        <div class="modal fade" id="uploadPhotoModal" tabindex="-1" role="dialog" aria-labelledby="uploadPhotoModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document" style="max-width: 90vw; max-height: 90vh; overflow: scroll;pointer-events:all;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="uploadPhotoModalLabel">Adicionar ficheiro</h5>
                        <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </button>
                    </div>
                    <div class="modal-body">
                      <input type="file" class="my-pond" name="filepond"/>
                    </div>
                    <div class="library">
                      <div id="files" class="row">
                      </div>
                    </div>
                </div>
            </div>
        </div>

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
  <script src="js/destaques.js"></script>

</body>

</html>