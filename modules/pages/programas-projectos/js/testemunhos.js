/* eslint-disable */
window.addEventListener('load', function (e) {
    getCategorias();
    getTestemunhos();

    $('#texto-pt').summernote({
        lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
      });
  
      $('#texto-en').summernote({
        lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
      });

      document.getElementById("cats-id-search").addEventListener("change", function () {
          searchByCategoria();
      })
});

function searchByCategoria() {
    categoria = document.getElementById("cats-id-search").value;
    testemunhos = document.querySelectorAll("#testemunhos .valueLine");
    testemunhos.forEach(t => {
        if (categoria == "null") {
            t.style.display = "flex";
        } else {
            if (t.dataset.categoria != categoria) {
                t.style.display = "none";
            } else {
                t.style.display = "flex";
            }
        }
    });
}

function getCategorias() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
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
    xhttp.open("GET", "functions/func-testemunhos.php?cmdEval=getListaCategorias");
    xhttp.send();
}

/* get testemuhnos info */
function getTestemunhos(last, idTestemunho) {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printTestemunhos(JSON.parse(resp[1]), last, idTestemunho);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação dos Testemunhos.");
            }
        }
    };
    xhttp.open("GET", "functions/func-testemunhos.php?cmdEval=getTestemunhos");
    xhttp.send();
}

/* print testemunhos */
function printTestemunhos(testemunhos, last, idTestemunho) {
    testArea = document.querySelector("#testemunhos");
    document.querySelector("#testemunhos").innerHTML = "";
    arrayStatus = [];
    testArea.innerHTML = "";

    var categorias;
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                categorias = JSON.parse(resp[1]);

                for (const i in testemunhos) {
                    if (testemunhos.hasOwnProperty(i)) {
                        const testemunho = testemunhos[i];
                        linha = document.createElement("div");
                        linha.id = "testemunho-" + testemunho.id;
                        linha.classList.add("col-lg-10");
                        linha.classList.add("valueLine");
                        linha.style.display = 'flex';
                        linha.style.cursor = 'pointer';
                        linha.dataset.categoria = testemunho.categoria_id;

                        var video;
                        if (testemunho.video_src == null || testemunho.video_src == '') {
                            video = 'Não tem vídeo.'
                        } else {
                            video = '<div style="height: 100%;">' + testemunho.video_src + '</div>'
                        }

                        var map = Array.prototype.map;
                        var cat = [];
                        
                        var pid = testemunho.categoria_id.split(',');

                        map.call(categorias, function (c) {
                            if (c.id == testemunho.categoria_id) {
                                cat.push(c.title);
                            } else {
                                map.call(pid, function(p){
                                    if (c.id == p) {
                                        cat.push(c.title);
                                    }
                                })
                            }
                        });

                        html = `
                            <div class="col-lg-3">${testemunho.text}</div>
                            <div class="col-lg-3">${testemunho.autor}</div>
                            <div class="col-lg-3" style="height: 100px;">
                                ${video}
                            </div>
                            <div class="col-lg-3">${cat}</div>
                        `;
                        linha.innerHTML = html;
                        linha.addEventListener("click", function () {
                            selectTestemunho("testemunho-" + testemunho.id);
                        });
                        testArea.append(linha);
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
    xhttp.open("GET", "functions/func-testemunhos.php?cmdEval=getListaCategorias");
    xhttp.send();

    if (last != null) {
        document.querySelector("#testemunhos .row:first-child").classList.add("active");
    }
    if (idTestemunho != null) {
        document.querySelector("#testemunhos #testemunho-" + idTestemunho).classList.add("active");
    }
}

/* select testemunho */
function selectTestemunho(id) {
    linhaTestemunho = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaTestemunho.classList.contains("active")) {
        linhaTestemunho.classList.remove("active");
        var inputs = document.getElementById('testemunhoInfo').getElementsByTagName('input');

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text")
                inputs[index].value = '';
        }

        $('#texto-pt').next().find('.note-editable').html('');
        $('#texto-en').next().find('.note-editable').html('');

        $('#testemunhoInfo').css({'display': 'none'});
        $('.testemunhoInfo').css({'display': 'none'});

        document.getElementById('video').value = '';

        document.getElementById('cats-id').value = '';

        $testArea = document.getElementById('testemunhoInfo');
        $testArea.setAttribute('data-id-testemunho', '');

    } else {
        $("#testemunhos .valueLine").removeClass("active");
        linhaTestemunho.classList.add("active");

        //load data into the inputs in the page
        getTestemunhoById(id.replace("testemunho-", ""));
    }
}

/* get testemunho info by selected */
function getTestemunhoById(idTestemunho) {
    idTestemunho = idTestemunho.replace("testemunho-", "");
    listaTestemunhos = document.querySelector('#testemunhos');

    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByTestemunho(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação dos Testemunhos.");
            }
        }
    };
    xhttp.open("GET", "functions/func-testemunhos.php?cmdEval=getAllTestemunhosByIdTestemunho&id_testemunho=" + idTestemunho);
    xhttp.send();
}

/* get testemunho info */
function getAllDataByTestemunho(testemunho) {
    $testArea = document.getElementById('testemunhoInfo');
    $testArea.setAttribute('data-id-testemunho', 'testemunho-' + testemunho[0].id);

    var $input_text_pt = $('#testemunhoInfo #texto-pt');
    var $input_text_en = $('#testemunhoInfo #texto-en');

    $('#testemunhoInfo').css({'display': 'flex'});
    $('.testemunhoInfo').css({'display': 'flex'});

    var $input_autor = $('#testemunhoInfo #autor');

    var $input_video = $('#testemunhoInfo #video');

    var $input_select = $('#testemunhoInfo #cats-id');

    var cats = testemunho[0].categoria_id.split(',');

    // $input_text_pt.html('<p>' + testemunho[0].text + '</p>');
    // $input_text_en.html('<p>' + testemunho[0].text_en + '</p>');

    $input_text_pt.next().find('.note-editable').html(testemunho[0].text);
    $input_text_en.next().find('.note-editable').html(testemunho[0].text_en);
    
    $input_autor.val(testemunho[0].autor);

    $input_video.val(testemunho[0].video_src);

    $input_select.val(cats);

    $("#saveTestemunho").attr("data-id-testemunho", testemunho[0].id);
    $("#deleteTestemunho").attr("data-id-testemunho", testemunho[0].id);
}

/* save/update testemunho */
var $savePostBtn = $('#saveTestemunho');
$savePostBtn.click(function () {
    var id = $("#saveTestemunho").attr("data-id-testemunho");

    var textPT = $("#texto-pt");
    var textEN = $("#texto-en");
    var autor = $("#autor");
    var video = $("#video");
    var categoria_id = $('#cats-id').val();
  
    $testemunhosArea = document.getElementById("testemunhoInfo");
    var testemunho_id = $testemunhosArea.getAttribute("data-id-testemunho");
  
    if (testemunho_id != null) testemunho_id = testemunho_id.replace("testemunho-", "");
    else testemunho_id = "";
  
    var dataTestemunho = {
      id: id,
      textPT: textPT.next().find('.note-editable').html(),
      textEN: textEN.next().find('.note-editable').html(),
      autor: autor.val(),
      video: video.val(),
      categoria_id: categoria_id
    };
  
    if (dataTestemunho.autor == "") {
      $(".autor.erro").text("Por favor, inserir o autor.");
    } else {
      $(".autor.erro").text("");
    }
  
    var testemunho = new FormData();
  
    if (dataTestemunho.autor != "") {
        testemunho.append("cmdEval", "saveTestemunho");
        testemunho.append("id", dataTestemunho.id);
        testemunho.append("textPT", dataTestemunho.textPT);
        testemunho.append("textEN", dataTestemunho.textEN);
        testemunho.append("autor", dataTestemunho.autor);
        testemunho.append("video", dataTestemunho.video);
        testemunho.append("categoria_id", dataTestemunho.categoria_id);
        
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resp = this.responseText.split("||");
          if (resp[0] == "true") {
            $.notify("Testemunho guardado com sucesso!", "success");
  
            var inputs = document
              .getElementById("testemunhoInfo")
              .getElementsByTagName("input");
  
            for (index = 0; index < inputs.length; ++index) {
              if (inputs[index].type == "text") inputs[index].value = "";
            }

            $('#texto-pt').next().find('.note-editable').html('');
            $('#texto-en').next().find('.note-editable').html('');

            $('#testemunhoInfo').css({'display': 'none'});
            $('.testemunhoInfo').css({'display': 'none'});

            document.getElementById('video').value = '';

            document.getElementById('cats-id').value = '';
  
            if ($testemunhosArea) {
              if (testemunho_id == "") getTestemunhos(null, null);
              else getTestemunhos(null, testemunho_id);
  
              $testemunhosArea = document.getElementById("testemunhoInfo");
              $testemunhosArea.setAttribute("data-id-testemunho", "");
            } else {
                getTestemunhos("last", null);
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
  
      xhttp.open("POST", "functions/func-testemunhos.php", true);
      xhttp.send(testemunho);
    }
});

/**
 * delete post
 */
var $deletePostBtn = $('#deleteTestemunho');
$deletePostBtn.click(function (id) {
    id = document.getElementById('deleteTestemunho').getAttribute('data-id-testemunho');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getTestemunhos()
                $.notify("Testemunho apagado com sucesso.", "success");

                var inputs = document.getElementById('testemunhoInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text")
                        inputs[index].value = '';
                }

                $('#texto-pt').next().find('.note-editable').html('');
                $('#texto-en').next().find('.note-editable').html('');

                $('#testemunhoInfo').css({'display': 'none'});
                $('.testemunhoInfo').css({'display': 'none'});

                document.getElementById('video').value = '';

                document.getElementById('cats-id').value = '';
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o testemunho.");
            }
        }
    }
    xhttp.open("GET", "functions/func-testemunhos.php?cmdEval=deleteTestemunho&id=" + id);
    xhttp.send();
});