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
                        <h1 class="h1 mb-0 text-gray-800">Notícias</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <!-- Slideshow -->
                            <div id="noticias-topicos" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary"></h4>
                                </div>
                                <div class="card-body">
                                    <div id="header" class="row">
                                        <div class="col-lg-10" style="display: flex;">
                                            <div class="col-lg-3">Título</div>
                                            <div class="col-lg-3">Categoria</div>
                                            <div class="col-lg-3">Imagem</div>
                                            <div class="col-lg-3">Alinhamento da imagem</div>
                                        </div>
                                        <div class="form-group col-lg-2">
                                            <label for="cats-id-search">Categoria:</label>
                                            <select id="cats-id-search" class="form-control">
                                                <option value="null">Procurar por categoria...</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div id="noticias" class="row" style="max-height: 400px; overflow: auto;">
                                    </div>

                                    <div class="row noticiaInfo" style="display: none;">
                                        <div class="col-lg-12">
                                            <h4 style="margin-top: 30px;">Editar notícia</h4>
                                        </div>
                                    </div>

                                    <div id="noticiaInfo" class="row" style="display: none;">
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
                                            <div class="form-group col-lg-3" style="display:flex;flex-direction:column;align-items:flex-start;">
                                                <button id="editPicture" type="button" class="btn btn-success btn-icon-split float-left" data-toggle="modal" data-target="#uploadPhotoModal">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-camera"></i>
                                                    </span>
                                                    <span class="text" style="color: #fff;">Editar ficheiro</span>
                                                </button>
                                                <div id="imagem-selected">
                                                    <img style="width: 30%;" src="">
                                                </div>
                                                <span>Tamanho máximo da imagem: 400KB.</span>
                                                <span>Formatos aceites: png, jpg.</span>
                                                <span>Resolução da imagem preferencial: 1933x1439.</span>
                                                <span class="img erro"></span>
                                            </div>
                                            <div id="img-align-gallery" class="col-lg-3" style="display: flex; flex-direction: column;">
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
                                            <div class="form-group col-lg-3">
                                                <label for="cats-id">Categoria:</label>
                                                <select id="cats-id" class="form-control">
                                                    <option value="null">Escolher categoria...</option>
                                                </select>
                                                <span class="cat-id erro"></span>
                                            </div>

                                            <div class="form-group col-lg-3">
                                                <label for="data">Data:</label>
                                                <input id="data" class="form-control" name="data" type="date">
                                                <span class="data erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6" style="display:flex;flex-direction:column;align-items:flex-start;">
                                                <button id="editDocument" type="button" class="btn btn-success btn-icon-split float-left" data-toggle="modal" data-target="#uploadPDFModal">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-camera"></i>
                                                    </span>
                                                    <span class="text" style="color: #fff;">Editar ficheiro</span>
                                                </button>
                                                <div id="pdf-selected" style="display:flex;flex-direction:column;">
                                                </div>
                                                <br>
                                                <span>Tamanho máximo do documento: 1024KB.</span>
                                                <span class="img erro"></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
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

                                    <div id="galeria-section" class="card shadow mb-4" style="display: none;flex-direction:column;">
                                        <div class="card-header py-3">
                                            <h4 class="m-0 font-weight-bold text-primary">Editar galeria</h4>
                                        </div>
                                        <div class="card-body">
                                            <div class="fotos-container">
                                                <div class="foto-1 foto">
                                                    <div class="col-lg-12" style="display: flex;">
                                                        <div class="form-group col-lg-12" style="display:flex;flex-direction:column;align-items:flex-start;">
                                                            <button id="editPhoto-Gallery" type="button" class="btn btn-success btn-icon-split float-left" data-toggle="modal" data-target="#uploadPhotoGalleryModal">
                                                                <span class="icon text-white-50">
                                                                    <i class="fas fa-camera"></i>
                                                                </span>
                                                                <span class="text" style="color: #fff;">Adicionar ficheiro(s)</span>
                                                            </button>
                                                            <div id="imagem-selected-gallery" style="display:flex;align-items:center;flex-wrap:wrap;"></div>
                                                            <span>Tamanho máximo da imagem: 400KB.</span>
                                                            <span>Formatos aceites: png, jpg.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="deleteGaleriaBtn-edit" class="col-auto">
                                                <a id="deleteGaleriaNoticia-edit" class="deleteFoto btn btn-danger btn-icon-split float-right">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-trash"></i>
                                                    </span>
                                                    <span class="text" style="color: #fff;">Apagar galeria</span>
                                                </a>
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
                                                        <div class="form-group col-lg-4">
                                                            <button id="addPhoto-Gallery" type="button" class="btn btn-success btn-icon-split float-left" data-toggle="modal" data-target="#uploadPhotoGalleryModal">
                                                                <span class="icon text-white-50">
                                                                    <i class="fas fa-camera"></i>
                                                                </span>
                                                                <span class="text" style="color: #fff;">Adicionar ficheiro(s)</span>
                                                            </button>
                                                            <div id="imagem-selected-gallery" style="display:flex;align-items:center;"></div>
                                                            <span>Tamanho máximo da imagem: 400KB.</span>
                                                            <span>Formatos aceites: png, jpg.</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div id="deleteGaleriaBtn-add" class="col-auto">
                                                <a id="deleteGaleriaNoticia-add" class="deleteFoto btn btn-danger btn-icon-split float-right">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-trash"></i>
                                                    </span>
                                                    <span class="text" style="color: #fff;">Apagar galeria</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div id="addGaleriaBtn" class="col-auto" style="opacity:0;pointer-events:none;">
                                            <a id="addGaleriaNoticia" class="btn btn-primary btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-images"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Adicionar galeria</span>
                                            </a>
                                        </div>
                                        <div class="col-auto">
                                            <a id="deleteNoticia" class="btn btn-danger btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-trash"></i>
                                                </span>
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

                

                <!-- Modal -->
                <div class="modal fade" id="uploadPhotoModal" tabindex="-1" role="dialog" aria-labelledby="uploadPhotoModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document" style="max-width: 90vw; max-height: 90vh;pointer-events:all;">
                        <div class="modal-content" style="overflow: hidden; height: 90vh;">
                            <div class="modal-header">
                                <h5 class="modal-title" id="uploadPhotoModalLabel">Adicionar ficheiro</h5>
                                <div>
                                    <button id="deletePicture" type="button" class="btn btn-danger btn-icon-split">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-trash"></i>
                                        </span>
                                        <span class="text" style="color: #fff;">Apagar foto</span>
                                    </button>
                                    <button id="save" type="button" class="btn btn-success" data-dismiss="modal">Guardar</button>
                                    <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                            <div class="modal-body" style="height: 90%;">
                                <input type="file" class="my-pond filepond" name="filepond"/>
                                <div class="library" style="display: flex;flex-direction: column;overflow-y:auto;overflow-x:hidden;height: 100%;max-height: 90%;">
                                    <div id="files" class="row"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="uploadPDFModal" tabindex="-1" role="dialog" aria-labelledby="uploadPDFModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document" style="max-width: 90vw; max-height: 90vh; pointer-events:all;">
                        <div class="modal-content" style="overflow: hidden; height: 90vh;">
                            <div class="modal-header">
                                <h5 class="modal-title" id="uploadPDFModalLabel">Adicionar ficheiro</h5>
                                <div>
                                    <button id="deleteDocument" type="button" class="btn btn-danger btn-icon-split">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-trash"></i>
                                        </span>
                                        <span class="text" style="color: #fff;">Apagar documento</span>
                                    </button>
                                    <button id="save" type="button" class="btn btn-success" data-dismiss="modal">Guardar</button>
                                    <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                            <div class="modal-body" style="height: 90%;">
                                <input type="file" class="my-pond-pdf filepond" name="filepond_pdf"/>
                                <div class="library" style="display: flex;flex-direction: column;overflow-y:auto;overflow-x:hidden;height: 100%;max-height: 90%;">
                                    <div id="files-pdf" class="row"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="uploadPhotoGalleryModal" tabindex="-1" role="dialog" aria-labelledby="uploadPhotoGalleryModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document" style="max-width: 90vw; max-height: 90vh; pointer-events:all;">
                        <div class="modal-content" style="overflow: hidden; height: 90vh;">
                            <div class="modal-header">
                                <h5 class="modal-title" id="uploadPhotoGalleryModalLabel">Adicionar ficheiro</h5>
                                <div>
                                    <button id="deletePictureGallery" type="button" class="btn btn-danger btn-icon-split">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-trash"></i>
                                        </span>
                                        <span class="text" style="color: #fff;">Apagar foto</span>
                                    </button>
                                    <button id="save" type="button" class="btn btn-success" data-dismiss="modal">Guardar</button>
                                    <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                            <div class="modal-body" style="height: 90%;">
                                <input type="file" class="my-pond-gallery filepond" name="filepond_gallery"/>
                                <div class="library" style="display: flex;flex-direction: column;overflow-y:auto;overflow-x:hidden;height: 100%;max-height: 90%;">
                                    <div id="files-gallery" class="row"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
    <script src="js/noticias.js"></script>

</body>

</html>