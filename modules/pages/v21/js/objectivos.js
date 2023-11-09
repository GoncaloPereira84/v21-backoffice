/* eslint-disable */
window.addEventListener("load", function (e) {
    getObjectivosInfo();

    var alignBtns = $(".img-align-cell");

    alignBtns.each(function () {
        $(this).on("click", function () {
            $(this).toggleClass("active");
            $(".img-align-cell").not(this).removeClass("active");
        });
    });

    $('#text1-pt').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
        ],
        callbacks: {
            onKeydown: function (e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 200) {
                    //delete keys, arrow keys, copy, cut, select all
                    if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                        e.preventDefault();
                }
            },
            onKeyup: function (e) {
                var t = e.currentTarget.innerText;
                $('.texto1-pt span').text(200 - t.trim().length);
            },
            onPaste: function (e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 200) {
                    maxPaste = 200 - t.length;
                }
                if (maxPaste > 0) {
                    document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.texto1-pt span').text(200 - t.length);
            }
        }
    });

    $('#text1-en').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
        ],
        callbacks: {
            onKeydown: function (e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 200) {
                    //delete keys, arrow keys, copy, cut, select all
                    if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                        e.preventDefault();
                }
            },
            onKeyup: function (e) {
                var t = e.currentTarget.innerText;
                $('.texto1-en span').text(200 - t.trim().length);
            },
            onPaste: function (e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 200) {
                    maxPaste = 200 - t.length;
                }
                if (maxPaste > 0) {
                    document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.texto1-en span').text(200 - t.length);
            }
        }
    });

    $('#text2-pt').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
        ],
        callbacks: {
            onKeydown: function (e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 500) {
                    //delete keys, arrow keys, copy, cut, select all
                    if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                        e.preventDefault();
                }
            },
            onKeyup: function (e) {
                var t = e.currentTarget.innerText;
                $('.texto2-pt span').text(500 - t.trim().length);
            },
            onPaste: function (e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 500) {
                    maxPaste = 500 - t.length;
                }
                if (maxPaste > 0) {
                    document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.texto2-pt span').text(500 - t.length);
            }
        }
    });

    $('#text2-en').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
        ],
        callbacks: {
            onKeydown: function (e) {
                var t = e.currentTarget.innerText;
                if (t.trim().length >= 500) {
                    //delete keys, arrow keys, copy, cut, select all
                    if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
                        e.preventDefault();
                }
            },
            onKeyup: function (e) {
                var t = e.currentTarget.innerText;
                $('.texto2-en span').text(500 - t.trim().length);
            },
            onPaste: function (e) {
                var t = e.currentTarget.innerText;
                var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                e.preventDefault();
                var maxPaste = bufferText.length;
                if (t.length + bufferText.length > 500) {
                    maxPaste = 500 - t.length;
                }
                if (maxPaste > 0) {
                    document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                }
                $('.texto2-en span').text(500 - t.length);
            }
        }
    });
});



$("#text1-pt").on("keypress", function () {
    var limiteCaracteres = 200;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;

    //Update Count value
    $(".texto1-pt span").text(totalCaracteres);

    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
        return false;
    }
});

$("#text1-en").on("keypress", function () {
    var limiteCaracteres = 200;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;

    //Update Count value
    $(".texto1-en span").text(totalCaracteres);

    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
        return false;
    }
});

$("#text2-pt").on("keypress", function () {
    var limiteCaracteres = 500;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;

    //Update Count value
    $(".texto2-pt span").text(totalCaracteres);

    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
        return false;
    }
});

$("#text2-en").on("keypress", function () {
    var limiteCaracteres = 500;
    var caracteres = $(this).text();
    var totalCaracteres = caracteres.length;

    //Update Count value
    $(".texto2-en span").text(totalCaracteres);

    //Check and Limit Charaters
    if (totalCaracteres >= limiteCaracteres) {
        return false;
    }
});

/* get missao info */
function getObjectivosInfo() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var info = JSON.parse(resp[1])[0];
                $("#titulo-pt").val(info.title);
                $("#titulo-en").val(info.title_en);

                $("#titulo1-pt").val(info.title1);
                $("#titulo1-en").val(info.title1_en);

                $("#text1-pt").next().find('.note-editable').html(info.text1);
                $("#text1-en").next().find('.note-editable').html(info.text1_en);

                $("#titulo2-pt").val(info.title2);
                $("#titulo2-en").val(info.title2_en);

                $("#text2-pt").next().find('.note-editable').html(info.text2);
                $("#text2-en").next().find('.note-editable').html(info.text2_en);

                $('.texto1-pt span').text(200 - info.text1.replace(/(<([^>]+)>)/ig, "").length);
                $('.texto1-en span').text(200 - info.text1_en.replace(/(<([^>]+)>)/ig, "").length);

                $('.texto2-pt span').text(500 - info.text2.replace(/(<([^>]+)>)/ig, "").length);
                $('.texto2-en span').text(500 - info.text2_en.replace(/(<([^>]+)>)/ig, "").length);

                $("#objectivos-img-actual").attr("src", info.img_src);

                var align;
                switch (info.img_align) {
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

                $("#objectivos-img-actual-alinhamento").val(align);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação dos Objectivos");
            }
        }
    };

    xhttp.open("GET", "functions/func-objectivos.php?cmdEval=getObjectivosInfo");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update objectivos */
var $updateObjectivosBtn = $("#updateObjectivos");
$updateObjectivosBtn.click(function () {
    var titlePT = $("#titulo-pt");
    var titleEN = $("#titulo-en");

    var title1PT = $("#titulo1-pt");
    var title1EN = $("#titulo1-en");
    var text1PT = $("#text1-pt");
    var text1EN = $("#text1-en");

    var title2PT = $("#titulo2-pt");
    var title2EN = $("#titulo2-en");
    var text2PT = $("#text2-pt");
    var text2EN = $("#text2-en");

    var img = $("#objectivos-img");
    var align = $(".img-align-cell.active input");

    var dataObjectivos = {
        titlePT: titlePT.val(),
        titleEN: titleEN.val(),
        title1PT: title1PT.val(),
        title1EN: title1EN.val(),
        text1PT: text1PT.next().find('.note-editable').html(),
        text1EN: text1EN.next().find('.note-editable').html(),
        title2PT: title2PT.val(),
        title2EN: title2EN.val(),
        text2PT: text2PT.next().find('.note-editable').html(),
        text2EN: text2EN.next().find('.note-editable').html(),
        img: img.val(),
        align: align.val(),
    };

    // if (dataObjectivos.text2PT == "") {
    //   $(".text2-pt.erro").text("Por favor, inserir o texto 2.");
    // } else {
    //   $(".text2-pt.erro").text("");
    // }

    if (dataObjectivos.text2EN.replace(/(<([^>]+)>)/ig, '').length > 500) {
        $(".texto2-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
        $(".texto2-en.erro").text("");
    }

    if (dataObjectivos.text2PT.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".texto2-pt.erro").text("Por favor, inserir o texto 2.");
    } else {
        if (dataObjectivos.text2PT.replace(/(<([^>]+)>)/ig, '').length > 500) {
            $(".texto2-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".texto2-pt.erro").text("");
        }
    }

    if (dataObjectivos.title2PT == "") {
        $(".titulo2-pt.erro").text("Por favor, inserir o subtítulo 2.");
    } else {
        $(".titulo2-pt.erro").text("");
    }

    // if (dataObjectivos.text1PT == "") {
    //   $(".text1-pt.erro").text("Por favor, inserir o texto 1.");
    // } else {
    //   $(".text1-pt.erro").text("");
    // }

    if (dataObjectivos.text1EN.replace(/(<([^>]+)>)/ig, '').length > 200) {
        $(".texto1-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
        $(".texto1-en.erro").text("");
    }

    if (dataObjectivos.text1PT.replace(/(<([^>]+)>)/ig, '').length == 0) {
        $(".texto1-pt.erro").text("Por favor, inserir o texto 1.");
    } else {
        if (dataObjectivos.text1PT.replace(/(<([^>]+)>)/ig, '').length > 200) {
            $(".texto1-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
        } else {
            $(".texto1-pt.erro").text("");
        }
    }

    if (dataObjectivos.title1PT == "") {
        $(".titulo1-pt.erro").text("Por favor, inserir o subtítulo 1.");
    } else {
        $(".titulo1-pt.erro").text("");
    }

    if (dataObjectivos.titlePT == "") {
        $(".titulo-pt.erro").text("Por favor, inserir o título.");
    } else {
        $(".titulo-pt.erro").text("");
    }

    var file = $("#objectivos-img").prop("files")[0];

    var objectivos = new FormData();

    if (dataObjectivos.titlePT != "" &&
        dataObjectivos.title1PT != "" &&
        dataObjectivos.text1PT != "" &&
        dataObjectivos.title2PT != "" &&
        dataObjectivos.text2PT != "" &&
        dataObjectivos.text1PT.replace(/(<([^>]+)>)/ig, '').length < 201 &&
        dataObjectivos.text1EN.replace(/(<([^>]+)>)/ig, '').length < 201 &&
        dataObjectivos.text2PT.replace(/(<([^>]+)>)/ig, '').length < 501 &&
        dataObjectivos.text2EN.replace(/(<([^>]+)>)/ig, '').length < 501) {
        objectivos.append("cmdEval", "updateObjectivosInfo");
        objectivos.append("titlePT", dataObjectivos.titlePT);
        objectivos.append("titleEN", dataObjectivos.titleEN);
        objectivos.append("title1PT", dataObjectivos.title1PT);
        objectivos.append("title1EN", dataObjectivos.title1EN);
        objectivos.append("text1PT", dataObjectivos.text1PT);
        objectivos.append("text1EN", dataObjectivos.text1EN);
        objectivos.append("title2PT", dataObjectivos.title2PT);
        objectivos.append("title2EN", dataObjectivos.title2EN);
        objectivos.append("text2PT", dataObjectivos.text2PT);
        objectivos.append("text2EN", dataObjectivos.text2EN);
        objectivos.append("file", file);
        objectivos.append("align", dataObjectivos.align);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Objectivos guardados com sucesso!", "success");

                    setTimeout(() => {
                        window.location.href = "https://backoffice.v21.pt/modules/pages/v21/objectivos.php";
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

        xhttp.open("POST", "functions/func-objectivos.php", true);
        xhttp.send(objectivos);
    }
});
