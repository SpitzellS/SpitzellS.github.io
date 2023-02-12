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
                        
            if(variosAnos) {

                y = posicion+1 > cantidadTotal ? 1 : posicion+1
                posicion = y

                if(filtroDiff(lista2) && filtroLetra(lista2)) {
                    //errorRemove = removeTrack()
                    console.log("A")
                    video.play()
                } else {
                    nextSong()
                }

                eliminada.value = lista2[posicion-1].eliminada ? "Eliminada" : "Eliminar"
                actualizarInfo()
                if(errorRemove) {
                    setTimeout(function(){
                        var video = document.getElementById("video")
                        //addTrack(lista2[posicion-1].name, video.duration)
                    }, 3000)
                }

            } else {
                if(eliminarBoolean) {
                    y = posicion > cantidad ? 1 : posicion
                    eliminarBoolean = false
                } else {
                    y = posicion+1 > cantidad ? 1 : posicion+1
                }
                posicion = y
 
                if(filtroDiff(lista) && filtroLetra(lista)) {
                    //errorRemove = removeTrack()
                    video.play()
                } else {
                    nextSong()
                }
                eliminada.value = lista[posicion-1].eliminada ? "Eliminada" : "Eliminar"
                actualizarInfo()

                if(errorRemove) {
                    setTimeout(function(){
                        var video = document.getElementById("video")
                        //addTrack(lista[posicion-1].name, video.duration)
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

        if(variosAnos) {
                y = posicion-2 < 0 ? cantidadTotal : posicion-1
                posicion = y

                errorBefore = false
                if(filtroDiff(lista2) && filtroLetra(lista2)) {
                    //errorRemove = removeTrack()
                    video.play()
                } else {
                    beforeSong()
                }
                eliminada.value = lista2[posicion-1].eliminada ? "Eliminada" : "Eliminar"
                actualizarInfo()
                if(errorRemove) {
                    setTimeout(function(){
                        var video = document.getElementById("video")
                        //addTrack(lista2[posicion-1].name, video.duration)
                    }, 3000)
                }


        } else {
            y = posicion-2 < 0 ? cantidad : posicion-1
            posicion = y

            if(filtroDiff(lista) && filtroLetra(lista)) {
                //errorRemove = removeTrack()
                video.play()
            } else {
                beforeSong()
            }
            eliminada.value = lista[posicion-1].eliminada ? "Eliminada" : "Eliminar"
            actualizarInfo()
            if(errorRemove) {
                setTimeout(function(){
                    var video = document.getElementById("video")
                    //addTrack(lista[posicion-1].name, video.duration)
                }, 3000)
            }
        }
    } else {
        accionReiniciar()
    }
 }

function randomSong() {

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

            if(filtroDiff(lista2) && filtroLetra(lista2)) {
                //errorRemove = removeTrack()
                video.play()
            } else {
                randomSong()
            }
            eliminada.value = lista2[posicion-1].eliminada ? "Eliminada" : "Eliminar"
            actualizarInfo()
            if(errorRemove) {
                setTimeout(function(){
                    var video = document.getElementById("video")
                    //addTrack(lista2[posicion-1].name, video.duration)
                }, 3000)
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
        if(filtroDiff(lista) && filtroLetra(lista)) {
            //errorRemove = removeTrack()
            video.play()
        } else {
            randomSong()
        }
        eliminada.value = lista[posicion-1].eliminada ? "Eliminada" : "Eliminar"
        actualizarInfo()
        if(errorRemove) {
            setTimeout(function(){
                var video = document.getElementById("video")
                //addTrack(lista[posicion-1].name, video.duration)
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
    nextSong()
}

function filtroDiff(diffLista) {
    var diffBoolean = true
    if(diffLista[posicion-1].difficulty > minDiff && diffLista[posicion-1].difficulty < maxDiff) {
        document.title = diffLista[posicion-1].name
        info.innerHTML = "Video: " + diffLista[posicion-1].name + ' ' + 
                            diffLista[posicion-1].tipo + ' ' + 
                            diffLista[posicion-1].number
        video.src=diffLista[posicion-1].link
        var pagAnilist=document.getElementById('atributo')
        pagAnilist.href = anilistURL + diffLista[posicion-1].anilistID
    } else {
        diffBoolean = false
    }
    return diffBoolean
}

function filtroLetra(letraLista) {
    var letraBoolean = true
    var titulo = letraLista[posicion-1].name
    var primeraLetra = titulo[0].charCodeAt(0) - 65

    if(primeraLetra >= minLet && primeraLetra <= maxLet || minLet == -1 && primeraLetra <= minLet) {
        document.title = letraLista[posicion-1].name
        info.innerHTML = "Video: " + letraLista[posicion-1].name + ' ' + 
                                letraLista[posicion-1].tipo + ' ' + 
                                letraLista[posicion-1].number
        video.src=letraLista[posicion-1].link
        var pagAnilist=document.getElementById('atributo')
        pagAnilist.href = anilistURL + letraLista[posicion-1].anilistID
    } else {
        letraBoolean = false
    }
    
    return letraBoolean
}