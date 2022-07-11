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
            if(eliminarBoolean) {
                y = posicion > cantidad ? 1 : posicion
                eliminarBoolean = false
            } else {
                y = posicion+1 > cantidad ? 1 : posicion+1
            }
            boolean = posicion+1 > cantidad
            posicion = y
            if(lista[posicion-1].difficulty > minDiff && lista[posicion-1].difficulty < maxDiff) {
                document.title = lista[posicion-1].name
                info.innerHTML = "Video: " + lista[posicion-1].name + ' ' + 
                                    lista[posicion-1].tipo + ' ' + 
                                    lista[posicion-1].number
                video.src=lista[posicion-1].link
                video.play()
                eliminada.value = lista[posicion-1].eliminada ? "Eliminada" : "Eliminar"
            } else {
                nextSong()
            }
            actualizarInfo()
        } else {
            randomSong()
        }
    } else {
        accionReiniciar()
    }
 }

function beforeSong() {
    if (!loopBoolean) {
        y = posicion-2 < 0 ? cantidad : posicion-1
        posicion = y
        while (lista[posicion-1].eliminada == true) {
            y = posicion-1 < 0 ? cantidad-1 : posicion-1
            posicion = y
        }
        if(lista[posicion-1].difficulty > minDiff && lista[posicion-1].difficulty < maxDiff) {
            document.title = lista[posicion-1].name
            info.innerHTML = "Video: " + lista[posicion-1].name + ' ' + 
                                lista[posicion-1].tipo + ' ' + 
                                lista[posicion-1].number
            video.src=lista[posicion-1].link
            video.play()
            eliminada.value = lista[posicion-1].eliminada ? "Eliminada" : "Eliminar"
        } else {
            beforeSong()
        }
        actualizarInfo()
    } else {
        accionReiniciar()
    }
 }

function randomSong() {
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
    actualizarInfo()
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