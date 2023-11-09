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
                        <h1 class="h1 mb-0 text-gray-800">Inserir notícia</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <div id="noticia-cont" class="card shadow mb-4">
                                <div class="card-body">
                                    <div id="noticias-section" class="row">
                                        <div class="col-lg-12" style="display: flex; flex-wrap: wrap;">
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
                                                <label for="noticia-img-principal">Imagem principal:</label>
                                                <input id="noticia-img-principal" class="form-control" name="files" type="file">
                                                <span>Tamanho máximo da imagem: 400KB.</span>
                                                <span>Formatos aceites: png, jpg.</span>
                                                <span>Resolução da imagem preferencial: 1933x1439.</span>
                                            </div>
                                            <div id="img-align-principal" class="col-lg-6" style="display: flex; flex-direction: column;">
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
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="cats-id">Categoria:</label>
                                                <select id="cats-id" class="form-control">
                                                    <option value="null">Escolher categoria...</option>
                                                </select>
                                                <span class="cat-id erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="upload-pdf">PDF:</label>
                                                <input id="upload-pdf" class="form-control" type="file" accept="application/pdf">
                                                <span class="titulo-pdf erro"></span>
                                                <span>Tamanho máximo do documento: 1024KB.</span>
                                                <br>
                                                <label for="upload-link-pdf">Link de inserção:</label>
                                                <input id="upload-link-pdf" class="form-control" type="text" disabled>
                                                <br>
                                                <span>Este link só estará visível quando o inserir no texto.</span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex; flex-wrap: wrap;">
                                            <div class="form-group col-lg-6">
                                                <label for="text-pt">Texto:</label>
                                                <div id="text-pt"></div>
                                                <span class="text-pt erro"></span>
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="text-en">Tradução:</label>
                                                <div id="text-en"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div id="addGaleriaBtn" class="col-auto" style="opacity:0;pointer-events: none;">
                                            <a id="addGaleriaNoticia" class="btn btn-primary btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-images"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Adicionar galeria</span>
                                            </a>
                                        </div>

                                        <div class="col-auto">
                                            <a id="saveNoticia" class="btn btn-success btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-pencil-ruler"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Guardar rascunho</span>
                                            </a>
                                        </div>
                                        <div class="col-auto">
                                            <a id="publishNoticia" class="btn btn-success btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Publicar notícia</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="galeria-section" class="card shadow mb-4" style="display: none;">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Galeria de imagens</h4>
                                </div>
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-10" style="display: flex;">
                                            <div class="col-lg-3">Título</div>
                                            <div class="col-lg-3">Imagem</div>
                                            <div class="col-lg-3">Alinhamento da imagem</div>
                                        </div>
                                    </div>
                                    <div id="imagens" class="row">
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Editar imagem</h4>
                                        </div>
                                    </div>

                                    <div id="imagemInfo" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-4">
                                                <label for="titulo-pt-galeria">Título:</label>
                                                <input id="titulo-pt-galeria" class="form-control" type="text">
                                                <span class="titulo-pt-galeria erro"></span>
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="noticia-img-galeria">Imagem:</label>
                                                <input id="noticia-img-galeria" class="form-control" name="files" type="file">
                                                <span>Tamanho máximo da imagem: 400KB.</span>
                                                <span>Formatos aceites: png, jpg.</span>
                                            </div>
                                            <div id="img-align-gallery" class="col-lg-4" style="display: flex; flex-direction: column;">
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
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="deleteFotoGaleria" class="btn btn-danger btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-trash"></i>
                                                </span>
                                            </a>
                                        </div>    
                                        <div class="col-auto">
                                            <a id="saveFotoGaleria" class="btn btn-success btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Guardar</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="add-galeria-section" class="card shadow mb-4" style="display: none;">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Adicionar galeria</h4>
                                </div>
                                <div class="card-body">
                                    <div class="fotos-container">
                                        <div class="foto-1 foto">
                                            <div class="col-lg-12" style="display: flex;">
                                                <div class="form-group col-lg-3">
                                                    <label for="titulo-pt-img">Título:</label>
                                                    <input class="titulo-pt-img form-control" type="text">
                                                    <span class="titulo-pt-img-erro erro"></span>
                                                </div>
                                                <div class="form-group col-lg-4">
                                                    <label for="noticia-img">Imagem:</label>
                                                    <input class="noticia-img form-control" name="files" type="file">
                                                    <span>Tamanho máximo da imagem: 400KB.</span>
                                                    <span>Formatos aceites: png, jpg.</span>
                                                </div>
                                                <div class="img-align col-lg-4" style="display: flex; flex-direction: column;">
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
                                                <div class="form-group col-lg-1" style="display: flex; align-items: center; justify-content: center;">
                                                    <a class="deleteFoto btn btn-danger btn-icon-split float-right">
                                                        <span class="icon text-white-50">
                                                            <i class="fas fa-trash"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <a id="addFoto" class="btn btn-primary btn-icon-split float-right">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-image"></i>
                                            </span>
                                            <span class="text" style="color: #fff;">Adicionar foto</span>
                                        </a>
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
    <script src="js/inserir-noticia.js"></script>

</body>

</html>