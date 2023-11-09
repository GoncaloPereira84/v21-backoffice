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
                        <h1 class="h1 mb-0 text-gray-800">Fablab</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <div id="fablab" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Texto</h4>
                                </div>
                                <div class="card-body">
                                    <div id="fablabInfo" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="fablab-pt">Título:</label>
                                                <input id="fablab-pt" class="form-control" type="text">
                                                <span class="fablab-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="fablab-en">Tradução:</label>
                                                <input id="fablab-en" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="fablab-text-pt">Texto:</label>
                                                <div id="fablab-text-pt"></div>
                                                <span class="characters fablab-text-pt">caracteres: <span>1000</span></span>
                                                <span class="fablab-text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="fablab-text-en">Tradução:</label>
                                                <div id="fablab-text-en"></div>
                                                <span class="characters fablab-text-en">caracteres: <span>1000</span></span>
                                                <span class="fablab-text-en erro"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12" style="display: flex; flex-wrap: wrap;">
                                            <div class="form-group col-lg-3" style="display: flex; flex-direction: column;">
                                                <label for="fablab-img-actual">Imagem:</label>
                                                <img style="width: 80%;" id="fablab-img-actual" src="">
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="fablab-img-actual-alinhamento">Alinhamento da imagem:</label>
                                                <input id="fablab-img-actual-alinhamento" class="form-control" type="text" disabled>
                                            </div>
                                            <div class="form-group col-lg-12"></div>
                                            <div class="form-group col-lg-6">
                                                <label for="fablab-img">Inserir imagem:</label>
                                                <input id="fablab-img" class="form-control" name="files" type="file">
                                                <span>Tamanho máximo da imagem: 400KB.</span>
                                                <span>Formatos aceites: png, jpg.</span>
                                                <span class="img erro"></span>
                                            </div>
                                            <div id="fablab-img-align" class="col-lg-6" style="display: flex; flex-direction: column;">
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
                                                <span class="inc-align erro"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="updateFablab" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/fablab.js"></script>

</body>

</html>