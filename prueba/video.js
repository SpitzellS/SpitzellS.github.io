function presionar() {
    if(!video.paused && !video.ended)   { 
        video.pause()
    } 
    else 
    { 
        video.play()
    } 
}

function accionReiniciar()
{
  video.currentTime = 0;
  video.play()
}

function accionLoop() {
    if (!loopBoolean) {
        loopBoolean = true
        loop.value = "Unloop"
    } else {
        loopBoolean = false
        loop.value = "Loop"
    }
}

function random() {
    if (!randomBoolean) {
        randomBoolean = true
        rdm.value = "Unrandom"
    } else {
        randomBoolean = false
        rdm.value = "Random"
    }
}

function nextSong() {

    if (!loopBoolean) {
        if (!randomBoolean) {

            errorRemove = removeTrack()
                        
            if(variosAnos) {

                y = posicion+1 > cantidadTotal ? 1 : posicion+1
                posicion = y

                if(lista2[posicion-1].eliminada) {
                    nextSong()
                } else {
                    if(lista2[posicion-1].difficulty > minDiff && lista2[posicion-1].difficulty < maxDiff) {
                        document.title = lista2[posicion-1].name
                        info.innerHTML = "Video: " + lista2[posicion-1].name + ' ' + 
                                            lista2[posicion-1].tipo + ' ' + 
                                            lista2[posicion-1].number
                        video.src=lista2[posicion-1].link
                        var pagAnilist=document.getElementById('atributo')
                        pagAnilist.href = anilistURL + lista2[posicion-1].anilistID
                        video.play()
                    } else {
                        nextSong()
                    }
                    eliminada.value = lista2[posicion-1].eliminada ? "Eliminada" : "Eliminar"
                    actualizarInfo()
                    if(errorRemove) {
                        setTimeout(function(){
                            var video = document.getElementById("video")
                            addTrack(lista2[posicion-1].name, video.duration)
                        }, 3000)
                    }

                }
            } else {
                if(eliminarBoolean) {
                    y = posicion > cantidad ? 1 : posicion
                    eliminarBoolean = false
                } else {
                    y = posicion+1 > cantidad ? 1 : posicion+1
                }
                posicion = y
 
                if(lista[posicion-1].difficulty > minDiff && lista[posicion-1].difficulty < maxDiff) {
                    document.title = lista[posicion-1].name
                    info.innerHTML = "Video: " + lista[posicion-1].name + ' ' + 
                                        lista[posicion-1].tipo + ' ' + 
                                        lista[posicion-1].number
                    video.src=lista[posicion-1].link
                    var pagAnilist=document.getElementById('atributo')
                    pagAnilist.href = anilistURL + lista[posicion-1].anilistID
                    video.play()
                } else {
                    nextSong()
                }
                eliminada.value = lista[posicion-1].eliminada ? "Eliminada" : "Eliminar"
                actualizarInfo()

                if(errorRemove) {
                    setTimeout(function(){
                        var video = document.getElementById("video")
                        addTrack(lista[posicion-1].name, video.duration)
                    }, 3000)
                }
            }
        } else {
            randomSong()
        }
    } else {
        accionReiniciar()
    }

 }

function beforeSong() {
    
    if (!loopBoolean) {
        if(!errorBefore) {
            errorRemove = removeTrack()
        }
        if(variosAnos) {
                y = posicion-2 < 0 ? cantidadTotal : posicion-1
                posicion = y

                if(lista2[posicion-1].eliminada) {
                    errorBefore = true
                    beforeSong()
                } else {
                    errorBefore = false
                    if(lista2[posicion-1].difficulty > minDiff && lista2[posicion-1].difficulty < maxDiff) {
                        document.title = lista2[posicion-1].name
                        info.innerHTML = "Video: " + lista2[posicion-1].name + ' ' + 
                                            lista2[posicion-1].tipo + ' ' + 
                                            lista2[posicion-1].number
                        video.src=lista2[posicion-1].link
                        var pagAnilist=document.getElementById('atributo')
                        pagAnilist.href = anilistURL + lista2[posicion-1].anilistID
                        video.play()
                    } else {
                        beforeSong()
                    }
                    eliminada.value = lista2[posicion-1].eliminada ? "Eliminada" : "Eliminar"
                    actualizarInfo()
                    if(errorRemove) {
                        setTimeout(function(){
                            var video = document.getElementById("video")
                            addTrack(lista2[posicion-1].name, video.duration)
                        }, 3000)
                    }
                }

        } else {
            y = posicion-2 < 0 ? cantidad : posicion-1
            posicion = y

            if(lista[posicion-1].difficulty > minDiff && lista[posicion-1].difficulty < maxDiff) {
                document.title = lista[posicion-1].name
                info.innerHTML = "Video: " + lista[posicion-1].name + ' ' + 
                                    lista[posicion-1].tipo + ' ' + 
                                    lista[posicion-1].number
                video.src=lista[posicion-1].link
                var pagAnilist=document.getElementById('atributo')
                pagAnilist.href = anilistURL + lista[posicion-1].anilistID
                video.play()
            } else {
                beforeSong()
            }
            eliminada.value = lista[posicion-1].eliminada ? "Eliminada" : "Eliminar"
            actualizarInfo()
            if(errorRemove) {
                setTimeout(function(){
                    var video = document.getElementById("video")
                    addTrack(lista[posicion-1].name, video.duration)
                }, 3000)
            }
        }
    } else {
        accionReiniciar()
    }
 }

function randomSong() {
    errorRemove = removeTrack()

    if (variosAnos) {
            var seleccion = document.getElementById('selectCancion')
            opciones = seleccion.options.length - 1
            let x = lista2[posicion-1].id
            eliminadaBoolean = true
            while (x == lista2[posicion-1].id || eliminadaBoolean) {
                x = Math.floor((Math.random() * opciones+1));
                eliminadaBoolean = false
                if (lista2[x-1].eliminada == true) {
                    x == lista2[posicion+1].id
                    eliminadaBoolean = true
                }
            }
            posicion = x

            if(lista2[posicion-1].eliminada) {
                randomSong()
            } else {
                if(lista2[posicion-1].difficulty > minDiff && lista2[posicion-1].difficulty < maxDiff) {
                    document.title = lista2[posicion-1].name
                    info.innerHTML = "Video: " + lista2[posicion-1].name + ' ' + 
                                        lista2[posicion-1].tipo + ' ' + 
                                        lista2[posicion-1].number
                    video.src=lista2[posicion-1].link
                    var pagAnilist=document.getElementById('atributo')
                    pagAnilist.href = anilistURL + lista2[posicion-1].anilistID
                    video.play()
                    eliminada.value = lista2[posicion-1].eliminada ? "Eliminada" : "Eliminar"
                } else {
                    randomSong()
                }
                actualizarInfo()
                if(errorRemove) {
                    setTimeout(function(){
                        var video = document.getElementById("video")
                        addTrack(lista2[posicion-1].name, video.duration)
                    }, 3000)
                }
            }

    } else {
        var seleccion = document.getElementById('selectCancion')
        opciones = seleccion.options.length - 1
        let x = lista[posicion-1].id
        eliminadaBoolean = true
        while (x == lista[posicion-1].id || eliminadaBoolean) {
            x = Math.floor((Math.random() * opciones+1));
            eliminadaBoolean = false
            if (lista[x-1].eliminada == true) {
                x == lista[posicion+1].id
                eliminadaBoolean = true
            }
        }
        posicion = x
        if(lista[posicion-1].difficulty > minDiff && lista[posicion-1].difficulty < maxDiff) {
            document.title = lista[posicion-1].name
            info.innerHTML = "Video: " + lista[posicion-1].name + ' ' + 
                                lista[posicion-1].tipo + ' ' + 
                                lista[posicion-1].number
            video.src=lista[posicion-1].link
            var pagAnilist=document.getElementById('atributo')
            pagAnilist.href = anilistURL + lista[posicion-1].anilistID
            video.play()
            eliminada.value = lista[posicion-1].eliminada ? "Eliminada" : "Eliminar"
        } else {
            randomSong()
        }
        actualizarInfo()
        if(errorRemove) {
            setTimeout(function(){
                var video = document.getElementById("video")
                addTrack(lista[posicion-1].name, video.duration)
            }, 3000)
        }
    }
}

function accionEliminar() {
    deletePerm()
    lista2[posicion-1].eliminada = true 
    eliminada.value = "Eliminada"
    actualizarOpciones2(arrayOpciones)
    eliminarBoolean = true
}