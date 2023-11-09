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
                        <h1 class="h1 mb-0 text-gray-800">Apresentação</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <div id="apresentacaoInc" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Texto</h4>
                                </div>
                                <div class="card-body">
                                    <div id="introInfo" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="inc-intro-pt">Título:</label>
                                                <input id="inc-intro-pt" class="form-control" type="text">
                                                <span class="inc-intro-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="inc-intro-en">Tradução:</label>
                                                <input id="inc-intro-en" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="inc-text-pt">Texto:</label>
                                                <div id="inc-text-pt"></div>
                                                <span class="characters inc-text-pt">caracteres: <span>750</span></span>
                                                <span class="inc-text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="inc-text-en">Tradução:</label>
                                                <div id="inc-text-en"></div>
                                                <span class="characters inc-text-en">caracteres: <span>750</span></span>
                                                <span class="inc-text-en erro"></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12" style="display: flex; flex-wrap: wrap;">
                                            <div class="form-group col-lg-3" style="display: flex; flex-direction: column;">
                                                <label for="inc-img-actual">Imagem:</label>
                                                <img style="width: 80%;" id="inc-img-actual" src="">
                                                <span>Tamanho máximo da imagem: 400KB.</span>
                                                <span>Formatos aceites: png, jpg.</span>
                                            </div>
                                            <div class="form-group col-lg-3">
                                                <label for="inc-img-actual-alinhamento">Alinhamento da imagem:</label>
                                                <input id="inc-img-actual-alinhamento" class="form-control" type="text" disabled>
                                            </div>
                                            <div class="form-group col-lg-12"></div>
                                            <div class="form-group col-lg-6">
                                                <label for="inc-img">Inserir imagem:</label>
                                                <input id="inc-img" class="form-control" name="files" type="file">
                                                <span class="img erro"></span>
                                            </div>
                                            <div id="inc-img-align" class="col-lg-6" style="display: flex; flex-direction: column;">
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
                                            <a id="updateIntro" class="btn btn-success btn-icon-split float-right">
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
                                    <div id="topicosIntro" class="row">
                                    </div>

                                    <div class="row topicoInfo" style="display: none;">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Informação do tópico</h4>
                                        </div>
                                    </div>

                                    <div id="topicoInfo" class="row" style="display: none;">
                                        <div class="col-lg-12" style="display: flex;flex-wrap: wrap;">
                                            <div class="form-group col-lg-6">
                                                <label for="af-topico-titulo-pt">Título:</label>
                                                <input id="af-topico-titulo-pt" class="form-control" type="text">
                                                <span class="topico-titulo-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="af-topico-titulo-en">Tradução:</label>
                                                <input id="af-topico-titulo-en" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="af-topico-text-pt">Texto:</label>
                                                <div id="af-topico-text-pt"></div>
                                                <span class="characters topico-text-pt">caracteres: <span>150</span></span>
                                                <span class="topico-text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="af-topico-text-en">Tradução:</label>
                                                <div id="af-topico-text-en"></div>
                                                <span class="characters topico-text-en">caracteres: <span>150</span></span>
                                                <span class="topico-text-en erro"></span>
                                            </div>
                                        </div>

                                        <div class="col-lg-12" style="justify-content: flex-end;">
                                            <div class="col-auto">
                                                <a id="updateTopico" class="btn btn-success btn-icon-split float-right">
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
                                            <div class="col-lg-4">Alinhamento</div>
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
                                                <label for="af-titulo">Título:</label>
                                                <input id="af-titulo" class="form-control" type="text">
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
    <script src="js/apresentacao.js"></script>

</body>

</html>