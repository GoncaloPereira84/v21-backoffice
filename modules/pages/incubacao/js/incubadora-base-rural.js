/* eslint-disable */
window.addEventListener("load", function (e) {
  getBaseRural();

  $('#ibr-text-pt').summernote({
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
        $('.ibr-text-pt span').text(800 - t.trim().length);
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
        $('.ibr-text-pt span').text(800 - t.length);
      }
    }
  });

  $('#ibr-text-en').summernote({
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
        $('.ibr-text-en span').text(800 - t.trim().length);
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
        $('.ibr-text-en span').text(800 - t.length);
      }
    }
  });
});

$("#ibr-text-pt").on("keypress", function () {
  var limiteCaracteres = 800;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".ibr-text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#ibr-text-en").on("keypress", function () {
  var limiteCaracteres = 800;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".ibr-text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

/* get base rural info */
function getBaseRural() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        var info = JSON.parse(resp[1])[0];
        $("#ibr-pt").val(info.title);
        $("#ibr-en").val(info.title_en);

        $("#ibr-text-pt").next().find('.note-editable').html(info.text);
        $("#ibr-text-en").next().find('.note-editable').html(info.text_en);

        $('.ibr-text-pt span').text(800 - info.text.replace(/(<([^>]+)>)/ig, "").length);
        $('.ibr-text-en span').text(800 - info.text_en.replace(/(<([^>]+)>)/ig, "").length);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação da Incubadora de Base Rural");
      }
    }
  };

  xhttp.open("GET", "functions/func-incubadora-base-rural.php?cmdEval=getBaseRural");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update base rural */
var $updateIBRBtn = $("#updateIBR");
$updateIBRBtn.click(function () {
  var titlePT = $("#ibr-pt");
  var titleEN = $("#ibr-en");

  var textPT = $("#ibr-text-pt");
  var textEN = $("#ibr-text-en");

  var dataBaseRural = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html()
  };

  if (dataBaseRural.textEN.replace(/(<([^>]+)>)/ig, '').length > 800) {
    $(".ibr-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".ibr-text-en.erro").text("");
  }

  if (dataBaseRural.textPT == "") {
    $(".ibr-text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataBaseRural.textPT.replace(/(<([^>]+)>)/ig, '').length > 800) {
      $(".ibr-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".ibr-text-pt.erro").text("");
    }
  }

  if (dataBaseRural.titlePT == "") {
    $(".ibr-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".ibr-pt.erro").text("");
  }

  var baseRural = new FormData();

  if (dataBaseRural.titlePT != "" && dataBaseRural.textPT != "" &&
    dataBaseRural.textPT.replace(/(<([^>]+)>)/ig, '').length < 801 &&
    dataBaseRural.textEN.replace(/(<([^>]+)>)/ig, '').length < 801) {
    baseRural.append("cmdEval", "updateBaseRural");
    baseRural.append("titlePT", dataBaseRural.titlePT);
    baseRural.append("titleEN", dataBaseRural.titleEN);
    baseRural.append("textPT", dataBaseRural.textPT);
    baseRural.append("textEN", dataBaseRural.textEN);

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

    xhttp.open("POST", "functions/func-incubadora-base-rural.php", true);
    xhttp.send(baseRural);
  }
});
