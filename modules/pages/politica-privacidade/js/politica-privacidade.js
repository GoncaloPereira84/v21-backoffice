/* eslint-disable */
window.addEventListener('load', function (e) {
    getPoliticaPrivacidade();

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

/* get Especialidades Homepage info */
function getPoliticaPrivacidade(last, idPP) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printPPEntries(JSON.parse(resp[1]), last, idPP);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação da Política de Privacidade");
            }
        }
    };
    xhttp.open("GET", "functions/func-politica-privacidade.php?cmdEval=getPoliticaPrivacidade");
    xhttp.send();
}

/* print especialidades */
function printPPEntries(topics, last, idPP) {
    ppArea = document.querySelector("#topicos");
    document.querySelector("#topicos").innerHTML = "";
    arrayStatus = [];
    ppArea.innerHTML = "";
    for (const i in topics) {
        if (topics.hasOwnProperty(i)) {
            const topic = topics[i];
            linha = document.createElement("div");
            linha.id = "pp-" + topic.id;
            linha.classList.add("col-lg-12");
            linha.classList.add("valueLine");
            linha.style.display = 'flex';
            linha.style.cursor = 'pointer';

            html = `
                <div class="col-lg-4">${topic.title}</div>
            `;
            linha.innerHTML = html;
            linha.addEventListener("click", function () {
                selectTopic("pp-" + topic.id);
            });
            ppArea.append(linha);
        }
    }

    $('#topicos').sortable({
        items: '> .valueLine',
        start: function (event, ui) {
            // Create a temporary attribute on the element with the old index
            $('#topicos').attr('data-currentindex', ui.item.index());
        },
        update: function (event, ui) {
            var data = $(this).sortable('serialize');

            // Reset the current index
            $(this).removeAttr('data-currentindex');

            // Post to the server to handle the changes
            $.ajax({
                type: "GET",
                url: "functions/func-politica-privacidade.php?cmdEval=saveOrderTopics",
                data: data,
                beforeSend: function () {
                    // Disable dragging
                    $('#topicos').sortable('disable');
                },
                success: function (html) {
                    // Re-enable dragging
                    $('#topicos').sortable('enable');
                    getPoliticaPrivacidade(null, null);
                }
            });
        }
    });

    if (last != null) {
        document.querySelector("#topicos .row:first-child").classList.add("active");
    }
    if (idPP != null) {
        document.querySelector("#topicos #pp-" + idPP).classList.add("active");
    }
}

/* select especialidade */
function selectTopic(id) {
    linhaPP = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaPP.classList.contains("active")) {
        linhaPP.classList.remove("active");
        var inputs = document.getElementById('topicoInfo').getElementsByTagName('input');

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        $('#text-pt').next().find('.note-editable').html('');
        $('#text-en').next().find('.note-editable').html('');

        $('#topicoInfo').css({'display': 'none'});
        $('.topicoInfo').css({'display': 'none'});

        $espArea = document.getElementById('topicoInfo');
        $espArea.setAttribute('data-id-pp', '');

        document.getElementById('savePoliticaPrivacidade').setAttribute('data-id-pp', '');
        document.getElementById('deletePoliticaPrivacidade').setAttribute('data-id-pp', '');

    } else {
        $("#topicos .valueLine").removeClass("active");
        linhaPP.classList.add("active");

        //load data into the inputs in the page
        getTopicById(id.replace("pp-", ""));
    }
}

/* get slide info by selected */
function getTopicById(idPP) {
    idPP = idPP.replace("pp-", "");
    listaPP = document.querySelector('#topicos');

    document.getElementById('deletePoliticaPrivacidade').setAttribute('data-id-pp', idPP);

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByTopic(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação dos Tópicos.");
            }
        }
    };
    xhttp.open("GET", "functions/func-politica-privacidade.php?cmdEval=getAllInfoByIdTopic&id_pp=" + idPP);
    xhttp.send();
}

/* get slide info */
function getAllDataByTopic(topic) {
    $ppArea = document.getElementById('topicoInfo');
    $ppArea.setAttribute('data-id-pp', 'pp-' + topic[0].id);

    var $input_title = $('#topicoInfo #titulo-pt');
    var $input_title_en = $('#topicoInfo #titulo-en');
    var $input_text = $('#topicoInfo #text-pt');
    var $input_text_en = $('#topicoInfo #text-en');

    $('#topicoInfo').css({'display': 'flex'});
    $('.topicoInfo').css({'display': 'flex'});

    $input_title.val(topic[0].title);
    $input_title_en.val(topic[0].title_en);
    $input_text.next().find('.note-editable').html(topic[0].text);
    $input_text_en.next().find('.note-editable').html(topic[0].text_en);

    $("#savePoliticaPrivacidade").attr("data-id-pp", topic[0].id);
    $("#deletePoliticaPrivacidade").attr("data-id-pp", topic[0].id);
}

/* save/update especialidade */
var $savePoliticaPrivacidadeBtn = $('#savePoliticaPrivacidade');
$savePoliticaPrivacidadeBtn.click(function () {
    var id = $("#savePoliticaPrivacidade").attr("data-id-pp");
    var titlePT = $('#topicoInfo #titulo-pt');
    var titleEN = $('#topicoInfo #titulo-en');
    var textPT = $('#topicoInfo #text-pt');
    var textEN = $('#topicoInfo #text-en');

    $ppArea = document.getElementById('topicoInfo');
    var pp_id = $ppArea.getAttribute('data-id-pp');

    if (pp_id != null)
        pp_id = pp_id.replace("pp-", "");
    else
        pp_id = '';

    var dataPP = {
        id: id,
        titlePT: titlePT.val(),
        titleEN: titleEN.val(),
        textPT: textPT.next().find('.note-editable').html(),
        textEN: textEN.next().find('.note-editable').html()
    };

    if (dataPP.textPT == "") {
        $(".text-pt.erro").text("Por favor, inserir o texto.");
    } else {
        $(".text-pt.erro").text("");
    }

    if (dataPP.titlePT == "") {
        $(".titulo-pt.erro").text("Por favor, inserir o título.");
    } else {
        $(".titulo-pt.erro").text("");
    }

    var topico = new FormData;

    if (dataPP.titlePT != '' && dataPP.textPT != '') {
        topico.append('cmdEval', 'saveTopic');
        topico.append("id", dataPP.id);
        topico.append("titlePT", dataPP.titlePT);
        topico.append("titleEN", dataPP.titleEN);
        topico.append("textPT", dataPP.textPT);
        topico.append("textEN", dataPP.textEN);

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Tópico guardado com sucesso!", "success");

                    linhaPP = document.getElementById('pp-' + pp_id);

                    var inputs = document.getElementById('topicoInfo').getElementsByTagName('input');

                    for (index = 0; index < inputs.length; ++index) {
                        if (inputs[index].type == "text")
                            inputs[index].value = '';
                    }

                    $('#text-pt').next().find('.note-editable').html('');
                    $('#text-en').next().find('.note-editable').html('');

                    $('#topicoInfo').css({'display': 'none'});
                    $('.topicoInfo').css({'display': 'none'});

                    $espArea = document.getElementById('topicoInfo');
                    $espArea.setAttribute('data-id-pp', '');

                    document.getElementById('savePoliticaPrivacidade').setAttribute('data-id-pp', '');
                    document.getElementById('deletePoliticaPrivacidade').setAttribute('data-id-pp', '');

                    if ($ppArea) {
                        if (pp_id == '')
                            getPoliticaPrivacidade(null, null);
                        else
                            getPoliticaPrivacidade(null, pp_id);
                        $ppArea = document.getElementById('topicoInfo');
                        $ppArea.setAttribute('data-id-pp', '');
                    } else {
                        getPoliticaPrivacidade("last", null);
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
        }

        xhttp.open("POST", "functions/func-politica-privacidade.php", true);
        xhttp.send(topico);
    }
});

/**
* delete PP
*/
var $deletePoliticaPrivacidadeBtn = $('#deletePoliticaPrivacidade');
$deletePoliticaPrivacidadeBtn.click(function (id) {
    id = document.getElementById('deletePoliticaPrivacidade').getAttribute('data-id-pp');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getPoliticaPrivacidade()
                $.notify("Tópico apagado com sucesso.", "success");

                var inputs = document.getElementById('topicoInfo').getElementsByTagName('input');
                for (index = 0; index < inputs.length; ++index) {
                    inputs[index].value = '';
                }
                $('#text-pt').next().find('.note-editable').html('');
                $('#text-en').next().find('.note-editable').html('');

                $('#topicoInfo').css({'display': 'none'});
                $('.topicoInfo').css({'display': 'none'});
                
                document.getElementById('deletePoliticaPrivacidade').setAttribute('data-id-pp', '');
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o tópico.");
            }
        }
    }
    xhttp.open("GET", "functions/func-politica-privacidade.php?cmdEval=deletePoliticaPrivacidade&id=" + id);
    xhttp.send();
});