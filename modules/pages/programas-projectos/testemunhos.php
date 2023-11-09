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
                        <h1 class="h1 mb-0 text-gray-800">Testemunhos</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <div id="slideshow" class="card shadow mb-4">
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-10" style="display: flex;">
                                            <div class="col-lg-3">Texto</div>
                                            <div class="col-lg-3">Autor</div>
                                            <div class="col-lg-3">Vídeo (se existir)</div>
                                            <div class="col-lg-3">Categoria</div>
                                        </div>
                                        <div class="form-group col-lg-2">
                                            <label for="cats-id-search">Categoria:</label>
                                            <select id="cats-id-search" class="form-control">
                                                <option value="null">Procurar por categoria...</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div id="testemunhos" class="row" style="max-height: 400px; overflow: auto;">
                                    </div>

                                    <div class="row testemunhoInfo" style="display: none;">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Editar testemunho</h4>
                                        </div>
                                    </div>

                                    <div id="testemunhoInfo" class="row" style="display: none;">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="texto-pt">Texto:</label>
                                                <div id="texto-pt"></div>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="texto-en">Tradução:</label>
                                                <div id="texto-en"></div>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="autor">Autor:</label>
                                                <input id="autor" class="form-control" type="text">
                                                <span class="autor erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="video">Vídeo (se existir):</label>
                                                <!-- <textarea id="video" class="form-control"></textarea> -->
                                                <input id="video" class="form-control" type="text">
                                                <span>Basta copiar o link do vídeo do YouTube para esta caixa.</span>
                                                <br>
                                                <span>Exemplo: https://www.youtube.com/watch?v=iech2x3V1OQ</span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="cats-id">Categoria:</label>
                                                <select id="cats-id" class="form-control">
                                                    <option value="null">Escolher categoria...</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-lg-12" style="justify-content: flex-end;flex-direction: row;display: flex;">
                                            <div class="col-lg-1" style="display: flex;justify-content: flex-end;">
                                                <a id="deleteTestemunho" class="btn btn-danger btn-icon-split float-right">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-trash"></i>
                                                    </span>
                                                </a>
                                            </div>
                                            <div class="col-lg-1" style="display: flex;">
                                                <a id="saveTestemunho" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/testemunhos.js"></script>

</body>

</html>