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
                        <h1 class="h1 mb-0 text-gray-800">Serviços</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <div id="servicos-intro-cont" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Texto introdutório</h4>
                                </div>
                                <div class="card-body">
                                    <div id="servicos-intro" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="servicos-titulo-pt">Título:</label>
                                                <input id="servicos-titulo-pt" class="form-control" type="text">
                                                <span class="servicos-titulo-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="servicos-titulo-en">Tradução:</label>
                                                <input id="servicos-titulo-en" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="servicos-text-pt">Texto:</label>
                                                <div id="servicos-text-pt"></div>
                                                <span class="characters servicos-text-pt">caracteres: <span>300</span></span>
                                                <span class="servicos-text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="servicos-text-en">Tradução:</label>
                                                <div id="servicos-text-en"></div>
                                                <span class="characters servicos-text-en">caracteres: <span>300</span></span>
                                                <span class="servicos-text-en erro"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="updateServIntro" class="btn btn-success btn-icon-split float-right">
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
                            <div id="servicos-topicos" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Lista</h4>
                                </div>
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="col-lg-4">Título</div>
                                            <div class="col-lg-4">Texto</div>
                                        </div>
                                    </div>
                                    <div id="servicos" class="row">
                                    </div>

                                    <div class="row servicoInfo" style="display: none;">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Informação do tópico</h4>
                                        </div>
                                    </div>

                                    <div id="servicoInfo" class="row" style="display: none;">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="servicos-single-titulo-pt">Título:</label>
                                                <input id="servicos-single-titulo-pt" class="form-control" type="text">
                                                <span class="servicos-single-titulo-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="servicos-single-titulo-en">Tradução:</label>
                                                <input id="servicos-single-titulo-en" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="servicos-single-text-pt">Texto:</label>
                                                <div id="servicos-single-text-pt"></div>
                                                <span class="characters servicos-single-text-pt">caracteres: <span>300</span></span>
                                                <span class="servicos-single-text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="servicos-single-text-en">Tradução:</label>
                                                <div id="servicos-single-text-en"></div>
                                                <span class="characters servicos-single-text-en">caracteres: <span>300</span></span>
                                                <span class="servicos-single-text-en erro"></span>
                                            </div>
                                        </div>

                                        <div class="col-lg-12" style="justify-content: flex-end;">
                                            <div class="col-auto">
                                                <a id="updateServicos" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/servicos.js"></script>

</body>

</html>