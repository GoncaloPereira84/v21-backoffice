/* eslint-disable */
window.addEventListener("load", function (e) {
    getCategorias();
    getProgramas();
  
    var alignBtnsIntro = $(".img-align-cell");
  
    alignBtnsIntro.each(function () {
      $(this).on("click", function () {
        $(this).toggleClass("active");
        $(".img-align-cell").not(this).removeClass("active");
      });
    });

    document.getElementById("cats-id-search").addEventListener("change", function () {
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

function searchByCategoria() {
    categoria = document.getElementById("cats-id-search").value;
    fotos = document.querySelectorAll("#programas .valueLine");
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
    xhttp.open("GET", "functions/func-programas.php?cmdEval=getListaCategorias");
    xhttp.send();
    }
  
  /* get programas info */
  function getProgramas(last, idPrograma) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          printProgramas(JSON.parse(resp[1]), last, idPrograma);
        } else if (resp[0] == "false") {
          $.notify(resp[1]);
        } else if (resp[0] == "warn") {
          $.notify(resp[1], "warn");
        } else if (resp[0] == "session_expired") {
          window.location = "login.php";
        } else {
          $.notify("Erro ao aceder à informação dos Programas");
        }
      }
    };
  
    xhttp.open("GET", "functions/func-programas.php?cmdEval=getProgramas");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
  }
  
  /* print programas */
  function printProgramas(programas, last, idPrograma) {
    programasArea = document.querySelector("#programas");
    document.querySelector("#programas").innerHTML = "";
    arrayStatus = [];
    programasArea.innerHTML = "";

    var categorias;
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                categorias = JSON.parse(resp[1]);

                for (const i in programas) {
                    if (programas.hasOwnProperty(i)) {
                      const programa = programas[i];
                      linha = document.createElement("div");
                      linha.id = "programa-" + programa.id;
                      linha.classList.add("col-lg-10");
                      linha.classList.add("valueLine");
                      linha.style.display = "flex";
                      linha.style.cursor = "pointer";
                      linha.dataset.categoria = programa.categoria_id;
                
                      var imagem;
                      if (programa.img_src == null || programa.img_src == "") {
                        imagem = "Não tem imagem.";
                      } else {
                        var splitSrc = programa.img_src.split("uploads");
                        imagem =
                          '<img style="width: 60%;" src="../../../uploads' +
                          splitSrc[1] +
                          '" />';
                      }
                
                      var permanente;
                      switch (programa.is_permanent) {
                        case "0":
                            permanente = "Não";
                          break;
                        case "1":
                            permanente = "Sim";
                          break;
                        default:
                            permanente = "Não";
                      }

                      var map = Array.prototype.map;
                        var categoria = [];
                        
                        var pid = programa.categoria_id.split(',');

                        map.call(categorias, function (c) {
                            if (c.id == programa.categoria_id) {
                                categoria.push(c.title);
                            } else {
                                map.call(pid, function(p){
                                    if (c.id == p) {
                                        categoria.push(c.title);
                                    }
                                })
                            }
                        });
                
                      html = `
                              <div class="col-lg-3">${programa.title}</div>
                              <div class="col-lg-3">${categoria}</div>
                              <div class="col-lg-3">${permanente}</div>
                              <div class="col-lg-3">${imagem}</div>
                          `;
                      linha.innerHTML = html;
                      linha.addEventListener("click", function () {
                        selectPrograma("programa-" + programa.id);
                      });
                      programasArea.append(linha);
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
    xhttp.open("GET", "functions/func-programas.php?cmdEval=getListaCategorias");
    xhttp.send();
  
    if (last != null) {
      document.querySelector("#programas .row:first-child").classList.add("active");
    }
    if (idPrograma != null) {
      document.querySelector("#programas #programa-" + idPrograma).classList.add("active");
    }
  }
  
  /* select programa */
  function selectPrograma(id) {
    linhaPrograma = document.getElementById(id);
  
    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaPrograma.classList.contains("active")) {
        linhaPrograma.classList.remove("active");
      var inputs = document
        .getElementById("programaInfo")
        .getElementsByTagName("input");
  
      for (index = 0; index < inputs.length; ++index) {
        if (inputs[index].type == "text") inputs[index].value = "";
        if (inputs[index].type == "date") inputs[index].value = "";
      }

      $('#text-pt').next().find('.note-editable').html('');
      $('#text-en').next().find('.note-editable').html('');

      $('#programaInfo').css({'display': 'none'});
      $('.programaInfo').css({'display': 'none'});
  
      var alignBtns = $(".img-align-cell");
  
      alignBtns.each(function () {
        $(this).removeClass("active");
      });

      document.getElementById('cats-id').value = '';
  
      $noticiasArea = document.getElementById("programaInfo");
      $noticiasArea.setAttribute("data-id-programa", "");
    } else {
      $("#programas .valueLine").removeClass("active");
      linhaPrograma.classList.add("active");
  
      //load data into the inputs in the page
      getProgramaById(id.replace("programa-", ""));
    }
  }
  
  /* get programa info by selected */
  function getProgramaById(idPrograma) {
    idPrograma = idPrograma.replace("programa-", "");
    listaProgramas = document.querySelector("#programas");
  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          getAllDataByPrograma(JSON.parse(resp[1]));
        } else if (resp[0] == "false") {
          $.notify(resp[1]);
        } else if (resp[0] == "warn") {
          $.notify(resp[1], "warn");
        } else if (resp[0] == "session_expired") {
          window.location = "login.php";
        } else {
          $.notify("Erro para aceder à informação dos Programas.");
        }
      }
    };
    xhttp.open(
      "GET",
      "functions/func-programas.php?cmdEval=getAllProgramasByIdPrograma&id_programa=" +
      idPrograma
    );
    xhttp.send();
  }
  
  /* get programa info */
  function getAllDataByPrograma(programa) {
    $programasArea = document.getElementById("programaInfo");
    $programasArea.setAttribute("data-id-programa", "programa-" + programa[0].id);

    $('#titulo-pt').val(programa[0].title);
    $('#titulo-en').val(programa[0].title_en);

    $('#text-pt').next().find('.note-editable').html(programa[0].text);
    $('#text-en').next().find('.note-editable').html(programa[0].text_en);

    $('#programaInfo').css({'display': 'flex'});
    $('.programaInfo').css({'display': 'flex'});

    $('#data-inicio').val(programa[0].data_inicio);
    $('#data-fim').val(programa[0].data_fim);

    $('#link-noticia').val(programa[0].link_noticia);
    $('#link-google-forms').val(programa[0].link_form);
  
    var alignBtns = $(".img-align-cell");
  
    alignBtns.each(function () {
      $(this).removeClass("active");
    });

    if(programa[0].img_align == '') {
        $(".img-align-cell.position-center-center").addClass(
        "active"
        );
    } else {
        $(".img-align-cell." + programa[0].img_align).addClass(
        "active"
        );
    }

    var cats = programa[0].categoria_id.split(',');
    var $input_select = $('#programaInfo #cats-id');
    $input_select.val(cats);
  
    $("#savePrograma").attr("data-id-programa", programa[0].id);
    $("#deletePrograma").attr("data-id-programa", programa[0].id);
  }
  
  /* update programa */
  var $saveProgramaBtn = $("#savePrograma");
  $saveProgramaBtn.click(function () {
    var id = $("#savePrograma").attr("data-id-programa");
    var titlePT = $("#titulo-pt");
    var titleEN = $("#titulo-en");
    var categoria_id = $('#cats-id').val();
    var data_inicio = $("#data-inicio");
    var data_fim = $("#data-fim");
    var textPT = $("#text-pt");
    var textEN = $("#text-en");
    var link_noticia = $("#link-noticia");
    var link_google_forms = $("#link-google-forms");
    var img = $("#programa-img");
    var align = $(".img-align-cell.active input");
  
    $programasArea = document.getElementById("programaInfo");
    var programa_id = $programasArea.getAttribute("data-id-programa");
  
    if (programa_id != null) programa_id = programa_id.replace("programa-", "");
    else programa_id = "";
  
    var dataPrograma = {
      id: id,
      titlePT: titlePT.val(),
      titleEN: titleEN.val(),
      categoria_id: categoria_id,
      data_inicio: data_inicio.val(),
      data_fim: data_fim.val(),
      textPT: textPT.next().find('.note-editable').html(),
      textEN: textEN.next().find('.note-editable').html(),
      link_noticia: link_noticia.val(),
      link_google_forms: link_google_forms.val(),
      img: img.val(),
      align: align.val()
    };
  
    // if (dataPrograma.textPT == "") {
    //   $(".text-pt.erro").text("Por favor, inserir o texto.");
    // } else {
    //   $(".text-pt.erro").text("");
    // }
  
    if (dataPrograma.categoria_id == "null") {
      $(".cat-id.erro").text("Por favor, seleccionar a categoria.");
    } else {
      $(".cat-id.erro").text("");
    }
  
    if (dataPrograma.titlePT == "") {
      $(".titulo-pt.erro").text("Por favor, inserir o título.");
    } else {
      $(".titulo-pt.erro").text("");
    }
  
    var file = $("#programa-img").prop("files")[0];
  
    var programa = new FormData();  
    if (dataPrograma.titlePT != "" && dataPrograma.categoria_id != "null") {
        programa.append("cmdEval", "savePrograma");
        programa.append("id", dataPrograma.id);
        programa.append("titlePT", dataPrograma.titlePT);
        programa.append("titleEN", dataPrograma.titleEN);
      programa.append("categoria_id", dataPrograma.categoria_id);
      programa.append("data_inicio", dataPrograma.data_inicio);
      programa.append("data_fim", dataPrograma.data_fim);
      programa.append("textPT", dataPrograma.textPT);
      programa.append("textEN", dataPrograma.textEN);
      programa.append("link_noticia", dataPrograma.link_noticia);
      programa.append("link_google_forms", dataPrograma.link_google_forms);
      programa.append("file", file);
      programa.append("align", dataPrograma.align);
  
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resp = this.responseText.split("||");
          if (resp[0] == "true") {
            $.notify("Programa guardado com sucesso!", "success");
  
            var inputs = document
              .getElementById("programaInfo")
              .getElementsByTagName("input");
  
            for (index = 0; index < inputs.length; ++index) {
              if (inputs[index].type == "text") inputs[index].value = "";
              if (inputs[index].type == "date") inputs[index].value = "";
            }

            $('#programaInfo').css({'display': 'none'});
            $('.programaInfo').css({'display': 'none'});
  
            var alignBtns = $(".img-align-cell");
  
            alignBtns.each(function () {
              $(this).removeClass("active");
            });

            $('#text-pt').next().find('.note-editable').html('');
            $('#text-en').next().find('.note-editable').html('');

            document.getElementById('cats-id').value = '';
  
            if ($programasArea) {
              if (programa_id == "") getProgramas(null, null);
              else getProgramas(null, programa_id);
  
              $programasArea = document.getElementById("programaInfo");
              $programasArea.setAttribute("data-id-programa", "");
            } else {
              getProgramas("last", null);
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
  
      xhttp.open("POST", "functions/func-programas.php", true);
      xhttp.send(programa);
    }
  });
  
  /**
 * delete programa
 */
var $deleteProgramaBtn = $('#deletePrograma');
$deleteProgramaBtn.click(function (id) {
    id = document.getElementById('deletePrograma').getAttribute('data-id-programa');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getProgramas()
                $.notify("Programa apagado com sucesso.", "success");

                var inputs = document.getElementById('programaInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text") inputs[index].value = '';
                    if (inputs[index].type == "date") inputs[index].value = '';
                }

                $('#programaInfo').css({'display': 'none'});
                $('.programaInfo').css({'display': 'none'});

                var alignBtns = $(".img-align-cell");
  
                alignBtns.each(function () {
                  $(this).removeClass("active");
                });

                $('#text-pt').next().find('.note-editable').html('');
                $('#text-en').next().find('.note-editable').html('');

                document.getElementById('cats-id').value = '';
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar o programa.");
            }
        }
    }
    xhttp.open("GET", "functions/func-programas.php?cmdEval=deletePrograma&id=" + id);
    xhttp.send();
});