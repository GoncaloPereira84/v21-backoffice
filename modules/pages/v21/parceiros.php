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
                        <h1 class="h1 mb-0 text-gray-800">Parceiros</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <div id="af-topicos" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary"></h4>
                                </div>
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="col-lg-2">Título</div>
                                            <div class="col-lg-4">Texto</div>
                                            <div class="col-lg-2">Parceiro Principal?</div>
                                            <div class="col-lg-2">Logótipo</div>
                                            <div class="col-lg-2">Link</div>
                                        </div>
                                    </div>
                                    <div id="parceiros" class="row">
                                    </div>

                                    <div class="row parceiroInfo" style="display: none;">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Informação do parceiro</h4>
                                        </div>
                                    </div>

                                    <div id="parceiroInfo" class="row" style="display: none;">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="parceiro-titulo-pt">Título:</label>
                                                <input id="parceiro-titulo-pt" class="form-control" type="text">
                                                <span class="parceiro-titulo-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="parceiro-titulo-en">Tradução:</label>
                                                <input id="parceiro-titulo-en" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="parceiro-text-pt">Texto:</label>
                                                <div id="parceiro-text-pt"></div>
                                                <span class="characters parceiro-text-pt">caracteres: <span>650</span></span>
                                                <span class="parceiro-text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="parceiro-text-en">Tradução:</label>
                                                <div id="parceiro-text-en"></div>
                                                <span class="characters parceiro-text-en">caracteres: <span>650</span></span>
                                                <span class="parceiro-text-en erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-6" style="display: flex; flex-direction: row;">
                                            <div class="form-group col-lg-4">
                                                <label>É um parceiro principal?</label>
                                            </div>
                                            <div class="form-group col-lg-4" style="display: flex;flex-wrap: wrap;">
                                                <div class="form-group col-lg-6">
                                                    <input id="principal-sim" value="1" type="radio" name="principal">
                                                    <label for="principal-sim">Sim</label>
                                                </div>
                                                <div class="form-group col-lg-6">
                                                    <input id="principal-nao" value="0" type="radio" name="principal">
                                                    <label for="principal-nao">Não</label>
                                                </div>
                                            </div>
                                            <span class="principal erro"></span>
                                        </div>
                                        <div class="col-lg-6" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="parceiro-img">Logótipo:</label>
                                                <input id="parceiro-img" class="form-control" name="files" type="file">
                                                <span>Tamanho máximo da imagem: 400KB.</span>
                                                <span>Formatos aceites: png, jpg.</span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="parceiro-img-link">Link:</label>
                                                <input id="parceiro-img-link" class="form-control" type="text">
                                            </div>
                                        </div>

                                        <div class="col-lg-12" style="justify-content: flex-end;">
                                            <div class="col-auto">
                                                <a id="updateParceiro" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/parceiros.js"></script>

</body>

</html>