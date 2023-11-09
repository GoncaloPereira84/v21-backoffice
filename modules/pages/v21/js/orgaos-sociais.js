/* eslint-disable */
window.addEventListener("load", function (e) {
  getTitle();
    getOrgaosSociais();

    $('#orgao-single-text-pt').summernote({
      lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    });
  
    $('#orgao-single-text-en').summernote({
      lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    });
  });
  
  /* get intro info */
function getTitle() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        var info = JSON.parse(resp[1])[0];
        $("#os-pt").val(info.title);
        $("#os-en").val(info.title_en);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação dos Órgãos Sociais 1");
      }
    }
  };

  xhttp.open("GET", "functions/func-orgaos-sociais.php?cmdEval=getTitle");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update intro */
var $updateCIIntroBtn = $("#updateTitle");
$updateCIIntroBtn.click(function () {
  var titlePT = $("#os-pt");
  var titleEN = $("#os-en");

  var dataIntro = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val()
  };

  if (dataIntro.titlePT == "") {
    $(".os-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".os-pt.erro").text("");
  }

  var intro = new FormData();

  if (dataIntro.titlePT != '') {
    intro.append("cmdEval", "updateTitle");
    intro.append("titlePT", dataIntro.titlePT);
    intro.append("titleEN", dataIntro.titleEN);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Informação guardada com sucesso!", "success");
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

    xhttp.open("POST", "functions/func-orgaos-sociais.php", true);
    xhttp.send(intro);
  }
});

/* get orgaos sociais info */
function getOrgaosSociais(last, idOrgao) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          printOrgaosSociais(JSON.parse(resp[1]), last, idOrgao);
        } else if (resp[0] == "false") {
          $.notify(resp[1]);
        } else if (resp[0] == "warn") {
          $.notify(resp[1], "warn");
        } else if (resp[0] == "session_expired") {
          window.location = "login.php";
        } else {
          $.notify("Erro ao aceder à informação dos Órgãos Sociais");
        }
      }
    };
  
    xhttp.open("GET", "functions/func-orgaos-sociais.php?cmdEval=getOrgaosSociais");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
  }
  
  /* print orgaos sociais */
  function printOrgaosSociais(orgaos, last, idOrgao) {
    orgaosArea = document.querySelector("#topicos");
    document.querySelector("#topicos").innerHTML = "";
    arrayStatus = [];
    orgaosArea.innerHTML = "";
    for (const i in orgaos) {
      if (orgaos.hasOwnProperty(i)) {
        const orgao = orgaos[i];
        linha = document.createElement("div");
        linha.id = "orgao-" + orgao.id;
        linha.classList.add("col-lg-12");
        linha.classList.add("valueLine");
        linha.style.display = "flex";
        linha.style.cursor = "pointer";
  
        html = `
            <div class="col-lg-4">${orgao.title}</div>
            <div class="col-lg-6">${orgao.text}</div>
        `;
        linha.innerHTML = html;
        linha.addEventListener("click", function () {
          selectOrgao("orgao-" + orgao.id);
        });
        orgaosArea.append(linha);
      }
    }
  
    if (last != null) {
      document
        .querySelector("#topicos .row:first-child")
        .classList.add("active");
    }
    if (idOrgao != null) {
      document
        .querySelector("#topicos #orgao-" + idOrgao)
        .classList.add("active");
    }
  }
  
  /* select órgao */
  function selectOrgao(id) {
    linhaOrgao = document.getElementById(id);
  
    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaOrgao.classList.contains("active")) {
      linhaOrgao.classList.remove("active");
      var inputs = document
        .getElementById("topicoInfo")
        .getElementsByTagName("input");
  
      for (index = 0; index < inputs.length; ++index) {
        if (inputs[index].type == "text") inputs[index].value = "";
      }

      $('#orgao-single-text-pt').next().find('.note-editable').html('');
      $('#orgao-single-text-en').next().find('.note-editable').html('');

      $('#topicoInfo').css({'display': 'none'});
      $('.topicoInfo').css({'display': 'none'});
  
      $topicosArea = document.getElementById("topicoInfo");
      $topicosArea.setAttribute("data-id-orgao", "");
    } else {
      $("#topicos .valueLine").removeClass("active");
      linhaOrgao.classList.add("active");
  
      //load data into the inputs in the page
      getOrgaoById(id.replace("orgao-", ""));
    }
  }
  
  /* get órgao info by selected */
  function getOrgaoById(idOrgao) {
    idOrgao = idOrgao.replace("orgao-", "");
    listaTopicos = document.querySelector("#topicos");
  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
            getAllDataByOrgao(JSON.parse(resp[1]));
        } else if (resp[0] == "false") {
          $.notify(resp[1]);
        } else if (resp[0] == "warn") {
          $.notify(resp[1], "warn");
        } else if (resp[0] == "session_expired") {
          window.location = "login.php";
        } else {
          $.notify("Erro para aceder à informação dos Órgãos Sociais.");
        }
      }
    };
    xhttp.open(
      "GET",
      "functions/func-orgaos-sociais.php?cmdEval=getAllOrgaosSociaisByIdOrgao&id_orgao=" +
      idOrgao
    );
    xhttp.send();
  }
  
  /* get orgao info */
  function getAllDataByOrgao(orgao) {
    $topicosArea = document.getElementById("topicoInfo");
    $topicosArea.setAttribute("data-id-orgao", "orgao-" + orgao[0].id);
  
    var $input_title_pt = $("#topicoInfo #orgao-single-titulo-pt");
    var $input_title_en = $("#topicoInfo #orgao-single-titulo-en");
  
    var $input_text_pt = $("#topicoInfo #orgao-single-text-pt");
    var $input_text_en = $("#topicoInfo #orgao-single-text-en");
  
    $input_title_pt.val(orgao[0].title);
    $input_title_en.val(orgao[0].title_en);

    $('#topicoInfo').css({'display': 'flex'});
    $('.topicoInfo').css({'display': 'flex'});
  
    $input_text_pt.next().find('.note-editable').html(orgao[0].text);
    $input_text_en.next().find('.note-editable').html(orgao[0].text_en);
  
    $("#updateOrgaosSociais").attr("data-id-orgao", orgao[0].id);
  }
  
  /* update orgaos sociais */
  var $updateOrgaosSociaisBtn = $("#updateOrgaosSociais");
  $updateOrgaosSociaisBtn.click(function () {
    var id = $("#updateOrgaosSociais").attr("data-id-orgao");
    var titlePT = $("#orgao-single-titulo-pt");
    var titleEN = $("#orgao-single-titulo-en");
    var textPT = $("#orgao-single-text-pt");
    var textEN = $("#orgao-single-text-en");

    $orgaosArea = document.getElementById('topicoInfo');
    var orgao_id = $orgaosArea.getAttribute('data-id-orgao');

    if (orgao_id != null)
      orgao_id = orgao_id.replace("orgao-", "");
    else
      orgao_id = ''
  
    var dataOrgao = {
      id: id,
      titlePT: titlePT.val(),
      titleEN: titleEN.val(),
      textPT: textPT.next().find('.note-editable').html(),
      textEN: textEN.next().find('.note-editable').html()
    };
  
    if (dataOrgao.textPT.length == 0) {
      $(".orgao-single-text-pt.erro").text("Por favor, inserir o texto.");
    } else {
      $(".orgao-single-text-pt.erro").text("");
    }
  
    if (dataOrgao.titlePT == "") {
      $(".orgao-single-titulo-pt.erro").text("Por favor, inserir o título.");
    } else {
      $(".orgao-single-titulo-pt.erro").text("");
    }
  
    var orgao = new FormData();
  
    if (dataOrgao.textPT != '' && dataOrgao.titlePT != ""
    ) {
        orgao.append("cmdEval", "updateOrgaosSociais");
        orgao.append("id", dataOrgao.id);
        orgao.append("titlePT", dataOrgao.titlePT);
        orgao.append("titleEN", dataOrgao.titleEN);
        orgao.append("textPT", dataOrgao.textPT);
        orgao.append("textEN", dataOrgao.textEN);
  
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resp = this.responseText.split("||");
          if (resp[0] == "true") {
            $.notify("Órgão Social guardado com sucesso!", "success");

            var inputs = document
              .getElementById("topicoInfo")
              .getElementsByTagName("input");
        
            for (index = 0; index < inputs.length; ++index) {
              if (inputs[index].type == "text") inputs[index].value = "";
            }

            $('#orgao-single-text-pt').next().find('.note-editable').html('');
            $('#orgao-single-text-en').next().find('.note-editable').html('');

            $('#topicoInfo').css({'display': 'none'});
            $('.topicoInfo').css({'display': 'none'});

            if ($orgaosArea) {
              if (orgao_id == '')
                getOrgaosSociais(null, null);
              else
                getOrgaosSociais(null, orgao_id);
  
              $orgaosArea = document.getElementById('topicoInfo');
              $orgaosArea.setAttribute('data-id-orgao', '');
            } else {
              getOrgaosSociais("last", null);
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
  
      xhttp.open("POST", "functions/func-orgaos-sociais.php", true);
      xhttp.send(orgao);
    }
  });