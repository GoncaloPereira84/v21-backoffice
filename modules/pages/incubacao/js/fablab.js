/* eslint-disable */
window.addEventListener("load", function (e) {
  getFablab();

  var alignBtnsIntro = $(".img-align-cell");

  alignBtnsIntro.each(function () {
    $(this).on("click", function () {
      $(this).toggleClass("active");
      $(".img-align-cell").not(this).removeClass("active");
    });
  });

  $('#fablab-text-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 1000) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.fablab-text-pt span').text(1000 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 1000) {
          maxPaste = 1000 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.fablab-text-pt span').text(1000 - t.length);
      }
    }
  });

  $('#fablab-text-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 1000) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.fablab-text-en span').text(1000 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 1000) {
          maxPaste = 1000 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.fablab-text-en span').text(1000 - t.length);
      }
    }
  });
});

$("#fablab-text-pt").on("keypress", function () {
  var limiteCaracteres = 1000;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".fablab-text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#fablab-text-en").on("keypress", function () {
  var limiteCaracteres = 1000;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".fablab-text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

/* get fablab info */
function getFablab() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        var info = JSON.parse(resp[1])[0];
        $("#fablab-pt").val(info.title);
        $("#fablab-en").val(info.title_en);

        $("#fablab-text-pt").next().find('.note-editable').html(info.text);
        $("#fablab-text-en").next().find('.note-editable').html(info.text_en);

        $('.fablab-text-pt span').text(1000 - info.text.replace(/(<([^>]+)>)/ig, "").length);
        $('.fablab-text-en span').text(1000 - info.text_en.replace(/(<([^>]+)>)/ig, "").length);

        $("#fablab-img-actual").attr("src", info.img_src);

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

        $("#fablab-img-actual-alinhamento").val(align);
        $("#fablab-img-actual-alinhamento").attr('data-align', info.img_align);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação do Fablab");
      }
    }
  };

  xhttp.open("GET", "functions/func-fablab.php?cmdEval=getFablab");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update fablab */
var $updateFablabBtn = $("#updateFablab");
$updateFablabBtn.click(function () {
  var titlePT = $("#fablab-pt");
  var titleEN = $("#fablab-en");

  var textPT = $("#fablab-text-pt");
  var textEN = $("#fablab-text-en");

  var img = $("#fablab-img");
  var align;

  if ($(".img-align-cell.active").length > 0) {
    align = $(".img-align-cell.active input").val();
  } else {
    align = $("#fablab-img-actual-alinhamento").attr('data-align');
  }

  var dataFablab = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
    img: img.val(),
    align: align
  };

  if (dataFablab.textEN.replace(/(<([^>]+)>)/ig, '').length > 1000) {
    $(".fablab-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".fablab-text-en.erro").text("");
  }

  if (dataFablab.textPT == "") {
    $(".fablab-text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataFablab.textPT.replace(/(<([^>]+)>)/ig, '').length > 1000) {
      $(".fablab-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".fablab-text-pt.erro").text("");
    }
  }

  if (dataFablab.titlePT == "") {
    $(".fablab-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".fablab-pt.erro").text("");
  }

  var file = $("#fablab-img").prop("files")[0];

  var fablab = new FormData();

  if (dataFablab.titlePT != "" && dataFablab.textPT != "" &&
    dataFablab.textPT.replace(/(<([^>]+)>)/ig, '').length < 1001 &&
    dataFablab.textEN.replace(/(<([^>]+)>)/ig, '').length < 1001) {
    fablab.append("cmdEval", "updateFablab");
    fablab.append("titlePT", dataFablab.titlePT);
    fablab.append("titleEN", dataFablab.titleEN);
    fablab.append("textPT", dataFablab.textPT);
    fablab.append("textEN", dataFablab.textEN);
    fablab.append("file", file);
    fablab.append("align", dataFablab.align);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Fablab guardado com sucesso!", "success");
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

    xhttp.open("POST", "functions/func-fablab.php", true);
    xhttp.send(fablab);
  }
});
