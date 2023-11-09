/* eslint-disable */
window.addEventListener("load", function (e) {
  getTextoIntrodutorio();
  getAssociados();

  $('#text-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 250) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text-pt span').text(250 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 250) {
          maxPaste = 250 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.text-pt span').text(250 - t.length);
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
        if (t.trim().length >= 250) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text-en span').text(250 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 250) {
          maxPaste = 250 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.text-en span').text(250 - t.length);
      }
    }
  });

  $('#af-text-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 800) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.af-text-pt span').text(800 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 800) {
          maxPaste = 800 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.af-text-pt span').text(800 - t.length);
      }
    }
  });

  $('#af-text-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 800) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.af-text-en span').text(800 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 800) {
          maxPaste = 800 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.af-text-en span').text(800 - t.length);
      }
    }
  });
});

$("#text-pt").on("keypress", function () {
  var limiteCaracteres = 250;
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
  var limiteCaracteres = 250;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#af-text-pt").on("keypress", function () {
  var limiteCaracteres = 800;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#af-text-en").on("keypress", function () {
  var limiteCaracteres = 800;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text-en span").text(totalCaracteres);

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

        $('.text-pt span').text(250 - info.text.replace(/(<([^>]+)>)/ig, "").length);
        $('.text-en span').text(250 - info.text_en.replace(/(<([^>]+)>)/ig, "").length);
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
    "functions/func-associados-fundadores.php?cmdEval=getTextoIntrodutorio"
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

  var dataTextoIntrodutorio = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
  };

  if (dataTextoIntrodutorio.textEN.replace(/(<([^>]+)>)/ig, '').length > 250) {
    $(".text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".text-en.erro").text("");
  }

  if (dataTextoIntrodutorio.textPT.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".text-pt.erro").text("Por favor, inserir um resumo do destaque.");
  } else {
    if (dataTextoIntrodutorio.textPT.replace(/(<([^>]+)>)/ig, '').length > 250) {
      $(".text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".text-pt.erro").text("");
    }
  }

  // if (dataTextoIntrodutorio.textPT == "") {
  //   $(".text-pt.erro").text("Por favor, inserir o texto.");
  // } else {
  //   $(".text-pt.erro").text("");
  // }

  if (dataTextoIntrodutorio.titlePT == "") {
    $(".titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".titulo-pt.erro").text("");
  }

  var textoIntrodutorio = new FormData();

  if (
    dataTextoIntrodutorio.titlePT != "" &&
    dataTextoIntrodutorio.textPT != "" &&
    dataTextoIntrodutorio.textPT.replace(/(<([^>]+)>)/ig, '').length < 251 &&
    dataTextoIntrodutorio.textEN.replace(/(<([^>]+)>)/ig, '').length < 251
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

    xhttp.open("POST", "functions/func-associados-fundadores.php", true);
    xhttp.send(textoIntrodutorio);
  }
});

/* get associados fundadores info */
function getAssociados(last, idAssociado) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        printAssociados(JSON.parse(resp[1]), last, idAssociado);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação dos Associados");
      }
    }
  };

  xhttp.open(
    "GET",
    "functions/func-associados-fundadores.php?cmdEval=getAssociados"
  );
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print áreas de especialização */
function printAssociados(associados, last, idAssociado) {
  associadosArea = document.querySelector("#associados");
  document.querySelector("#associados").innerHTML = "";
  arrayStatus = [];
  associadosArea.innerHTML = "";
  for (const i in associados) {
    if (associados.hasOwnProperty(i)) {
      const associado = associados[i];
      linha = document.createElement("div");
      linha.id = "associado-" + associado.id;
      linha.classList.add("col-lg-12");
      linha.classList.add("valueLine");
      linha.style.display = "flex";
      linha.style.cursor = "pointer";

      var imagem;
      if (associado.img_src == null || associado.img_src == "") {
        imagem = "Não tem imagem.";
      } else {
        var splitSrc = associado.img_src.split("uploads");
        imagem =
          '<img style="width: 60%;" src="../../../uploads' +
          splitSrc[1] +
          '" />';
      }

      html = `
            <div class="col-lg-2">${associado.title}</div>
            <div class="col-lg-4">${associado.text}</div>
            <div class="col-lg-2">${imagem}</div>
            <div class="col-lg-2">${associado.img_link}</div>
        `;
      linha.innerHTML = html;
      linha.addEventListener("click", function () {
        selectAssociado("associado-" + associado.id);
      });
      associadosArea.append(linha);
    }
  }

  if (last != null) {
    document
      .querySelector("#associados .row:first-child")
      .classList.add("active");
  }
  if (idAssociado != null) {
    document
      .querySelector("#associados #associado-" + idAssociado)
      .classList.add("active");
  }
}

/* select associado */
function selectAssociado(id) {
  linhaAssociado = document.getElementById(id);

  /**
   * events triggered by selection and deselection
   * this code block only concerns the new/edit modal inputs
   */
  if (linhaAssociado.classList.contains("active")) {
    linhaAssociado.classList.remove("active");
    var inputs = document
      .getElementById("associadoInfo")
      .getElementsByTagName("input");

    for (index = 0; index < inputs.length; ++index) {
      if (inputs[index].type == "text") inputs[index].value = "";
    }

    $("#af-text-pt").next().find('.note-editable').html('');
    $("#af-text-en").next().find('.note-editable').html('');

    $('.af-text-pt span').text('800');
    $('.af-text-en span').text('800');

    $('#associadoInfo').css({ 'display': 'none' });
    $('.associadoInfo').css({ 'display': 'none' });

    $associadosArea = document.getElementById("associadoInfo");
    $associadosArea.setAttribute("data-id-associado", "");
  } else {
    $("#associados .valueLine").removeClass("active");
    linhaAssociado.classList.add("active");

    //load data into the inputs in the page
    getAssociadoById(id.replace("associado-", ""));
  }
}

/* get associado info by selected */
function getAssociadoById(idAssociado) {
  idAssociado = idAssociado.replace("associado-", "");
  listaAssociados = document.querySelector("#associados");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        getAllDataByAssociado(JSON.parse(resp[1]));
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro para aceder à informação dos Associados.");
      }
    }
  };
  xhttp.open(
    "GET",
    "functions/func-associados-fundadores.php?cmdEval=getAllAssociadosByIdAssociado&id_associado=" +
    idAssociado
  );
  xhttp.send();
}

/* get associado info */
function getAllDataByAssociado(associado) {
  $associadosArea = document.getElementById("associadoInfo");
  $associadosArea.setAttribute(
    "data-id-associado",
    "associado-" + associado[0].id
  );

  var $input_title_pt = $("#associadoInfo #af-titulo-pt");
  var $input_title_en = $("#associadoInfo #af-titulo-en");

  var $input_text_pt = $("#associadoInfo #af-text-pt");
  var $input_text_en = $("#associadoInfo #af-text-en");

  var $input_img_link = $("#associadoInfo #af-img-link");

  $input_title_pt.val(associado[0].title);
  $input_title_en.val(associado[0].title_en);

  $('#associadoInfo').css({ 'display': 'flex' });
  $('.associadoInfo').css({ 'display': 'flex' });

  $input_text_pt.next().find('.note-editable').html(associado[0].text);
  $input_text_en.next().find('.note-editable').html(associado[0].text_en);

  $('.af-text-pt span').text(800 - associado[0].text.replace(/(<([^>]+)>)/ig, "").length);
  $('.af-text-en span').text(800 - associado[0].text_en.replace(/(<([^>]+)>)/ig, "").length);

  $input_img_link.val(associado[0].img_link);

  $("#updateAssociado").attr("data-id-associado", associado[0].id);
}

/* update associado */
var $updateAssociadoBtn = $("#updateAssociado");
$updateAssociadoBtn.click(function () {
  var id = $("#updateAssociado").attr("data-id-associado");
  var titlePT = $("#af-titulo-pt");
  var titleEN = $("#af-titulo-en");
  var textPT = $("#af-text-pt");
  var textEN = $("#af-text-en");
  var img = $("#af-img");
  var img_link = $("#af-img-link");

  $associadosArea = document.getElementById('associadoInfo');
  var associado_id = $associadosArea.getAttribute('data-id-associado');

  if (associado_id != null)
    associado_id = associado_id.replace("associado-", "");
  else
    associado_id = ''

  var dataAssociado = {
    id: id,
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
    img: img.val(),
    img_link: img_link.val()
  };

  if (dataAssociado.textEN.replace(/(<([^>]+)>)/ig, '').length > 800) {
    $(".af-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".af-text-en.erro").text("");
  }

  if (dataAssociado.textEN.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".af-text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataAssociado.textPT.replace(/(<([^>]+)>)/ig, '').length > 800) {
      $(".af-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".af-text-pt.erro").text("");
    }
  }

  if (dataAssociado.titlePT == "") {
    $(".af-titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".af-titulo-pt.erro").text("");
  }

  var file = $("#af-img").prop("files")[0];

  var associado = new FormData();

  if (dataAssociado.textPT != "" && dataAssociado.titlePT != "" &&
    dataAssociado.textPT.replace(/(<([^>]+)>)/ig, '').length < 801 &&
    dataAssociado.textEN.replace(/(<([^>]+)>)/ig, '').length < 801) {
    associado.append("cmdEval", "updateAssociado");
    associado.append("id", dataAssociado.id);
    associado.append("titlePT", dataAssociado.titlePT);
    associado.append("titleEN", dataAssociado.titleEN);
    associado.append("textPT", dataAssociado.textPT);
    associado.append("textEN", dataAssociado.textEN);
    associado.append("file", file);
    associado.append("img_link", dataAssociado.img_link);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Associado guardado com sucesso!", "success");

          var inputs = document.getElementById("associadoInfo").getElementsByTagName("input");

          for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text") inputs[index].value = "";
          }

          $("#af-text-pt").next().find('.note-editable').html('');
          $("#af-text-en").next().find('.note-editable').html('');

          $('#associadoInfo').css({ 'display': 'none' });
          $('.associadoInfo').css({ 'display': 'none' });

          $('.af-text-pt span').text('800');
          $('.af-text-en span').text('800');

          if ($associadosArea) {
            if (associado_id == '')
              getAssociados(null, null);
            else
              getAssociados(null, associado_id);

            $associadosArea = document.getElementById('associadoInfo');
            $associadosArea.setAttribute('data-id-associado', '');
          } else {
            getAssociados("last", null);
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

    xhttp.open("POST", "functions/func-associados-fundadores.php", true);
    xhttp.send(associado);
  }
});
