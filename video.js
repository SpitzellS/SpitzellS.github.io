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
        video.addEventListener('ended', presionar, false)
        loopBoolean = true
        loop.value = "Unloop"
    } else {
        video.removeEventListener('ended', presionar, false)
        loopBoolean = false
        loop.value = "Loop"
    }
}

function nextSong() {
    if (!loopBoolean) {
        if (!randomBoolean) {
            y = posicion+1 > cantidad ? 1 : posicion+1
            boolean = posicion+1 > cantidad
            posicion = y
            while (lista[posicion-1].aprendida == true) {
                y = posicion+1 > cantidad-1 ? 0 : posicion+1
                posicion = y
            }
            document.title = lista[posicion-1].name
            info.innerHTML = "Video: " + lista[posicion-1].name + ' ' + 
                                lista[posicion-1].tipo + ' ' + 
                                lista[posicion-1].number
            video.src=lista[posicion-1].link
            video.play()
            aprendida.value = lista[posicion-1].aprendida ? "Añadir" : "Eliminar"
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
        while (lista[posicion-1].aprendida == true) {
            y = posicion-1 < 0 ? cantidad-1 : posicion-1
            posicion = y
        }
        document.title = lista[posicion-1].name
        info.innerHTML = "Video: " + lista[posicion-1].name + ' ' + 
                            lista[posicion-1].tipo + ' ' + 
                            lista[posicion-1].number
        video.src=lista[posicion-1].link
        video.play()
        aprendida.value = lista[posicion-1].aprendida ? "Añadir" : "Eliminar"
        actualizarInfo()
    } else {
        accionReiniciar()
    }
 }

function randomSong() {
    var seleccion = document.getElementById('select2')
    opciones = seleccion.options.length - 1
    let x = lista[posicion-1].id
    aprendidaBoolean = true
    while (x == lista[posicion-1].id || aprendidaBoolean) {
        x = Math.floor((Math.random() * opciones+1));
        aprendidaBoolean = false
        if (lista[x-1].aprendida == true) {
            x == lista[posicion+1].id
            aprendidaBoolean = true
        }
    }
    posicion = x
    document.title = lista[posicion-1].name
    info.innerHTML = "Video: " + lista[posicion-1].name + ' ' + 
                        lista[posicion-1].tipo + ' ' + 
                        lista[posicion-1].number
    video.src=lista[posicion-1].link
    video.play()
    actualizarInfo()
    aprendida.value = lista[posicion-1].aprendida ? "Añadir" : "Eliminar"
}

function songAprendida() {
    if (!lista[posicion].aprendida) {
        lista[posicion].aprendida = true 
        aprendida.value = "Eliminada"
        eliminarCancionTabla(lista[posicion-1].id)

        listaCancionModif = new Array(1)

        listaCancionModif[0] = new Season(
            "Lista de Canciones Modificada",
            listaCancion[0].list
        )
    } else {
        lista[posicion].aprendida = false
        aprendida.value = "Eliminar"
        anadirCancionTabla(lista[posicion-1].id)
    }
}

function eliminarCancionTabla(posicion) {
    let list = document.getElementById("tablaCanciones")
    console.log(lista)
    console.log(list)
    let cancion = document.getElementById('cancion-'+posicion)
    cancion.remove()
    console.log(list)
}

function anadirCancionTabla(posicion) {
    let list = document.getElementById("tablaCanciones")
    node = document.createElement("tr")
    node2 = document.createElement("td")
    list.appendChild(node)
    let tr = list.lastChild
    tr.appendChild(node2)
    let td = tr.lastChild
    textnode = document.createTextNode(lista[posicion-1].name)
    td.appendChild(textnode)
    anadirEventoLista(td, lista[posicion-1].id)
    tr.id = 'cancion-'+lista[posicion-1].id
}

function desaprenderTodo() {
    for (i = 0; i < cantidad; i++) {
        lista[i].aprendida = false
    }
    console.log(lista)
}