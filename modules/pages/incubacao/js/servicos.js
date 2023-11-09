/* eslint-disable */
window.addEventListener("load", function (e) {
  getTextoIntrodutorio();
  getServicos();

  $('#servicos-text-pt').summernote({
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
        $('.servicos-text-pt span').text(300 - t.trim().length);
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
        $('.servicos-text-pt span').text(300 - t.length);
      }
    }
  });

  $('#servicos-text-en').summernote({
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
        $('.servicos-text-en span').text(300 - t.trim().length);
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
        $('.servicos-text-en span').text(300 - t.length);
      }
    }
  });

  $('#servicos-single-text-pt').summernote({
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
        $('.servicos-single-text-pt span').text(300 - t.trim().length);
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
        $('.servicos-single-text-pt span').text(300 - t.length);
      }
    }
  });

  $('#servicos-single-text-en').summernote({
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
        $('.servicos-single-text-en span').text(300 - t.trim().length);
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
        $('.servicos-single-text-en span').text(300 - t.length);
      }
    }
  });
});

$("#servicos-text-pt").on("keypress", function () {
  var limiteCaracteres = 300;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".servicos-text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#servicos-text-en").on("keypress", function () {
  var limiteCaracteres = 300;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".servicos-text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#servicos-single-text-pt").on("keypress", function () {
  var limiteCaracteres = 300;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".servicos-single-text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#servicos-single-text-en").on("keypress", function () {
  var limiteCaracteres = 300;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".servicos-single-text-en span").text(totalCaracteres);

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
        $("#servicos-titulo-pt").val(info.title);
        $("#servicos-titulo-en").val(info.title_en);

        $("#servicos-text-pt").next().find('.note-editable').html(info.text);
        $("#servicos-text-en").next().find('.note-editable').html(info.text_en);

        $('.servicos-text-pt span').text(300 - info.text.replace(/(<([^>]+)>)/ig, "").length);
        $('.servicos-text-en span').text(300 - info.text_en.replace(/(<([^>]+)>)/ig, "").length);
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
    "functions/func-servicos.php?cmdEval=getTextoIntrodutorio"
  );
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update texto introdutorio */
var $updateTextoIntrodutorioBtn = $("#updateServIntro");
$updateTextoIntrodutorioBtn.click(function () {
  var titlePT = $("#servicos-titulo-pt");
  var titleEN = $("#servicos-titulo-en");

  var textPT = $("#servicos-text-pt");
  var textEN = $("#servicos-text-en");

  var dataTextoIntrodutorio = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html()
  };

  if (dataTextoIntrodutorio.textEN.replace(/(<([^>]+)>)/ig, '').length > 300) {
    $(".servicos-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".servicos-text-en.erro").text("");
  }

  if (dataTextoIntrodutorio.textPT == "") {
    $(".servicos-text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataTextoIntrodutorio.textPT.replace(/(<([^>]+)>)/ig, '').length > 300) {
      $(".servicos-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".servicos-text-pt.erro").text("");
    }
  }

  if (dataTextoIntrodutorio.titlePT == "") {
    $(".servicos-titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".servicos-titulo-pt.erro").text("");
  }

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

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Texto Introdutório guardado com sucesso!", "success");
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

    xhttp.open("POST", "functions/func-servicos.php", true);
    xhttp.send(textoIntrodutorio);
  }
});

/* get servicos info */
function getServicos(last, idServico) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        printServicos(JSON.parse(resp[1]), last, idServico);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação dos Serviços.");
      }
    }
  };

  xhttp.open(
    "GET",
    "functions/func-servicos.php?cmdEval=getServicos"
  );
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print servicos */
function printServicos(servicos, last, idServico) {
  servicosArea = document.querySelector("#servicos");
  document.querySelector("#servicos").innerHTML = "";
  arrayStatus = [];
  servicosArea.innerHTML = "";
  for (const i in servicos) {
    if (servicos.hasOwnProperty(i)) {
      const servico = servicos[i];
      linha = document.createElement("div");
      linha.id = "servico-" + servico.id;
      linha.classList.add("col-lg-12");
      linha.classList.add("valueLine");
      linha.style.display = "flex";
      linha.style.cursor = "pointer";

      html = `
              <div class="col-lg-4">${servico.title}</div>
              <div class="col-lg-4">${servico.text}</div>
          `;
      linha.innerHTML = html;
      linha.addEventListener("click", function () {
        selectServico("servico-" + servico.id);
      });
      servicosArea.append(linha);
    }
  }

  if (last != null) {
    document.querySelector("#servicos .row:first-child").classList.add("active");
  }
  if (idServico != null) {
    document
      .querySelector("#servicos #servico-" + idServico)
      .classList.add("active");
  }
}

/* select servico */
function selectServico(id) {
  linhaServico = document.getElementById(id);

  /**
   * events triggered by selection and deselection
   * this code block only concerns the new/edit modal inputs
   */
  if (linhaServico.classList.contains("active")) {
    linhaServico.classList.remove("active");
    var inputs = document
      .getElementById("servicoInfo")
      .getElementsByTagName("input");

    for (index = 0; index < inputs.length; ++index) {
      if (inputs[index].type == "text") inputs[index].value = "";
    }

    $("#servicos-single-text-pt").next().find('.note-editable').html("");
    $("#servicos-single-text-en").next().find('.note-editable').html("");

    $('.servicos-single-text-pt span').text('300');
    $('.servicos-single-text-en span').text('300');

    $('#servicoInfo').css({ 'display': 'none' });
    $('.servicoInfo').css({ 'display': 'none' });

    $topicosArea = document.getElementById("servicoInfo");
    $topicosArea.setAttribute("data-id-servico", "");
  } else {
    $("#servicos .valueLine").removeClass("active");
    linhaServico.classList.add("active");

    //load data into the inputs in the page
    getServicoById(id.replace("servico-", ""));
  }
}

/* get servico info by selected */
function getServicoById(idServico) {
  idServico = idServico.replace("servico-", "");
  listaTopicos = document.querySelector("#servicos");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        getAllDataByServico(JSON.parse(resp[1]));
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro para aceder à informação dos Serviços.");
      }
    }
  };
  xhttp.open(
    "GET",
    "functions/func-servicos.php?cmdEval=getAllServicosByIdServico&id_servico=" +
    idServico
  );
  xhttp.send();
}

/* get servico info */
function getAllDataByServico(servico) {
  $servicosArea = document.getElementById("servicoInfo");
  $servicosArea.setAttribute("data-id-servico", "servico-" + servico[0].id);

  var $input_title_pt = $("#servicoInfo #servicos-single-titulo-pt");
  var $input_title_en = $("#servicoInfo #servicos-single-titulo-en");

  var $input_text_pt = $("#servicoInfo #servicos-single-text-pt");
  var $input_text_en = $("#servicoInfo #servicos-single-text-en");

  $('.servicos-single-text-pt span').text(300 - servico[0].text.replace(/(<([^>]+)>)/ig, "").length);
  $('.servicos-single-text-en span').text(300 - servico[0].text_en.replace(/(<([^>]+)>)/ig, "").length);

  $('#servicoInfo').css({ 'display': 'flex' });
  $('.servicoInfo').css({ 'display': 'flex' });

  $input_title_pt.val(servico[0].title);
  $input_title_en.val(servico[0].title_en);

  $input_text_pt.next().find('.note-editable').html(servico[0].text);
  $input_text_en.next().find('.note-editable').html(servico[0].text_en);

  $("#updateServicos").attr("data-id-servico", servico[0].id);
}

/* update servicos */
var $updateServicosBtn = $("#updateServicos");
$updateServicosBtn.click(function () {
  var id = $("#updateServicos").attr("data-id-servico");
  var titlePT = $("#servicos-single-titulo-pt");
  var titleEN = $("#servicos-single-titulo-en");
  var textPT = $("#servicos-single-text-pt");
  var textEN = $("#servicos-single-text-en");

  $servicosArea = document.getElementById("servicoInfo");
  var servico_id = $servicosArea.getAttribute("data-id-servico");

  if (servico_id != null) servico_id = servico_id.replace("servico-", "");
  else servico_id = "";

  var dataServico = {
    id: id,
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
  };

  if (dataServico.textEN.replace(/(<([^>]+)>)/ig, '').length > 300) {
    $(".servicos-single-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".servicos-single-text-en.erro").text("");
  }

  if (dataServico.textPT.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".servicos-single-text-pt.erro").text("Por favor, inserir o texto.");
  } else {

    if (dataServico.textPT.replace(/(<([^>]+)>)/ig, '').length > 300) {
      $(".servicos-single-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".servicos-single-text-pt.erro").text("");
    }
  }

  if (dataServico.titlePT == "") {
    $(".servicos-single-titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".servicos-single-titulo-pt.erro").text("");
  }

  var servico = new FormData();

  if (dataServico.textPT != "" && dataServico.titlePT != "" &&
    dataServico.textPT.replace(/(<([^>]+)>)/ig, '').length < 301 &&
    dataServico.textEN.replace(/(<([^>]+)>)/ig, '').length < 301) {
    servico.append("cmdEval", "updateServicos");
    servico.append("id", dataServico.id);
    servico.append("titlePT", dataServico.titlePT);
    servico.append("titleEN", dataServico.titleEN);
    servico.append("textPT", dataServico.textPT);
    servico.append("textEN", dataServico.textEN);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Serviço guardado com sucesso!", "success");

          var inputs = document
            .getElementById("servicoInfo")
            .getElementsByTagName("input");

          for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text") inputs[index].value = "";
          }

          $("#servicos-single-text-pt").next().find('.note-editable').html("");
          $("#servicos-single-text-en").next().find('.note-editable').html("");

          $('#servicoInfo').css({ 'display': 'none' });
          $('.servicoInfo').css({ 'display': 'none' });

          $('.servicos-single-text-pt span').text('300');
          $('.servicos-single-text-en span').text('300');

          if ($servicosArea) {
            if (servico_id == "") getServicos(null, null);
            else getServicos(null, servico_id);

            $servicosArea = document.getElementById("servicoInfo");
            $servicosArea.setAttribute("data-id-servico", "");
          } else {
            getServicos("last", null);
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

    xhttp.open("POST", "functions/func-servicos.php", true);
    xhttp.send(servico);
  }
});
