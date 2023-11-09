/* eslint-disable */
window.addEventListener('load', function (e) {
    getTestemunhosList();

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
});

function getTestemunhosList() {
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
    xhttp.open("GET", "functions/func-adicionar-testemunho.php?cmdEval=getListaCategorias");
    xhttp.send();
}

/* save/update testemunho */
var $savePostBtn = $('#saveTestemunho');
$savePostBtn.click(function () {
    var textPT = $("#texto-pt");
    var textEN = $("#texto-en");
    var autor = $("#autor");
    var video = $("#video");
    var categoria_id = $('#cats-id').val();
  
    var dataTestemunho = {
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
            setTimeout(() => {
                window.location.href = "https://backoffice.v21.pt/modules/pages/programas-projectos/testemunhos.php";
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
  
      xhttp.open("POST", "functions/func-adicionar-testemunho.php", true);
      xhttp.send(testemunho);
    }
});