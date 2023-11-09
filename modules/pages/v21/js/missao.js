/* eslint-disable */
window.addEventListener("load", function (e) {
  getMissaoInfo();

  $('#missao-intro-pt').summernote({
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
        $('.missao-intro-pt span').text(250 - t.trim().length);
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
        $('.missao-intro-pt span').text(250 - t.length);
      }
    }
  });

  $('#missao-intro-en').summernote({
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
        $('.missao-intro-en span').text(250 - t.trim().length);
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
        $('.missao-intro-en span').text(250 - t.length);
      }
    }
  });

  $('#missao-text-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 900) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.missao-text-pt span').text(900 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 900) {
          maxPaste = 900 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.missao-text-pt span').text(900 - t.length);
      }
    }
  });

  $('#missao-text-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 900) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.missao-text-en span').text(900 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 900) {
          maxPaste = 900 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.missao-text-en span').text(900 - t.length);
      }
    }
  });
});

/* get missao info */
function getMissaoInfo() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        var info = JSON.parse(resp[1])[0];
        $('#title-pt').val(info.title);
        $('#title-en').val(info.title_en);

        $('#missao-intro-pt').next().find('.note-editable').html(info.intro);
        $('#missao-intro-en').next().find('.note-editable').html(info.intro_en);

        $('#missao-text-pt').next().find('.note-editable').html(info.text);
        $('#missao-text-en').next().find('.note-editable').html(info.text_en);

        $('.missao-intro-pt span').text(250 - info.intro.replace(/(<([^>]+)>)/ig, "").length);
        $('.missao-intro-en span').text(250 - info.intro_en.replace(/(<([^>]+)>)/ig, "").length);
        $('.missao-text-pt span').text(900 - info.text.replace(/(<([^>]+)>)/ig, "").length);
        $('.missao-text-en span').text(900 - info.text_en.replace(/(<([^>]+)>)/ig, "").length);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação da Missão");
      }
    }
  };

  xhttp.open("GET", "functions/func-missao.php?cmdEval=getMissaoInfo");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update missao */
var $updateMissaoBtn = $("#updateMissao");
$updateMissaoBtn.click(function () {
  var titlePT = $("#title-pt");
  var titleEN = $("#title-en");
  var introPT = $("#missao-intro-pt");
  var introEN = $("#missao-intro-en");
  var textPT = $("#missao-text-pt");
  var textEN = $("#missao-text-en");

  var dataMissao = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    introPT: introPT.next().find('.note-editable').html(),
    introEN: introEN.next().find('.note-editable').html(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html()
  };

  // if (dataMissao.textPT == '') {
  //   $(".texto-pt.erro").text("Por favor, inserir o texto.");
  // } else {
  //   $(".texto-pt.erro").text("");
  // }
  if (dataMissao.textEN.replace(/(<([^>]+)>)/ig, '').length > 900) {
    $(".texto-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".texto-en.erro").text("");
  }

  if (dataMissao.textPT.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".texto-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataMissao.textPT.replace(/(<([^>]+)>)/ig, '').length > 900) {
      $(".texto-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".texto-pt.erro").text("");
    }
  }

  // if (dataMissao.introPT == "") {
  //   $(".intro-pt.erro").text("Por favor, inserir o texto.");
  // } else {
  //   $(".intro-pt.erro").text("");
  // }

  if (dataMissao.introEN.replace(/(<([^>]+)>)/ig, '').length > 250) {
    $(".intro-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".intro-en.erro").text("");
  }

  if (dataMissao.introPT.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".intro-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataMissao.introPT.replace(/(<([^>]+)>)/ig, '').length > 250) {
      $(".intro-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".intro-pt.erro").text("");
    }
  }

  if (dataMissao.titlePT == "") {
    $(".title-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".title-pt.erro").text("");
  }

  var missao = new FormData();

  if (
    dataMissao.textPT != '' &&
    dataMissao.introPT != "" &&
    dataMissao.textPT.replace(/(<([^>]+)>)/ig, '').length < 901 &&
    dataMissao.introPT.replace(/(<([^>]+)>)/ig, '').length < 251 &&
    dataMissao.textEN.replace(/(<([^>]+)>)/ig, '').length < 901 &&
    dataMissao.introEN.replace(/(<([^>]+)>)/ig, '').length < 251
  ) {
    missao.append("cmdEval", "updateMissaoInfo");
    missao.append("titlePT", dataMissao.titlePT);
    missao.append("titleEN", dataMissao.titleEN);
    missao.append("introPT", dataMissao.introPT);
    missao.append("introEN", dataMissao.introEN);
    missao.append("textPT", dataMissao.textPT);
    missao.append("textEN", dataMissao.textEN);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Missão guardada com sucesso!", "success");
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

    xhttp.open("POST", "functions/func-missao.php", true);
    xhttp.send(missao);
  }
});
