/* eslint-disable */
window.addEventListener("load", function (e) {
  getMovingForward();

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
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 1100) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text-pt span').text(1100 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 1100) {
          maxPaste = 1100 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.text-pt span').text(1100 - t.length);
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
        if (t.trim().length >= 1100) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text-en span').text(1100 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 1100) {
          maxPaste = 1100 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.text-en span').text(1100 - t.length);
      }
    }
  });
});

$("#text-pt").on("keypress", function () {
  var limiteCaracteres = 1100;
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
  var limiteCaracteres = 1100;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

/* get moving forward info */
function getMovingForward() {
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

        $('.text-pt span').text(1100 - info.text.replace(/(<([^>]+)>)/ig, "").length);
        $('.text-en span').text(1100 - info.text_en.replace(/(<([^>]+)>)/ig, "").length);

        $("#link").val(info.link);

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

        $("#mf-img-actual").attr("src", info.img_src);

        $("#mf-img-actual-alinhamento").val(align);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação do Moving Forward");
      }
    }
  };

  xhttp.open("GET", "functions/func-moving-forward.php?cmdEval=getMovingForward");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update intro */
var $updateIntroBtn = $("#updateMovingForward");
$updateIntroBtn.click(function () {
  var titlePT = $("#titulo-pt");
  var titleEN = $("#titulo-en");

  var textPT = $("#text-pt");
  var textEN = $("#text-en");

  var link = $("#link");

  var img = $("#mf-img");
  var align = $(".img-align-cell.active input");

  var dataMF = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
    link: link.val(),
    img: img.val(),
    align: align.val(),
  };

  if (dataMF.link == "") {
    $(".link.erro").text("Por favor, inserir o texto.");
  } else {
    $(".link.erro").text("");
  }

  if (dataMF.textEN.length > 1100) {
    $(".text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".text-en.erro").text("");
  }

  if (dataMF.textPT.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataMF.textPT.replace(/(<([^>]+)>)/ig, '').length > 1100) {
      $(".text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".text-pt.erro").text("");
    }
  }

  if (dataMF.titlePT == "") {
    $(".titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".titulo-pt.erro").text("");
  }

  var file = $("#mf-img").prop("files")[0];

  var mf = new FormData();

  if (dataMF.titlePT != "" && dataMF.textPT != '' && dataMF.link != "" &&
    dataMF.textPT.replace(/(<([^>]+)>)/ig, '').length < 1101 &&
    dataMF.textEN.replace(/(<([^>]+)>)/ig, '').length < 1101) {
    mf.append("cmdEval", "updateMovingForward");
    mf.append("titlePT", dataMF.titlePT);
    mf.append("titleEN", dataMF.titleEN);
    mf.append("textPT", dataMF.textPT);
    mf.append("textEN", dataMF.textEN);
    mf.append("link", dataMF.link);
    mf.append("file", file);
    mf.append("align", dataMF.align);

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

    xhttp.open("POST", "functions/func-moving-forward.php", true);
    xhttp.send(mf);
  }
});