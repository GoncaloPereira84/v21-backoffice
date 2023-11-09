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
                        <h1 class="h1 mb-0 text-gray-800">Centro de Incubação</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <div id="ci" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Texto</h4>
                                </div>
                                <div class="card-body">
                                    <div id="introCI" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="ci-pt">Título:</label>
                                                <input id="ci-pt" class="form-control" type="text">
                                                <span class="ci-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="ci-en">Tradução:</label>
                                                <input id="ci-en" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="ci-text-pt">Texto:</label>
                                                <div id="ci-text-pt"></div>
                                                <span class="characters ci-text-pt">caracteres: <span>400</span></span>
                                                <span class="ci-text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="ci-text-en">Tradução:</label>
                                                <div id="ci-text-en"></div>
                                                <span class="characters ci-text-en">caracteres: <span>400</span></span>
                                                <span class="ci-text-en erro"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="updateCIIntro" class="btn btn-success btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Guardar</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Tópicos</h4>
                                        </div>
                                    </div>

                                    <div id="header" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="col-lg-4">Título</div>
                                            <div class="col-lg-4">Texto</div>
                                        </div>
                                    </div>
                                    <div id="topicosCI" class="row">
                                    </div>

                                    <div class="row topicoInfo" style="display: none;">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Informação do tópico</h4>
                                        </div>
                                    </div>

                                    <div id="topicoInfo" class="row" style="display: none;">
                                        <div class="col-lg-12" style="display: flex;flex-wrap: wrap;">
                                            <div class="form-group col-lg-6">
                                                <label for="ci-topico-titulo-pt">Título:</label>
                                                <input id="ci-topico-titulo-pt" class="form-control" type="text">
                                                <span class="ci-topico-titulo-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="ci-topico-titulo-en">Tradução:</label>
                                                <input id="ci-topico-titulo-en" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="ci-topico-text-pt">Texto:</label>
                                                <div id="ci-topico-text-pt"></div>
                                                <span class="characters ci-topico-text-pt">caracteres: <span>700</span></span>
                                                <span class="ci-topico-text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="ci-topico-text-en">Tradução:</label>
                                                <div id="ci-topico-text-en"></div>
                                                <span class="characters ci-topico-text-en">caracteres: <span>700</span></span>
                                                <span class="ci-topico-text-en erro"></span>
                                            </div>
                                        </div>

                                        <div class="col-lg-12" style="justify-content: flex-end;">
                                            <div class="col-auto">
                                                <a id="updateCI" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/centro-incubacao.js"></script>

</body>

</html>