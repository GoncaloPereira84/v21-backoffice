/* eslint-disable */
window.addEventListener("load", function (e) {
  getParceiros();

  $('#parceiro-text-pt').summernote({
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      // ['fontname', ['fontname']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 650) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.parceiro-text-pt span').text(650 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 650) {
          maxPaste = 650 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.parceiro-text-pt span').text(650 - t.length);
      }
    }
  });

  $('#parceiro-text-en').summernote({
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      // ['fontname', ['fontname']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    callbacks: {
      onKeydown: function (e) {
        var t = e.currentTarget.innerText;
        if (t.trim().length >= 650) {
          //delete keys, arrow keys, copy, cut, select all
          if (e.keyCode != 8 && !(e.keyCode >= 37 && e.keyCode <= 40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey))
            e.preventDefault();
        }
      },
      onKeyup: function (e) {
        var t = e.currentTarget.innerText;
        $('.parceiro-text-en span').text(650 - t.trim().length);
      },
      onPaste: function (e) {
        var t = e.currentTarget.innerText;
        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
        e.preventDefault();
        var maxPaste = bufferText.length;
        if (t.length + bufferText.length > 650) {
          maxPaste = 650 - t.length;
        }
        if (maxPaste > 0) {
          document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
        }
        $('.parceiro-text-en span').text(650 - t.length);
      }
    }
  });
});

$("#parceiro-text-pt").on("keypress", function () {
  var limiteCaracteres = 650;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".parceiro-text-pt span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

$("#parceiro-text-en").on("keypress", function () {
  var limiteCaracteres = 650;
  var caracteres = $(this).text();
  var totalCaracteres = caracteres.length;

  //Update Count value
  $(".parceiro-text-en span").text(totalCaracteres);

  //Check and Limit Charaters
  if (totalCaracteres >= limiteCaracteres) {
    return false;
  }
});

/* get parceiros info */
function getParceiros(last, idParceiro) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        printParceiros(JSON.parse(resp[1]), last, idParceiro);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação dos Parceiros");
      }
    }
  };

  xhttp.open(
    "GET",
    "functions/func-parceiros.php?cmdEval=getParceiros"
  );
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print parceiros */
function printParceiros(parceiros, last, idParceiro) {
  parceirosArea = document.querySelector("#parceiros");
  document.querySelector("#parceiros").innerHTML = "";
  arrayStatus = [];
  parceirosArea.innerHTML = "";
  for (const i in parceiros) {
    if (parceiros.hasOwnProperty(i)) {
      const parceiro = parceiros[i];
      linha = document.createElement("div");
      linha.id = "parceiro-" + parceiro.id;
      linha.classList.add("col-lg-12");
      linha.classList.add("valueLine");
      linha.style.display = "flex";
      linha.style.cursor = "pointer";

      var imagem;
      if (parceiro.img_src == null || parceiro.img_src == "") {
        imagem = "Não tem imagem.";
      } else {
        var splitSrc = parceiro.img_src.split("uploads");
        imagem =
          '<img style="width: 60%;" src="../../../uploads' +
          splitSrc[1] +
          '" />';
      }

      var principal;
      parceiro.principal == 1 ? principal = 'Sim' : principal = 'Não';

      html = `
              <div class="col-lg-2">${parceiro.title}</div>
              <div class="col-lg-4">${parceiro.text}</div>
              <div class="col-lg-2">${principal}</div>
              <div class="col-lg-2">${imagem}</div>
              <div class="col-lg-2">${parceiro.img_link}</div>
          `;
      linha.innerHTML = html;
      linha.addEventListener("click", function () {
        selectParceiro("parceiro-" + parceiro.id);
      });
      parceirosArea.append(linha);
    }
  }

  if (last != null) {
    document
      .querySelector("#parceiros .row:first-child")
      .classList.add("active");
  }
  if (idParceiro != null) {
    document
      .querySelector("#parceiros #parceiro-" + idParceiro)
      .classList.add("active");
  }
}

/* select parceiro */
function selectParceiro(id) {
  linhaParceiro = document.getElementById(id);

  /**
   * events triggered by selection and deselection
   * this code block only concerns the new/edit modal inputs
   */
  if (linhaParceiro.classList.contains("active")) {
    linhaParceiro.classList.remove("active");
    var inputs = document
      .getElementById("parceiroInfo")
      .getElementsByTagName("input");

    for (index = 0; index < inputs.length; ++index) {
      if (inputs[index].type == "text") inputs[index].value = "";
    }

    $("#parceiro-text-pt").next().find('.note-editable').html('');
    $("#parceiro-text-en").next().find('.note-editable').html('');

    $('.parceiro-text-pt span').text('650');
    $('.parceiro-text-en span').text('650');

    $('#parceiroInfo').css({ 'display': 'none' });
    $('.parceiroInfo').css({ 'display': 'none' });

    document.getElementById('principal-sim').checked = false;
    document.getElementById('principal-nao').checked = false;

    $parceirosArea = document.getElementById("parceiroInfo");
    $parceirosArea.setAttribute("data-id-parceiro", "");
  } else {
    $("#parceiros .valueLine").removeClass("active");
    linhaParceiro.classList.add("active");

    //load data into the inputs in the page
    getParceiroById(id.replace("parceiro-", ""));
  }
}

/* get parceiro info by selected */
function getParceiroById(idParceiro) {
  idParceiro = idParceiro.replace("parceiro-", "");
  listaParceiros = document.querySelector("#parceiros");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        getAllDataByParceiro(JSON.parse(resp[1]));
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro para aceder à informação dos Parceiros.");
      }
    }
  };
  xhttp.open(
    "GET",
    "functions/func-parceiros.php?cmdEval=getAllParceirosByIdParceiro&id_parceiro=" +
    idParceiro
  );
  xhttp.send();
}

/* get parceiro info */
function getAllDataByParceiro(parceiro) {
  $parceirosArea = document.getElementById("parceiroInfo");
  $parceirosArea.setAttribute(
    "data-id-parceiro",
    "parceiro-" + parceiro[0].id
  );

  var $input_title_pt = $("#parceiroInfo #parceiro-titulo-pt");
  var $input_title_en = $("#parceiroInfo #parceiro-titulo-en");

  var $input_text_pt = $("#parceiroInfo #parceiro-text-pt");
  var $input_text_en = $("#parceiroInfo #parceiro-text-en");

  var $input_img_link = $("#parceiroInfo #parceiro-img-link");

  $input_title_pt.val(parceiro[0].title);
  $input_title_en.val(parceiro[0].title_en);

  $('#parceiroInfo').css({ 'display': 'flex' });
  $('.parceiroInfo').css({ 'display': 'flex' });

  $input_text_pt.next().find('.note-editable').html(parceiro[0].text);
  $input_text_en.next().find('.note-editable').html(parceiro[0].text_en);

  $('.parceiro-text-pt span').text(650 - parceiro[0].text.replace(/(<([^>]+)>)/ig, "").length);
  $('.parceiro-text-en span').text(650 - parceiro[0].text_en.replace(/(<([^>]+)>)/ig, "").length);

  $input_img_link.val(parceiro[0].img_link);

  $("input[name=principal][value=" + parceiro[0].principal + "]").attr('checked', true);

  $("#updateParceiro").attr("data-id-parceiro", parceiro[0].id);
}

/* update parceiro */
var $updateParceiroBtn = $("#updateParceiro");
$updateParceiroBtn.click(function () {
  var id = $("#updateParceiro").attr("data-id-parceiro");
  var titlePT = $("#parceiro-titulo-pt");
  var titleEN = $("#parceiro-titulo-en");
  var textPT = $("#parceiro-text-pt");
  var textEN = $("#parceiro-text-en");
  var principal = $('#parceiroInfo input[name=principal]:checked');
  var img = $("#parceiro-img");
  var img_link = $("#parceiro-img-link");

  $parceirosArea = document.getElementById('parceiroInfo');
  var parceiro_id = $parceirosArea.getAttribute('data-id-parceiro');

  if (parceiro_id != null)
    parceiro_id = parceiro_id.replace("parceiro-", "");
  else
    parceiro_id = ''

  var dataParceiro = {
    id: id,
    titlePT: titlePT.val(),
    titleEN: titleEN.val(),
    textPT: textPT.next().find('.note-editable').html(),
    textEN: textEN.next().find('.note-editable').html(),
    principal: principal.val(),
    img: img.val(),
    img_link: img_link.val(),
  };

  if (dataParceiro.textEN.replace(/(<([^>]+)>)/ig, '').length > 650) {
    $(".parceiro-text-en.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
  } else {
    $(".parceiro-text-en.erro").text("");
  }

  if (dataParceiro.textPT.replace(/(<([^>]+)>)/ig, '').length == 0) {
    $(".parceiro-text-pt.erro").text("Por favor, inserir o texto.");
  } else {
    if (dataParceiro.textPT.replace(/(<([^>]+)>)/ig, '').length > 650) {
      $(".parceiro-text-pt.erro").text("O texto inserido excede o número máximo de caracteres estipulado.");
    } else {
      $(".parceiro-text-pt.erro").text("");
    }
  }

  if (dataParceiro.titlePT == "") {
    $(".parceiro-titulo-pt.erro").text("Por favor, inserir o título.");
  } else {
    $(".parceiro-titulo-pt.erro").text("");
  }

  var file = $("#parceiro-img").prop("files")[0];

  var parceiro = new FormData();

  if (dataParceiro.textPT != "" && dataParceiro.titlePT != "" &&
    dataParceiro.textPT.replace(/(<([^>]+)>)/ig, '').length < 651 &&
    dataParceiro.textEN.replace(/(<([^>]+)>)/ig, '').length < 651) {
    parceiro.append("cmdEval", "updateParceiro");
    parceiro.append("id", dataParceiro.id);
    parceiro.append("titlePT", dataParceiro.titlePT);
    parceiro.append("titleEN", dataParceiro.titleEN);
    parceiro.append("textPT", dataParceiro.textPT);
    parceiro.append("textEN", dataParceiro.textEN);
    parceiro.append("principal", dataParceiro.principal);
    parceiro.append("file", file);
    parceiro.append("img_link", dataParceiro.img_link);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Parceiro guardado com sucesso!", "success");

          var inputs = document
            .getElementById("parceiroInfo")
            .getElementsByTagName("input");

          for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text") inputs[index].value = "";
          }

          $("#parceiro-text-pt").next().find('.note-editable').html('');
          $("#parceiro-text-en").next().find('.note-editable').html('');

          $('#parceiroInfo').css({ 'display': 'none' });
          $('.parceiroInfo').css({ 'display': 'none' });

          $('.parceiro-text-pt span').text('650');
          $('.parceiro-text-en span').text('650');

          document.getElementById('principal-sim').checked = false;
          document.getElementById('principal-nao').checked = false;

          if ($parceirosArea) {
            if (parceiro_id == '')
              getParceiros(null, null);
            else
              getParceiros(null, parceiro_id);

            $parceirosArea = document.getElementById('parceiroInfo');
            $parceirosArea.setAttribute('data-id-parceiro', '');
          } else {
            getParceiros("last", null);
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

    xhttp.open("POST", "functions/func-parceiros.php", true);
    xhttp.send(parceiro);
  }
});
