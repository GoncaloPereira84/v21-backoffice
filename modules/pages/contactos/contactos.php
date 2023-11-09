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
                        <h1 class="h1 mb-0 text-gray-800">Contactos</h1>
                    </div>

                    <div class="row">
                        <div class="col-lg-12 mb-4">
                            <div id="morada-principal" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Morada principal</h4>
                                </div>
                                <div class="card-body">
                                    <div id="esp-intro" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-4">
                                                <label for="nome1">Nome:</label>
                                                <input id="nome1" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="morada1">Morada:</label>
                                                <input id="morada1" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="coordenadas1">Coordenadas:</label>
                                                <input id="coordenadas1" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-12">
                                                <label for="google-maps-code">Código do Google Maps:</label>
                                                <textarea id="google-maps-code" class="form-control"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="saveMorada1" class="btn btn-success btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Guardar</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="morada-secundaria" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Morada secundária</h4>
                                </div>
                                <div class="card-body">
                                    <div id="esp-intro" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-4">
                                                <label for="nome2">Nome:</label>
                                                <input id="nome2" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="morada2">Morada:</label>
                                                <input id="morada2" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-4">
                                                <label for="coordenadas2">Coordenadas:</label>
                                                <input id="coordenadas2" class="form-control" type="text">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="saveMorada2" class="btn btn-success btn-icon-split float-right">
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                                <span class="text" style="color: #fff;">Guardar</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="contactos-gerais" class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h4 class="m-0 font-weight-bold text-primary">Contactos</h4>
                                </div>
                                <div class="card-body">
                                    <div id="esp-intro" class="row">
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-6">
                                                <label for="email">E-mail:</label>
                                                <input id="email" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <label for="telefone">Telefone:</label>
                                                <input id="telefone" class="form-control" type="text">
                                            </div>
                                        </div>
                                        <div class="col-lg-12" style="display: flex;">
                                            <div class="form-group col-lg-2">
                                                <label for="fb-link">Facebook:</label>
                                                <input id="fb-link" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="ig-link">Instagram:</label>
                                                <input id="ig-link" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="li-link">LinkedIn:</label>
                                                <input id="li-link" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="tw-link">Twitter:</label>
                                                <input id="tw-link" class="form-control" type="text">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label for="yt-link">YouTube:</label>
                                                <input id="yt-link" class="form-control" type="text">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row" style="justify-content: flex-end;">
                                        <div class="col-auto">
                                            <a id="updateContacts" class="btn btn-success btn-icon-split float-right">
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
    <script src="js/contactos.js"></script>

</body>

</html>