/* eslint-disable */
window.addEventListener("load", function (e) {
  getTextoIntrodutorio();
  getAreasEspecializacao();

  var alignBtns = $(".img-align-cell");

  alignBtns.each(function () {
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
      ['insert', ['link', 'picture']]
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 300) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text-pt span').text(300 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 300) {
          maxPaste = 300 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.text-pt span').text(300 - t.length);
      }
    }
  });

  $('#text-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 300) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text-en span').text(300 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 300) {
          maxPaste = 300 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.text-en span').text(300 - t.length);
      }
    }
  });

  $('#esp-single-text-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 450) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.esp-single-text-pt span').text(450 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 450) {
          maxPaste = 450 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.esp-single-text-pt span').text(450 - t.length);
      }
    }
  });

  $('#esp-single-text-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 450) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.esp-single-text-en span').text(450 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 450) {
          maxPaste = 450 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.esp-single-text-en span').text(450 - t.length);
      }
    }
  });
});

$("#text-pt").on("keypress", function () {
  var limiteCaracteres = 300;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#text-en").on("keypress", function () {
  var limiteCaracteres = 300;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#esp-single-text-pt").on("keypress", function () {
  var limiteCaracteres = 450;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".esp-single-text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#esp-single-text-en").on("keypress", function () {
  var limiteCaracteres = 450;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".esp-single-text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

/* get texto introdutorio */
function getTextoIntrodutorio() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        var info = JSON.parse(resp[1])[0];
        $("#titulo-pt").val(info.title);
        $("#titulo-en").val(info.title_en);

        $("#text-pt").next().find('.note-editable').html(info.text);
        $("#text-en").next().find('.note-editable').html(info.text_en);

        $('.text-pt span').text(300 - info.text.replace(/(<([^>]+)>)/ig, "").length);
        $('.text-en span').text(300 - info.text_en.replace(/(<([^>]+)>)/ig, "").length);

        $("#esp-img-actual").attr("src", info.img_src);

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

        $("#esp-img-actual-alinhamento").val(align);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação do Texto Introdutório");
      }
    }
  };

  xhttp.open(
    "GET",
    "functions/func-areas-especializacao.php?cmdEval=getTextoIntrodutorio"
  );
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update texto introdutorio */
var $updateTextoIntrodutorioBtn = $("#updateTextoIntrodutorio");
$updateTextoIntrodutorioBtn.click(function () {
  var titlePT = $("#titulo-pt");
  var titleEN = $("#titulo-en");

  var textPT = $("#text-pt");
  var textEN = $("#text-en");

  var img = $("#objectivos-img");
  var align = $(".img-align-cell.active input");

  var dataTextoIntrodutorio = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
    img: img.val(),
    align: align.val(),
  };

  if (dataTextoIntrodutorio.textEN.replace(/(<([^>]+)>)/ig, '').length > 300) {
    $(".text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".text-en.erro").text("");
  }

  if (dataTextoIntrodutorio.textPT.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataTextoIntrodutorio.textPT.replace(/(<([^>]+)>)/ig, '').length > 300) {
      $(".text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".text-pt.erro").text("");
    }
  }

  if (dataTextoIntrodutorio.titlePT == "") {
    $(".titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".titulo-pt.erro").text("");
  }

  var file = $("#esp-img").prop("files")[0];

  var textoIntrodutorio = new FormData();

  if (
    dataTextoIntrodutorio.titlePT != "" &&
    dataTextoIntrodutorio.textPT != "" &&
    dataTextoIntrodutorio.textPT.replace(/(<([^>]+)>)/ig, '').length < 301 &&
    dataTextoIntrodutorio.textEN.replace(/(<([^>]+)>)/ig, '').length < 301
  ) {
    textoIntrodutorio.append("cmdEval", "updateTextoIntrodutorio");
    textoIntrodutorio.append("titlePT", dataTextoIntrodutorio.titlePT);
    textoIntrodutorio.append("titleEN", dataTextoIntrodutorio.titleEN);
    textoIntrodutorio.append("textPT", dataTextoIntrodutorio.textPT);
    textoIntrodutorio.append("textEN", dataTextoIntrodutorio.textEN);
    textoIntrodutorio.append("file", file);
    textoIntrodutorio.append("align", dataTextoIntrodutorio.align);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Texto Introdutório guardado com sucesso!", "success");

          setTimeout(() => {
            window.location.href = "https://backoffice.v21.pt/modules/pages/v21/areas-especializacao.php";
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

    xhttp.open("POST", "functions/func-areas-especializacao.php", true);
    xhttp.send(textoIntrodutorio);
  }
});

/* get areas especializacao info */
function getAreasEspecializacao(last, idTopico) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        printAreasEspecializacao(JSON.parse(resp[1]), last, idTopico);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação das Áreas de Especialização");
      }
    }
  };

  xhttp.open(
    "GET",
    "functions/func-areas-especializacao.php?cmdEval=getAreasEspecializacao"
  );
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print áreas de especialização */
function printAreasEspecializacao(topicos, last, idTopico) {
  topicosArea = document.querySelector("#topicos");
  document.querySelector("#topicos").innerHTML = "";
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
        selectArea("topico-" + topico.id);
      });
      topicosArea.append(linha);
    }
  }

  if (last != null) {
    document.querySelector("#topicos .row:first-child").classList.add("active");
  }
  if (idTopico != null) {
    document
      .querySelector("#topicos #topico-" + idTopico)
      .classList.add("active");
  }
}

/* select área */
function selectArea(id) {
  linhaArea = document.getElementById(id);

  /**
   * events triggered by selection and deselection
   * this code block only concerns the new/edit modal inputs
   */
  if (linhaArea.classList.contains("active")) {
    linhaArea.classList.remove("active");
    var inputs = document
      .getElementById("topicoInfo")
      .getElementsByTagName("input");

    for (index = 0; index < inputs.length; ++index) {
      if (inputs[index].type == "text") inputs[index].value = "";
    }

    $("#esp-single-text-pt").next().find('.note-editable').html('');
    $("#esp-single-text-en").next().find('.note-editable').html('');

    $('.esp-single-text-pt span').text('450');
    $('.esp-single-text-en span').text('450');

    $('#topicoInfo').css({ 'display': 'none' });
    $('.topicoInfo').css({ 'display': 'none' });

    $topicosArea = document.getElementById("topicoInfo");
    $topicosArea.setAttribute("data-id-topico", "");
  } else {
    $("#topicos .valueLine").removeClass("active");
    linhaArea.classList.add("active");

    //load data into the inputs in the page
    getAreaById(id.replace("topico-", ""));
  }
}

/* get área info by selected */
function getAreaById(idArea) {
  idArea = idArea.replace("topico-", "");
  listaTopicos = document.querySelector("#topicos");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        getAllDataByArea(JSON.parse(resp[1]));
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro para aceder à informação das Áreas de Especialização.");
      }
    }
  };
  xhttp.open(
    "GET",
    "functions/func-areas-especializacao.php?cmdEval=getAllAreasEspecializacaoByIdArea&id_area=" +
    idArea
  );
  xhttp.send();
}

/* get área info */
function getAllDataByArea(topico) {
  $topicosArea = document.getElementById("topicoInfo");
  $topicosArea.setAttribute("data-id-topico", "topico-" + topico[0].id);

  var $input_title_pt = $("#topicoInfo #esp-single-titulo-pt");
  var $input_title_en = $("#topicoInfo #esp-single-titulo-en");

  var $input_text_pt = $("#topicoInfo #esp-single-text-pt");
  var $input_text_en = $("#topicoInfo #esp-single-text-en");

  $input_title_pt.val(topico[0].title);
  $input_title_en.val(topico[0].title_en);

  $('#topicoInfo').css({ 'display': 'flex' });
  $('.topicoInfo').css({ 'display': 'flex' });

  $input_text_pt.next().find('.note-editable').html(topico[0].text);
  $input_text_en.next().find('.note-editable').html(topico[0].text_en);

  $('.esp-single-text-pt span').text(450 - topico[0].text.replace(/(<([^>]+)>)/ig, "").length);
  $('.esp-single-text-en span').text(450 - topico[0].text_en.replace(/(<([^>]+)>)/ig, "").length);

  $("#updateAreasEspecializacao").attr("data-id-topico", topico[0].id);
}

/* update área de especialização */
var $updateAreasEspecializacaoBtn = $("#updateAreasEspecializacao");
$updateAreasEspecializacaoBtn.click(function () {
  var id = $("#updateAreasEspecializacao").attr("data-id-topico");
  var titlePT = $("#esp-single-titulo-pt");
  var titleEN = $("#esp-single-titulo-en");
  var textPT = $("#esp-single-text-pt");
  var textEN = $("#esp-single-text-en");

  $topicosArea = document.getElementById("topicoInfo");
  var topico_id = $topicosArea.getAttribute("data-id-topico");

  if (topico_id != null) topico_id = topico_id.replace("topico-", "");
  else topico_id = "";

  var dataArea = {
    id: id,
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
  };

  // if (dataArea.textPT.length == 0) {
  //   $(".esp-single-text-pt.erro").text("Por favor, inserir o texto.");
  // } else {
  //   $(".esp-single-text-pt.erro").text("");
  // }

  if (dataArea.textEN.length > 450) {
    $(".esp-single-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".esp-single-text-en.erro").text("");
  }

  if (dataArea.textPT.length == 0) {
    $(".esp-single-text-pt.erro").text("Por favor, inserir um resumo do destaque.");
  } else {
    if (dataArea.textPT.length > 450) {
      $(".esp-single-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".esp-single-text-pt.erro").text("");
    }
  }

  if (dataArea.titlePT == "") {
    $(".esp-single-titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".esp-single-titulo-pt.erro").text("");
  }

  var area = new FormData();

  if (dataArea.textPT != "" && dataArea.titlePT != "" &&
    dataArea.textPT.length < 451 &&
    dataArea.textEN.length < 451) {
    area.append("cmdEval", "updateAreasEspecializacao");
    area.append("id", dataArea.id);
    area.append("titlePT", dataArea.titlePT);
    area.append("titleEN", dataArea.titleEN);
    area.append("textPT", dataArea.textPT);
    area.append("textEN", dataArea.textEN);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Área de Especialização guardada com sucesso!", "success");

          var inputs = document
            .getElementById("topicoInfo")
            .getElementsByTagName("input");

          for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text") inputs[index].value = "";
          }

          $("#esp-single-text-pt").next().find('.note-editable').html('');
          $("#esp-single-text-en").next().find('.note-editable').html('');

          $('#topicoInfo').css({ 'display': 'none' });
          $('.topicoInfo').css({ 'display': 'none' });

          if ($topicosArea) {
            if (topico_id == "") getAreasEspecializacao(null, null);
            else getAreasEspecializacao(null, topico_id);

            $topicosArea = document.getElementById("topicoInfo");
            $topicosArea.setAttribute("data-id-topico", "");
          } else {
            getAreasEspecializacao("last", null);
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

    xhttp.open("POST", "functions/func-areas-especializacao.php", true);
    xhttp.send(area);
  }
});
