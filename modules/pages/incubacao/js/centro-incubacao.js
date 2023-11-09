/* eslint-disable */
window.addEventListener("load", function (e) {
  getIntro();
  getTopicos();

  $('#ci-text-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 400) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.ci-text-pt span').text(400 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 400) {
          maxPaste = 400 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.ci-text-pt span').text(400 - t.length);
      }
    }
  });

  $('#ci-text-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 400) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.ci-text-en span').text(400 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 400) {
          maxPaste = 400 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.ci-text-en span').text(400 - t.length);
      }
    }
  });

  $('#ci-topico-text-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 700) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.ci-topico-text-pt span').text(700 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 700) {
          maxPaste = 700 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.ci-topico-text-pt span').text(700 - t.length);
      }
    }
  });

  $('#ci-topico-text-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 700) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.ci-topico-text-en span').text(700 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 700) {
          maxPaste = 700 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.ci-topico-text-en span').text(700 - t.length);
      }
    }
  });
});

$("#ci-text-pt").on("keypress", function () {
  var limiteCaracteres = 400;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".ci-text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#ci-text-en").on("keypress", function () {
  var limiteCaracteres = 400;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".ci-text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#ci-topico-text-pt").on("keypress", function () {
  var limiteCaracteres = 700;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".ci-topico-text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#ci-topico-text-en").on("keypress", function () {
  var limiteCaracteres = 700;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".ci-topico-text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

/* get intro info */
function getIntro() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        var info = JSON.parse(resp[1])[0];
        $("#ci-pt").val(info.title);
        $("#ci-en").val(info.title_en);

        $("#ci-text-pt").next().find('.note-editable').html(info.text);
        $("#ci-text-en").next().find('.note-editable').html(info.text_en);

        $('.ci-text-pt span').text(400 - info.text.replace(/(<([^>]+)>)/ig, "").length);
        $('.ci-text-en span').text(400 - info.text_en.replace(/(<([^>]+)>)/ig, "").length);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação do Centro de Incubação");
      }
    }
  };

  xhttp.open("GET", "functions/func-centro-incubacao.php?cmdEval=getIntro");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update intro */
var $updateCIIntroBtn = $("#updateCIIntro");
$updateCIIntroBtn.click(function () {
  var titlePT = $("#ci-pt");
  var titleEN = $("#ci-en");

  var textPT = $("#ci-text-pt");
  var textEN = $("#ci-text-en");

  var dataIntro = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
  };

  if (dataIntro.textEN.replace(/(<([^>]+)>)/ig, '').length > 400) {
    $(".ci-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".ci-text-en.erro").text("");
  }

  if (dataIntro.textPT == "") {
    $(".ci-text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataIntro.textPT.replace(/(<([^>]+)>)/ig, '').length > 400) {
      $(".ci-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".ci-text-pt.erro").text("");
    }
  }

  if (dataIntro.titlePT == "") {
    $(".ci-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".ci-pt.erro").text("");
  }

  // var file = $("#inc-img").prop("files")[0];

  var intro = new FormData();

  if (dataIntro.titlePT != "" && dataIntro.textPT != "" &&
    dataIntro.textPT.replace(/(<([^>]+)>)/ig, '').length < 401 &&
    dataIntro.textEN.replace(/(<([^>]+)>)/ig, '').length < 401) {
    intro.append("cmdEval", "updateIntro");
    intro.append("titlePT", dataIntro.titlePT);
    intro.append("titleEN", dataIntro.titleEN);
    intro.append("textPT", dataIntro.textPT);
    intro.append("textEN", dataIntro.textEN);

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

    xhttp.open("POST", "functions/func-centro-incubacao.php", true);
    xhttp.send(intro);
  }
});

/* get topicos info */
function getTopicos(last, idTopico) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        printTopicos(JSON.parse(resp[1]), last, idTopico);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação dos Tópicos");
      }
    }
  };

  xhttp.open("GET", "functions/func-centro-incubacao.php?cmdEval=getTopicos");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print topicos */
function printTopicos(topicos, last, idTopico) {
  topicosArea = document.querySelector("#topicosCI");
  document.querySelector("#topicosCI").innerHTML = "";
  arrayStatus = [];
  topicosArea.innerHTML = "";
  for (const i in topicos) {
    if (topicos.hasOwnProperty(i)) {
      const topico = topicos[i];
      linha = document.createElement("div");
      linha.id = "topico-" + topico.id;
      linha.classList.add("col-lg-12");
      linha.classList.add("valueLine");
      linha.style.display = "flex";
      linha.style.cursor = "pointer";

      html = `
                  <div class="col-lg-4">${topico.title}</div>
                  <div class="col-lg-4">${topico.text}</div>
              `;
      linha.innerHTML = html;
      linha.addEventListener("click", function () {
        selectTopico("topico-" + topico.id);
      });
      topicosArea.append(linha);
    }
  }

  if (last != null) {
    document.querySelector("#topicosCI .row:first-child").classList.add("active");
  }
  if (idTopico != null) {
    document.querySelector("#topicosCI #topico-" + idTopico).classList.add("active");
  }
}

/* select topico */
function selectTopico(id) {
  linhaTopico = document.getElementById(id);

  /**
   * events triggered by selection and deselection
   * this code block only concerns the new/edit modal inputs
   */
  if (linhaTopico.classList.contains("active")) {
    linhaTopico.classList.remove("active");
    var inputs = document
      .getElementById("topicoInfo")
      .getElementsByTagName("input");

    for (index = 0; index < inputs.length; ++index) {
      if (inputs[index].type == "text") inputs[index].value = "";
    }

    $("#ci-topico-text-pt").next().find('.note-editable').html('');
    $("#ci-topico-text-en").next().find('.note-editable').html('');

    $('#topicoInfo').css({ 'display': 'none' });
    $('.topicoInfo').css({ 'display': 'none' });

    $('.ci-topico-text-pt span').text('700');
    $('.ci-topico-text-en span').text('700');

    $topicosArea = document.getElementById("topicoInfo");
    $topicosArea.setAttribute("data-id-topico", "");
  } else {
    $("#topicosCI .valueLine").removeClass("active");
    linhaTopico.classList.add("active");

    //load data into the inputs in the page
    getTopicoById(id.replace("topico-", ""));
  }
}

/* get topico info by selected */
function getTopicoById(idTopico) {
  idTopico = idTopico.replace("topico-", "");
  listaTopicos = document.querySelector("#topicosCI");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        getAllDataByTopico(JSON.parse(resp[1]));
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
  xhttp.open(
    "GET",
    "functions/func-centro-incubacao.php?cmdEval=getAllTopicosByIdTopico&id_topico=" +
    idTopico
  );
  xhttp.send();
}

/* get topico info */
function getAllDataByTopico(topico) {
  $topicosArea = document.getElementById("topicoInfo");
  $topicosArea.setAttribute("data-id-topico", "topico-" + topico[0].id);

  var $input_title_pt = $("#topicoInfo #ci-topico-titulo-pt");
  var $input_title_en = $("#topicoInfo #ci-topico-titulo-en");
  var $input_text_pt = $("#topicoInfo #ci-topico-text-pt");
  var $input_text_en = $("#topicoInfo #ci-topico-text-en");

  $('#topicoInfo').css({ 'display': 'flex' });
  $('.topicoInfo').css({ 'display': 'flex' });

  $input_title_pt.val(topico[0].title);
  $input_title_en.val(topico[0].title_en);
  $input_text_pt.next().find('.note-editable').html(topico[0].text);
  $input_text_en.next().find('.note-editable').html(topico[0].text_en);

  $('.ci-topico-text-pt span').text(700 - topico[0].text.replace(/(<([^>]+)>)/ig, "").length);
  $('.ci-topico-text-en span').text(700 - topico[0].text_en.replace(/(<([^>]+)>)/ig, "").length);

  $("#updateCI").attr("data-id-topico", topico[0].id);
}

/* update topico */
var $updateCIBtn = $("#updateCI");
$updateCIBtn.click(function () {
  var id = $("#updateCI").attr("data-id-topico");
  var titlePT = $("#ci-topico-titulo-pt");
  var titleEN = $("#ci-topico-titulo-en");
  var textPT = $("#ci-topico-text-pt");
  var textEN = $("#ci-topico-text-en");

  $topicosArea = document.getElementById("topicoInfo");
  var topico_id = $topicosArea.getAttribute("data-id-topico");

  if (topico_id != null) topico_id = topico_id.replace("topico-", "");
  else topico_id = "";

  var dataTopico = {
    id: id,
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
  };

  if (dataTopico.textEN.replace(/(<([^>]+)>)/ig, '').length > 700) {
    $(".ci-topico-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".ci-topico-text-en.erro").text("");
  }

  if (dataTopico.textPT.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".ci-topico-text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataTopico.textPT.replace(/(<([^>]+)>)/ig, '').length > 700) {
      $(".ci-topico-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".ci-topico-text-pt.erro").text("");
    }
  }

  if (dataTopico.titlePT == "") {
    $(".ci-topico-titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".ci-topico-titulo-pt.erro").text("");
  }

  var topico = new FormData();

  if (dataTopico.textPT != "" && dataTopico.titlePT != "" &&
    dataTopico.textPT.replace(/(<([^>]+)>)/ig, '').length < 701 &&
    dataTopico.textEN.replace(/(<([^>]+)>)/ig, '').length < 701) {
    topico.append("cmdEval", "updateTopicos");
    topico.append("id", dataTopico.id);
    topico.append("titlePT", dataTopico.titlePT);
    topico.append("titleEN", dataTopico.titleEN);
    topico.append("textPT", dataTopico.textPT);
    topico.append("textEN", dataTopico.textEN);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Tópicos guardados com sucesso!", "success");

          var inputs = document
            .getElementById("topicoInfo")
            .getElementsByTagName("input");

          for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text") inputs[index].value = "";
          }

          $("#ci-topico-text-pt").next().find('.note-editable').html('');
          $("#ci-topico-text-en").next().find('.note-editable').html('');

          $('#topicoInfo').css({ 'display': 'none' });
          $('.topicoInfo').css({ 'display': 'none' });

          $('.ci-topico-text-pt span').text('700');
          $('.ci-topico-text-en span').text('700');

          if ($topicosArea) {
            if (topico_id == "") getGallery(null, null);
            else getTopicos(null, topico_id);

            $topicosArea = document.getElementById("topicoInfo");
            $topicosArea.setAttribute("data-id-topico", "");
          } else {
            getTopicos("last", null);
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

    xhttp.open("POST", "functions/func-centro-incubacao.php", true);
    xhttp.send(topico);
  }
});