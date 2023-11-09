<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="<?php echo $path ?>index.php">
        <div class="sidebar-brand-icon" style="height: 100%;">
            <img src="<?php echo $path ?>uploads/logo.png" alt="" style="height: 60%; margin-top: 10px;">
        </div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
        <a class="nav-link" href="<?php echo $path ?>index.php">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
        Gestão de conteúdos
    </div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
        <?php
            $page_home = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $collapsed = $page_home == 'homepage/destaques.php' ? '' : 'collapsed';
            $show = $page_home == 'homepage/destaques.php' ? 'show' : '';
            $active = $page_home == 'v21/missao.php' ? 'active' : '';
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseHome" aria-expanded="true" aria-controls="collapseHome">
            <i class="fas fa-fw fa-folder"></i>
            <span>Homepage</span>
        </a>
        <div id="collapseHome" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active; ?>" href="<?php echo $path ?>modules/pages/homepage/destaques.php">Gerir</a>
            </div>
        </div>
    </li>

    <li class="nav-item">
        <?php
            $page_v21_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_v21 = explode('/', $page_v21_aux)[0];
            $collapsed = $page_v21 == 'v21' ? '' : 'collapsed';
            $show = $page_v21 == 'v21' ? 'show' : '';

            if($page_v21 != 'profile.php'){
                $page_v21_subpage = explode('/', $page_v21_aux)[1];

                switch($page_v21_subpage){
                    case 'missao.php':
                        $active_missao = 'active';
                        break;
                    case 'objectivos.php':
                        $active_objectivos = 'active';
                        break;
                    case 'areas-especializacao.php':
                        $active_ae = 'active';
                        break;
                    case 'orgaos-sociais.php':
                        $active_oe = 'active';
                        break;
                    case 'associados-fundadores.php':
                        $active_af = 'active';
                        break;
                    case 'parceiros.php':
                        $active_parceiros = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseV21" aria-expanded="true" aria-controls="collapseV21">
            <i class="fas fa-fw fa-folder"></i>
            <span>V21</span>
        </a>
        <div id="collapseV21" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_missao; ?>" href="<?php echo $path ?>modules/pages/v21/missao.php">Missão</a>
                <a class="collapse-item <?php echo $active_objectivos; ?>" href="<?php echo $path ?>modules/pages/v21/objectivos.php">Objetivos</a>
                <a class="collapse-item <?php echo $active_ae; ?>" href="<?php echo $path ?>modules/pages/v21/areas-especializacao.php">Áreas de Especialização</a>
                <a class="collapse-item <?php echo $active_oe; ?>" href="<?php echo $path ?>modules/pages/v21/orgaos-sociais.php">Órgãos Sociais</a>
                <a class="collapse-item <?php echo $active_af; ?>" href="<?php echo $path ?>modules/pages/v21/associados-fundadores.php">Associados Fundadores</a>
                <a class="collapse-item <?php echo $active_parceiros; ?>" href="<?php echo $path ?>modules/pages/v21/parceiros.php">Parceiros</a>
            </div>
        </div>
    </li>

    <li class="nav-item">
        <?php
            $page_incubacao_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_incubacao = explode('/', $page_incubacao_aux)[0];
            $collapsed = $page_incubacao == 'incubacao' ? '' : 'collapsed';
            $show = $page_incubacao == 'incubacao' ? 'show' : '';

            if($page_incubacao != 'profile.php'){
                $page_incubacao_subpage = explode('/', $page_incubacao_aux)[1];

                switch($page_incubacao_subpage){
                    case 'apresentacao.php':
                        $active_apr = 'active';
                        break;
                    case 'centro-incubacao.php':
                        $active_ci = 'active';
                        break;
                    case 'fablab.php':
                        $active_fablab = 'active';
                        break;
                    case 'incubadora-base-rural.php':
                        $active_ibr = 'active';
                        break;
                    case 'servicos.php':
                        $active_serv = 'active';
                        break;
                    default:
                        break;
                }

            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseIncubacao" aria-expanded="true" aria-controls="collapseIncubacao">
            <i class="fas fa-fw fa-folder"></i>
            <span>Incubação</span>
        </a>
        <div id="collapseIncubacao" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_apr; ?>" href="<?php echo $path ?>modules/pages/incubacao/apresentacao.php">Apresentação</a>
                <a class="collapse-item <?php echo $active_ci; ?>" href="<?php echo $path ?>modules/pages/incubacao/centro-incubacao.php">Centro de Incubação</a>
                <a class="collapse-item <?php echo $active_fablab; ?>" href="<?php echo $path ?>modules/pages/incubacao/fablab.php">Fablab</a>
                <a class="collapse-item <?php echo $active_ibr; ?>" href="<?php echo $path ?>modules/pages/incubacao/incubadora-base-rural.php">Incubadora de Base Rural</a>
                <a class="collapse-item <?php echo $active_serv; ?>" href="<?php echo $path ?>modules/pages/incubacao/servicos.php">Serviços</a>
            </div>
        </div>
    </li>

    <li class="nav-item">
        <?php
            $page_pp_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_pp = explode('/', $page_pp_aux)[0];
            $collapsed = $page_pp == 'programas-projectos' ? '' : 'collapsed';
            $show = $page_pp == 'programas-projectos' ? 'show' : '';

            if($page_pp != 'profile.php'){
                $page_pp_subpage = explode('/', $page_pp_aux)[1];

                switch($page_pp_subpage){
                    case 'moving-forward.php':
                        $active_mf = 'active';
                        break;
                    case 'startup-school.php':
                        $active_ss = 'active';
                        break;
                    case 'v21-rural.php':
                        $active_v21 = 'active';
                        break;
                    case 'young-leaders.php':
                        $active_yl = 'active';
                        break;
                    case 'adicionar-testemunho.php':
                        $active_add_t = 'active';
                        break;
                    case 'testemunhos.php':
                        $active_t = 'active';
                        break;
                    case 'categorias-testemunhos.php':
                        $active_ct = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapsePP" aria-expanded="true" aria-controls="collapsePP">
            <i class="fas fa-fw fa-folder"></i>
            <span>Programas e Projetos</span>
        </a>
        <div id="collapsePP" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_mf; ?>" href="<?php echo $path ?>modules/pages/programas-projectos/moving-forward.php">Moving Forward</a>
                <a class="collapse-item <?php echo $active_ss; ?>" href="<?php echo $path ?>modules/pages/programas-projectos/startup-school.php">Startup School</a>
                <a class="collapse-item <?php echo $active_v21; ?>" href="<?php echo $path ?>modules/pages/programas-projectos/v21-rural.php">V21 Rural</a>
                <a class="collapse-item <?php echo $active_yl; ?>" href="<?php echo $path ?>modules/pages/programas-projectos/young-leaders.php">Young Leaders</a>
            </div>

            <div class="bg-white py-2 collapse-inner rounded">
                <h3 class="collapse-header">Testemunhos:</h3>
                <a class="collapse-item <?php echo $active_add_t; ?>" href="<?php echo $path ?>modules/pages/programas-projectos/adicionar-testemunho.php">Adicionar testemunho</a>
                <a class="collapse-item <?php echo $active_t; ?>" href="<?php echo $path ?>modules/pages/programas-projectos/testemunhos.php">Testemunhos</a>
                <a class="collapse-item <?php echo $active_ct; ?>" href="<?php echo $path ?>modules/pages/programas-projectos/categorias-testemunhos.php">Gerir categorias</a>
            </div>
        </div>
    </li>

    <li class="nav-item">
        <?php
            $page_galeria_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_galeria = explode('/', $page_galeria_aux)[0];
            $collapsed = $page_galeria == 'galeria' ? '' : 'collapsed';
            $show = $page_galeria == 'galeria' ? 'show' : '';

            if($page_galeria != 'profile.php'){
                $page_galeria_subpage = explode('/', $page_galeria_aux)[1];

                switch($page_galeria_subpage){
                    case 'adicionar-fotografia.php':
                        $active_add_f = 'active';
                        break;
                    case 'galeria.php':
                        $active_g = 'active';
                        break;
                    case 'categorias-galeria.php':
                        $active_cg = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseGaleria" aria-expanded="true" aria-controls="collapseGaleria">
            <i class="fas fa-fw fa-folder"></i>
            <span>Galeria</span>
        </a>
        <div id="collapseGaleria" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_add_f; ?>" href="<?php echo $path ?>modules/pages/galeria/adicionar-fotografia.php">Adicionar fotografia</a>
                <a class="collapse-item <?php echo $active_g; ?>" href="<?php echo $path ?>modules/pages/galeria/galeria.php">Fotografias</a>
                <a class="collapse-item <?php echo $active_cg; ?>" href="<?php echo $path ?>modules/pages/galeria/categorias-galeria.php">Gerir categorias</a>
            </div>
        </div>
    </li>

    <li class="nav-item">
        <?php
            $page_noticias_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_noticias = explode('/', $page_noticias_aux)[0];
            $collapsed = $page_noticias == 'noticias' ? '' : 'collapsed';
            $show = $page_noticias == 'noticias' ? 'show' : '';

            if($page_noticias != 'profile.php'){
                $page_noticias_subpage = explode('/', $page_noticias_aux)[1];

                switch($page_noticias_subpage){
                    case 'inserir-noticia.php':
                        $active_add_n = 'active';
                        break;
                    case 'noticias.php':
                        $active_n = 'active';
                        break;
                    case 'gerir-categorias.php':
                        $active_cn = 'active';
                        break;
                    case 'exportar-listagem-subscricoes.php':
                        $active_els = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseNoticias" aria-expanded="true" aria-controls="collapseNoticias">
            <i class="fas fa-fw fa-folder"></i>
            <span>Notícias</span>
        </a>
        <div id="collapseNoticias" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_add_n; ?>" href="<?php echo $path ?>modules/pages/noticias/inserir-noticia.php">Inserir notícia</a>
                <a class="collapse-item <?php echo $active_n; ?>" href="<?php echo $path ?>modules/pages/noticias/noticias.php">Notícias</a>
                <a class="collapse-item <?php echo $active_cn; ?>" href="<?php echo $path ?>modules/pages/noticias/gerir-categorias.php">Gerir categorias</a>
                <a class="collapse-item <?php echo $active_els; ?>" href="<?php echo $path ?>modules/pages/noticias/exportar-listagem-subscricoes.php">Listas de subscrições</a>
            </div>
        </div>
    </li>

    <li class="nav-item">
        <?php
            $page_inscricoes_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_inscricoes = explode('/', $page_inscricoes_aux)[0];
            $collapsed = $page_inscricoes == 'inscricoes' ? '' : 'collapsed';
            $show = $page_inscricoes == 'inscricoes' ? 'show' : '';

            if($page_noticias != 'profile.php'){
                 $page_inscricoes_subpage = explode('/', $page_inscricoes_aux)[1];

                switch($page_inscricoes_subpage){
                    case 'inserir-programa.php':
                        $active_add_p = 'active';
                        break;
                    case 'programas.php':
                        $active_p = 'active';
                        break;
                    case 'gerir-categorias.php':
                        $active_cp = 'active';
                        break;
                    case 'exportar-listas-inscricoes.php':
                        $active_els = 'active';
                        break;
                    default:
                        break;
                }
            }

           
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseInscricoes" aria-expanded="true" aria-controls="collapseInscricoes">
            <i class="fas fa-fw fa-folder"></i>
            <span>Inscrições</span>
        </a>
        <div id="collapseInscricoes" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_add_p; ?>" href="<?php echo $path ?>modules/pages/inscricoes/inserir-programa.php">Inserir programa</a>
                <a class="collapse-item <?php echo $active_p; ?>" href="<?php echo $path ?>modules/pages/inscricoes/programas.php">Programas</a>
                <a class="collapse-item <?php echo $active_cp; ?>" href="<?php echo $path ?>modules/pages/inscricoes/gerir-categorias.php">Gerir categorias</a>
                <!-- <a class="collapse-item" href="#">Exportar lista</a> -->
                <!-- <form method="post" action="../../../ajax/export-email-lists.php">
                    <input type="submit" name="export_inscricoes" value="Exportar lista" class="collapse-item" style="border: none; background-color: #fff;">
                </form> -->
                <a class="collapse-item <?php echo $active_els; ?>" href="<?php echo $path ?>modules/pages/inscricoes/exportar-listas-inscricoes.php">Listas de inscrições</a>
            </div>
        </div>
    </li>

    <li class="nav-item">
        <?php
            $page_contactos_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_contactos = explode('/', $page_contactos_aux)[0];
            $collapsed = $page_contactos == 'contactos' ? '' : 'collapsed';
            $show = $page_contactos == 'contactos' ? 'show' : '';

            if($page_contactos != 'profile.php'){
                 $page_contactos_subpage = explode('/', $page_contactos_aux)[1];

                switch($page_contactos_subpage){
                    case 'contactos.php':
                        $active_cont = 'active';
                        break;
                    default:
                        break;
                }
            }

           
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapseContactos" aria-expanded="true" aria-controls="collapseContactos">
            <i class="fas fa-fw fa-folder"></i>
            <span>Contactos</span>
        </a>
        <div id="collapseContactos" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_cont; ?>" href="<?php echo $path ?>modules/pages/contactos/contactos.php">Gerir</a>
            </div>
        </div>
    </li>

    <li class="nav-item">
        <?php
            $page_polp_aux = explode('pages/', $_SERVER['REQUEST_URI'])[1];
            $page_polp = explode('/', $page_polp_aux)[0];
            $collapsed = $page_polp == 'politica-privacidade' ? '' : 'collapsed';
            $show = $page_polp == 'politica-privacidade' ? 'show' : '';

            if($page_polp != 'profile.php'){
                $page_polp_subpage = explode('/', $page_polp_aux)[1];

                switch($page_polp_subpage){
                    case 'politica-privacidade.php':
                        $active_polp = 'active';
                        break;
                    default:
                        break;
                }
            }

            
        ?>
        <a class="nav-link <?php echo $collapsed; ?>" href="#" data-toggle="collapse" data-target="#collapsePP1" aria-expanded="true" aria-controls="collapsePP1">
            <i class="fas fa-fw fa-folder"></i>
            <span>Política de Privacidade</span>
        </a>
        <div id="collapsePP1" class="collapse <?php echo $show; ?>" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <a class="collapse-item <?php echo $active_polp; ?>" href="<?php echo $path ?>modules/pages/politica-privacidade/politica-privacidade.php">Gerir</a>
            </div>
        </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

</ul>