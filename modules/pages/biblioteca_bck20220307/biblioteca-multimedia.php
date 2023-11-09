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
                        <h1 class="h1 mb-0 text-gray-800">Biblioteca multimédia</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <div id="ficheiros" class="card shadow mb-4">
                                <div class="card-header py-3" style="width: 100%;">
                                    <h4 class="m-0 font-weight-bold text-primary">Ficheiros</h4>
                                </div>
                                <div class="card-header py-3" style="width: 100%;">
                                    <!-- Button trigger modal -->
                                    <button type="button" class="btn btn-success btn-icon-split float-right" data-toggle="modal" data-target="#uploadPhotoModal">
                                        <span class="icon text-white-50">
                                            <i class="fas fa-camera"></i>
                                        </span>
                                        <span class="text" style="color: #fff;">Adicionar ficheiro</span>
                                    </button>
                                </div>
                                <div class="card-body">
                                    <div id="files" class="row">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

                <!-- Modal -->
                <div class="modal fade" id="uploadPhotoModal" tabindex="-1" role="dialog" aria-labelledby="uploadPhotoModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="uploadPhotoModalLabel">Adicionar ficheiro</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form action="upload-photo.php" class="dropzone" id="file-dropzone">
                                    <input type="file" name="file" />
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                <!-- <button type="button" id="savePhoto" class="btn btn-primary">Carregar</button> -->
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
    <script src="js/biblioteca-multimedia.js"></script>

</body>

</html>