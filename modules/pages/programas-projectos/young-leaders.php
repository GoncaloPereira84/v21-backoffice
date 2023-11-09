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
                        <h1 class="h1 mb-0 text-gray-800">Young Leaders</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <div id="slideshow" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary"></h4>
                                </div>
                                <div class="card-body">
                                    <div id="objectivosInfo1" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="titulo-pt">Título:</label>
                                                <input id="titulo-pt" class="form-control" type="text">
                                                <span class="titulo-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="titulo-en">Tradução:</label>
                                                <input id="titulo-en" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="text-pt">Texto:</label>
                                                <div id="text-pt"></div>
                                                <span class="characters text-pt">caracteres: <span>800</span></span>
                                                <span class="text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="text-en">Tradução:</label>
                                                <div id="text-en"></div>
                                                <span class="characters text-en">caracteres: <span>800</span></span>
                                                <span class="text-en erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="link">Link:</label>
                                                <input id="link" class="form-control" type="text">
                                                <span class="link erro"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="updateYoungLeaders" class="btn btn-success btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Guardar</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Slideshow -->
                            <div id="galeria-imagens" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Galeria</h4>
                                </div>
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="col-lg-4">Título</div>
                                            <div class="col-lg-4">Imagem</div>
                                            <div class="col-lg-4">Alinhamento da imagem</div>
                                        </div>
                                    </div>
                                    <div id="imagens" class="row">
                                    </div>

                                    <div class="row infoImg" style="display: none;">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Informação da imagem</h4>
                                        </div>
                                    </div>

                                    <div id="infoImg" class="row" style="display: none;">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="yl-titulo">Título:</label>
                                                <input id="yl-titulo" class="form-control" type="text">
                                                <span class="foto-titulo erro"></span>
                                            </div>
                                        </div>

                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="gallery-img">Imagem:</label>
                                                <input id="gallery-img" class="form-control" name="files" type="file">
                                                <span>Tamanho máximo da imagem: 400KB.</span>
                                                <span>Formatos aceites: png, jpg.</span>
                                            </div>
                                            <div id="img-align-gallery" class="col-lg-6" style="display: flex; flex-direction: column;">
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
                                                <a id="saveGallery" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/young-leaders.js"></script>

</body>

</html>