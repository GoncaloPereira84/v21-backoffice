/* eslint-disable */
window.addEventListener("load", function(e) {
    getCategorias();
    getNoticias();

    var alignBtnsIntro = $(".img-align-cell");

    alignBtnsIntro.each(function() {
        $(this).on("click", function() {
            $(this).toggleClass("active");
            $(".img-align-cell").not(this).removeClass("active");
        });
    });

    document.getElementById("cats-id-search").addEventListener("change", function() {
        searchByCategoria();
    })

    $('#text-pt').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
        ],
    });

    $('#text-en').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
        ],
    });

});

$('#upload-pdf').change(function(){
    $('#upload-link-pdf').val('https://www.v21.pt/uploads/pdfs/'+$('#upload-pdf').val().split("\\")[2]);
})

function searchByCategoria() {
    categoria = document.getElementById("cats-id-search").value;
    fotos = document.querySelectorAll("#noticias .valueLine");
    fotos.forEach(foto => {
        if (categoria == "null") {
            foto.style.display = "flex";
        } else {
            if (foto.dataset.categoria != categoria) {
                foto.style.display = "none";
            } else {
                foto.style.display = "flex";
            }
        }
    });
}

function getCategorias() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var cats = JSON.parse(resp[1]);
                select_search = document.getElementById("cats-id-search");
                cats.forEach(cat => {
                    option = document.createElement("option");
                    option.value = cat.id;
                    option.innerText = cat.title;
                    select_search.append(option);
                })

                select = document.getElementById("cats-id");
                cats.forEach(cat => {
                    option = document.createElement("option");
                    option.value = cat.id;
                    option.innerText = cat.title;
                    select.append(option);
                })
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao carregar.");
            }
        }
    };
    xhttp.open("GET", "functions/func-noticias.php?cmdEval=getListaCategorias");
    xhttp.send();
}

/* get galeria info */
function getNoticias(last, idNoticia) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printNoticias(JSON.parse(resp[1]), last, idNoticia);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação das Notícias");
            }
        }
    };

    xhttp.open("GET", "functions/func-noticias.php?cmdEval=getNoticias");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print noticias */
function printNoticias(noticias, last, idNoticia) {
    noticiasArea = document.querySelector("#noticias");
    document.querySelector("#noticias").innerHTML = "";
    arrayStatus = [];
    noticiasArea.innerHTML = "";

    var categorias;
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                categorias = JSON.parse(resp[1]);

                for (const i in noticias) {
                    if (noticias.hasOwnProperty(i)) {
                        const noticia = noticias[i];
                        linha = document.createElement("div");
                        linha.id = "noticia-" + noticia.id;
                        linha.classList.add("col-lg-10");
                        linha.classList.add("valueLine");
                        linha.style.display = "flex";
                        linha.style.cursor = "pointer";
                        linha.dataset.categoria = noticia.categoria_id;

                        var imagem;
                        if (noticia.img_src == null || noticia.img_src == "") {
                            imagem = "Não tem imagem.";
                        } else {
                            var splitSrc = noticia.img_src.split("uploads");
                            imagem =
                                '<img style="width: 60%;" src="../../../uploads' +
                                splitSrc[1] +
                                '" />';
                        }

                        var align;
                        switch (noticia.img_align) {
                            case "position-center-left":
                                align = "Centro Esquerda";
                                break;
                            case "position-center-center":
                                align = "Centro";
                                break;
                            case "position-center-right":
                                align = "Centro Direita";
                                break;
                            case "position-left":
                                align = "Esquerda";
                                break;
                            case "position-right":
                                align = "Direita";
                                break;
                            default:
                                align = "Centro";
                        }

                        var map = Array.prototype.map;
                        var cat = [];

                        var pid = noticia.categoria_id.split(',');

                        map.call(categorias, function(c) {
                            if (c.id == noticia.categoria_id) {
                                cat.push(c.title);
                            } else {
                                map.call(pid, function(p) {
                                    if (c.id == p) {
                                        cat.push(c.title);
                                    }
                                })
                            }
                        });

                        html = `
                            <div class="col-lg-3">${noticia.title}</div>
                            <div class="col-lg-3">${cat}</div>
                            <div class="col-lg-3">${imagem}</div>
                            <div class="col-lg-3">${align}</div>
                        `;
                        linha.innerHTML = html;
                        linha.addEventListener("click", function() {
                            selectNoticia("noticia-" + noticia.id);
                        });
                        noticiasArea.append(linha);
                    }
                }
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao carregar.");
            }
        }
    };
    xhttp.open("GET", "functions/func-noticias.php?cmdEval=getListaCategorias");
    xhttp.send();

    if (last != null) {
        document.querySelector("#noticias .row:first-child").classList.add("active");
    }
    if (idNoticia != null) {
        document.querySelector("#noticias #noticia-" + idNoticia).classList.add("active");
    }
}

/* select noticia */
function selectNoticia(id) {
    linhaNoticia = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaNoticia.classList.contains("active")) {
        linhaNoticia.classList.remove("active");
        var inputs = document
            .getElementById("noticiaInfo")
            .getElementsByTagName("input");

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text") inputs[index].value = "";
            if (inputs[index].type == "date") inputs[index].value = "";
            if (inputs[index].type == "file") inputs[index].value = "";
        }

        $('#uploaded-pdf a').attr('href', '');
        $('#uploaded-pdf a').text('');

        $('#text-pt').next().find('.note-editable').html('');
        $('#text-en').next().find('.note-editable').html('');

        $('#addGaleriaBtn').css({ 'opacity': '0', 'pointer-events': 'none' });
        $('#noticiaInfo').css({ 'display': 'none' });
        $('.noticiaInfo').css({ 'display': 'none' });

        if ($('#galeria-section').length != 0) {
            $('#galeria-section').css({ 'display': 'none' });
        }

        var alignBtns = $(".img-align-cell");

        alignBtns.each(function() {
            $(this).removeClass("active");
        });

        document.getElementById('cats-id').value = '';

        $noticiasArea = document.getElementById("noticiaInfo");
        $noticiasArea.setAttribute("data-id-noticia", "");
    } else {
        $("#noticias .valueLine").removeClass("active");
        linhaNoticia.classList.add("active");

        //load data into the inputs in the page
        getNoticiaById(id.replace("noticia-", ""));
        getNoticiaGaleria(id.replace("noticia-", ""));
    }
}

/* 
********************************
ALL FUNCTIONS RELATED TO THE PHOTOGALLERY
********************************
*/
function getNoticiaGaleria(idNoticia) {
    if (idNoticia != undefined || idNoticia != 'undefined' || idNoticia != '') {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    // console.log(JSON.parse(resp[1]).length);
                    if (JSON.parse(resp[1]).length == 0) {
                        $('#addGaleriaBtn').css({ 'opacity': '1', 'pointer-events': 'all' });
                        $('#galeria-section').attr('data-noticia', '');
                        $('#galeria-section').css('display', 'none');
                    } else {
                        $('#galeria-section').attr('data-noticia', idNoticia);
                        $('#galeria-section').css('display', 'flex');
                        printGaleria(JSON.parse(resp[1]), idNoticia);
                    }
                } else if (resp[0] == "false") {
                    $.notify(resp[1]);
                } else if (resp[0] == "warn") {
                    $.notify(resp[1], "warn");
                } else if (resp[0] == "session_expired") {
                    window.location = "login.php";
                } else {
                    $.notify("Erro ao aceder à informação da galeria");
                }
            }
        };

        xhttp.open("GET", "functions/func-noticias.php?cmdEval=getNoticiaGaleria&id_noticia=" + idNoticia);
        xhttp.send();
        xhttp.getResponseHeader("Content-Type", "application/xml");
    }
}

function printGaleria(fotos, idNoticia) {
    fotosArea = document.querySelector("#galeria-section #imagens");
    document.querySelector("#galeria-section #imagens").innerHTML = "";
    arrayStatus = [];
    fotosArea.innerHTML = "";

    for (const i in fotos) {
        if (fotos.hasOwnProperty(i)) {
            const foto = fotos[i];
            linha = document.createElement("div");
            linha.id = "foto-" + foto.id;
            linha.classList.add("col-lg-10");
            linha.classList.add("valueLine");
            linha.style.display = "flex";
            linha.style.cursor = "pointer";

            var imagem;
            if (foto.img_src == null || foto.img_src == "") {
                imagem = "Não tem imagem.";
            } else {
                var splitSrc = foto.img_src.split("uploads");
                imagem =
                    '<img style="width: 60%;" src="../../../uploads' +
                    splitSrc[1] +
                    '" />';
            }

            html = `
                <div class="col-lg-3">${foto.title}</div>
                <div class="col-lg-3">${imagem}</div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function() {
                selectFoto("foto-" + foto.id);
            });
            fotosArea.append(linha);
        }
    }

    // if (last != null) {
    //   document.querySelector("#galeria-section #imagens .row:first-child").classList.add("active");
    // }
    // if (idNoticia != null) {
    //   document.querySelector("#galeria-section #imagens #foto-" + idNoticia).classList.add("active");
    // }
}

function selectFoto(id) {
    linhaFoto = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaFoto.classList.contains("active")) {
        linhaFoto.classList.remove("active");
        var inputs = document
            .getElementById("imagemInfo")
            .getElementsByTagName("input");

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text") inputs[index].value = "";
        }

        $('#titulo-pt-galeria').val('');

        $fotosArea = document.getElementById("imagemInfo");
        $fotosArea.setAttribute("data-id-foto", "");
    } else {
        $("#galeria-section #imagens .valueLine").removeClass("active");
        linhaFoto.classList.add("active");

        //load data into the inputs in the page
        getFotoById(id.replace("foto-", ""));
    }
}

function getFotoById(idFoto) {
    idFoto = idFoto.replace("foto-", "");
    listaFotos = document.querySelector("#galeria-section #imagens");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByFoto(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação da Galeria.");
            }
        }
    };
    xhttp.open(
        "GET",
        "functions/func-noticias.php?cmdEval=getAllFotosByIdFoto&id_foto=" +
        idFoto
    );
    xhttp.send();
}

function getAllDataByFoto(foto) {
    $fotosArea = document.getElementById("imagemInfo");
    $fotosArea.setAttribute("data-id-foto", "foto-" + foto[0].id);

    $('#titulo-pt-galeria').val(foto[0].title);

    $("#saveFotoGaleria").attr("data-id-foto", foto[0].id);
    $("#deleteFotoGaleria").attr("data-id-foto", foto[0].id);
}

var $saveFotoBtn = $("#saveFotoGaleria");
$saveFotoBtn.click(function() {
    var id = $("#saveFotoGaleria").attr("data-id-foto");
    var noticia_id = $('#galeria-section').attr('data-noticia');
    var titlePT = $("#titulo-pt-galeria");
    var img = $("#noticia-img-galeria");

    $fotosArea = document.getElementById("imagemInfo");
    var foto_id = $fotosArea.getAttribute("data-id-foto");

    if (foto_id != null) foto_id = foto_id.replace("foto-", "");
    else foto_id = "";

    var dataFoto = {
        id: id,
        noticia_id: noticia_id,
        titlePT: titlePT.val(),
        img: img.val()
    };

    if (dataFoto.titlePT == "") {
        $(".titulo-pt-galeria.erro").text("Por favor, inserir o título.");
    } else {
        $(".titulo-pt-galeria.erro").text("");
    }

    var file = $("#noticia-img-galeria").prop("files")[0];

    var foto = new FormData();

    if (dataFoto.titlePT != "") {
        foto.append("cmdEval", "saveFotoGaleria");
        foto.append("id", dataFoto.id);
        foto.append("noticia_id", dataFoto.noticia_id);
        foto.append("titlePT", dataFoto.titlePT);
        foto.append("file", file);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Foto guardada com sucesso!", "success");

                    var inputs = document
                        .getElementById("imagemInfo")
                        .getElementsByTagName("input");

                    for (index = 0; index < inputs.length; ++index) {
                        if (inputs[index].type == "text") inputs[index].value = "";
                    }
                    for (index = 0; index < inputs.length; ++index) {
                        if (inputs[index].type == "file") inputs[index].value = "";
                    }

                    if ($fotosArea) {
                        if (foto_id == "") getNoticiaGaleria(null, null);
                        else getNoticiaGaleria(null, dataFoto.noticia_id);

                        $fotosArea = document.getElementById("imagemInfo");
                        $fotosArea.setAttribute("data-id-foto", "");
                        document.getElementById("saveFotoGaleria").setAttribute('data-id-foto', '');
                    } else {
                        getNoticiaGaleria("last", null);
                    }
                } else if (resp[0] == "false") {
                    $.notify(resp[1]);
                } else if (resp[0] == "warn") {
                    $.notify(resp[1], "warn");
                } else if (resp[0] == "session_expired") {
                    window.location = "login.php";
                } else {
                    $.notify("Erro ao carregar.");
                }
            }
        };

        xhttp.open("POST", "functions/func-noticias.php", true);
        xhttp.send(foto);
    }
});

var $deleteFotoBtn = $('#deleteFotoGaleria');
$deleteFotoBtn.click(function(id) {
    id = document.getElementById('deleteFotoGaleria').getAttribute('data-id-foto');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getNoticiaGaleria($('#galeria-section').attr('data-noticia'));
                $.notify("Foto apagada com sucesso.", "success");

                var inputs = document.getElementById('imagemInfo').getElementsByTagName('input');
                document.getElementById("saveFotoGaleria").setAttribute('data-id-foto', '');
                $fotosArea = document.getElementById("imagemInfo");
                $fotosArea.setAttribute("data-id-foto", "");

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text")
                        inputs[index].value = '';
                }

                $('#addGaleriaNoticia').css({ 'opacity': '1', 'pointer-events': 'all' });
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar a foto.");
            }
        }
    }
    xhttp.open("GET", "functions/func-noticias.php?cmdEval=deleteFotoGaleria&id=" + id);
    xhttp.send();
});

/*
********************************
ALL FUNCTIONS RELATED TO THE PHOTOGALLERY
END
********************************
*/

/* get noticia info by selected */
function getNoticiaById(idNoticia) {
    idNoticia = idNoticia.replace("noticia-", "");
    listaNoticias = document.querySelector("#noticias");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByNoticia(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação das Notícias.");
            }
        }
    };
    xhttp.open(
        "GET",
        "functions/func-noticias.php?cmdEval=getAllNoticiasByIdNoticia&id_noticia=" +
        idNoticia
    );
    xhttp.send();
}

/* get noticia info */
function getAllDataByNoticia(noticia) {
    $noticiasArea = document.getElementById("noticiaInfo");
    $noticiasArea.setAttribute("data-id-noticia", "noticia-" + noticia[0].id);

    $('#titulo-pt').val(noticia[0].title);
    $('#titulo-en').val(noticia[0].title_en);

    $('#text-pt').next().find('.note-editable').html(noticia[0].text);
    $('#text-en').next().find('.note-editable').html(noticia[0].text_en);

    $('#noticiaInfo').css({ 'display': 'flex' });
    $('.noticiaInfo').css({ 'display': 'flex' });

    var alignBtns = $(".img-align-cell");

    alignBtns.each(function() {
        $(this).removeClass("active");
    });

    $(".img-align-cell." + noticia[0].img_align).addClass(
        "active"
    );

    var cats = noticia[0].categoria_id.split(',');
    var $input_select = $('#noticiaInfo #cats-id');
    $input_select.val(cats);

    $('#data').val(noticia[0].data_inicio);

    $('#uploaded-pdf a').attr('href', noticia[0].pdf_file);
    $('#uploaded-pdf a').text(noticia[0].pdf_file);

    $("#saveNoticia").attr("data-id-noticia", noticia[0].id);
    $("#deleteNoticia").attr("data-id-noticia", noticia[0].id);
    $("#publishNoticia").attr("data-id-noticia", noticia[0].id);
}

/* update noticia */
var $saveNoticiaBtn = $("#saveNoticia");
$saveNoticiaBtn.click(function() {
    if ($('#add-galeria-section').length > 0 && $('#add-galeria-section').css('display') != 'none') {
        var id = $("#saveNoticia").attr("data-id-noticia");
        var titlePT = $("#titulo-pt");
        var titleEN = $("#titulo-en");
        var categoria_id = $('#cats-id').val();
        var textPT = $("#text-pt");
        var textEN = $("#text-en");
        var img = $("#noticia-img");
        var data = $("#data");
        var align = $(".img-align-cell.active input");
        var pdf = $("#upload-pdf");
        var pdf_title = $("#uploaded-pdf").text();

        $noticiasArea = document.getElementById("noticiaInfo");
        var noticia_id = $noticiasArea.getAttribute("data-id-noticia");

        if (noticia_id != null) noticia_id = noticia_id.replace("noticia-", "");
        else noticia_id = "";

        var dataNoticia = {
            id: id,
            titlePT: titlePT.val(),
            titleEN: titleEN.val(),
            categoria_id: categoria_id,
            textPT: textPT.next().find('.note-editable').html(),
            textEN: textEN.next().find('.note-editable').html(),
            img: img.val(),
            data: data.val(),
            align: align.val(),
            pdf: pdf.val(),
            pdf_title: pdf_title
        };

        if (dataNoticia.textPT == "") {
            $(".text-pt.erro").text("Por favor, inserir o texto.");
        } else {
            $(".text-pt.erro").text("");
        }

        if (dataNoticia.categoria_id == "null") {
            $(".cat-id.erro").text("Por favor, seleccionar a categoria.");
        } else {
            $(".cat-id.erro").text("");
        }

        if (dataNoticia.titlePT == "") {
            $(".titulo-pt.erro").text("Por favor, inserir o título.");
        } else {
            $(".titulo-pt.erro").text("");
        }

        var noticia = new FormData();

        var file = $("#noticia-img").prop("files")[0];
        var fotos = $(".foto .noticia-img-galeria");
        var files_gallery_nr = [];
        var files_gallery_names = [];
        var f = 0;
        fotos.each(function() {
            f++;
            files_gallery_nr.push(f);
            files_gallery_names.push($(this).parent().prev().find('input').val());
            noticia.append("files_gallery[]", $(this).prop("files")[0]);
        });
        var pdf = $("#upload-pdf").prop("files")[0];

        if (dataNoticia.titlePT != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
            noticia.append("cmdEval", "saveNoticia");
            noticia.append("id", dataNoticia.id);
            noticia.append("titlePT", dataNoticia.titlePT);
            noticia.append("titleEN", dataNoticia.titleEN);
            noticia.append("categoria_id", dataNoticia.categoria_id);
            noticia.append("textPT", dataNoticia.textPT);
            noticia.append("textEN", dataNoticia.textEN);
            noticia.append("file", file);
            noticia.append("data", dataNoticia.data);
            noticia.append("align", dataNoticia.align);
            noticia.append("files_gallery_nr", files_gallery_nr);
            noticia.append("files_gallery_names", files_gallery_names);
            noticia.append("pdf", pdf);
            noticia.append("pdf_title", pdf_title);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resp = this.responseText.split("||");
                    if (resp[0] == "true") {
                        $.notify("Rascunho guardado com sucesso!", "success");

                        var inputs = document
                            .getElementById("noticiaInfo")
                            .getElementsByTagName("input");

                        for (index = 0; index < inputs.length; ++index) {
                            if (inputs[index].type == "text") inputs[index].value = "";
                            if (inputs[index].type == "date") inputs[index].value = "";
                            if (inputs[index].type == "file") inputs[index].value = '';
                        }

                        textPT.next().find('.note-editable').html('');
                        textEN.next().find('.note-editable').html('');

                        $('#galeria-section').css('display', 'none');
                        $('#galeria-section').attr('data-noticia', '');
                        $('#uploaded-pdf a').attr('href', '');
                        $('#uploaded-pdf a').text('');

                        $('#addGaleriaBtn').css({ 'opacity': '0', 'pointer-events': 'none' });
                        $('#noticiaInfo').css({ 'display': 'none' });
                        $('.noticiaInfo').css({ 'display': 'none' });

                        if ($('#galeria-section').length != 0) {
                            $('#galeria-section').css({ 'display': 'none' });
                        }

                        if ($('#add-galeria-section').length != 0) {
                            $('#add-galeria-section').css({ 'display': 'none' });
                        }

                        var alignBtns = $(".img-align-cell");

                        alignBtns.each(function() {
                            $(this).removeClass("active");
                        });

                        document.getElementById('cats-id').value = '';

                        if ($noticiasArea) {
                            if (noticia_id == "") getNoticias(null, null);
                            else getNoticias(null, noticia_id);

                            $noticiasArea = document.getElementById("noticiaInfo");
                            $noticiasArea.setAttribute("data-id-noticia", "");
                        } else {
                            getNoticias("last", null);
                        }
                    } else if (resp[0] == "false") {
                        $.notify(resp[1]);
                    } else if (resp[0] == "warn") {
                        $.notify(resp[1], "warn");
                    } else if (resp[0] == "session_expired") {
                        window.location = "login.php";
                    } else {
                        $.notify("Erro ao carregar.");
                    }
                }
            };

            xhttp.open("POST", "functions/func-noticias.php", true);
            xhttp.send(noticia);
        }
    } else {
        var id = $("#saveNoticia").attr("data-id-noticia");
        var titlePT = $("#titulo-pt");
        var titleEN = $("#titulo-en");
        var categoria_id = $('#cats-id').val();
        var textPT = $("#text-pt");
        var textEN = $("#text-en");
        var img = $("#noticia-img");
        var data = $("#data");
        var align = $(".img-align-cell.active input");
        var pdf = $("#upload-pdf");
        var pdf_title = $("#uploaded-pdf").text();

        $noticiasArea = document.getElementById("noticiaInfo");
        var noticia_id = $noticiasArea.getAttribute("data-id-noticia");

        if (noticia_id != null) noticia_id = noticia_id.replace("noticia-", "");
        else noticia_id = "";

        var dataNoticia = {
            id: id,
            titlePT: titlePT.val(),
            titleEN: titleEN.val(),
            categoria_id: categoria_id,
            textPT: textPT.next().find('.note-editable').html(),
            textEN: textEN.next().find('.note-editable').html(),
            img: img.val(),
            data: data.val(),
            align: align.val(),
            pdf: pdf.val(),
            pdf_title: pdf_title
        };

        if (dataNoticia.textPT == "") {
            $(".text-pt.erro").text("Por favor, inserir o texto.");
        } else {
            $(".text-pt.erro").text("");
        }

        if (dataNoticia.categoria_id == "null") {
            $(".cat-id.erro").text("Por favor, seleccionar a categoria.");
        } else {
            $(".cat-id.erro").text("");
        }

        if (dataNoticia.titlePT == "") {
            $(".titulo-pt.erro").text("Por favor, inserir o título.");
        } else {
            $(".titulo-pt.erro").text("");
        }

        var file = $("#noticia-img").prop("files")[0];
        var pdf = $("#upload-pdf").prop("files")[0];

        var noticia = new FormData();

        if (dataNoticia.titlePT != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
            noticia.append("cmdEval", "saveNoticia");
            noticia.append("id", dataNoticia.id);
            noticia.append("titlePT", dataNoticia.titlePT);
            noticia.append("titleEN", dataNoticia.titleEN);
            noticia.append("categoria_id", dataNoticia.categoria_id);
            noticia.append("textPT", dataNoticia.textPT);
            noticia.append("textEN", dataNoticia.textEN);
            noticia.append("file", file);
            noticia.append("data", dataNoticia.data);
            noticia.append("align", dataNoticia.align);
            noticia.append("pdf", pdf);
            noticia.append("pdf_title", pdf_title);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resp = this.responseText.split("||");
                    if (resp[0] == "true") {
                        $.notify("Rascunho guardado com sucesso!", "success");

                        var inputs = document
                            .getElementById("noticiaInfo")
                            .getElementsByTagName("input");

                        for (index = 0; index < inputs.length; ++index) {
                            if (inputs[index].type == "text") inputs[index].value = "";
                            if (inputs[index].type == "date") inputs[index].value = "";
                            if (inputs[index].type == "file") inputs[index].value = '';
                        }

                        textPT.next().find('.note-editable').html('');
                        textEN.next().find('.note-editable').html('');

                        $('#galeria-section').css('display', 'none');
                        $('#galeria-section').attr('data-noticia', '');
                        $('#uploaded-pdf a').attr('href', '');
                        $('#uploaded-pdf a').text('');

                        var alignBtns = $(".img-align-cell");

                        alignBtns.each(function() {
                            $(this).removeClass("active");
                        });

                        document.getElementById('cats-id').value = '';

                        if ($noticiasArea) {
                            if (noticia_id == "") getNoticias(null, null);
                            else getNoticias(null, noticia_id);

                            $noticiasArea = document.getElementById("noticiaInfo");
                            $noticiasArea.setAttribute("data-id-noticia", "");
                        } else {
                            getNoticias("last", null);
                        }
                    } else if (resp[0] == "false") {
                        $.notify(resp[1]);
                    } else if (resp[0] == "warn") {
                        $.notify(resp[1], "warn");
                    } else if (resp[0] == "session_expired") {
                        window.location = "login.php";
                    } else {
                        $.notify("Erro ao carregar.");
                    }
                }
            };

            xhttp.open("POST", "functions/func-noticias.php", true);
            xhttp.send(noticia);
        }
    }

});

/* update noticia */
var $publishNoticiaBtn = $("#publishNoticia");
$publishNoticiaBtn.click(function() {
    if ($('#add-galeria-section').length > 0 && $('#add-galeria-section').css('display') != 'none') {
        var id = $("#publishNoticia").attr("data-id-noticia");
        var titlePT = $("#titulo-pt");
        var titleEN = $("#titulo-en");
        var categoria_id = $('#cats-id').val();
        var textPT = $("#text-pt");
        var textEN = $("#text-en");
        var img = $("#noticia-img");
        var data = $("#data");
        var align = $(".img-align-cell.active input");
        var pdf = $("#upload-pdf");
        var pdf_title = $("#uploaded-pdf").text();

        $noticiasArea = document.getElementById("noticiaInfo");
        var noticia_id = $noticiasArea.getAttribute("data-id-noticia");

        if (noticia_id != null) noticia_id = noticia_id.replace("noticia-", "");
        else noticia_id = "";

        var dataNoticia = {
            id: id,
            titlePT: titlePT.val(),
            titleEN: titleEN.val(),
            categoria_id: categoria_id,
            textPT: textPT.next().find('.note-editable').html(),
            textEN: textEN.next().find('.note-editable').html(),
            img: img.val(),
            data: data.val(),
            align: align.val(),
            pdf: pdf.val(),
            pdf_title: pdf_title
        };

        if (dataNoticia.textPT == "") {
            $(".text-pt.erro").text("Por favor, inserir o texto.");
        } else {
            $(".text-pt.erro").text("");
        }

        if (dataNoticia.categoria_id == "null") {
            $(".cat-id.erro").text("Por favor, seleccionar a categoria.");
        } else {
            $(".cat-id.erro").text("");
        }

        if (dataNoticia.titlePT == "") {
            $(".titulo-pt.erro").text("Por favor, inserir o título.");
        } else {
            $(".titulo-pt.erro").text("");
        }

        var noticia = new FormData();

        var file = $("#noticia-img").prop("files")[0];
        var fotos = $(".foto .noticia-img-galeria");
        var files_gallery_nr = [];
        var files_gallery_names = [];
        var f = 0;
        fotos.each(function() {
            f++;
            files_gallery_nr.push(f);
            files_gallery_names.push($(this).parent().prev().find('input').val());
            noticia.append("files_gallery[]", $(this).prop("files")[0]);
        });
        var pdf = $("#upload-pdf").prop("files")[0];

        if (dataNoticia.titlePT != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
            noticia.append("cmdEval", "publishNoticia");
            noticia.append("id", dataNoticia.id);
            noticia.append("titlePT", dataNoticia.titlePT);
            noticia.append("titleEN", dataNoticia.titleEN);
            noticia.append("categoria_id", dataNoticia.categoria_id);
            noticia.append("textPT", dataNoticia.textPT);
            noticia.append("textEN", dataNoticia.textEN);
            noticia.append("file", file);
            noticia.append("data", dataNoticia.data);
            noticia.append("align", dataNoticia.align);
            noticia.append("files_gallery_nr", files_gallery_nr);
            noticia.append("files_gallery_names", files_gallery_names);
            noticia.append("pdf", pdf);
            noticia.append("pdf_title", pdf_title);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resp = this.responseText.split("||");
                    if (resp[0] == "true") {
                        $.notify("Notícia publicada com sucesso!", "success");

                        var inputs = document
                            .getElementById("noticiaInfo")
                            .getElementsByTagName("input");

                        for (index = 0; index < inputs.length; ++index) {
                            if (inputs[index].type == "text") inputs[index].value = "";
                            if (inputs[index].type == "date") inputs[index].value = "";
                            if (inputs[index].type == "file") inputs[index].value = '';
                        }

                        textPT.next().find('.note-editable').html('');
                        textEN.next().find('.note-editable').html('');

                        $('#galeria-section').css('display', 'none');
                        $('#galeria-section').attr('data-noticia', '');
                        $('#uploaded-pdf a').attr('href', '');
                        $('#uploaded-pdf a').text('');

                        $('#addGaleriaBtn').css({ 'opacity': '0', 'pointer-events': 'none' });
                        $('#noticiaInfo').css({ 'display': 'none' });
                        $('.noticiaInfo').css({ 'display': 'none' });

                        if ($('#galeria-section').length != 0) {
                            $('#galeria-section').css({ 'display': 'none' });
                        }

                        if ($('#add-galeria-section').length != 0) {
                            $('#add-galeria-section').css({ 'display': 'none' });
                        }

                        var alignBtns = $(".img-align-cell");

                        alignBtns.each(function() {
                            $(this).removeClass("active");
                        });

                        document.getElementById('cats-id').value = '';

                        if ($noticiasArea) {
                            if (noticia_id == "") getNoticias(null, null);
                            else getNoticias(null, noticia_id);

                            $noticiasArea = document.getElementById("noticiaInfo");
                            $noticiasArea.setAttribute("data-id-noticia", "");
                        } else {
                            getNoticias("last", null);
                        }
                    } else if (resp[0] == "false") {
                        $.notify(resp[1]);
                    } else if (resp[0] == "warn") {
                        $.notify(resp[1], "warn");
                    } else if (resp[0] == "session_expired") {
                        window.location = "login.php";
                    } else {
                        $.notify("Erro ao carregar.");
                    }
                }
            };

            xhttp.open("POST", "functions/func-noticias.php", true);
            xhttp.send(noticia);
        }
    } else {
        var id = $("#publishNoticia").attr("data-id-noticia");
        var titlePT = $("#titulo-pt");
        var titleEN = $("#titulo-en");
        var categoria_id = $('#cats-id').val();
        var textPT = $("#text-pt");
        var textEN = $("#text-en");
        var img = $("#noticia-img");
        var data = $("#data");
        var align = $(".img-align-cell.active input");
        var pdf = $("#upload-pdf");
        var pdf_title = $("#uploaded-pdf").text();

        $noticiasArea = document.getElementById("noticiaInfo");
        var noticia_id = $noticiasArea.getAttribute("data-id-noticia");

        if (noticia_id != null) noticia_id = noticia_id.replace("noticia-", "");
        else noticia_id = "";

        var dataNoticia = {
            id: id,
            titlePT: titlePT.val(),
            titleEN: titleEN.val(),
            categoria_id: categoria_id,
            textPT: textPT.next().find('.note-editable').html(),
            textEN: textEN.next().find('.note-editable').html(),
            img: img.val(),
            data: data.val(),
            align: align.val(),
            pdf: pdf.val(),
            pdf_title: pdf_title
        };

        if (dataNoticia.textPT == "") {
            $(".text-pt.erro").text("Por favor, inserir o texto.");
        } else {
            $(".text-pt.erro").text("");
        }

        if (dataNoticia.categoria_id == "null") {
            $(".cat-id.erro").text("Por favor, seleccionar a categoria.");
        } else {
            $(".cat-id.erro").text("");
        }

        if (dataNoticia.titlePT == "") {
            $(".titulo-pt.erro").text("Por favor, inserir o título.");
        } else {
            $(".titulo-pt.erro").text("");
        }

        var file = $("#noticia-img").prop("files")[0];
        var pdf = $("#upload-pdf").prop("files")[0];

        var noticia = new FormData();

        if (dataNoticia.titlePT != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
            noticia.append("cmdEval", "publishNoticia");
            noticia.append("id", dataNoticia.id);
            noticia.append("titlePT", dataNoticia.titlePT);
            noticia.append("titleEN", dataNoticia.titleEN);
            noticia.append("categoria_id", dataNoticia.categoria_id);
            noticia.append("textPT", dataNoticia.textPT);
            noticia.append("textEN", dataNoticia.textEN);
            noticia.append("file", file);
            noticia.append("data", dataNoticia.data);
            noticia.append("align", dataNoticia.align);
            noticia.append("pdf", pdf);
            noticia.append("pdf_title", pdf_title);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resp = this.responseText.split("||");
                    if (resp[0] == "true") {
                        $.notify("Notícia publicada com sucesso!", "success");

                        var inputs = document
                            .getElementById("noticiaInfo")
                            .getElementsByTagName("input");

                        for (index = 0; index < inputs.length; ++index) {
                            if (inputs[index].type == "text") inputs[index].value = "";
                            if (inputs[index].type == "date") inputs[index].value = "";
                            if (inputs[index].type == "file") inputs[index].value = '';
                        }

                        textPT.next().find('.note-editable').html('');
                        textEN.next().find('.note-editable').html('');

                        $('#galeria-section').css('display', 'none');
                        $('#galeria-section').attr('data-noticia', '');
                        $('#uploaded-pdf a').attr('href', '');
                        $('#uploaded-pdf a').text('');

                        var alignBtns = $(".img-align-cell");

                        alignBtns.each(function() {
                            $(this).removeClass("active");
                        });

                        document.getElementById('cats-id').value = '';

                        if ($noticiasArea) {
                            if (noticia_id == "") getNoticias(null, null);
                            else getNoticias(null, noticia_id);

                            $noticiasArea = document.getElementById("noticiaInfo");
                            $noticiasArea.setAttribute("data-id-noticia", "");
                        } else {
                            getNoticias("last", null);
                        }
                    } else if (resp[0] == "false") {
                        $.notify(resp[1]);
                    } else if (resp[0] == "warn") {
                        $.notify(resp[1], "warn");
                    } else if (resp[0] == "session_expired") {
                        window.location = "login.php";
                    } else {
                        $.notify("Erro ao carregar.");
                    }
                }
            };

            xhttp.open("POST", "functions/func-noticias.php", true);
            xhttp.send(noticia);
        }
    }

});

/**
 * delete noticia
 */
var $deleteNoticiaBtn = $('#deleteNoticia');
$deleteNoticiaBtn.click(function(id) {
    id = document.getElementById('deleteNoticia').getAttribute('data-id-noticia');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getNoticias();
                $.notify("Notícia apagada com sucesso.", "success");

                $('#addGaleriaBtn').css({ 'opacity': '0', 'pointer-events': 'none' });
                $('#noticiaInfo').css({ 'display': 'none' });
                $('.noticiaInfo').css({ 'display': 'none' });

                if ($('#galeria-section').length != 0) {
                    $('#galeria-section').css({ 'display': 'none' });
                }

                if ($('#add-galeria-section').length != 0) {
                    $('#add-galeria-section').css({ 'display': 'none' });
                }

                var inputs = document.getElementById('noticiaInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text") inputs[index].value = '';
                    if (inputs[index].type == "date") inputs[index].value = '';
                    if (inputs[index].type == "file") inputs[index].value = '';
                }

                var alignBtns = $(".img-align-cell");

                alignBtns.each(function() {
                    $(this).removeClass("active");
                });

                document.getElementById('cats-id').value = '';
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar a notícia.");
            }
        }
    }
    xhttp.open("GET", "functions/func-noticias.php?cmdEval=deleteNoticia&id=" + id);
    xhttp.send();
});

/**
 * ***********************************
 * FUNCTIONS RELATED TO ADDING A NEW GALLERY TO A NEWS TOPIC
 * ***********************************
 */
var addGaleriaBtn = $('#addGaleriaNoticia');
var added = false;

addGaleriaBtn.click(function() {
    added = true;

    $('#add-galeria-section').css('display') != 'none' ? added = false : added = true;
    if (added) {
        $('#add-galeria-section').css('display', 'flex');

        var noticia_id = $('#noticiaInfo').attr('data-id-noticia');

        if (noticia_id != null) noticia_id = noticia_id.replace("noticia-", "");
        else noticia_id = "";

        $('#add-galeria-section').attr('data-id-noticia', noticia_id);
        $('#addGaleriaNoticia').css({ 'opacity': '0', 'pointer-events': 'none' });

        $('.foto-1 .deleteFoto').click(function() {
            $(this).closest('.foto').css('display', 'none');
        })
    } else {
        $('#addGaleriaNoticia').css({ 'opacity': '1', 'pointer-events': 'all' });
    }
})

var photo = 1;
$('#addFoto').click(function() {
    photo++;

    if ($(".foto-1").length > 0) {
        $(".foto-1").clone().attr('class', 'foto foto-' + photo).css('display', 'block').appendTo(".fotos-container")
    }

    // if($(".foto-" + photo).length > 0){
    //   $(".foto-" + photo).find('.noticia-img-galeria').attr("name", 'files_gallery_' + photo)
    // }

    $('.foto .deleteFoto').each(function() {
        $(this).click(function() {
            if ($(this).closest('.foto').hasClass('foto-1')) {
                $(this).closest('.foto').css('display', 'none');
            } else {
                $(this).closest('.foto').remove();
            }
        })
    })
})

/**
 * ***********************************
 * FUNCTIONS RELATED TO ADDING A NEW GALLERY TO A NEWS TOPIC
 * END
 * ***********************************
 */