/* eslint-disable */
window.addEventListener("load", function (e) {
    getCategorias();
    getGallery();
  
    var alignBtnsIntro = $(".img-align-cell");
  
    alignBtnsIntro.each(function () {
      $(this).on("click", function () {
        $(this).toggleClass("active");
        $(".img-align-cell").not(this).removeClass("active");
      });
    });

    document.getElementById("cats-id-search").addEventListener("change", function () {
        searchByCategoria();
    })
});

function searchByCategoria() {
    categoria = document.getElementById("cats-id-search").value;
    fotos = document.querySelectorAll("#imagens .valueLine");
    fotos.forEach(foto => {
        if (categoria == "null") {
            foto.style.display = "flex";
        } else {
            if (foto.dataset.categoria != categoria) {
                foto.style.display = "none";
            } else {
                foto.style.display = "flex";
            }
        }
    });
}
  
  function getCategorias() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                var cats = JSON.parse(resp[1]);
                select_search = document.getElementById("cats-id-search");
                cats.forEach(cat => {
                    option = document.createElement("option");
                    option.value = cat.id;
                    option.innerText = cat.title;
                    select_search.append(option);
                })

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
    xhttp.open("GET", "functions/func-galeria.php?cmdEval=getListaCategorias");
    xhttp.send();
    }
  
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
  
    xhttp.open("GET", "functions/func-galeria.php?cmdEval=getGallery");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
  }
  
  /* print galeria */
  function printGaleria(fotos, last, idFoto) {
    imagensArea = document.querySelector("#imagens");
    document.querySelector("#imagens").innerHTML = "";
    arrayStatus = [];
    imagensArea.innerHTML = "";

    var categorias;
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                categorias = JSON.parse(resp[1]);

                for (const i in fotos) {
                    if (fotos.hasOwnProperty(i)) {
                      const foto = fotos[i];
                      linha = document.createElement("div");
                      linha.id = "foto-" + foto.id;
                      linha.classList.add("col-lg-10");
                      linha.classList.add("valueLine");
                      linha.style.display = "flex";
                      linha.style.cursor = "pointer";
                      linha.dataset.categoria = foto.categoria_id;
                
                      var imagem;
                      if (foto.img_src == null || foto.img_src == "") {
                        imagem = "Não tem imagem.";
                      } else {
                        var splitSrc = foto.img_src.split("uploads");
                        imagem =
                          '<img style="width: 60%;" src="../../../uploads' +
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

                      var map = Array.prototype.map;
                        var cat = [];
                        
                        var pid = foto.categoria_id.split(',');

                        map.call(categorias, function (c) {
                            if (c.id == foto.categoria_id) {
                                cat.push(c.title);
                            } else {
                                map.call(pid, function(p){
                                    if (c.id == p) {
                                        cat.push(c.title);
                                    }
                                })
                            }
                        });
                
                      html = `
                              <div class="col-lg-3">${foto.title}</div>
                              <div class="col-lg-3">${cat}</div>
                              <div class="col-lg-3">${imagem}</div>
                              <div class="col-lg-3">${align}</div>
                          `;
                      linha.innerHTML = html;
                      linha.addEventListener("click", function () {
                        selectFoto("foto-" + foto.id);
                      });
                      imagensArea.append(linha);
                    }
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
    xhttp.open("GET", "functions/func-galeria.php?cmdEval=getListaCategorias");
    xhttp.send();
  
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

      $('#infoImg').css({'display': 'none'});
      $('.infoImg').css({'display': 'none'});
  
      var alignBtns = $(".img-align-cell");
  
      alignBtns.each(function () {
        $(this).removeClass("active");
      });

      document.getElementById('cats-id').value = '';
  
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
      "functions/func-galeria.php?cmdEval=getAllFotosByIdFoto&id_foto=" +
        idFoto
    );
    xhttp.send();
  }
  
  /* get foto info */
  function getAllDataByFoto(foto) {
    $fotosArea = document.getElementById("infoImg");
    $fotosArea.setAttribute("data-id-foto", "foto-" + foto[0].id);
  
    var alignBtns = $(".img-align-cell");
  
    alignBtns.each(function () {
      $(this).removeClass("active");
    });
  
    $(".img-align-cell." + foto[0].img_align).addClass(
      "active"
    );

    $('#infoImg').css({'display': 'flex'});
    $('.infoImg').css({'display': 'flex'});

    var cats = foto[0].categoria_id.split(',');
    var $input_select = $('#infoImg #cats-id');
    $input_select.val(cats);

    var $input_titulo = $('#infoImg #img-title');
    $input_titulo.val(foto[0].title);
  
    $("#saveGaleria").attr("data-id-foto", foto[0].id);
    $("#deleteFotografia").attr("data-id-foto", foto[0].id);
  }
  
  /* update foto */
  var $saveGalleryBtn = $("#saveGaleria");
  $saveGalleryBtn.click(function () {
    var id = $("#saveGaleria").attr("data-id-foto");
    var titlePT = $("#img-title");
    var img = $("#gallery-img");
    var align = $(".img-align-cell.active input");
    var categoria_id = $('#cats-id').val();
  
    $fotosArea = document.getElementById("infoImg");
    var foto_id = $fotosArea.getAttribute("data-id-foto");
  
    if (foto_id != null) foto_id = foto_id.replace("foto-", "");
    else foto_id = "";
  
    var dataFoto = {
      id: id,
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
      foto.append("cmdEval", "updateGallery");
      foto.append("id", dataFoto.id);
      foto.append("titlePT", dataFoto.titlePT);
      foto.append("file", file);
      foto.append("align", dataFoto.align);
      foto.append("categoria_id", dataFoto.categoria_id);
  
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

            $('#infoImg').css({'display': 'none'});
            $('.infoImg').css({'display': 'none'});
  
            var alignBtns = $(".img-align-cell");
  
            alignBtns.each(function () {
              $(this).removeClass("active");
            });

            document.getElementById('cats-id').value = '';
  
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
  
      xhttp.open("POST", "functions/func-galeria.php", true);
      xhttp.send(foto);
    }
  });
  
  /**
 * delete post
 */
var $deletePostBtn = $('#deleteFotografia');
$deletePostBtn.click(function (id) {
    id = document.getElementById('deleteFotografia').getAttribute('data-id-foto');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getGallery()
                $.notify("Fotografia apagada com sucesso.", "success");

                var inputs = document.getElementById('infoImg').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text")
                        inputs[index].value = '';
                }

                $('#infoImg').css({'display': 'none'});
                $('.infoImg').css({'display': 'none'});

                var alignBtns = $(".img-align-cell");
  
                alignBtns.each(function () {
                  $(this).removeClass("active");
                });

                document.getElementById('cats-id').value = '';
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar a fotografia.");
            }
        }
    }
    xhttp.open("GET", "functions/func-galeria.php?cmdEval=deleteFotografia&id=" + id);
    xhttp.send();
});