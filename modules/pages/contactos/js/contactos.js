/* eslint-disable */
window.addEventListener("load", function (e) {
  getMorada1();
  getMorada2();
  getContacts();
});

/* get missao info */
function getMorada1() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        var info = JSON.parse(resp[1])[0];
        $("#nome1").val(info.title1);
        $("#morada1").val(info.morada1);
        $("#coordenadas1").val(info.coords1);
        $("#google-maps-code").val(info.google_maps_code);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação da Morada principal");
      }
    }
  };

  xhttp.open("GET", "functions/func-contactos.php?cmdEval=getMorada1");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update morada 1 */
var $saveMorada1Btn = $("#saveMorada1");
$saveMorada1Btn.click(function () {
  var nome = $("#nome1");
  var morada = $("#morada1");
  var coordenadas = $("#coordenadas1");
  var googleMaps = $("#google-maps-code");

  var dataMorada = {
    nome: nome.val(),
    morada: morada.val(),
    coordenadas: coordenadas.val(),
    googleMaps: googleMaps.val(),
  };

  var morada1 = new FormData();

  if (dataMorada.nome != "" && dataMorada.morada != "") {
    morada1.append("cmdEval", "updateMorada1");
    morada1.append("nome", dataMorada.nome);
    morada1.append("morada", dataMorada.morada);
    morada1.append("coordenadas", dataMorada.coordenadas);
    morada1.append("googleMaps", dataMorada.googleMaps);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Morada principal guardada com sucesso!", "success");
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

    xhttp.open("POST", "functions/func-contactos.php", true);
    xhttp.send(morada1);
  }
});

/* get missao info */
function getMorada2() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      resp = this.responseText.split("||");
      if (resp[0] == "true") {
        var info = JSON.parse(resp[1])[0];
        $("#nome2").val(info.title2);
        $("#morada2").val(info.morada2);
        $("#coordenadas2").val(info.coords2);
      } else if (resp[0] == "false") {
        $.notify(resp[1]);
      } else if (resp[0] == "warn") {
        $.notify(resp[1], "warn");
      } else if (resp[0] == "session_expired") {
        window.location = "login.php";
      } else {
        $.notify("Erro ao aceder à informação da Morada secundária");
      }
    }
  };

  xhttp.open("GET", "functions/func-contactos.php?cmdEval=getMorada2");
  xhttp.send();
  xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* update morada 2 */
var $saveMorada2Btn = $("#saveMorada2");
$saveMorada2Btn.click(function () {
  var nome = $("#nome2");
  var morada = $("#morada2");
  var coordenadas = $("#coordenadas2");

  var dataMorada = {
    nome: nome.val(),
    morada: morada.val(),
    coordenadas: coordenadas.val(),
  };

  var morada2 = new FormData();

  if (dataMorada.nome != "" && dataMorada.morada != "") {
    morada2.append("cmdEval", "updateMorada2");
    morada2.append("nome", dataMorada.nome);
    morada2.append("morada", dataMorada.morada);
    morada2.append("coordenadas", dataMorada.coordenadas);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          $.notify("Morada secundária guardada com sucesso!", "success");
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

    xhttp.open("POST", "functions/func-contactos.php", true);
    xhttp.send(morada2);
  }
});


/* get missao info */
function getContacts() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        resp = this.responseText.split("||");
        if (resp[0] == "true") {
          var info = JSON.parse(resp[1])[0];
          $("#email").val(info.email);
          $("#telefone").val(info.tlf);
          $("#fb-link").val(info.facebook);
          $("#ig-link").val(info.instagram);
          $("#li-link").val(info.linkedin);
          $("#tw-link").val(info.twitter);
          $("#yt-link").val(info.youtube);
        } else if (resp[0] == "false") {
          $.notify(resp[1]);
        } else if (resp[0] == "warn") {
          $.notify(resp[1], "warn");
        } else if (resp[0] == "session_expired") {
          window.location = "login.php";
        } else {
          $.notify("Erro ao aceder à informação dos contactos.");
        }
      }
    };
  
    xhttp.open("GET", "functions/func-contactos.php?cmdEval=getContacts");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
  }
  
  /* update morada 2 */
  var $saveContactsBtn = $("#updateContacts");
  $saveContactsBtn.click(function () {
    var email = $("#email");
    var telefone = $("#telefone");
    var facebook = $("#fb-link");
    var instagram = $("#ig-link");
    var linkedin = $("#li-link");
    var twitter = $("#tw-link");
    var youtube = $("#yt-link");
  
    var dataContacts = {
        email: email.val(),
        telefone: telefone.val(),
        facebook: facebook.val(),
        instagram: instagram.val(),
        linkedin: linkedin.val(),
        twitter: twitter.val(),
        youtube: youtube.val(),
    };
  
    var contactos = new FormData();
  
    // if (dataContacts.email != "" && dataContacts.telefone != "") {
        contactos.append("cmdEval", "updateContacts");
        contactos.append("email", dataContacts.email);
        contactos.append("telefone", dataContacts.telefone);
        contactos.append("facebook", dataContacts.facebook);
        contactos.append("instagram", dataContacts.instagram);
        contactos.append("linkedin", dataContacts.linkedin);
        contactos.append("twitter", dataContacts.twitter);
        contactos.append("youtube", dataContacts.youtube);
  
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resp = this.responseText.split("||");
          if (resp[0] == "true") {
            $.notify("Contactos guardados com sucesso!", "success");
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
  
      xhttp.open("POST", "functions/func-contactos.php", true);
      xhttp.send(contactos);
    // }
  });