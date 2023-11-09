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
                        <h1 class="h1 mb-0 text-gray-800">Órgãos Sociais</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <div id="ci" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Texto</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="os-pt">Título:</label>
                                                <input id="os-pt" class="form-control" type="text">
                                                <span class="os-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="os-en">Tradução:</label>
                                                <input id="os-en" class="form-control" type="text">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12" style="justify-content: flex-end;">
                                            <div class="col-auto">
                                                <a id="updateTitle" class="btn btn-success btn-icon-split float-right">
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

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <div id="esp-topicos" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary"></h4>
                                </div>
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="col-lg-4">Título</div>
                                            <div class="col-lg-6">Texto</div>
                                        </div>
                                    </div>
                                    <div id="topicos" class="row">
                                    </div>

                                    <div class="row topicoInfo" style="display: none;">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Informação do tópico</h4>
                                        </div>
                                    </div>

                                    <div id="topicoInfo" class="row" style="display: none;">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="orgao-single-titulo-pt">Título:</label>
                                                <input id="orgao-single-titulo-pt" class="form-control" type="text">
                                                <span class="orgao-single-titulo-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="orgao-single-titulo-en">Tradução:</label>
                                                <input id="orgao-single-titulo-en" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="orgao-single-text-pt">Texto:</label>
                                                <div id="orgao-single-text-pt"></div>
                                                <span class="orgao-single-titulo-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="orgao-single-text-en">Tradução:</label>
                                                <div id="orgao-single-text-en"></div>
                                            </div>
                                        </div>

                                        <div class="col-lg-12" style="justify-content: flex-end;">
                                            <div class="col-auto">
                                                <a id="updateOrgaosSociais" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/orgaos-sociais.js"></script>

</body>

</html>