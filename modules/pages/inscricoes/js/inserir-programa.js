/* eslint-disable */
window.addEventListener("load", function (e) {
    getCategorias();
  
    var alignBtnsIntro = $(".img-align-cell");
  
    alignBtnsIntro.each(function () {
      $(this).on("click", function () {
        $(this).toggleClass("active");
        $(".img-align-cell").not(this).removeClass("active");
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
  
  function getCategorias() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
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
    xhttp.open("GET", "functions/func-inserir-programa.php?cmdEval=getListaCategorias");
    xhttp.send();
    }
  
  /* update programa */
  var $saveProgramaBtn = $("#savePrograma");
  $saveProgramaBtn.click(function () {
    var titlePT = $("#titulo-pt");
    var titleEN = $("#titulo-en");
    var categoria_id = $('#cats-id').val();
    var data_inicio = $("#data-inicio");
    var data_fim = $("#data-fim");
    var is_permanente = $("input[name='permanente']:checked");
    var textPT = $("#text-pt");
    var textEN = $("#text-en");
    var link_noticia = $("#link-noticia");
    var link_google_forms = $("#link-google-forms");
    var img = $("#programa-img");
    var align = $(".img-align-cell.active input");
  
    var dataPrograma = {
      titlePT: titlePT.val(),
      titleEN: titleEN.val(),
      categoria_id: categoria_id,
      data_inicio: data_inicio.val(),
      data_fim: data_fim.val(),
      is_permanente: is_permanente.val(),
      textPT: textPT.next().find('.note-editable').html(),
      textEN: textEN.next().find('.note-editable').html(),
      link_noticia: link_noticia.val(),
      link_google_forms: link_google_forms.val(),
      img: img.val(),
      align: align.val()
    };
  
    if (is_permanente.length == 0) {
      $(".topico-permanente.erro").text("Por favor, seleccionar opção.");
    } else {
      $(".topico-permanente.erro").text("");
    }
  
    if (dataPrograma.categoria_id == "null") {
      $(".cats-id.erro").text("Por favor, seleccionar a categoria.");
    } else {
      $(".cats-id.erro").text("");
    }
  
    if (dataPrograma.titlePT == "") {
      $(".titulo-pt.erro").text("Por favor, inserir o título.");
    } else {
      $(".titulo-pt.erro").text("");
    }
  
    var file = $("#programa-img").prop("files")[0];
  
    var programa = new FormData();
  
    if (dataPrograma.titlePT != "" && dataPrograma.categoria_id != "null" && is_permanente.length != 0) {
        programa.append("cmdEval", "savePrograma");
        programa.append("titlePT", dataPrograma.titlePT);
        programa.append("titleEN", dataPrograma.titleEN);
      programa.append("categoria_id", dataPrograma.categoria_id);
      programa.append("data_inicio", dataPrograma.data_inicio);
      programa.append("data_fim", dataPrograma.data_fim);
      programa.append("is_permanente", dataPrograma.is_permanente);
      programa.append("textPT", dataPrograma.textPT);
      programa.append("textEN", dataPrograma.textEN);
      programa.append("link_noticia", dataPrograma.link_noticia);
      programa.append("link_google_forms", dataPrograma.link_google_forms);
      programa.append("file", file);
      programa.append("align", dataPrograma.align);

      // if (document.getElementById("topico-sim-permanente").checked == true) {
      //   programa.append("is_permanent", document.getElementById("topico-sim-permanente").value);
      // }
      // else {
      //   programa.append("is_permanent", document.getElementById("topico-nao-permanente").value);
      // }
  
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resp = this.responseText.split("||");
          if (resp[0] == "true") {
            $.notify("Programa guardado com sucesso!", "success");
  
            setTimeout(() => {
                window.location.href = "https://backoffice.v21.pt/modules/pages/inscricoes/programas.php";
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
  
      xhttp.open("POST", "functions/func-inserir-programa.php", true);
      xhttp.send(programa);
    }
  });