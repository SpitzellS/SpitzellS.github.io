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
    if (!randomBoolean) {
        y = posicion+1 > cantidad-1 ? 1 : posicion+1
        posicion = y
        while (lista[y].aprendida == true) {
            y = posicion+1 > cantidad-1 ? 0 : posicion+1
            posicion = y
        }    
        var seleccion=document.getElementById('select1')
        opciones = seleccion.options.length - 1
        document.title = lista[posicion].name
        info.innerHTML = "Video: " + lista[posicion].name;
        video.src=lista[posicion].link
        video.play()
        aprendida.value = lista[posicion].aprendida ? "Eliminada" : "Eliminar"
    } else {
        randomSong()
    }
 }

function beforeSong() {
    y = posicion-2 < 0 ? cantidad-1 : posicion-1
    posicion = y
    while (lista[y].aprendida == true) {
        y = posicion-1 < 0 ? cantidad-1 : posicion-1
        posicion = y
    } 
    var seleccion=document.getElementById('select1')
    opciones = seleccion.options.length - 1
    document.title = lista[posicion].name
    info.innerHTML = "Video: " + lista[posicion].name;
    video.src=lista[posicion].link
    video.play()
    aprendida.value = lista[posicion].aprendida ? "Eliminada" : "Eliminar"
 }

 function randomSong() {
    var seleccion = document.getElementById('select2')
    opciones = seleccion.options.length - 1
    let x = lista[posicion+1].number
    aprendidaBoolean = true
    while (x == lista[posicion+1].number || aprendidaBoolean) {
        x = Math.floor((Math.random() * opciones) + 2) - 1;
        aprendidaBoolean = false
        if (lista[x].aprendida == true) {
            x == lista[posicion+1].number
            aprendidaBoolean = true
        }
    }
    posicion = x
    document.title = lista[posicion].name
    info.innerHTML = "Video: " + lista[posicion].name;
    video.src=lista[posicion].link
    video.play()
    aprendida.value = lista[posicion].aprendida ? "Eliminada" : "Eliminar"
}

function songAprendida() {
    if (!lista[posicion].aprendida) {
        lista[posicion].aprendida = true 
        aprendida.value = "Eliminada"
    } else {
        lista[posicion].aprendida = false
        aprendida.value = "Eliminar"
    }
}

function desaprenderTodo() {
    console.log(cantidad)
    for (i = 0; i < cantidad; i++) {
        lista[i].aprendida = false
    }
    console.log(lista)
}