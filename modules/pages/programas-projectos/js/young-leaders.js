/* eslint-disable */
window.addEventListener("load", function (e) {
  getYoungLeaders();
  getGallery();

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
        if (t.trim().length >= 800) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text-pt span').text(800 - t.trim().length);
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
        $('.text-pt span').text(800 - t.length);
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
        if (t.trim().length >= 800) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.text-en span').text(800 - t.trim().length);
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
        $('.text-en span').text(800 - t.length);
      }
    }
  });
});

$("#text-pt").on("keypress", function () {
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

$("#text-en").on("keypress", function () {
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

/* get young leaders info */
function getYoungLeaders() {
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

        $('.text-pt span').text(800 - info.text.replace(/(<([^>]+)>)/ig, "").length);
        $('.text-en span').text(800 - info.text_en.replace(/(<([^>]+)>)/ig, "").length);

        $("#link").val(info.link);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação dos Young Leaders.");
      }
    }
  };

  xhttp.open("GET", "functions/func-young-leaders.php?cmdEval=getYoungLeaders");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update intro */
var $updateIntroBtn = $("#updateYoungLeaders");
$updateIntroBtn.click(function () {
  var titlePT = $("#titulo-pt");
  var titleEN = $("#titulo-en");

  var textPT = $("#text-pt");
  var textEN = $("#text-en");

  var link = $("#link");

  var dataYL = {
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
    link: link.val(),
  };

  if (dataYL.link == "") {
    $(".link.erro").text("Por favor, inserir o texto.");
  } else {
    $(".link.erro").text("");
  }

  if (dataYL.textEN.replace(/(<([^>]+)>)/ig, '').length > 800) {
    $(".text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".text-en.erro").text("");
  }

  if (dataYL.textPT.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataYL.textPT.replace(/(<([^>]+)>)/ig, '').length > 800) {
      $(".text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".text-pt.erro").text("");
    }
  }

  if (dataYL.titlePT == "") {
    $(".titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".titulo-pt.erro").text("");
  }

  var yl = new FormData();

  if (dataYL.titlePT != "" && dataYL.textPT != "" && dataYL.link != "" &&
    dataYL.textPT.replace(/(<([^>]+)>)/ig, '').length < 801 &&
    dataYL.textEN.replace(/(<([^>]+)>)/ig, '').length < 801) {
    yl.append("cmdEval", "updateYoungLeaders");
    yl.append("titlePT", dataYL.titlePT);
    yl.append("titleEN", dataYL.titleEN);
    yl.append("textPT", dataYL.textPT);
    yl.append("textEN", dataYL.textEN);
    yl.append("link", dataYL.link);

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

    xhttp.open("POST", "functions/func-young-leaders.php", true);
    xhttp.send(yl);
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

  xhttp.open("GET", "functions/func-young-leaders.php?cmdEval=getGallery");
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

    $("#af-titulo").html("");

    $('#infoImg').css({ 'display': 'none' });
    $('.infoImg').css({ 'display': 'none' });

    var alignBtns = $("#img-align-gallery .img-align-cell");

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
    "functions/func-young-leaders.php?cmdEval=getAllFotosByIdFoto&id_foto=" +
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

  var alignBtns = $(".img-align-cell");

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
  var imgs = $("#imagens > div");

  if (imgs.length < 4) {
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

            var alignBtns = $(".img-align-cell");

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

      xhttp.open("POST", "functions/func-young-leaders.php", true);
      xhttp.send(foto);
    }
  } else {
    $.notify("Já atingiu o número máximo de imagens nesta galeria.", "warn");
  }
});
