/* eslint-disable */
window.addEventListener("load", function(e) {
    getCategorias();
    getImagensBiblioteca();
    getPDFBiblioteca();
    getImagensBibliotecaGaleria();

    var alignBtnsPrincipal = $("#img-align-principal .img-align-cell");

    alignBtnsPrincipal.each(function() {
        $(this).on("click", function() {
            $(this).toggleClass("active");
            $("#img-align-principal .img-align-cell").not(this).removeClass("active");
        });
    });

    var alignBtnsContent = $("#img-align-content .img-align-cell");

    alignBtnsContent.each(function() {
        $(this).on("click", function() {
            $(this).toggleClass("active");
            $("#img-align-content .img-align-cell").not(this).removeClass("active");
        });
    });

    var alignBtnsGaleria = $(".img-align .img-align-cell");

    alignBtnsGaleria.each(function() {
        $(this).on("click", function() {
            $(this).toggleClass("active");
            $(".img-align .img-align-cell").not(this).removeClass("active");
        });
    });

    $('#text-pt').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
        ],
    });

    $('#text-en').summernote({
        lang: 'pt-PT',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
        ],
    });



    const inputElements = document.querySelectorAll('input.filepond');
    // loop over input elements
    Array.from(inputElements).forEach(inputElement => {

        // create a FilePond instance at the input element location
        FilePond.create(inputElement);

        document.getElementById('editPicture').addEventListener('click', function() {
            FilePond.setOptions({
                server: {
                    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                        const formData = new FormData();
                        formData.append(fieldName, file, file.name);

                        const request = new XMLHttpRequest();
                        request.open('POST', 'https://backoffice.v21.pt/modules/pages/noticias/upload_photo.php');

                        request.onload = function() {
                            if (request.status >= 200 && request.status < 300 && JSON.parse(request.responseText).success) {
                                // the load method accepts either a string (id) or an object
                                load(JSON.parse(request.responseText).success);
                                alert(JSON.parse(request.responseText).success);
                                getImagensBiblioteca();
                            } else {
                                // Can call the error method if something is wrong, should exit after
                                error(JSON.parse(request.responseText).error);
                                alert(JSON.parse(request.responseText).error);
                            }
                        };

                        request.send(formData);

                        // Should expose an abort method so the request can be cancelled
                        return {
                            abort: () => {
                                // This function is entered if the user has tapped the cancel button
                                request.abort();

                                // Let FilePond know the request has been cancelled
                                abort();
                            },
                        };

                        // url: '/modules/pages/homepage/upload-photo.php',
                        // method: 'POST',
                        // withCredentials: false,
                        // onload: (response) => response.key,
                        // onerror: (response) => error(response.data),
                    },
                }
            });
        })

        document.getElementById('editDocument').addEventListener('click', function() {
            FilePond.setOptions({
                server: {
                    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                        const formData = new FormData();
                        formData.append(fieldName, file, file.name);

                        const request = new XMLHttpRequest();
                        request.open('POST', 'https://backoffice.v21.pt/modules/pages/noticias/upload_file.php');

                        request.onload = function() {
                            if (request.status >= 200 && request.status < 300 && JSON.parse(request.responseText).success) {
                                load(JSON.parse(request.responseText).success);
                                alert(JSON.parse(request.responseText).success);
                                getPDFBiblioteca();
                            } else {
                                error(JSON.parse(request.responseText).error);
                                alert(JSON.parse(request.responseText).error);
                            }
                        };

                        request.send(formData);

                        return {
                            abort: () => {
                                request.abort();
                                abort();
                            },
                        };
                    },
                }
            });
        })

        document.getElementById('addPhoto-Gallery').addEventListener('click', function() {
            FilePond.setOptions({
                server: {
                    process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                        const formData = new FormData();
                        formData.append(fieldName, file, file.name);

                        const request = new XMLHttpRequest();
                        request.open('POST', 'https://backoffice.v21.pt/modules/pages/noticias/upload_photo_gallery.php');

                        request.onload = function() {
                            if (request.status >= 200 && request.status < 300 && JSON.parse(request.responseText).success) {
                                // the load method accepts either a string (id) or an object
                                load(JSON.parse(request.responseText).success);
                                alert(JSON.parse(request.responseText).success);
                                getImagensBibliotecaGaleria();
                            } else {
                                // Can call the error method if something is wrong, should exit after
                                error(JSON.parse(request.responseText).error);
                                alert(JSON.parse(request.responseText).error);
                            }
                        };

                        request.send(formData);

                        // Should expose an abort method so the request can be cancelled
                        return {
                            abort: () => {
                                // This function is entered if the user has tapped the cancel button
                                request.abort();

                                // Let FilePond know the request has been cancelled
                                abort();
                            },
                        };

                        // url: '/modules/pages/homepage/upload-photo.php',
                        // method: 'POST',
                        // withCredentials: false,
                        // onload: (response) => response.key,
                        // onerror: (response) => error(response.data),
                    },
                }
            });
        })
    })
});

/* get galeria info */
function getImagensBiblioteca(last, idFile) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printImagensBiblioteca(JSON.parse(resp[1]), last, idFile);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação das Imagens");
            }
        }
    };

    xhttp.open("GET", "functions/func-inserir-noticia.php?cmdEval=getImagensBiblioteca");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print galeria */
function printImagensBiblioteca(ficheiros, last, idFile) {
    ficheirosArea = document.querySelector("#files");
    document.querySelector("#files").innerHTML = "";
    arrayStatus = [];
    ficheirosArea.innerHTML = "";

    for (const i in ficheiros) {
        if (ficheiros.hasOwnProperty(i)) {
            const ficheiro = ficheiros[i];
            quadrado = document.createElement("div");
            quadrado.id = "ficheiro-" + ficheiro.id;
            // quadrado.classList.add("col-lg-2");
            quadrado.classList.add("valueLine");
            quadrado.classList.add("box");
            quadrado.style.display = "flex";
            quadrado.style.cursor = "pointer";
            quadrado.style.padding = "15px";

            var imagem;
            if (ficheiro.file_url == null || ficheiro.file_url == "") {
                imagem = "Não tem imagem.";
            } else {
                imagem = '<img style="width: 150%;" src="' + ficheiro.file_url + '" />';
            }

            html = `
                <div class="col-lg-12" style="overflow:hidden;display: flex; align-items: center; justify-content: center;">${imagem}</div>
            `;
            quadrado.innerHTML = html;
            quadrado.addEventListener("click", function() {
                selectImagemBiblioteca("ficheiro-" + ficheiro.id);
            });
            ficheirosArea.append(quadrado);
        }
    }

    if (last != null) {
        document.querySelector("#files .row:first-child").classList.add("active");
    }
    if (idFile != null) {
        document.querySelector("#files #ficheiro-" + idFile).classList.add("active");
    }
}

/* select ficheiro */
function selectImagemBiblioteca(id) {
    linhaFicheiro = document.getElementById(id);
    // console.log(linhaFicheiro);

    if (linhaFicheiro.classList.contains("active")) {
        linhaFicheiro.classList.remove("active");
    } else {
        $("#uploadPhotoModal #files .valueLine").removeClass("active");
        linhaFicheiro.classList.add("active");
    }
}

function getPDFBiblioteca(last, idFile) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printPDFBiblioteca(JSON.parse(resp[1]), last, idFile);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação dos PDFs");
            }
        }
    };

    xhttp.open("GET", "functions/func-inserir-noticia.php?cmdEval=getPDFBiblioteca");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print galeria */
function printPDFBiblioteca(ficheiros, last, idFile) {
    ficheirosArea = document.querySelector("#files-pdf");
    document.querySelector("#files-pdf").innerHTML = "";
    arrayStatus = [];
    ficheirosArea.innerHTML = "";

    for (const i in ficheiros) {
        if (ficheiros.hasOwnProperty(i)) {
            const ficheiro = ficheiros[i];
            quadrado = document.createElement("div");
            quadrado.id = "file-pdf-" + ficheiro.id;
            // quadrado.classList.add("col-lg-2");
            quadrado.classList.add("valueLine");
            quadrado.classList.add("box");
            quadrado.style.display = "flex";
            quadrado.style.cursor = "pointer";
            quadrado.style.padding = "15px";

            var imagem;
            if (ficheiro.file_url == null || ficheiro.file_url == "") {
                imagem = "Não tem imagem.";
            } else {
                imagem = '<iframe style="width: 150%;" src="' + ficheiro.file_url + '" style="pointer-events:none;"></iframe>';
            }

            html = `
                <div class="col-lg-12" style="overflow:hidden;display: flex; align-items: center; justify-content: center;">${imagem}</div>
            `;
            quadrado.innerHTML = html;
            quadrado.addEventListener("click", function() {
                selectPDFBiblioteca("file-pdf-" + ficheiro.id);
            });
            ficheirosArea.append(quadrado);
        }
    }

    if (last != null) {
        document.querySelector("#files-pdf .row:first-child").classList.add("active");
    }
    if (idFile != null) {
        document.querySelector("#files-pdf #file-pdf-" + idFile).classList.add("active");
    }
}

/* select ficheiro */
function selectPDFBiblioteca(id) {
    linhaFicheiro = document.getElementById(id);

    if (linhaFicheiro.classList.contains("active")) {
        linhaFicheiro.classList.remove("active");
    } else {
        $("#uploadPDFModal #files-pdf .valueLine").removeClass("active");
        linhaFicheiro.classList.add("active");
    }
}

/* get galeria info */
function getImagensBibliotecaGaleria(last, idFile) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printImagensBibliotecaGaleria(JSON.parse(resp[1]), last, idFile);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação das Imagens");
            }
        }
    };

    xhttp.open("GET", "functions/func-inserir-noticia.php?cmdEval=getImagensBibliotecaGaleria");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print galeria */
function printImagensBibliotecaGaleria(ficheiros, last, idFile) {
    ficheirosArea = document.querySelector("#files-gallery");
    document.querySelector("#files-gallery").innerHTML = "";
    arrayStatus = [];
    ficheirosArea.innerHTML = "";

    for (const i in ficheiros) {
        if (ficheiros.hasOwnProperty(i)) {
            const ficheiro = ficheiros[i];
            quadrado = document.createElement("div");
            quadrado.id = "file-gallery-" + ficheiro.id;
            // quadrado.classList.add("col-lg-2");
            quadrado.classList.add("valueLine");
            quadrado.classList.add("box");
            quadrado.style.display = "flex";
            quadrado.style.cursor = "pointer";
            quadrado.style.padding = "15px";

            var imagem;
            if (ficheiro.file_url == null || ficheiro.file_url == "") {
                imagem = "Não tem imagem.";
            } else {
                imagem = '<img style="width: 150%;" src="' + ficheiro.file_url + '" />';
            }

            html = `
                <div class="col-lg-12" style="overflow:hidden;display: flex; align-items: center; justify-content: center;">${imagem}</div>
            `;
            quadrado.innerHTML = html;
            quadrado.addEventListener("click", function() {
                selectImagemBibliotecaGaleria("file-gallery-" + ficheiro.id);
            });
            ficheirosArea.append(quadrado);
        }
    }

    if (last != null) {
        document.querySelector("#files-gallery .row:first-child").classList.add("active");
    }
    if (idFile != null) {
        document.querySelector("#files-gallery #file-gallery-" + idFile).classList.add("active");
    }
}

/* select ficheiro */
function selectImagemBibliotecaGaleria(id) {
    linhaFicheiro = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaFicheiro.classList.contains("active")) {
        linhaFicheiro.classList.remove("active");
    } else {
        // $("#uploadPhotoGalleryModal #files-gallery .valueLine").removeClass("active");
        linhaFicheiro.classList.add("active");
    }
}

$('#uploadPhotoModal button#save').on('click', function() {
    if ($("#uploadPhotoModal #files .valueLine.active").length > 0) {
        var img_src = $("#uploadPhotoModal #files .valueLine.active img").attr('src');
        var img_id = $("#uploadPhotoModal #files .valueLine.active").attr('id').split('-')[1];
        $('#imagem-selected img').attr('src', img_src);
        $('#imagem-selected img').attr('id', 'picture-id-' + img_id);
    } else {
        $('#imagem-selected').html('');
    }
})

$('#uploadPDFModal button#save').on('click', function() {
    if ($("#uploadPDFModal #files-pdf .valueLine.active").length > 0) {
        // $("#uploadPDFModal #files-pdf .valueLine.active").each(function() {
            var pdf_src = $("#uploadPDFModal #files-pdf .valueLine.active").find('iframe').attr('src');
            var pdf_id = $("#uploadPDFModal #files-pdf .valueLine.active").attr('id').split('-')[2];
            $('#pdf-selected').append('<span>PDF(s) carregado(s): </span><a id="pdf-id-'+pdf_id+'" href="'+pdf_src+'" target="_blank">'+pdf_src+'</a>');
        // })
    } else {
        $('#pdf-selected').html('');
    }
})

$('#uploadPhotoGalleryModal button#save').on('click', function() {
    if ($("#uploadPhotoGalleryModal #files-gallery .valueLine.active").length > 0) {
        $("#uploadPhotoGalleryModal #files-gallery .valueLine.active").each(function(){
            var img_src = $(this).find('img').attr('src')
            var img_id = $(this).attr('id').split('-')[2];
            $('#imagem-selected-gallery').append('<div class="wrapper-photo" id="picture-gallery-id-'+img_id+'" style="position:relative;width: 200px;height: 200px;overflow:hidden;display: flex;align-items: center;justify-content: center;background-color: #f3f3f3;border-radius: 5px;border: 1px solid;"><img style="width:auto;height:100%;" src="'+img_src+'" id="picID-'+img_id+'"><a style="position:absolute;top:0;right:0;" class="deleteFoto btn btn-danger btn-icon-split float-right"><span class="icon text-white-50"><i class="fas fa-trash"></i></span></a></div>');

            $('.wrapper-photo a').each(function(){
                $(this).on('click', function(){
                    $(this).parent().remove();
                })
            })

            $("#uploadPhotoGalleryModal #files-gallery .valueLine.active").each(function(){
                $(this).removeClass('active')
            })
        })
    } else {
        $('#imagem-selected-gallery').html('');
    }
})

$('#deletePicture').on('click', function() {
    var pictures = $('#uploadPhotoModal #files .valueLine.active');
    pictures.each(function() {
        var id = $(this).attr('id').split("-")[1];
        xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $(this).remove();
                    getImagensBiblioteca();
                    $.notify("Ficheiro apagado com sucesso.", "success");
                } else if (resp[0] == "session_expired") {
                    window.location = "login.php";
                } else {
                    $.notify("Não foi possível apagar o ficheiro.");
                }
            }
        }
        xhttp.open("GET", "../biblioteca/functions/func-biblioteca-multimedia.php?cmdEval=deleteFicheiro&id=" + id);
        xhttp.send();
    })
})

$('#deleteDocument').on('click', function() {
    var pictures = $('#uploadPDFModal #files-pdf .valueLine.active');
    pictures.each(function() {
        var id = $(this).attr('id').split("-")[2];
        xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $(this).remove();
                    getPDFBiblioteca();
                    $.notify("Ficheiro apagado com sucesso.", "success");
                } else if (resp[0] == "session_expired") {
                    window.location = "login.php";
                } else {
                    $.notify("Não foi possível apagar o ficheiro.");
                }
            }
        }
        xhttp.open("GET", "../biblioteca/functions/func-biblioteca-multimedia.php?cmdEval=deleteFicheiro&id=" + id);
        xhttp.send();
    })
})

$('#deletePictureGallery').on('click', function() {
    var pictures = $('#uploadPhotoGalleryModal #files-gallery .valueLine.active');
    pictures.each(function() {
        var id = $(this).attr('id').split("-")[1];
        xhttp = new XMLHttpRequest;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $(this).remove();
                    getImagensBiblioteca();
                    $.notify("Ficheiro apagado com sucesso.", "success");
                } else if (resp[0] == "session_expired") {
                    window.location = "login.php";
                } else {
                    $.notify("Não foi possível apagar o ficheiro.");
                }
            }
        }
        xhttp.open("GET", "../biblioteca/functions/func-biblioteca-multimedia.php?cmdEval=deleteFicheiro&id=" + id);
        xhttp.send();
    })
})

function getCategorias() {
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
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
    xhttp.open("GET", "functions/func-inserir-noticia.php?cmdEval=getListaCategorias");
    xhttp.send();
}

/* guardar rascunho noticia */
var $saveNoticiaBtn = $("#saveNoticia");
$saveNoticiaBtn.click(function() {
    var titlePT = $("#titulo-pt");
    var titleEN = $("#titulo-en");
    var categoria_id = $('#cats-id').val();
    var textPT = $("#text-pt");
    var textEN = $("#text-en");
    var img = $('#imagem-selected img');
    var img_id = $('#imagem-selected img').attr('id').split('-')[2];
    var align = $(".img-align-cell.active input");

    var pdfsIDArray = $('#pdf-selected a').map(function() {
        return this.id.split('-')[2];
    }).get();
    var pdfs = pdfsIDArray.toString();

    var pgIDSArray = $('#imagem-selected-gallery .wrapper-photo').map(function() {
        return this.id.split('-')[3];
    }).get();
    var photo_ids = pgIDSArray.toString();

    var dataNoticia = {
        titlePT: titlePT.val(),
        titleEN: titleEN.val(),
        categoria_id: categoria_id,
        textPT: textPT.next().find('.note-editable').html(),
        textEN: textEN.next().find('.note-editable').html(),
        img: img.attr('src'),
        img_id: img_id,
        align: align.val(),
        pdfs: pdfs,
        gallery_ids: photo_ids
    };

    if (dataNoticia.textPT == "") {
        $(".text-pt.erro").text("Por favor, inserir o texto.");
    } else {
        $(".text-pt.erro").text("");
    }

    if (dataNoticia.categoria_id == "null") {
        $(".cat-id.erro").text("Por favor, seleccionar a categoria.");
    } else {
        $(".cat-id.erro").text("");
    }

    if (dataNoticia.align == "") {
        $(".align.erro").text("Por favor, seleccionar o posicionamento da imagem.");
    } else {
        $(".align.erro").text("");
    }

    if (dataNoticia.titlePT == "") {
        $(".titulo-pt.erro").text("Por favor, inserir o título.");
    } else {
        $(".titulo-pt.erro").text("");
    }

    var noticia = new FormData();

    if (dataNoticia.titlePT != "" && dataNoticia.align != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
        noticia.append("cmdEval", "saveNoticia");
        noticia.append("titlePT", dataNoticia.titlePT);
        noticia.append("titleEN", dataNoticia.titleEN);
        noticia.append("categoria_id", dataNoticia.categoria_id);
        noticia.append("textPT", dataNoticia.textPT);
        noticia.append("textEN", dataNoticia.textEN);
        noticia.append("align", dataNoticia.align);
        noticia.append("img", dataNoticia.img);
        noticia.append("img_id", dataNoticia.img_id);
        noticia.append("pdfs", dataNoticia.pdfs);
        noticia.append("gallery_ids", dataNoticia.gallery_ids);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Rascunho guardado com sucesso!", "success");

                    setTimeout(() => {
                        window.location.href = "https://backoffice.v21.pt/modules/pages/noticias/noticias.php";
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

        xhttp.open("POST", "functions/func-inserir-noticia.php", true);
        xhttp.send(noticia);
    }
});

/* publicar noticia */
var $publishNoticiaBtn = $("#publishNoticia");
$publishNoticiaBtn.click(function() {
    var titlePT = $("#titulo-pt");
    var titleEN = $("#titulo-en");
    var categoria_id = $('#cats-id').val();
    var textPT = $("#text-pt");
    var textEN = $("#text-en");
    var img = $('#imagem-selected img');
    var img_id = $('#imagem-selected img').attr('id').split('-')[2];
    var align = $(".img-align-cell.active input");

    var pdfsIDArray = $('#pdf-selected a').map(function() {
        return this.id.split('-')[2];
    }).get();
    var pdfs = pdfsIDArray.toString();

    var pgIDSArray = $('#imagem-selected-gallery .wrapper-photo').map(function() {
        return this.id.split('-')[3];
    }).get();
    var photo_ids = pgIDSArray.toString();

    var dataNoticia = {
        titlePT: titlePT.val(),
        titleEN: titleEN.val(),
        categoria_id: categoria_id,
        textPT: textPT.next().find('.note-editable').html(),
        textEN: textEN.next().find('.note-editable').html(),
        img: img.attr('src'),
        img_id: img_id,
        align: align.val(),
        pdfs: pdfs,
        gallery_ids: photo_ids
    };

    if (dataNoticia.textPT == "") {
        $(".text-pt.erro").text("Por favor, inserir o texto.");
    } else {
        $(".text-pt.erro").text("");
    }

    if (dataNoticia.categoria_id == "null") {
        $(".cat-id.erro").text("Por favor, seleccionar a categoria.");
    } else {
        $(".cat-id.erro").text("");
    }

    if (dataNoticia.align == "") {
        $(".align.erro").text("Por favor, seleccionar o posicionamento da imagem.");
    } else {
        $(".align.erro").text("");
    }

    if (dataNoticia.titlePT == "") {
        $(".titulo-pt.erro").text("Por favor, inserir o título.");
    } else {
        $(".titulo-pt.erro").text("");
    }

    var noticia = new FormData();

    if (dataNoticia.titlePT != "" && dataNoticia.align != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
        noticia.append("cmdEval", "publishNoticia");
        noticia.append("titlePT", dataNoticia.titlePT);
        noticia.append("titleEN", dataNoticia.titleEN);
        noticia.append("categoria_id", dataNoticia.categoria_id);
        noticia.append("textPT", dataNoticia.textPT);
        noticia.append("textEN", dataNoticia.textEN);
        noticia.append("align", dataNoticia.align);
        noticia.append("img", dataNoticia.img);
        noticia.append("img_id", dataNoticia.img_id);
        noticia.append("pdfs", dataNoticia.pdfs);
        noticia.append("gallery_ids", dataNoticia.gallery_ids);

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resp = this.responseText.split("||");
                if (resp[0] == "true") {
                    $.notify("Notícia publicada com sucesso!", "success");

                    setTimeout(() => {
                        window.location.href = "https://backoffice.v21.pt/modules/pages/noticias/noticias.php";
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

        xhttp.open("POST", "functions/func-inserir-noticia.php", true);
        xhttp.send(noticia);
    }
});

var addGaleriaBtn = $('#addGaleriaNoticia');
var added = false;

addGaleriaBtn.click(function() {
    added = true;

    $('#add-galeria-section').length > 0 ? added = true : added = false;
    if (added) {
        $('#add-galeria-section').css('display', 'flex');

        $('.foto-1 .deleteFoto').click(function() {
            $(this).closest('.foto').css('display', 'none');
        })
    }

})

$('#deleteGaleriaNoticia').on('click', function(){
    $('#add-galeria-section').hide();
    $('#add-galeria-section #imagem-selected-gallery').children().remove();
    $("#uploadPhotoGalleryModal #files-gallery .valueLine.active").each(function(){
        $(this).removeClass('active')
    })
})