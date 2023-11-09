/* eslint-disable */
window.addEventListener("load", function(e) {
    getCategorias();

    var alignBtnsPrincipal = $("#img-align-principal .img-align-cell");

    alignBtnsPrincipal.each(function() {
        $(this).on("click", function() {
            $(this).toggleClass("active");
            $("#img-align-principal .img-align-cell").not(this).removeClass("active");
        });
    });

    var alignBtnsContent = $("#img-align-content .img-align-cell");

    alignBtnsContent.each(function() {
        $(this).on("click", function() {
            $(this).toggleClass("active");
            $("#img-align-content .img-align-cell").not(this).removeClass("active");
        });
    });

    var alignBtnsGaleria = $(".img-align .img-align-cell");

    alignBtnsGaleria.each(function() {
        $(this).on("click", function() {
            $(this).toggleClass("active");
            $(".img-align .img-align-cell").not(this).removeClass("active");
        });
    });

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

function getCategorias() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var cats = JSON.parse(resp[1]);

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
    xhttp.open("GET", "functions/func-inserir-noticia.php?cmdEval=getListaCategorias");
    xhttp.send();
}

/* update noticia */
var $saveNoticiaBtn = $("#saveNoticia");
$saveNoticiaBtn.click(function() {
    var titlePT = $("#titulo-pt");
    var titleEN = $("#titulo-en");
    var categoria_id = $('#cats-id').val();
    var textPT = $("#text-pt");
    var textEN = $("#text-en");
    var img = $("#noticia-img-principal");
    var align = $(".img-align-cell.active input");
    var pdf = $("#upload-pdf");

    var dataNoticia = {
        titlePT: titlePT.val(),
        titleEN: titleEN.val(),
        categoria_id: categoria_id,
        textPT: textPT.next().find('.note-editable').html(),
        textEN: textEN.next().find('.note-editable').html(),
        img: img.val(),
        align: align.val(),
        pdf: pdf.val()
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

    if (dataNoticia.align == "") {
        $(".align.erro").text("Por favor, seleccionar o posicionamento da imagem.");
    } else {
        $(".align.erro").text("");
    }

    if (dataNoticia.titlePT == "") {
        $(".titulo-pt.erro").text("Por favor, inserir o título.");
    } else {
        $(".titulo-pt.erro").text("");
    }

    var file = $("#noticia-img-principal").prop("files")[0];
    var pdf = $("#upload-pdf").prop("files")[0];

    var noticia = new FormData();

    if (dataNoticia.titlePT != "" && dataNoticia.align != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
        noticia.append("cmdEval", "saveNoticia");
        noticia.append("titlePT", dataNoticia.titlePT);
        noticia.append("titleEN", dataNoticia.titleEN);
        noticia.append("categoria_id", dataNoticia.categoria_id);
        noticia.append("textPT", dataNoticia.textPT);
        noticia.append("textEN", dataNoticia.textEN);
        noticia.append("file", file);
        noticia.append("align", dataNoticia.align);
        noticia.append("pdf", pdf);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Rascunho guardado com sucesso!", "success");

                    setTimeout(() => {
                        window.location.href = "https://backoffice.v21.pt/modules/pages/noticias/noticias.php";
                    }, 1000);
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

        xhttp.open("POST", "functions/func-inserir-noticia.php", true);
        xhttp.send(noticia);
    }
});

/* update noticia */
var $publishNoticiaBtn = $("#publishNoticia");
$publishNoticiaBtn.click(function() {
    var titlePT = $("#titulo-pt");
    var titleEN = $("#titulo-en");
    var categoria_id = $('#cats-id').val();
    var textPT = $("#text-pt");
    var textEN = $("#text-en");
    var img = $("#noticia-img-principal");
    var align = $(".img-align-cell.active input");
    var pdf = $("#upload-pdf");

    var dataNoticia = {
        titlePT: titlePT.val(),
        titleEN: titleEN.val(),
        categoria_id: categoria_id,
        textPT: textPT.next().find('.note-editable').html(),
        textEN: textEN.next().find('.note-editable').html(),
        img: img.val(),
        align: align.val(),
        pdf: pdf.val()
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

    if (dataNoticia.align == "") {
        $(".align.erro").text("Por favor, seleccionar o posicionamento da imagem.");
    } else {
        $(".align.erro").text("");
    }

    if (dataNoticia.titlePT == "") {
        $(".titulo-pt.erro").text("Por favor, inserir o título.");
    } else {
        $(".titulo-pt.erro").text("");
    }

    var file = $("#noticia-img-principal").prop("files")[0];
    var pdf = $("#upload-pdf").prop("files")[0];

    var noticia = new FormData();

    if (dataNoticia.titlePT != "" && dataNoticia.align != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
        noticia.append("cmdEval", "publishNoticia");
        noticia.append("titlePT", dataNoticia.titlePT);
        noticia.append("titleEN", dataNoticia.titleEN);
        noticia.append("categoria_id", dataNoticia.categoria_id);
        noticia.append("textPT", dataNoticia.textPT);
        noticia.append("textEN", dataNoticia.textEN);
        noticia.append("file", file);
        noticia.append("align", dataNoticia.align);
        noticia.append("pdf", pdf);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Notícia publicada com sucesso!", "success");

                    setTimeout(() => {
                        window.location.href = "https://backoffice.v21.pt/modules/pages/noticias/noticias.php";
                    }, 1000);
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

        xhttp.open("POST", "functions/func-inserir-noticia.php", true);
        xhttp.send(noticia);
    }
});

var addGaleriaBtn = $('#addGaleriaNoticia');
var added = false;

addGaleriaBtn.click(function() {
    added = true;

    $('#add-galeria-section').length > 0 ? added = true : added = false;
    if (added) {
        $('#add-galeria-section').css('display', 'flex');

        $('.foto-1 .deleteFoto').click(function() {
            $(this).closest('.foto').css('display', 'none');
        })
    }

})

var photo = 1;
$('#addFoto').click(function() {
    photo++;

    if ($(".foto-1").length > 0) {
        $(".foto-1").clone().attr('class', 'foto foto-' + photo).css('display', 'block').appendTo(".fotos-container")
    }

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