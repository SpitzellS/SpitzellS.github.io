function presionar() {
    if(!video.paused && !video.ended)   { 
        video.pause(); 
        boton.value='Reproducir'
    } 
    else 
    { 
        video.play(); 
        boton.value='Pausa'
    } 
}
 
function accionReiniciar()
{
  video.currentTime = 0;
  video.play()
}

function accionRetrasar()
{
    video.currentTime -= 10;
    if (video.currentTime < 0) {
        video.currentTime = 0
    }
}

function accionAdelantar()
{
  video.currentTime += 10;
  if (video.currentTime > video.duration) {
      video.currentTime = video.duration
  }
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
            if(allBoolean) {
                if(eliminarBoolean) {
                    y = posicion > cantidad ? 1 : posicion
                    eliminarBoolean = false
                } else {
                    y = posicion+1 > cantidad ? 1 : posicion+1
                }
                posicion = y
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
                actualizarInfo(numero)

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
                actualizarInfo(numero)
                
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
        if(allBoolean) {
            y = posicion-2 < 0 ? cantidad : posicion-1
            posicion = y

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
            actualizarInfo(numero)

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
            actualizarInfo(numero)
        }
    } else {
        accionReiniciar()
    }
 }

function randomSong() {
    if (allBoolean) {
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
        actualizarInfo(numero)
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
        actualizarInfo(numero)
    }

    
}

function accionEliminar() {
    if(allBoolean) {
        if (!lista2[posicion].eliminada) {
            lista2[posicion].eliminada = true 
            eliminada.value = "Eliminada"
            arrayOpciones.splice(posicion-1,1)
            actualizarOpciones2(arrayOpciones)
            eliminarBoolean = true
        } else {
            lista[posicion].eliminada = false
            eliminada.value = "Eliminar"
        }
    } else {
        if (!lista[posicion].eliminada) {
            lista[posicion].eliminada = true 
            eliminada.value = "Eliminada"
            myArray.splice(posicion-1,1)
            actualizarOpciones(myArray)
            eliminarBoolean = true
        } else {
            lista[posicion].eliminada = false
            eliminada.value = "Eliminar"
        }
    }
}

function desaprenderTodo() {
    for (i = 0; i < cantidad; i++) {
        lista[i].eliminada = false
    }
}