/* eslint-disable */
window.addEventListener("load", function (e) {
  getIntro();
  getTopicos();
  getGallery();

  var alignBtnsIntro = $("#inc-img-align .img-align-cell");

  alignBtnsIntro.each(function () {
    $(this).on("click", function () {
      $(this).toggleClass("active");
      $("#inc-img-align .img-align-cell").not(this).removeClass("active");
    });
  });

  var alignBtnsGallery = $("#img-align-gallery .img-align-cell");

  alignBtnsGallery.each(function () {
    $(this).on("click", function () {
      $(this).toggleClass("active");
      $("#img-align-gallery .img-align-cell").not(this).removeClass("active");
    });
  });

  $('#inc-text-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 750) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.inc-text-pt span').text(750 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 750) {
          maxPaste = 750 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.inc-text-pt span').text(750 - t.length);
      }
    }
  });

  $('#inc-text-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 750) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.inc-text-en span').text(750 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 750) {
          maxPaste = 750 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.inc-text-en span').text(750 - t.length);
      }
    }
  });

  $('#af-topico-text-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 150) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.topico-text-pt span').text(150 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 150) {
          maxPaste = 150 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.topico-text-pt span').text(150 - t.length);
      }
    }
  });

  $('#af-topico-text-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 150) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.topico-text-en span').text(150 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 150) {
          maxPaste = 150 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.topico-text-en span').text(150 - t.length);
      }
    }
  });
});

$("#inc-text-pt").on("keypress", function () {
  var limiteCaracteres = 750;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".inc-text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#inc-text-en").on("keypress", function () {
  var limiteCaracteres = 750;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".inc-text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#af-topico-text-pt").on("keypress", function () {
  var limiteCaracteres = 150;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".topico-text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#af-topico-text-en").on("keypress", function () {
  var limiteCaracteres = 150;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".topico-text-en span").text(totalCaracteres);

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
        $("#inc-intro-pt").val(info.title);
        $("#inc-intro-en").val(info.title_en);

        $("#inc-text-pt").next().find('.note-editable').html(info.text);
        $("#inc-text-en").next().find('.note-editable').html(info.text_en);

        $('.inc-text-pt span').text(750 - info.text.replace(/(<([^>]+)>)/ig, "").length);
        $('.inc-text-en span').text(750 - info.text_en.replace(/(<([^>]+)>)/ig, "").length);

        $("#inc-img-actual").attr("src", info.img_src);

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

        $("#inc-img-actual-alinhamento").val(align);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação da Apresentação");
      }
    }
  };

  xhttp.open("GET", "functions/func-apresentacao.php?cmdEval=getIntro");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update intro */
var $updateIntroBtn = $("#updateIntro");
$updateIntroBtn.click(function () {
  var titlePT = $("#inc-intro-pt");
  var titleEN = $("#inc-intro-en");

  var textPT = $("#inc-text-pt");
  var textEN = $("#inc-text-en");

  var img = $("#inc-img");
  var align = $("#inc-img-align .img-align-cell.active input");

  var dataIntro = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
    img: img.val(),
    align: align.val(),
  };

  if (dataIntro.textEN.replace(/(<([^>]+)>)/ig, '').length > 750) {
    $(".inc-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".inc-text-en.erro").text("");
  }

  if (dataIntro.textPT == "") {
    $(".inc-text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataIntro.textPT.replace(/(<([^>]+)>)/ig, '').length > 750) {
      $(".inc-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".inc-text-pt.erro").text("");
    }
  }

  if (dataIntro.titlePT == "") {
    $(".inc-intro-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".inc-intro-pt.erro").text("");
  }

  var file = $("#inc-img").prop("files")[0];

  var intro = new FormData();

  if (dataIntro.titlePT != "" && dataIntro.textPT != "" &&
    dataIntro.textPT.replace(/(<([^>]+)>)/ig, '').length < 751 &&
    dataIntro.textEN.replace(/(<([^>]+)>)/ig, '').length < 751) {
    intro.append("cmdEval", "updateIntro");
    intro.append("titlePT", dataIntro.titlePT);
    intro.append("titleEN", dataIntro.titleEN);
    intro.append("textPT", dataIntro.textPT);
    intro.append("textEN", dataIntro.textEN);
    intro.append("file", file);
    intro.append("align", dataIntro.align);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Introdução guardada com sucesso!", "success");
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

    xhttp.open("POST", "functions/func-apresentacao.php", true);
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
        $.notify("Erro ao aceder à informação da Apresentação");
      }
    }
  };

  xhttp.open("GET", "functions/func-apresentacao.php?cmdEval=getTopicos");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print topicos */
function printTopicos(topicos, last, idTopico) {
  topicosArea = document.querySelector("#topicosIntro");
  document.querySelector("#topicosIntro").innerHTML = "";
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
    document.querySelector("#topicosIntro .row:first-child").classList.add("active");
  }
  if (idTopico != null) {
    document.querySelector("#topicosIntro #topico-" + idTopico).classList.add("active");
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

    $("#af-topico-titulo-pt").next().find('.note-editable').html('');
    $("#af-topico-titulo-en").next().find('.note-editable').html('');

    $('#topicoInfo').css({ 'display': 'none' });
    $('.topicoInfo').css({ 'display': 'none' });

    $('.topico-text-pt span').text('150');
    $('.topico-text-en span').text('150');

    $topicosArea = document.getElementById("topicoInfo");
    $topicosArea.setAttribute("data-id-topico", "");
  } else {
    $("#topicosIntro .valueLine").removeClass("active");
    linhaTopico.classList.add("active");

    //load data into the inputs in the page
    getTopicoById(id.replace("topico-", ""));
  }
}

/* get topico info by selected */
function getTopicoById(idTopico) {
  idTopico = idTopico.replace("topico-", "");
  listaTopicos = document.querySelector("#topicosIntro");

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
        $.notify("Erro para aceder à informação da Apresentação.");
      }
    }
  };
  xhttp.open(
    "GET",
    "functions/func-apresentacao.php?cmdEval=getAllTopicosByIdTopico&id_topico=" +
    idTopico
  );
  xhttp.send();
}

/* get topico info */
function getAllDataByTopico(topico) {
  $topicosArea = document.getElementById("topicoInfo");
  $topicosArea.setAttribute("data-id-topico", "topico-" + topico[0].id);

  var $input_title_pt = $("#topicoInfo #af-topico-titulo-pt");
  var $input_title_en = $("#topicoInfo #af-topico-titulo-en");
  var $input_text_pt = $("#topicoInfo #af-topico-text-pt");
  var $input_text_en = $("#topicoInfo #af-topico-text-en");

  $('#topicoInfo').css({ 'display': 'flex' });
  $('.topicoInfo').css({ 'display': 'flex' });

  $input_title_pt.val(topico[0].title);
  $input_title_en.val(topico[0].title_en);
  $input_text_pt.next().find('.note-editable').html(topico[0].text);
  $input_text_en.next().find('.note-editable').html(topico[0].text_en);

  $('.topico-text-pt span').text(150 - topico[0].text.replace(/(<([^>]+)>)/ig, "").length);
  $('.topico-text-en span').text(150 - topico[0].text_en.replace(/(<([^>]+)>)/ig, "").length);

  $("#updateTopico").attr("data-id-topico", topico[0].id);
}

/* update topico */
var $updateTopicoBtn = $("#updateTopico");
$updateTopicoBtn.click(function () {
  var id = $("#updateTopico").attr("data-id-topico");
  var titlePT = $("#af-topico-titulo-pt");
  var titleEN = $("#af-topico-titulo-en");
  var textPT = $("#af-topico-text-pt");
  var textEN = $("#af-topico-text-en");

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

  if (dataTopico.textEN.replace(/(<([^>]+)>)/ig, '').length > 150) {
    $(".af-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".af-text-en.erro").text("");
  }

  if (dataTopico.textPT.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".topico-text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataTopico.textPT.replace(/(<([^>]+)>)/ig, '').length > 150) {
      $(".topico-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".topico-text-pt.erro").text("");
    }
  }

  if (dataTopico.titlePT == "") {
    $(".topico-titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".topico-titulo-pt.erro").text("");
  }

  var topico = new FormData();

  if (dataTopico.textPT != "" && dataTopico.titlePT != "" &&
    dataTopico.textPT.replace(/(<([^>]+)>)/ig, '').length < 151 &&
    dataTopico.textEN.replace(/(<([^>]+)>)/ig, '').length < 151) {
    topico.append("cmdEval", "updateTopico");
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

          $("#af-topico-titulo-pt").next().find('.note-editable').html('');
          $("#af-topico-titulo-en").next().find('.note-editable').html('');

          $('#topicoInfo').css({ 'display': 'none' });
          $('.topicoInfo').css({ 'display': 'none' });

          $('.topico-text-pt span').text('150');
          $('.topico-text-en span').text('150');

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

    xhttp.open("POST", "functions/func-apresentacao.php", true);
    xhttp.send(topico);
  }
});

/* get galeria info */
function getGallery(last, idFoto) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        printGaleria(JSON.parse(resp[1]), last, idFoto);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação da Galeria");
      }
    }
  };

  xhttp.open("GET", "functions/func-apresentacao.php?cmdEval=getGallery");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print galeria */
function printGaleria(fotos, last, idFoto) {
  imagensArea = document.querySelector("#imagens");
  document.querySelector("#imagens").innerHTML = "";
  arrayStatus = [];
  imagensArea.innerHTML = "";
  for (const i in fotos) {
    if (fotos.hasOwnProperty(i)) {
      const foto = fotos[i];
      linha = document.createElement("div");
      linha.id = "foto-" + foto.id;
      linha.classList.add("col-lg-12");
      linha.classList.add("valueLine");
      linha.style.display = "flex";
      linha.style.cursor = "pointer";

      var imagem;
      if (foto.img_src == null || foto.img_src == "") {
        imagem = "Não tem imagem.";
      } else {
        var splitSrc = foto.img_src.split("uploads");
        imagem =
          '<img style="width: 20%;" src="../../../uploads' +
          splitSrc[1] +
          '" />';
      }

      var align;
      switch (foto.img_align) {
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
              <div class="col-lg-4">${foto.title}</div>
              <div class="col-lg-4">${imagem}</div>
              <div class="col-lg-4">${align}</div>
          `;
      linha.innerHTML = html;
      linha.addEventListener("click", function () {
        selectFoto("foto-" + foto.id);
      });
      imagensArea.append(linha);
    }
  }

  if (last != null) {
    document.querySelector("#fotos .row:first-child").classList.add("active");
  }
  if (idFoto != null) {
    document.querySelector("#fotos #foto-" + idFoto).classList.add("active");
  }
}

/* select foto */
function selectFoto(id) {
  linhaFoto = document.getElementById(id);

  /**
   * events triggered by selection and deselection
   * this code block only concerns the new/edit modal inputs
   */
  if (linhaFoto.classList.contains("active")) {
    linhaFoto.classList.remove("active");
    var inputs = document
      .getElementById("infoImg")
      .getElementsByTagName("input");

    for (index = 0; index < inputs.length; ++index) {
      if (inputs[index].type == "text") inputs[index].value = "";
    }

    // $("#af-titulo").val("");

    var alignBtns = $("#img-align-gallery .img-align-cell");

    $('#infoImg').css({ 'display': 'none' });
    $('.infoImg').css({ 'display': 'none' });

    alignBtns.each(function () {
      $(this).removeClass("active");
    });

    $fotosArea = document.getElementById("infoImg");
    $fotosArea.setAttribute("data-id-foto", "");
  } else {
    $("#imagens .valueLine").removeClass("active");
    linhaFoto.classList.add("active");

    //load data into the inputs in the page
    getFotoById(id.replace("foto-", ""));
  }
}

/* get foto info by selected */
function getFotoById(idFoto) {
  idFoto = idFoto.replace("foto-", "");
  listaFotos = document.querySelector("#imagens");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        getAllDataByFoto(JSON.parse(resp[1]));
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro para aceder à informação da Galeria.");
      }
    }
  };
  xhttp.open(
    "GET",
    "functions/func-apresentacao.php?cmdEval=getAllFotosByIdFoto&id_foto=" +
    idFoto
  );
  xhttp.send();
}

/* get foto info */
function getAllDataByFoto(foto) {
  $fotosArea = document.getElementById("infoImg");
  $fotosArea.setAttribute("data-id-foto", "foto-" + foto[0].id);

  var $input_title = $("#infoImg #af-titulo");

  $input_title.val(foto[0].title);

  $('#infoImg').css({ 'display': 'flex' });
  $('.infoImg').css({ 'display': 'flex' });

  var alignBtns = $("#img-align-gallery .img-align-cell");

  alignBtns.each(function () {
    $(this).removeClass("active");
  });

  $("#img-align-gallery .img-align-cell." + foto[0].img_align).addClass(
    "active"
  );

  $("#saveGallery").attr("data-id-foto", foto[0].id);
}

/* update foto */
var $saveGalleryBtn = $("#saveGallery");
$saveGalleryBtn.click(function () {
  var id = $("#saveGallery").attr("data-id-foto");
  var titlePT = $("#af-titulo");
  var img = $("#gallery-img");
  var align = $("#img-align-gallery .img-align-cell.active input");

  $fotosArea = document.getElementById("infoImg");
  var foto_id = $fotosArea.getAttribute("data-id-foto");

  if (foto_id != null) foto_id = foto_id.replace("foto-", "");
  else foto_id = "";

  var dataFoto = {
    id: id,
    titlePT: titlePT.val(),
    img: img.val(),
    align: align.val(),
  };

  if (dataFoto.titlePT == "") {
    $(".foto-titulo.erro").text("Por favor, inserir o título.");
  } else {
    $(".foto-titulo.erro").text("");
  }

  var file = $("#gallery-img").prop("files")[0];

  var foto = new FormData();

  if (dataFoto.titlePT != "") {
    foto.append("cmdEval", "updateGallery");
    foto.append("id", dataFoto.id);
    foto.append("titlePT", dataFoto.titlePT);
    foto.append("file", file);
    foto.append("align", dataFoto.align);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Galeria guardada com sucesso!", "success");

          var inputs = document
            .getElementById("infoImg")
            .getElementsByTagName("input");

          for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text") inputs[index].value = "";
          }

          var alignBtns = $("#img-align-gallery .img-align-cell");

          $('#infoImg').css({ 'display': 'none' });
          $('.infoImg').css({ 'display': 'none' });

          alignBtns.each(function () {
            $(this).removeClass("active");
          });

          if ($fotosArea) {
            if (foto_id == "") getGallery(null, null);
            else getGallery(null, foto_id);

            $fotosArea = document.getElementById("infoImg");
            $fotosArea.setAttribute("data-id-foto", "");
          } else {
            getGallery("last", null);
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

    xhttp.open("POST", "functions/func-apresentacao.php", true);
    xhttp.send(foto);
  }
});
