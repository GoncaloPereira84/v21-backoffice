/* eslint-disable */
window.addEventListener("load", function (e) {
  getV21Rural();

  var alignBtnsIntro = $(".img-align-cell");

  alignBtnsIntro.each(function () {
    $(this).on("click", function () {
      $(this).toggleClass("active");
      $(".img-align-cell").not(this).removeClass("active");
    });
  });

  $('#text1-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 550) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text1-pt span').text(550 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 550) {
          maxPaste = 550 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.text1-pt span').text(550 - t.length);
      }
    }
  });

  $('#text1-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 550) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text1-en span').text(550 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 550) {
          maxPaste = 550 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.text1-en span').text(550 - t.length);
      }
    }
  });

  $('#text2-pt').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 550) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text2-pt span').text(550 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 550) {
          maxPaste = 550 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.text2-pt span').text(550 - t.length);
      }
    }
  });

  $('#text2-en').summernote({
    lang: 'pt-PT',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['link', 'picture']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 550) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text2-en span').text(550 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 550) {
          maxPaste = 550 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.text2-en span').text(550 - t.length);
      }
    }
  });

  $('#text3-pt').summernote({
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
        $('.text3-pt span').text(300 - t.trim().length);
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
        $('.text3-pt span').text(300 - t.length);
      }
    }
  });

  $('#text3-en').summernote({
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
        $('.text3-en span').text(300 - t.trim().length);
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
        $('.text3-en span').text(300 - t.length);
      }
    }
  });
});

$("#text1-pt").on("keypress", function () {
  var limiteCaracteres = 550;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text1-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#text1-en").on("keypress", function () {
  var limiteCaracteres = 550;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text1-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#text2-pt").on("keypress", function () {
  var limiteCaracteres = 550;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text2-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#text2-en").on("keypress", function () {
  var limiteCaracteres = 550;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text2-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#text3-pt").on("keypress", function () {
  var limiteCaracteres = 300;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text3-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#text3-en").on("keypress", function () {
  var limiteCaracteres = 300;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".text3-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

/* get startup school info */
function getV21Rural() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        var info = JSON.parse(resp[1])[0];
        $("#titulo-pt").val(info.title);
        $("#titulo-en").val(info.title_en);

        $("#text1-pt").next().find('.note-editable').html(info.text1);
        $("#text1-en").next().find('.note-editable').html(info.text1_en);

        $('.text1-pt span').text(550 - info.text1.replace(/(<([^>]+)>)/ig, "").length);
        $('.text1-en span').text(550 - info.text1_en.replace(/(<([^>]+)>)/ig, "").length);

        $("#text2-pt").next().find('.note-editable').html(info.text2);
        $("#text2-en").next().find('.note-editable').html(info.text2_en);

        $('.text2-pt span').text(550 - info.text2.replace(/(<([^>]+)>)/ig, "").length);
        $('.text2-en span').text(550 - info.text2_en.replace(/(<([^>]+)>)/ig, "").length);

        $("#text3-pt").next().find('.note-editable').html(info.text3);
        $("#text3-en").next().find('.note-editable').html(info.text3_en);

        $('.text3-pt span').text(300 - info.text3.replace(/(<([^>]+)>)/ig, "").length);
        $('.text3-en span').text(300 - info.text3_en.replace(/(<([^>]+)>)/ig, "").length);

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

        $("#v21-img-actual").attr("src", info.img_src);

        $("#v21-img-actual-alinhamento").val(align);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação da V21 Rural.");
      }
    }
  };

  xhttp.open("GET", "functions/func-v21-rural.php?cmdEval=getV21Rural");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update intro */
var $updateIntroBtn = $("#updateV21Rural");
$updateIntroBtn.click(function () {
  var titlePT = $("#titulo-pt");
  var titleEN = $("#titulo-en");

  var text1PT = $("#text1-pt");
  var text1EN = $("#text1-en");

  var text2PT = $("#text2-pt");
  var text2EN = $("#text2-en");

  var text3PT = $("#text3-pt");
  var text3EN = $("#text3-en");

  var link = $("#link");

  var img = $("#sv21s-img");
  var align = $(".img-align-cell.active input");

  var dataMF = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    text1PT: text1PT.next().find('.note-editable').html(),
    text1EN: text1EN.next().find('.note-editable').html(),
    text2PT: text2PT.next().find('.note-editable').html(),
    text2EN: text2EN.next().find('.note-editable').html(),
    text3PT: text3PT.next().find('.note-editable').html(),
    text3EN: text3EN.next().find('.note-editable').html(),
    link: link.val(),
    img: img.val(),
    align: align.val(),
  };

  if (dataMF.link == "") {
    $(".link.erro").text("Por favor, inserir o texto.");
  } else {
    $(".link.erro").text("");
  }

  if (dataMF.text3EN.replace(/(<([^>]+)>)/ig, '').length > 300) {
    $(".text3-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".text3-en.erro").text("");
  }

  if (dataMF.text3PT == '') {
    $(".text3-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataMF.text3PT.replace(/(<([^>]+)>)/ig, '').length > 300) {
      $(".text3-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".text3-pt.erro").text("");
    }
  }

  if (dataMF.text2EN.replace(/(<([^>]+)>)/ig, '').length > 550) {
    $(".text2-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".text2-en.erro").text("");
  }

  if (dataMF.text2PT == '') {
    $(".text2-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataMF.text2PT.replace(/(<([^>]+)>)/ig, '').length > 550) {
      $(".text2-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".text2-pt.erro").text("");
    }
  }

  if (dataMF.text1EN.replace(/(<([^>]+)>)/ig, '').length > 550) {
    $(".text1-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".text1-en.erro").text("");
  }

  if (dataMF.text1PT == '') {
    $(".text1-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataMF.text1PT.replace(/(<([^>]+)>)/ig, '').length > 550) {
      $(".text1-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".text1-pt.erro").text("");
    }
  }

  if (dataMF.titlePT == "") {
    $(".titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".titulo-pt.erro").text("");
  }

  var file = $("#v21-img").prop("files")[0];

  var mf = new FormData();

  if (dataMF.titlePT != "" && dataMF.text1PT != '' && dataMF.text2PT != '' && dataMF.text3PT != '' && dataMF.link != "" &&
    dataMF.text1PT.replace(/(<([^>]+)>)/ig, '').length < 551 &&
    dataMF.text2PT.replace(/(<([^>]+)>)/ig, '').length < 551 &&
    dataMF.text3PT.replace(/(<([^>]+)>)/ig, '').length < 301 &&
    dataMF.text1EN.replace(/(<([^>]+)>)/ig, '').length < 551 &&
    dataMF.text2EN.replace(/(<([^>]+)>)/ig, '').length < 551 &&
    dataMF.text3EN.replace(/(<([^>]+)>)/ig, '').length < 301) {
    mf.append("cmdEval", "updateV21Rural");
    mf.append("titlePT", dataMF.titlePT);
    mf.append("titleEN", dataMF.titleEN);
    mf.append("text1PT", dataMF.text1PT);
    mf.append("text1EN", dataMF.text1EN);
    mf.append("text2PT", dataMF.text2PT);
    mf.append("text2EN", dataMF.text2EN);
    mf.append("text3PT", dataMF.text3PT);
    mf.append("text3EN", dataMF.text3EN);
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

    xhttp.open("POST", "functions/func-v21-rural.php", true);
    xhttp.send(mf);
  }
});