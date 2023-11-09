/* eslint-disable */
window.addEventListener("load", function (e) {
    getCategorias();
  
    var alignBtnsIntro = $(".img-align-cell");
  
    alignBtnsIntro.each(function () {
      $(this).on("click", function () {
        $(this).toggleClass("active");
        $(".img-align-cell").not(this).removeClass("active");
      });
    });
});
  
  function getCategorias() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var cats = JSON.parse(resp[1]);

                select = document.getElementById("cats-id");
                cats.forEach(cat => {
                    option = document.createElement("option");
                    option.value = cat.id;
                    option.innerText = cat.title;
                    select.append(option);
                })
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
    xhttp.open("GET", "functions/func-adicionar-fotografia.php?cmdEval=getListaCategorias");
    xhttp.send();
    }
  
  /* save foto */
  var $saveFotoBtn = $("#saveFoto");
  $saveFotoBtn.click(function () {
    var titlePT = $("#img-title");
    var img = $("#gallery-img");
    var align = $(".img-align-cell.active input");
    var categoria_id = $('#cats-id').val();
  
    $fotosArea = document.getElementById("infoImg");
    var foto_id = $fotosArea.getAttribute("data-id-foto");
  
    if (foto_id != null) foto_id = foto_id.replace("foto-", "");
    else foto_id = "";
  
    var dataFoto = {
      titlePT: titlePT.val(),
      img: img.val(),
      align: align.val(),
      categoria_id: categoria_id
    };
  
    if (dataFoto.titlePT == "") {
      $(".foto-titulo.erro").text("Por favor, inserir o título.");
    } else {
      $(".foto-titulo.erro").text("");
    }
  
    var file = $("#gallery-img").prop("files")[0];
  
    var foto = new FormData();
  
    if (dataFoto.titlePT != "") {
      foto.append("cmdEval", "saveFotografia");
      foto.append("titlePT", dataFoto.titlePT);
      foto.append("file", file);
      foto.append("align", dataFoto.align);
      foto.append("categoria_id", dataFoto.categoria_id);

      // console.log(dataFoto);
  
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resp = this.responseText.split("||");
          if (resp[0] == "true") {
            $.notify("Fotografia guardada com sucesso!", "success");
            setTimeout(() => {
                window.location.href = "https://backoffice.v21.pt/modules/pages/galeria/galeria.php";
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
  
      xhttp.open("POST", "functions/func-adicionar-fotografia.php", true);
      xhttp.send(foto);
    }
  });
  