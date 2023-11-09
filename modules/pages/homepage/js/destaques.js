/* eslint-disable */
window.addEventListener("load", function(e) {
    getDestaques();
    getFicheirosBiblioteca();

    var alignBtns = $(".img-align-cell");

    alignBtns.each(function() {
        $(this).on("click", function() {
            $(this).toggleClass("active");
            $(".img-align-cell").not(this).removeClass("active");
        });
    });

    $('#destaque-text-pt').summernote({
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            // ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']],
        ],
        callbacks: {
            onKeydown: function(e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 290) {
                    //delete keys, arrow keys, copy, cut, select all
                    if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                        e.preventDefault();
                }
            },
            onKeyup: function(e) {
                var t = e.currentTarget.innerText;
                $('.destaque-text-pt span').text(290 - t.trim().length);
            },
            onPaste: function(e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 290) {
                    maxPaste = 290 - t.length;
                }
                if (maxPaste > 0) {
                    document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.destaque-text-pt span').text(290 - t.length);
            }
        }
    });

    $('#destaque-text-en').summernote({
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            // ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']],
        ],
        callbacks: {
            onKeydown: function(e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 290) {
                    //delete keys, arrow keys, copy, cut, select all
                    if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                        e.preventDefault();
                }
            },
            onKeyup: function(e) {
                var t = e.currentTarget.innerText;
                $('.destaque-text-en span').text(290 - t.trim().length);
            },
            onPaste: function(e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 290) {
                    maxPaste = 290 - t.length;
                }
                if (maxPaste > 0) {
                    document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.destaque-text-en span').text(290 - t.length);
            }
        }
    });

    // Turn input element into a pond
    $('.my-pond').filepond();

    $('.my-pond').filepond({
        allowMultiple: true,
    });

    $.fn.filepond.setOptions({
        server: {
            process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                const formData = new FormData();
                formData.append(fieldName, file, file.name);

                const request = new XMLHttpRequest();
                request.open('POST', 'https://backoffice.v21.pt/modules/pages/homepage/upload-photo.php');

                request.onload = function() {
                    if (request.status >= 200 && request.status < 300 && JSON.parse(request.responseText).success) {
                        // the load method accepts either a string (id) or an object
                        load(JSON.parse(request.responseText).success);
                        alert(JSON.parse(request.responseText).success);
                        getFicheirosBiblioteca();
                    } else {
                        // Can call the error method if something is wrong, should exit after
                        error(JSON.parse(request.responseText).error);
                        alert(JSON.parse(request.responseText).error);
                    }
                };

                request.send(formData);

                // Should expose an abort method so the request can be cancelled
                return {
                    abort: () => {
                        // This function is entered if the user has tapped the cancel button
                        request.abort();

                        // Let FilePond know the request has been cancelled
                        abort();
                    },
                };

                // url: '/modules/pages/homepage/upload-photo.php',
                // method: 'POST',
                // withCredentials: false,
                // onload: (response) => response.key,
                // onerror: (response) => error(response.data),
            },
        }
    });
});

/* get galeria info */
function getFicheirosBiblioteca(last, idFile) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printFicheirosBiblioteca(JSON.parse(resp[1]), last, idFile);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação dos Ficheiros");
            }
        }
    };

    xhttp.open("GET", "functions/func-destaques.php?cmdEval=getFicheirosBiblioteca");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print galeria */
function printFicheirosBiblioteca(ficheiros, last, idFile) {
    ficheirosArea = document.querySelector("#files");
    document.querySelector("#files").innerHTML = "";
    arrayStatus = [];
    ficheirosArea.innerHTML = "";

    for (const i in ficheiros) {
        if (ficheiros.hasOwnProperty(i)) {
            const ficheiro = ficheiros[i];
            quadrado = document.createElement("div");
            quadrado.id = "ficheiro-" + ficheiro.id;
            // quadrado.classList.add("col-lg-2");
            quadrado.classList.add("valueLine");
            quadrado.classList.add("box");
            quadrado.style.display = "flex";
            quadrado.style.cursor = "pointer";
            quadrado.style.padding = "15px";

            var imagem;
            if (ficheiro.file_url == null || ficheiro.file_url == "") {
                imagem = "Não tem imagem.";
            } else {
                imagem = '<img style="width: 150%;" src="' + ficheiro.file_url + '" />';
            }

            html = `
                <div class="col-lg-12" style="overflow:hidden;display: flex; align-items: center; justify-content: center;">${imagem}</div>
            `;
            quadrado.innerHTML = html;
            quadrado.addEventListener("click", function() {
                selectFicheiroBiblioteca("ficheiro-" + ficheiro.id);
            });
            ficheirosArea.append(quadrado);
        }
    }

    if (last != null) {
        document.querySelector("#ficheiros .row:first-child").classList.add("active");
    }
    if (idFile != null) {
        document.querySelector("#ficheiros #ficheiro-" + idFile).classList.add("active");
    }
}

/* select ficheiro */
function selectFicheiroBiblioteca(id) {
    linhaFicheiro = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaFicheiro.classList.contains("active")) {
        linhaFicheiro.classList.remove("active");
    } else {
        $("#files .valueLine").removeClass("active");
        linhaFicheiro.classList.add("active");
    }
}

$('button#close').on('click', function() {
    if ($("#files .valueLine.active").length > 0) {
        var img_src = $("#files .valueLine.active img").attr('src');
        $('#imagem-selected img').attr('src', img_src);
    } else {
        // $('#imagem-selected').html('');
    }
})

$("#destaque-text-pt").on("keypress", function() {
    var limiteCaracteres = 290;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;

    //Update Count value
    $(".destaque-text-pt span").text(totalCaracteres);

    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
        return false;
    }
});

$("#destaque-text-en").on("keypress", function() {
    var limiteCaracteres = 290;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;

    //Update Count value
    $(".destaque-text-en span").text(totalCaracteres);

    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
        return false;
    }
});


/* get destaques info */
function getDestaques(last, idDestaque) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printDestaques(JSON.parse(resp[1]), last, idDestaque);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação dos Destaques");
            }
        }
    };

    xhttp.open("GET", "functions/func-destaques.php?cmdEval=getDestaques");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print destaques */
function printDestaques(destaques, last, idDestaque) {
    destaquesArea = document.querySelector("#destaques");
    document.querySelector("#destaques").innerHTML = "";
    arrayStatus = [];
    destaquesArea.innerHTML = "";
    for (const i in destaques) {
        if (destaques.hasOwnProperty(i)) {
            const destaque = destaques[i];
            linha = document.createElement("div");
            linha.id = "destaque-" + destaque.id;
            linha.classList.add("col-lg-12");
            linha.classList.add("valueLine");
            linha.style.display = "flex";
            linha.style.cursor = "pointer";

            var imagem;
            if (destaque.img_src == null || destaque.img_src == "") {
                imagem = "Não tem imagem.";
            } else {
                var splitSrc = destaque.img_src.split("uploads");
                imagem =
                    '<img style="width: 60%;" src="../../../uploads' +
                    splitSrc[1] +
                    '" />';
            }

            var align;
            switch (destaque.img_align) {
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

            html = `
                <div class="col-lg-2">${destaque.title}</div>
                <div class="col-lg-2">${destaque.text}</div>
                <div class="col-lg-2">${destaque.link}</div>
                <div class="col-lg-2">
                    ${imagem}
                </div>
                <div class="col-lg-2">${align}</div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function() {
                selectDestaque("destaque-" + destaque.id);
            });
            destaquesArea.append(linha);
        }
    }

    $("#destaques").sortable({
        items: "> .valueLine",
        start: function(event, ui) {
            // Create a temporary attribute on the element with the old index
            $("#destaques").attr("data-currentindex", ui.item.index());
        },
        update: function(event, ui) {
            var data = $(this).sortable("serialize");

            // Reset the current index
            $(this).removeAttr("data-currentindex");

            // Post to the server to handle the changes
            $.ajax({
                type: "GET",
                url: "functions/func-destaques.php?cmdEval=saveOrderDestaques",
                data: data,
                beforeSend: function() {
                    // Disable dragging
                    $("#destaques").sortable("disable");
                },
                success: function(html) {
                    // Re-enable dragging
                    $("#destaques").sortable("enable");
                    getDestaques(null, null);
                },
            });
        },
    });

    if (last != null) {
        document
            .querySelector("#destaques .row:first-child")
            .classList.add("active");
    }
    if (idDestaque != null) {
        document
            .querySelector("#destaques #destaque-" + idDestaque)
            .classList.add("active");
    }
}

/* select destaque */
function selectDestaque(id) {
    linhaDestaque = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaDestaque.classList.contains("active")) {
        linhaDestaque.classList.remove("active");
        var inputs = document
            .getElementById("destaqueInfo")
            .getElementsByTagName("input");

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text") inputs[index].value = "";
        }

        $('#destaque-text-pt').next().find('.note-editable').html('');
        $('#destaque-text-en').next().find('.note-editable').html('');

        $('.destaque-text-pt span').text('290');
        $('.destaque-text-en span').text('290');

        $('#destaqueInfo').css({ 'display': 'none' });
        $('.destaqueInfo').css({ 'display': 'none' });

        var alignBtns = $(".img-align-cell");

        alignBtns.each(function() {
            $(this).removeClass("active");
        });

        $destaquesArea = document.getElementById("destaqueInfo");
        $destaquesArea.setAttribute("data-id-destaque", "");
    } else {
        $("#destaques .valueLine").removeClass("active");
        linhaDestaque.classList.add("active");

        //load data into the inputs in the page
        getDestaqueById(id.replace("destaque-", ""));
    }
}

/* get destaque info by selected */
function getDestaqueById(idDestaque) {
    idDestaque = idDestaque.replace("destaque-", "");
    listaDestaques = document.querySelector("#destaques");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByDestaque(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação dos Destaques.");
            }
        }
    };
    xhttp.open(
        "GET",
        "functions/func-destaques.php?cmdEval=getAllDestaquesByIdDestaque&id_destaque=" +
        idDestaque
    );
    xhttp.send();
}

/* get destaque info */
function getAllDataByDestaque(destaque) {
    $destaquesArea = document.getElementById("destaqueInfo");
    $destaquesArea.setAttribute("data-id-destaque", "destaque-" + destaque[0].id);

    var $input_title_pt = $("#destaqueInfo #destaque-title-pt");
    var $input_title_en = $("#destaqueInfo #destaque-title-en");

    var $input_text_pt = $("#destaqueInfo #destaque-text-pt");
    var $input_text_en = $("#destaqueInfo #destaque-text-en");

    var $input_link = $("#destaqueInfo #destaque-link");

    $input_title_pt.val(destaque[0].title);
    $input_title_en.val(destaque[0].title_en);

    // $input_text_pt.html(destaque[0].text);
    // $input_text_en.html(destaque[0].text_en);

    $('#destaqueInfo').css({ 'display': 'flex' });
    $('.destaqueInfo').css({ 'display': 'flex' });

    $input_text_pt.next().find('.note-editable').html(destaque[0].text);
    $input_text_en.next().find('.note-editable').html(destaque[0].text_en);

    $('.destaque-text-pt span').text(290 - destaque[0].text.replace(/(<([^>]+)>)/ig, "").length);
    $('.destaque-text-en span').text(290 - destaque[0].text_en.replace(/(<([^>]+)>)/ig, "").length);

    $('#imagem-selected img').attr('src', destaque[0].img_src);

    $input_link.val(destaque[0].link);

    var alignBtns = $(".img-align-cell");

    alignBtns.each(function() {
        $(this).removeClass("active");
    });

    $("#destaqueInfo .img-align-cell." + destaque[0].img_align).addClass(
        "active"
    );

    $("#updateDestaque").attr("data-id-destaque", destaque[0].id);
}

/* update destaque */
var $updateDestaqueBtn = $("#updateDestaque");
$updateDestaqueBtn.click(function() {
    var id = $("#updateDestaque").attr("data-id-destaque");
    var titlePT = $("#destaque-title-pt");
    var titleEN = $("#destaque-title-en");
    var textPT = $("#destaque-text-pt");
    var textEN = $("#destaque-text-en");
    var link = $("#destaque-link");
    // var img = $("#destaque-img");
    var img = $('#imagem-selected img');
    var align = $(".img-align-cell.active input");

    $destaquesArea = document.getElementById('destaqueInfo');
    var destaque_id = $destaquesArea.getAttribute('data-id-destaque');

    if (destaque_id != null)
        destaque_id = destaque_id.replace("destaque-", "");
    else
        destaque_id = ''

    var dataDestaque = {
        id: id,
        titlePT: titlePT.val(),
        titleEN: titleEN.val(),
        textPT: textPT.next().find('.note-editable').html(),
        textEN: textEN.next().find('.note-editable').html(),
        link: link.val(),
        // img: img.val(),
        img: img.attr('src'),
        align: align.val(),
    };

    if (dataDestaque.align == undefined) {
        $(".align.erro").text("Por favor, seleccionar o alinhamento da imagem.");
    } else {
        $(".align.erro").text("");
    }

    if (dataDestaque.textEN.length > 290) {
        $(".text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
        $(".text-en.erro").text("");
    }

    if (dataDestaque.textPT.length == 0) {
        $(".text-pt.erro").text("Por favor, inserir um resumo do destaque.");
    } else {
        if (dataDestaque.textPT.length > 290) {
            $(".text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".text-pt.erro").text("");
        }
    }

    if (dataDestaque.titlePT == "") {
        $(".title-pt.erro").text("Por favor, inserir o título do destaque.");
    } else {
        $(".title-pt.erro").text("");
    }

    // var file = $("#destaque-img").prop("files")[0];

    var destaque = new FormData();

    if (
        dataDestaque.align != undefined &&
        dataDestaque.textPT != '' &&
        dataDestaque.titlePT != "" &&
        dataDestaque.textPT.length < 291 &&
        dataDestaque.textEN.length < 291
    ) {
        destaque.append("cmdEval", "updateDestaque");
        destaque.append("id", dataDestaque.id);
        destaque.append("titlePT", dataDestaque.titlePT);
        destaque.append("titleEN", dataDestaque.titleEN);
        destaque.append("textPT", dataDestaque.textPT);
        destaque.append("textEN", dataDestaque.textEN);
        destaque.append("link", dataDestaque.link);
        // destaque.append("file", file);
        destaque.append("img", dataDestaque.img);
        destaque.append("align", dataDestaque.align);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Destaque guardado com sucesso!", "success");

                    var inputs = document
                        .getElementById("destaqueInfo")
                        .getElementsByTagName("input");

                    for (index = 0; index < inputs.length; ++index) {
                        if (inputs[index].type == "text") inputs[index].value = "";
                    }

                    $('#destaque-text-pt').next().find('.note-editable').html('');
                    $('#destaque-text-en').next().find('.note-editable').html('');

                    $('.destaque-text-pt span').text('290');
                    $('.destaque-text-en span').text('290');

                    $('#destaqueInfo').css({ 'display': 'none' });
                    $('.destaqueInfo').css({ 'display': 'none' });

                    var alignBtns = $(".img-align-cell");

                    alignBtns.each(function() {
                        $(this).removeClass("active");
                    });

                    if ($destaquesArea) {
                        if (destaque_id == '')
                            getDestaques(null, null);
                        else
                            getDestaques(null, destaque_id);

                        $destaquesArea = document.getElementById('destaqueInfo');
                        $destaquesArea.setAttribute('data-id-destaque', '');
                    } else {
                        getDestaques("last", null);
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

        xhttp.open("POST", "functions/func-destaques.php", true);
        xhttp.send(destaque);
    }
});