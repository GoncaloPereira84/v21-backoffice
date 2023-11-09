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
                        <h1 class="h1 mb-0 text-gray-800">Associados Fundadores</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <div id="af-intro-cont" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Texto introdutório</h4>
                                </div>
                                <div class="card-body">
                                    <div id="af-intro" class="row">
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
                                                <span class="characters text-pt">caracteres: <span>250</span></span>
                                                <span class="text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="text-en">Tradução:</label>
                                                <div id="text-en"></div>
                                                <span class="characters text-en">caracteres: <span>250</span></span>
                                                <span class="text-en erro"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="updateTextoIntrodutorio" class="btn btn-success btn-icon-split float-right">
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
                            <div id="af-topicos" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Lista</h4>
                                </div>
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="col-lg-2">Título</div>
                                            <div class="col-lg-4">Texto</div>
                                            <div class="col-lg-2">Logótipo</div>
                                            <div class="col-lg-2">Link</div>
                                        </div>
                                    </div>
                                    <div id="associados" class="row">
                                    </div>

                                    <div class="row associadoInfo" style="display: none;">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Informação do tópico</h4>
                                        </div>
                                    </div>

                                    <div id="associadoInfo" class="row" style="display: none;">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="af-titulo-pt">Título:</label>
                                                <input id="af-titulo-pt" class="form-control" type="text">
                                                <span class="af-titulo-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="af-titulo-en">Tradução:</label>
                                                <input id="af-titulo-en" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="af-text-pt">Texto:</label>
                                                <div id="af-text-pt"></div>
                                                <span class="characters af-text-pt">caracteres: <span>800</span></span>
                                                <span class="af-text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="af-text-en">Tradução:</label>
                                                <div id="af-text-en"></div>
                                                <span class="characters af-text-en">caracteres: <span>800</span></span>
                                                <span class="af-text-en erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="af-img">Logótipo:</label>
                                                <input id="af-img" class="form-control" name="files" type="file">
                                                <span>Tamanho máximo da imagem: 400KB.</span>
                                                <span>Formatos aceites: png, jpg.</span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="af-img-link">Link:</label>
                                                <input id="af-img-link" class="form-control" type="text">
                                            </div>
                                        </div>

                                        <div class="col-lg-12" style="justify-content: flex-end;">
                                            <div class="col-auto">
                                                <a id="updateAssociado" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/associados-fundadores.js"></script>

</body>

</html>