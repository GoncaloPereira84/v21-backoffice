/* eslint-disable */
window.addEventListener("load", function(e) {
    getCategorias();
    getNoticias();
    getImagensBiblioteca();
    getPDFBiblioteca();
    getImagensBibliotecaGaleria();

    var alignBtnsIntro = $(".img-align-cell");

    alignBtnsIntro.each(function() {
        $(this).on("click", function() {
            $(this).toggleClass("active");
            $(".img-align-cell").not(this).removeClass("active");
        });
    });

    document.getElementById("cats-id-search").addEventListener("change", function() {
        searchByCategoria();
    })

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
    Array.from(inputElements).forEach(inputElement => {
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
                                load(JSON.parse(request.responseText).success);
                                alert(JSON.parse(request.responseText).success);
                                getImagensBiblioteca();
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
                                load(JSON.parse(request.responseText).success);
                                alert(JSON.parse(request.responseText).success);
                                getImagensBibliotecaGaleria();
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

    xhttp.open("GET", "functions/func-noticias.php?cmdEval=getImagensBiblioteca");
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
        document.querySelector("#ficheiros .row:first-child").classList.add("active");
    }
    if (idFile != null) {
        document.querySelector("#ficheiros #ficheiro-" + idFile).classList.add("active");
    }
}

/* select ficheiro */
function selectImagemBiblioteca(id) {
    linhaFicheiro = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
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

    xhttp.open("GET", "functions/func-noticias.php?cmdEval=getPDFBiblioteca");
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
                imagem = '<iframe style="width: 150%;" src="' + ficheiro.file_url + '"></iframe>';
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

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
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

    xhttp.open("GET", "functions/func-noticias.php?cmdEval=getImagensBibliotecaGaleria");
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
        $('#imagem-selected').children().remove();
    }
})

$('#uploadPDFModal button#save').on('click', function() {
    if ($("#uploadPDFModal #files-pdf .valueLine.active").length > 0) {
        var pdf_src = $("#uploadPDFModal #files-pdf .valueLine.active").find('iframe').attr('src');
        var pdf_id = $("#uploadPDFModal #files-pdf .valueLine.active").attr('id').split('-')[2];
        $('#pdf-selected').children().remove();
        $('#pdf-selected').append('<span id="loaded-pdf">PDF carregado: <a id="pdf-id-' + pdf_id + '" href="' + pdf_src + '" target="_blank">' + pdf_src + '</a></span>');
    } else {
        $('#pdf-selected').children().remove();
    }
})

$('#uploadPhotoGalleryModal button#save').on('click', function() {
    if ($("#uploadPhotoGalleryModal #files-gallery .valueLine.active").length > 0) {
        $("#uploadPhotoGalleryModal #files-gallery .valueLine.active").each(function() {
            var img_src = $(this).find('img').attr('src')
            var img_id = $(this).attr('id').split('-')[2];
            $('#imagem-selected-gallery').append('<div class="wrapper-photo" id="picture-gallery-id-' + img_id + '" style="position:relative;width: 200px;height: 200px;overflow:hidden;display: flex;align-items: center;justify-content: center;background-color: #f3f3f3;border-radius: 5px;border: 1px solid;"><img style="width:auto;height:100%;" src="' + img_src + '" id="picID-' + img_id + '"><a style="position:absolute;top:0;right:0;" class="deleteFoto btn btn-danger btn-icon-split float-right"><span class="icon text-white-50"><i class="fas fa-trash"></i></span></a></div>');

            $('.wrapper-photo a').each(function() {
                $(this).on('click', function() {
                    $(this).parent().remove();
                })
            })

            $("#uploadPhotoGalleryModal #files-gallery .valueLine.active").each(function() {
                $(this).removeClass('active')
            })
        })
    } else {
        $('#imagem-selected-gallery').children().remove()
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

function searchByCategoria() {
    categoria = document.getElementById("cats-id-search").value;
    fotos = document.querySelectorAll("#noticias .valueLine");
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
    xhttp.onreadystatechange = function() {
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
    xhttp.open("GET", "functions/func-noticias.php?cmdEval=getListaCategorias");
    xhttp.send();
}

/* get galeria info */
function getNoticias(last, idNoticia) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                printNoticias(JSON.parse(resp[1]), last, idNoticia);
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro ao aceder à informação das Notícias");
            }
        }
    };

    xhttp.open("GET", "functions/func-noticias.php?cmdEval=getNoticias");
    xhttp.send();
    xhttp.getResponseHeader("Content-Type", "application/xml");
}

/* print noticias */
function printNoticias(noticias, last, idNoticia) {
    noticiasArea = document.querySelector("#noticias");
    document.querySelector("#noticias").innerHTML = "";
    arrayStatus = [];
    noticiasArea.innerHTML = "";

    var categorias;
    var xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                categorias = JSON.parse(resp[1]);

                for (const i in noticias) {
                    if (noticias.hasOwnProperty(i)) {
                        const noticia = noticias[i];
                        linha = document.createElement("div");
                        linha.id = "noticia-" + noticia.id;
                        linha.classList.add("col-lg-10");
                        linha.classList.add("valueLine");
                        linha.style.display = "flex";
                        linha.style.cursor = "pointer";
                        linha.dataset.categoria = noticia.categoria_id;

                        if (noticia.photo_gallery_ids != '' || noticia.photo_gallery_ids != 0) {
                            linha.dataset.galeria = 'true';
                        } else {
                            linha.dataset.galeria = 'false';
                        }

                        var imagem;
                        if (noticia.img_src == null || noticia.img_src == "") {
                            imagem = "Não tem imagem.";
                        } else {
                            var splitSrc = noticia.img_src.split("uploads");
                            imagem =
                                '<img style="width: 60%;" src="../../../uploads' +
                                splitSrc[1] +
                                '" />';
                        }

                        var align;
                        switch (noticia.img_align) {
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

                        var pid = noticia.categoria_id.split(',');

                        map.call(categorias, function(c) {
                            if (c.id == noticia.categoria_id) {
                                cat.push(c.title);
                            } else {
                                map.call(pid, function(p) {
                                    if (c.id == p) {
                                        cat.push(c.title);
                                    }
                                })
                            }
                        });

                        html = `
                            <div class="col-lg-3">${noticia.title}</div>
                            <div class="col-lg-3">${cat}</div>
                            <div class="col-lg-3">${imagem}</div>
                            <div class="col-lg-3">${align}</div>
                        `;
                        linha.innerHTML = html;
                        linha.addEventListener("click", function() {
                            selectNoticia("noticia-" + noticia.id);
                        });
                        noticiasArea.append(linha);
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
    xhttp.open("GET", "functions/func-noticias.php?cmdEval=getListaCategorias");
    xhttp.send();

    if (last != null) {
        document.querySelector("#noticias .row:first-child").classList.add("active");
    }
    if (idNoticia != null) {
        document.querySelector("#noticias #noticia-" + idNoticia).classList.add("active");
    }
}

/* select noticia */
function selectNoticia(id) {
    linhaNoticia = document.getElementById(id);

    /**
     * events triggered by selection and deselection
     * this code block only concerns the new/edit modal inputs
     */
    if (linhaNoticia.classList.contains("active")) {
        linhaNoticia.classList.remove("active");
        var inputs = document
            .getElementById("noticiaInfo")
            .getElementsByTagName("input");

        for (index = 0; index < inputs.length; ++index) {
            if (inputs[index].type == "text") inputs[index].value = "";
            if (inputs[index].type == "date") inputs[index].value = "";
            if (inputs[index].type == "file") inputs[index].value = "";
        }

        $('#text-pt').next().find('.note-editable').html('');
        $('#text-en').next().find('.note-editable').html('');

        $('#addGaleriaBtn').css({ 'opacity': '0', 'pointer-events': 'none' });
        $('#noticiaInfo').css({ 'display': 'none' });
        $('.noticiaInfo').css({ 'display': 'none' });
        $('#pdf-selected').children().remove()

        if ($('#galeria-section').length != 0) {
            $('#galeria-section').css({ 'display': 'none' });
            $('#imagem-selected-gallery').children().remove();
        }

        var alignBtns = $(".img-align-cell");

        alignBtns.each(function() {
            $(this).removeClass("active");
        });

        document.getElementById('cats-id').value = '';

        $noticiasArea = document.getElementById("noticiaInfo");
        $noticiasArea.setAttribute("data-id-noticia", "");
    } else {
        $("#noticias .valueLine").removeClass("active");
        linhaNoticia.classList.add("active");
        $('#imagem-selected-gallery').children().remove()

        $('#pdf-selected').children().remove()

        //load data into the inputs in the page
        getNoticiaById(id.replace("noticia-", ""));
    }
}

/* get noticia info by selected */
function getNoticiaById(idNoticia) {
    idNoticia = idNoticia.replace("noticia-", "");
    listaNoticias = document.querySelector("#noticias");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getAllDataByNoticia(JSON.parse(resp[1]));
            } else if (resp[0] == "false") {
                $.notify(resp[1]);
            } else if (resp[0] == "warn") {
                $.notify(resp[1], "warn");
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Erro para aceder à informação das Notícias.");
            }
        }
    };
    xhttp.open(
        "GET",
        "functions/func-noticias.php?cmdEval=getAllNoticiasByIdNoticia&id_noticia=" +
        idNoticia
    );
    xhttp.send();
}

/* get noticia info */
function getAllDataByNoticia(noticia) {
    $noticiasArea = document.getElementById("noticiaInfo");
    $noticiasArea.setAttribute("data-id-noticia", "noticia-" + noticia[0].id);

    if (noticia[0].photo_gallery_ids != '' || noticia[0].photo_gallery_ids != 0) {
        $('#addGaleriaBtn').css({ 'opacity': '0', 'pointer-events': 'none' })
        $('#galeria-section').css({ 'display': 'flex' })

        var phIDS = noticia[0].photo_gallery_ids.split(',');
        // console.log(phIDS);
        phIDS.forEach(function(value, index, array) {
            var img_src = $('#file-gallery-' + value + ' img').attr('src')
            var img_id = value;
            $('#imagem-selected-gallery').append('<div class="wrapper-photo" id="picture-gallery-id-' + img_id + '" style="position:relative;width: 200px;height: 200px;overflow:hidden;display: flex;align-items: center;justify-content: center;background-color: #f3f3f3;border-radius: 5px;border: 1px solid;"><img style="width:auto;height:100%;" src="' + img_src + '" id="picID-' + img_id + '"><a style="position:absolute;top:0;right:0;" class="deleteFoto btn btn-danger btn-icon-split float-right"><span class="icon text-white-50"><i class="fas fa-trash"></i></span></a></div>');

            $('.wrapper-photo a').each(function() {
                $(this).on('click', function() {
                    $(this).parent().remove();
                })
            })
        });
    } else {
        $('#addGaleriaBtn').css({ 'opacity': '1', 'pointer-events': 'all' })
        $('#galeria-section').css({ 'display': 'none' })
        $('#imagem-selected-gallery').children().remove()
    }

    if (noticia[0].pdf_file_id != '' || noticia[0].pdf_file_id != 0) {
        var phIDS = noticia[0].pdf_file_id.split(',');
        // console.log(phIDS);
        phIDS.forEach(function(value, index, array) {
            var pdf_src = $('#file-pdf-' + value + ' iframe').attr('src')
            var pdf_id = value;

            $('#pdf-selected').append('<span id="saved-pdf">PDF existente: <a id="pdf-id-' + pdf_id + '" href="' + pdf_src + '" target="_blank">' + pdf_src + '</a></span>');
            $('#pdf-selected a').attr('id', 'pdf-id-' + pdf_id);

            selectPDFBiblioteca('file-pdf-' + pdf_id)
        });
    } else {
        $('#pdf-selected').children().remove()
    }

    $('#titulo-pt').val(noticia[0].title);
    $('#titulo-en').val(noticia[0].title_en);

    $('#text-pt').next().find('.note-editable').html(noticia[0].text);
    $('#text-en').next().find('.note-editable').html(noticia[0].text_en);

    $('#noticiaInfo').css({ 'display': 'flex' });
    $('.noticiaInfo').css({ 'display': 'flex' });

    var alignBtns = $(".img-align-cell");

    alignBtns.each(function() {
        $(this).removeClass("active");
    });

    $(".img-align-cell." + noticia[0].img_align).addClass(
        "active"
    );

    $('#imagem-selected img').attr('src', noticia[0].img_src);

    var id_img = $("#files img[src$='" + noticia[0].img_src + "']").parent().parent().attr('id').split('-')[1]
    $('#imagem-selected img').attr('id', 'picture-id-' + id_img);

    selectImagemBiblioteca('ficheiro-' + id_img)

    var cats = noticia[0].categoria_id.split(',');
    var $input_select = $('#noticiaInfo #cats-id');
    $input_select.val(cats);

    $('#data').val(noticia[0].data_inicio);

    $("#saveNoticia").attr("data-id-noticia", noticia[0].id);
    $("#deleteNoticia").attr("data-id-noticia", noticia[0].id);
    $("#publishNoticia").attr("data-id-noticia", noticia[0].id);
}

/* update noticia */
var $saveNoticiaBtn = $("#saveNoticia");
$saveNoticiaBtn.click(function() {
    if ($('#galeria-section').length > 0 && $('#galeria-section').css('display') != 'none') {
        var id = $("#saveNoticia").attr("data-id-noticia");
        var titlePT = $("#titulo-pt");
        var titleEN = $("#titulo-en");
        var categoria_id = $('#cats-id').val();
        var textPT = $("#text-pt");
        var textEN = $("#text-en");
        var data = $("#data");
        var align = $(".img-align-cell.active input");
        var img = $('#imagem-selected img');
        var img_id = $('#imagem-selected img').attr('id').split('-')[2];

        $noticiasArea = document.getElementById("noticiaInfo");
        var noticia_id = $noticiasArea.getAttribute("data-id-noticia");

        if (noticia_id != null) noticia_id = noticia_id.replace("noticia-", "");
        else noticia_id = "";

        var pdfsIDArray = $('#pdf-selected a').map(function() {
            return this.id.split('-')[2];
        }).get();
        var pdfs = pdfsIDArray.toString();

        var pgIDSArray = $('#imagem-selected-gallery .wrapper-photo').map(function() {
            return this.id.split('-')[3];
        }).get();
        var photo_ids = pgIDSArray.toString();

        var dataNoticia = {
            id: id,
            titlePT: titlePT.val(),
            titleEN: titleEN.val(),
            categoria_id: categoria_id,
            textPT: textPT.next().find('.note-editable').html(),
            textEN: textEN.next().find('.note-editable').html(),
            data: data.val(),
            align: align.val(),
            img: img.attr('src'),
            img_id: img_id,
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

        if (dataNoticia.titlePT == "") {
            $(".titulo-pt.erro").text("Por favor, inserir o título.");
        } else {
            $(".titulo-pt.erro").text("");
        }

        var noticia = new FormData();

        if (dataNoticia.titlePT != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
            noticia.append("cmdEval", "saveNoticia");
            noticia.append("id", dataNoticia.id);
            noticia.append("titlePT", dataNoticia.titlePT);
            noticia.append("titleEN", dataNoticia.titleEN);
            noticia.append("categoria_id", dataNoticia.categoria_id);
            noticia.append("textPT", dataNoticia.textPT);
            noticia.append("textEN", dataNoticia.textEN);
            noticia.append("data", dataNoticia.data);
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

                        var inputs = document
                            .getElementById("noticiaInfo")
                            .getElementsByTagName("input");

                        for (index = 0; index < inputs.length; ++index) {
                            if (inputs[index].type == "text") inputs[index].value = "";
                            if (inputs[index].type == "date") inputs[index].value = "";
                            if (inputs[index].type == "file") inputs[index].value = '';
                        }

                        textPT.next().find('.note-editable').html('');
                        textEN.next().find('.note-editable').html('');

                        $('#galeria-section').css('display', 'none');
                        $('#galeria-section').attr('data-noticia', '');
                        $('#pdf-selected').children().remove();

                        $('#addGaleriaBtn').css({ 'opacity': '0', 'pointer-events': 'none' });
                        $('#noticiaInfo').css({ 'display': 'none' });
                        $('.noticiaInfo').css({ 'display': 'none' });

                        if ($('#galeria-section').length != 0) {
                            $('#galeria-section').css({ 'display': 'none' });
                            $('#imagem-selected-gallery').children().remove();
                        }

                        if ($('#add-galeria-section').length != 0) {
                            $('#add-galeria-section').css({ 'display': 'none' });
                        }

                        var alignBtns = $(".img-align-cell");

                        alignBtns.each(function() {
                            $(this).removeClass("active");
                        });

                        document.getElementById('cats-id').value = '';

                        if ($noticiasArea) {
                            if (noticia_id == "") getNoticias(null, null);
                            else getNoticias(null, noticia_id);

                            $noticiasArea = document.getElementById("noticiaInfo");
                            $noticiasArea.setAttribute("data-id-noticia", "");
                        } else {
                            getNoticias("last", null);
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

            xhttp.open("POST", "functions/func-noticias.php", true);
            xhttp.send(noticia);
        }
    } else {
        var id = $("#saveNoticia").attr("data-id-noticia");
        var titlePT = $("#titulo-pt");
        var titleEN = $("#titulo-en");
        var categoria_id = $('#cats-id').val();
        var textPT = $("#text-pt");
        var textEN = $("#text-en");
        var data = $("#data");
        var align = $(".img-align-cell.active input");
        var img = $('#imagem-selected img');
        var img_id = $('#imagem-selected img').attr('id').split('-')[2];

        $noticiasArea = document.getElementById("noticiaInfo");
        var noticia_id = $noticiasArea.getAttribute("data-id-noticia");

        if (noticia_id != null) noticia_id = noticia_id.replace("noticia-", "");
        else noticia_id = "";

        var pdfsIDArray = $('#pdf-selected span').map(function() {
            return this.id.split('-')[2];
        }).get();
        var pdfs = pdfsIDArray.toString();

        var dataNoticia = {
            id: id,
            titlePT: titlePT.val(),
            titleEN: titleEN.val(),
            categoria_id: categoria_id,
            textPT: textPT.next().find('.note-editable').html(),
            textEN: textEN.next().find('.note-editable').html(),
            img: img.attr('src'),
            img_id: img_id,
            align: align.val(),
            pdfs: pdfs,
            data: data.val()
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

        if (dataNoticia.titlePT == "") {
            $(".titulo-pt.erro").text("Por favor, inserir o título.");
        } else {
            $(".titulo-pt.erro").text("");
        }

        // var file = $("#noticia-img").prop("files")[0];
        // var pdf = $("#upload-pdf").prop("files")[0];

        var noticia = new FormData();

        if (dataNoticia.titlePT != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
            noticia.append("cmdEval", "saveNoticia");
            noticia.append("id", dataNoticia.id);
            noticia.append("titlePT", dataNoticia.titlePT);
            noticia.append("titleEN", dataNoticia.titleEN);
            noticia.append("categoria_id", dataNoticia.categoria_id);
            noticia.append("textPT", dataNoticia.textPT);
            noticia.append("textEN", dataNoticia.textEN);
            noticia.append("align", dataNoticia.align);
            noticia.append("img", dataNoticia.img);
            noticia.append("img_id", dataNoticia.img_id);
            noticia.append("pdfs", dataNoticia.pdfs);
            noticia.append("data", dataNoticia.data);
            // noticia.append("gallery_ids", dataNoticia.gallery_ids);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resp = this.responseText.split("||");
                    if (resp[0] == "true") {
                        $.notify("Rascunho guardado com sucesso!", "success");

                        var inputs = document
                            .getElementById("noticiaInfo")
                            .getElementsByTagName("input");

                        for (index = 0; index < inputs.length; ++index) {
                            if (inputs[index].type == "text") inputs[index].value = "";
                            if (inputs[index].type == "date") inputs[index].value = "";
                            if (inputs[index].type == "file") inputs[index].value = '';
                        }

                        textPT.next().find('.note-editable').html('');
                        textEN.next().find('.note-editable').html('');

                        $('#galeria-section').css('display', 'none');
                        $('#galeria-section').attr('data-noticia', '');
                        $('#imagem-selected-gallery').children().remove();
                        $('#pdf-selected').children().remove();

                        var alignBtns = $(".img-align-cell");

                        alignBtns.each(function() {
                            $(this).removeClass("active");
                        });

                        document.getElementById('cats-id').value = '';

                        if ($noticiasArea) {
                            if (noticia_id == "") getNoticias(null, null);
                            else getNoticias(null, noticia_id);

                            $noticiasArea = document.getElementById("noticiaInfo");
                            $noticiasArea.setAttribute("data-id-noticia", "");
                        } else {
                            getNoticias("last", null);
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

            xhttp.open("POST", "functions/func-noticias.php", true);
            xhttp.send(noticia);
        }
    }

});

/* update noticia */
var $publishNoticiaBtn = $("#publishNoticia");
$publishNoticiaBtn.click(function() {
    if ($('#galeria-section').length > 0 && $('#galeria-section').css('display') != 'none') {
        var id = $("#publishNoticia").attr("data-id-noticia");
        var titlePT = $("#titulo-pt");
        var titleEN = $("#titulo-en");
        var categoria_id = $('#cats-id').val();
        var textPT = $("#text-pt");
        var textEN = $("#text-en");
        var data = $("#data");
        var align = $(".img-align-cell.active input");
        var img = $('#imagem-selected img');
        var img_id = $('#imagem-selected img').attr('id').split('-')[2];

        $noticiasArea = document.getElementById("noticiaInfo");
        var noticia_id = $noticiasArea.getAttribute("data-id-noticia");

        if (noticia_id != null) noticia_id = noticia_id.replace("noticia-", "");
        else noticia_id = "";

        var pdfsIDArray = $('#pdf-selected a').map(function() {
            return this.id.split('-')[2];
        }).get();
        var pdfs = pdfsIDArray.toString();

        var pgIDSArray = $('#imagem-selected-gallery .wrapper-photo').map(function() {
            return this.id.split('-')[3];
        }).get();
        var photo_ids = pgIDSArray.toString();

        var dataNoticia = {
            id: id,
            titlePT: titlePT.val(),
            titleEN: titleEN.val(),
            categoria_id: categoria_id,
            textPT: textPT.next().find('.note-editable').html(),
            textEN: textEN.next().find('.note-editable').html(),
            data: data.val(),
            align: align.val(),
            img: img.attr('src'),
            img_id: img_id,
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

        if (dataNoticia.titlePT == "") {
            $(".titulo-pt.erro").text("Por favor, inserir o título.");
        } else {
            $(".titulo-pt.erro").text("");
        }

        var noticia = new FormData();

        if (dataNoticia.titlePT != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
            noticia.append("cmdEval", "publishNoticia");
            noticia.append("id", dataNoticia.id);
            noticia.append("titlePT", dataNoticia.titlePT);
            noticia.append("titleEN", dataNoticia.titleEN);
            noticia.append("categoria_id", dataNoticia.categoria_id);
            noticia.append("textPT", dataNoticia.textPT);
            noticia.append("textEN", dataNoticia.textEN);
            noticia.append("data", dataNoticia.data);
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

                        var inputs = document
                            .getElementById("noticiaInfo")
                            .getElementsByTagName("input");

                        for (index = 0; index < inputs.length; ++index) {
                            if (inputs[index].type == "text") inputs[index].value = "";
                            if (inputs[index].type == "date") inputs[index].value = "";
                            if (inputs[index].type == "file") inputs[index].value = '';
                        }

                        textPT.next().find('.note-editable').html('');
                        textEN.next().find('.note-editable').html('');

                        $('#galeria-section').css('display', 'none');
                        $('#galeria-section').attr('data-noticia', '');
                        $('#imagem-selected-gallery').children().remove();


                        $('#pdf-selected').children().remove();

                        $('#addGaleriaBtn').css({ 'opacity': '0', 'pointer-events': 'none' });
                        $('#noticiaInfo').css({ 'display': 'none' });
                        $('.noticiaInfo').css({ 'display': 'none' });

                        if ($('#galeria-section').length != 0) {
                            $('#galeria-section').css({ 'display': 'none' });
                            $('#imagem-selected-gallery').children().remove();
                        }

                        if ($('#add-galeria-section').length != 0) {
                            $('#add-galeria-section').css({ 'display': 'none' });
                        }

                        var alignBtns = $(".img-align-cell");

                        alignBtns.each(function() {
                            $(this).removeClass("active");
                        });

                        document.getElementById('cats-id').value = '';

                        if ($noticiasArea) {
                            if (noticia_id == "") getNoticias(null, null);
                            else getNoticias(null, noticia_id);

                            $noticiasArea = document.getElementById("noticiaInfo");
                            $noticiasArea.setAttribute("data-id-noticia", "");
                        } else {
                            getNoticias("last", null);
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

            xhttp.open("POST", "functions/func-noticias.php", true);
            xhttp.send(noticia);
        }
    } else {
        var id = $("#publishNoticia").attr("data-id-noticia");
        var titlePT = $("#titulo-pt");
        var titleEN = $("#titulo-en");
        var categoria_id = $('#cats-id').val();
        var textPT = $("#text-pt");
        var textEN = $("#text-en");
        var data = $("#data");
        var align = $(".img-align-cell.active input");
        var img = $('#imagem-selected img');
        var img_id = $('#imagem-selected img').attr('id').split('-')[2];

        $noticiasArea = document.getElementById("noticiaInfo");
        var noticia_id = $noticiasArea.getAttribute("data-id-noticia");

        if (noticia_id != null) noticia_id = noticia_id.replace("noticia-", "");
        else noticia_id = "";

        var pdfsIDArray = $('#pdf-selected a').map(function() {
            return this.id.split('-')[2];
        }).get();
        var pdfs = pdfsIDArray.toString();

        // console.log(pdfs);

        var dataNoticia = {
            id: id,
            titlePT: titlePT.val(),
            titleEN: titleEN.val(),
            categoria_id: categoria_id,
            textPT: textPT.next().find('.note-editable').html(),
            textEN: textEN.next().find('.note-editable').html(),
            img: img.attr('src'),
            img_id: img_id,
            align: align.val(),
            pdfs: pdfs,
            data: data.val()
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

        if (dataNoticia.titlePT == "") {
            $(".titulo-pt.erro").text("Por favor, inserir o título.");
        } else {
            $(".titulo-pt.erro").text("");
        }

        var noticia = new FormData();

        if (dataNoticia.titlePT != "" && dataNoticia.categoria_id != "null" && dataNoticia.textPT != "") {
            noticia.append("cmdEval", "publishNoticia");
            noticia.append("id", dataNoticia.id);
            noticia.append("titlePT", dataNoticia.titlePT);
            noticia.append("titleEN", dataNoticia.titleEN);
            noticia.append("categoria_id", dataNoticia.categoria_id);
            noticia.append("textPT", dataNoticia.textPT);
            noticia.append("textEN", dataNoticia.textEN);
            noticia.append("align", dataNoticia.align);
            noticia.append("img", dataNoticia.img);
            noticia.append("img_id", dataNoticia.img_id);
            noticia.append("pdfs", dataNoticia.pdfs);
            noticia.append("data", dataNoticia.data);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resp = this.responseText.split("||");
                    if (resp[0] == "true") {
                        $.notify("Notícia publicada com sucesso!", "success");

                        var inputs = document
                            .getElementById("noticiaInfo")
                            .getElementsByTagName("input");

                        for (index = 0; index < inputs.length; ++index) {
                            if (inputs[index].type == "text") inputs[index].value = "";
                            if (inputs[index].type == "date") inputs[index].value = "";
                            if (inputs[index].type == "file") inputs[index].value = '';
                        }

                        textPT.next().find('.note-editable').html('');
                        textEN.next().find('.note-editable').html('');

                        $('#galeria-section').css('display', 'none');
                        $('#galeria-section').attr('data-noticia', '');
                        $('#imagem-selected-gallery').children().remove();
                        $('#pdf-selected').children().remove();

                        var alignBtns = $(".img-align-cell");

                        alignBtns.each(function() {
                            $(this).removeClass("active");
                        });

                        document.getElementById('cats-id').value = '';

                        if ($noticiasArea) {
                            if (noticia_id == "") getNoticias(null, null);
                            else getNoticias(null, noticia_id);

                            $noticiasArea = document.getElementById("noticiaInfo");
                            $noticiasArea.setAttribute("data-id-noticia", "");
                        } else {
                            getNoticias("last", null);
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

            xhttp.open("POST", "functions/func-noticias.php", true);
            xhttp.send(noticia);
        }
    }

});

/**
 * delete noticia
 */
var $deleteNoticiaBtn = $('#deleteNoticia');
$deleteNoticiaBtn.click(function(id) {
    id = document.getElementById('deleteNoticia').getAttribute('data-id-noticia');
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resp = this.responseText.split("||");
            if (resp[0] == "true") {
                getNoticias();
                $.notify("Notícia apagada com sucesso.", "success");

                $('#addGaleriaBtn').css({ 'opacity': '0', 'pointer-events': 'none' });
                $('#noticiaInfo').css({ 'display': 'none' });
                $('.noticiaInfo').css({ 'display': 'none' });
                $('#pdf-selected').children().remove();

                if ($('#galeria-section').length != 0) {
                    $('#galeria-section').css({ 'display': 'none' });
                    $('#imagem-selected-gallery').children().remove();
                }

                if ($('#add-galeria-section').length != 0) {
                    $('#add-galeria-section').css({ 'display': 'none' });
                }

                var inputs = document.getElementById('noticiaInfo').getElementsByTagName('input');

                for (index = 0; index < inputs.length; ++index) {
                    if (inputs[index].type == "text") inputs[index].value = '';
                    if (inputs[index].type == "date") inputs[index].value = '';
                    if (inputs[index].type == "file") inputs[index].value = '';
                }

                var alignBtns = $(".img-align-cell");

                alignBtns.each(function() {
                    $(this).removeClass("active");
                });

                document.getElementById('cats-id').value = '';
            } else if (resp[0] == "session_expired") {
                window.location = "login.php";
            } else {
                $.notify("Não foi possível apagar a notícia.");
            }
        }
    }
    xhttp.open("GET", "functions/func-noticias.php?cmdEval=deleteNoticia&id=" + id);
    xhttp.send();
});

/**
 * ***********************************
 * FUNCTIONS RELATED TO ADDING A NEW GALLERY TO A NEWS TOPIC
 * ***********************************
 */
var addGaleriaBtn = $('#addGaleriaNoticia');
var added = false;

addGaleriaBtn.click(function() {
    added = true;

    $('#galeria-section').length > 0 ? added = true : added = false;
    if (added) {
        $('#galeria-section').css('display', 'flex');

        $('.foto-1 .deleteFoto').click(function() {
            $(this).closest('.foto').css('display', 'none');
        })
    }

})

$('#deleteGaleriaNoticia-edit').on('click', function() {
    $('#galeria-section').hide();
    $('#galeria-section #imagem-selected-gallery').children().remove();
    $("#uploadPhotoGalleryModal #files-gallery .valueLine.active").each(function() {
        $(this).removeClass('active')
    })
})

$('#deleteGaleriaNoticia-add').on('click', function() {
    $('#add-galeria-section').hide();
    $('#add-galeria-section #imagem-selected-gallery').children().remove();
    $("#uploadPhotoGalleryModal #files-gallery .valueLine.active").each(function() {
        $(this).removeClass('active')
    })
})