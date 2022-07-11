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
        //video.addEventListener('ended', presionar, false)
        loopBoolean = true
        loop.value = "Unloop"
    } else {
        //video.removeEventListener('ended', presionar, false)
        loopBoolean = false
        loop.value = "Loop"
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
    
                    switch(numero) {
                        case 0:
                            y = posicionTotal+1> arrayCantidad[0] ? 1 : posicionTotal+1
                            posicionTotal = y
                            posicion++
                            if(y == 1) {
                                numero = 1
                                posicion = arrayCantidad[0] + 1
                            }
                            break;
                        case 1:
                            y = posicionTotal+1 > arrayCantidad[1] ? 1 : posicionTotal+1
                            posicionTotal = y
                            posicion++
                            if(y == 1) {
                                numero = 2
                                posicion = arrayCantidad[1] + 1
                            }
                            break;
                        case 2:
                            y = posicionTotal+1 > arrayCantidad[2] ? 1 : posicionTotal+1
                            posicionTotal = y
                            posicion++
                            if(y == 1) {
                                numero = 3
                                posicion = arrayCantidad[2] + 1
                            }
                            break;
                        case 3:
                            y = posicionTotal+1 > arrayCantidad[3] ? 1 : posicionTotal+1
                            posicionTotal = y
                            posicion++
                            if(y == 1) {
                                numero = 0
                                posicion = 1
                            }
                            break;    
                    }

                }

                if(arrayLista[numero][posicionTotal-1].difficulty > minDiff && arrayLista[numero][posicionTotal-1].difficulty < maxDiff) {
                    document.title = arrayLista[numero][posicionTotal-1].name
                    info.innerHTML = "Video: " + arrayLista[numero][posicionTotal-1].name + ' ' + 
                                        arrayLista[numero][posicionTotal-1].tipo + ' ' + 
                                        arrayLista[numero][posicionTotal-1].number
                    video.src=arrayLista[numero][posicionTotal-1].link
                    video.play()
                } else {
                    nextSong()
                }
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
                    video.play()
                } else {
                    nextSong()
                }
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

            switch(numero) {
                case 0:
                    y = posicionTotal-2 < 0 ? arrayCantidad[3] : posicionTotal-1
                    posicionTotal = y
                    if(y == arrayCantidad[3]) {
                        numero = 3
                    }
                    break;
                case 1:
                    y = posicionTotal-2 < 0 ? arrayCantidad[0] : posicionTotal-1
                    posicionTotal = y
                    if(y == arrayCantidad[0]) {
                        numero = 0
                    }
                    break;
                case 2:
                    y = posicionTotal-2 < 0 ? arrayCantidad[1] : posicionTotal-1
                    posicionTotal = y
                    if(y == arrayCantidad[1]) {
                        numero = 1
                    }
                    break;
                    
                case 3:
                    y = posicionTotal-2 < 0 ? arrayCantidad[2] : posicionTotal-1
                    posicionTotal = y
                    if(y == arrayCantidad[2]) {
                        numero = 2
                    }
                    break;    
            }

            if(arrayLista[numero][posicionTotal-1].difficulty > minDiff && arrayLista[numero][posicionTotal-1].difficulty < maxDiff) {
                document.title = arrayLista[numero][posicionTotal-1].name
                info.innerHTML = "Video: " + arrayLista[numero][posicionTotal-1].name + ' ' + 
                                    arrayLista[numero][posicionTotal-1].tipo + ' ' + 
                                    arrayLista[numero][posicionTotal-1].number
                video.src=arrayLista[numero][posicionTotal-1].link
                video.play()
            } else {
                beforeSong()
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
                video.play()
            } else {
                beforeSong()
            }
            actualizarInfo(numero)
        }
    } else {
        accionReiniciar()
    }
 }

function randomSong() {
    if (allBoolean) {

        numero = Math.floor((Math.random() * 4))
        x = Math.floor((Math.random() * arrayCantidad[numero]+1))
        
        posicionTotal = x

        switch(numero) {
            case 0:
                posicion = posicionTotal
                break;
            case 1:
                posicion = posicionTotal + arrayCantidad[0]
                break;
            case 2:
                posicion = posicionTotal + arrayCantidad[0] + arrayCantidad[1]
                break;
            case 3:
                posicion = posicionTotal + arrayCantidad[0] + arrayCantidad[1] + arrayCantidad[2]
                break;
        }

        if(arrayLista[numero][posicionTotal-1].difficulty > minDiff && arrayLista[numero][posicionTotal-1].difficulty < maxDiff) {
            document.title = arrayLista[numero][posicionTotal-1].name
            info.innerHTML = "Video: " + arrayLista[numero][posicionTotal-1].name + ' ' + 
                                arrayLista[numero][posicionTotal-1].tipo + ' ' + 
                                arrayLista[numero][posicionTotal-1].number
            video.src=arrayLista[numero][posicionTotal-1].link
            video.play()
        } else {
            randomSong()
        }
        actualizarInfo(numero)
    } else {
        var seleccion = document.getElementById('select2')
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
            video.play()
            eliminada.value = lista[posicion-1].eliminada ? "Eliminada" : "Eliminar"
        } else {
            randomSong()
        }
        actualizarInfo(numero)
    }

    
}

function accionEliminar() {
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

function desaprenderTodo() {
    for (i = 0; i < cantidad; i++) {
        lista[i].eliminada = false
    }
}