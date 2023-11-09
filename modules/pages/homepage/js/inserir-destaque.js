var alignBtns = $('.img-align-cell');

alignBtns.each(function(){
    $(this).on('click', function(){
        $(this).toggleClass('active');
        $(".img-align-cell").not(this).removeClass("active");
    });
});

var $saveDestaqueBtn = $('#saveDestaque');
$saveDestaqueBtn.click(function () {
    var titlePT = $('#destaque-title-pt');
    var titleEN = $('#destaque-title-en');
    var textPT = $('#destaque-text-pt');
    var textEN = $('#destaque-text-en');
    var link = $('#destaque-link');
    var img = $('#destaque-img');
    var align = $('.img-align-cell.active input');

    var dataDestaque = {
        titlePT: titlePT.val(),
        titleEN: titleEN.val(),
        textPT: textPT.text().trim(),
        textEN: textEN.text().trim(),
        link: link.val(),
        img: img.val(),
        align: align.val()
    }

    if(dataDestaque.align == undefined) {
        $('.align.erro').text('Por favor, seleccionar o alinhamento da imagem.');
    } else {
        $('.align.erro').text('');
    }

    if(dataDestaque.img == '') {
        $('.img.erro').text('Por favor, inserir uma imagem.');
    } else {
        $('.img.erro').text('');
    }

    if(dataDestaque.textPT.length == 0) {
        $('.text-pt.erro').text('Por favor, inserir um resumo do destaque.');
    } else {
        $('.text-pt.erro').text('');
    }

    if(dataDestaque.titlePT == '') {
        $('.title-pt.erro').text('Por favor, inserir o título do destaque.');
    } else {
        $('.title-pt.erro').text('');
    }

    var file = $('#destaque-img').prop("files")[0];

    var destaque = new FormData;

    if(dataDestaque.align != undefined && dataDestaque.img != '' && dataDestaque.textPT.length != 0 && dataDestaque.titlePT != '') {
        destaque.append('cmdEval', 'saveDestaque');
        destaque.append("titlePT", dataDestaque.titlePT);
        destaque.append("titleEN", dataDestaque.titleEN);
        destaque.append("textPT", dataDestaque.textPT);
        destaque.append("textEN", dataDestaque.textEN);
        destaque.append("link", dataDestaque.link);
        destaque.append("file", file);
        destaque.append("align", dataDestaque.align);

        var xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Destaque guardado com sucesso!", "success");
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
        }

        xhttp.open("POST", "functions/func-inserir-destaque.php", true);
        xhttp.send(destaque);
    }
});

window.addEventListener('load', function(){
    $('#destaque-text-pt').summernote({
    toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview', 'help']],
    ],
    });

    $('#destaque-text-en').summernote({
    toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview', 'help']],
    ],
    });
})