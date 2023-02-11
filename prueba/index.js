class Cancion {
    constructor( name, tipo, number, link, songName, artist, difficulty, eliminada, id, season, anilistID, nameEnglish) {
        this.name = name
        this.tipo = tipo
        this.number = number
        this.link = link
        this.songName = songName
        this.artist = artist
        this.difficulty = difficulty
        this.eliminada = eliminada
        this.id = id
        this.season = season
        this.anilistID = anilistID
        this.nameEnglish = nameEnglish
    }
}

let countBorrado = 0

let arrayLista = new Array(4)
let arrayCantidad = new Array(4)
let numero = 0

let cue

var arrayOpciones = new Array()

//Booleans
let randomBoolean = false
let eliminarBoolean = false
let loopBoolean = false
let screenModeBoolean = false
let allSoloAno = false
let variosAnos = true
let errorTrack = true
let errorBefore = false
let errorRemove = false

//Sliders
let minDiff = 0
let maxDiff = 100
let minAno
let maxAno
let minLet
let maxLet

let lista = null
let lista2 = new Array()
let listaCancion = ''
let myArray = ''
let posicion = 0
let posicion2 = 0
let posicionTotal = 0
let cantidad = null
var cantidadTotal = 0
let anilistURL = 'https://anilist.co/anime/'
let anilistLink = ''
let direccion = "https://raw.githubusercontent.com/SpitzellS/SpitzellS.github.io/main/Listas/"
let anoElegido = ''
let seasonElegida = ''
let direccionGitHub = ''


function iniciar() { 
    var reiniciar=document.getElementById('reiniciar')
    var loop=document.getElementById('loop')
    var next=document.getElementById('next')
    var before=document.getElementById('before')
    var rdm=document.getElementById('rdm')
    var eliminada=document.getElementById('eliminada')
    var restaurar=document.getElementById('restaurar')

    reiniciar.addEventListener('click', accionReiniciar, false)
    loop.addEventListener('click', accionLoop)
    next.addEventListener('click', nextSong)
    before.addEventListener('click', beforeSong)
    rdm.addEventListener('click', random)
    eliminada.addEventListener('click', accionEliminar)
    restaurar.addEventListener('click', restaurarTodo)

    info.innerHTML = "Video: "
        
    video.addEventListener("ended", nextSong, false)
    
 }

function contarLineas(str, sep) {
    const arr = str.split(sep);
    return arr.filter(word => word !== '').length;
}

function darkMode() {
    if (!screenModeBoolean) {
        var element = document.body;
        element.className = "light-mode"
        screenMode.value = "Darkmode"
        screenModeBoolean = true
    } else {
        var element = document.body;
        element.className = "dark-mode"
        screenMode.value = "Lightmode"
        screenModeBoolean = false
    }
}

function lightMode() {
    var element = document.body
    element.className = "light-mode"
}

function actualizarOpciones(myArray) {
    cantidad--
    borrarOpciones('selectCancion')
    let myArray2 = new Array(cantidad)
    for (i = 0; i < cantidad; i++) {
        myArray2[i] = myArray[i].split('|')
    }
    myarray2 = ordenarAlf(myArray2)
    for (i = 0; i < cantidad; i++) {
        lista[i] = new Cancion(
            myArray2[i][0],
            myArray2[i][1],
            myArray2[i][2],
            myArray2[i][3],
            myArray2[i][4],
            myArray2[i][5],
            myArray2[i][6],
            false,
            i+1,
            null,
            myArray2[i][7],
            myArray2[i][8]
        )
        anadirOpciones(myArray2[i], i)
    }
    option = document.getElementById('selectCancion')   
}

function actualizarOpciones2(arrayOpciones) {
    cantidad--
    borrarOpciones('selectCancion')

    for (i = 0; i < arrayOpciones.length; i++) {
        let eliminada2

        if (localStorage.getItem('playlistSp')) {
            let playlistSp = JSON.parse(localStorage.getItem('playlistSp'))
            eliminada2 = playlistSp[arrayOpciones[i][3]] ? true : false
            lista2[i] = new Cancion(
                arrayOpciones[i][0],
                arrayOpciones[i][1],
                arrayOpciones[i][2],
                arrayOpciones[i][3],
                arrayOpciones[i][4],
                arrayOpciones[i][5],
                arrayOpciones[i][6],
                eliminada2,
                i+1,
                null,
                arrayOpciones[i][7],
                arrayOpciones[i][8]
            )
        anadirOpciones2(arrayOpciones, i)
        } else {
            lista2[i] = new Cancion(
                arrayOpciones[i][0],
                arrayOpciones[i][1],
                arrayOpciones[i][2],
                arrayOpciones[i][3],
                arrayOpciones[i][4],
                arrayOpciones[i][5],
                arrayOpciones[i][6],
                eliminada2,
                i+1,
                null,
                arrayOpciones[i][7],
                arrayOpciones[i][8]
            )
        anadirOpciones2(arrayOpciones, i)
        }
    }
    option = document.getElementById('selectCancion') 
    }

function actualizarInfo() {
    
    let tabla = document.getElementById('tablaCancion')
    cont = tabla.childElementCount

    //borra todo
    while (cont != 1) {
        tabla.removeChild(tabla.children[1])
        cont--
    }

    
    nodeSongName = document.createElement("tr")
    nodeDiff = document.createElement("tr")
    nodeArtist = document.createElement("tr")

    node3 = document.createElement("td")
    node5 = document.createElement("td")
    node6 = document.createElement("td")

    //Todas las Seasons
    if (variosAnos || allSoloAno) {

        if (localStorage.getItem('playlistSp')) {

            tabla.appendChild(nodeSongName)
            tr = tabla.lastChild
            tr.appendChild(node3)
            let songName = tr.lastChild
            numero = Number(temp)
    
            textnode = document.createTextNode('Song: ' + lista2[posicion-1].songName)
            songName.appendChild(textnode)
        
            tabla.appendChild(nodeArtist)
            tr = tabla.lastChild
            tr.appendChild(node6)
            let artist = tr.lastChild
            textnode = document.createTextNode('Artist: ' + lista2[posicion-1].artist)
            artist.appendChild(textnode)
        
            tabla.appendChild(nodeDiff)
            tr = tabla.lastChild
            tr.appendChild(node5)
            let diff = tr.lastChild
            textnode = document.createTextNode('Diff: ' + lista2[posicion-1].difficulty)
            diff.appendChild(textnode)
    
            romajiTitle = document.getElementById('romaji')
            romajiTitle.innerHTML = 'Romaji: ' + lista2[posicion-1].name
            englishTitle = document.getElementById('english')
            englishTitle.innerHTML = 'English: ' + lista2[posicion-1].nameEnglish
        
        } else {
            tabla.appendChild(nodeSongName)
            tr = tabla.lastChild
            tr.appendChild(node3)
            let songName = tr.lastChild
            numero = Number(temp)
    
            textnode = document.createTextNode('Song: ' + lista2[posicion-1].songName)
            songName.appendChild(textnode)
        
            tabla.appendChild(nodeArtist)
            tr = tabla.lastChild
            tr.appendChild(node6)
            let artist = tr.lastChild
            textnode = document.createTextNode('Artist: ' + lista2[posicion-1].artist)
            artist.appendChild(textnode)
        
            tabla.appendChild(nodeDiff)
            tr = tabla.lastChild
            tr.appendChild(node5)
            let diff = tr.lastChild
            textnode = document.createTextNode('Diff: ' + lista2[posicion-1].difficulty)
            diff.appendChild(textnode)
    
            romajiTitle = document.getElementById('romaji')
            romajiTitle.innerHTML = 'Romaji: ' + lista2[posicion-1].name
            englishTitle = document.getElementById('english')
            englishTitle.innerHTML = 'English: ' + lista2[posicion-1].nameEnglish

        }

    // Solo 1 Season
    } else {
        tabla.appendChild(nodeSongName)
        tr = tabla.lastChild
        tr.appendChild(node3)
        let songName = tr.lastChild
        textnode = document.createTextNode('Song: ' + lista[posicion-1].songName)
        songName.appendChild(textnode)
    
        tabla.appendChild(nodeArtist)
        tr = tabla.lastChild
        tr.appendChild(node6)
        let artist = tr.lastChild
        textnode = document.createTextNode('Artist: ' + lista[posicion-1].artist)
        artist.appendChild(textnode)
    
        tabla.appendChild(nodeDiff)
        tr = tabla.lastChild
        tr.appendChild(node5)
        let diff = tr.lastChild
        textnode = document.createTextNode('Diff: ' + lista[posicion-1].difficulty)
        diff.appendChild(textnode)

        romajiTitle = document.getElementById('romaji')
        romajiTitle.innerHTML = 'Romaji: ' + lista[posicion-1].name
        englishTitle = document.getElementById('english')
        englishTitle.innerHTML = 'English: ' + lista[posicion-1].nameEnglish
    }
}

function ordenarAlf(array) {
    array2 = array.sort()
    return array2
}

function getVals(){
    // Get slider values
    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
      var slide1 = parseFloat( slides[0].value );
      minDiff = slide1
      var slide2 = parseFloat( slides[1].value );
      maxDiff = slide2
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
    
    var displayElement = parent.getElementsByClassName("rangeValues")[0];
        displayElement.innerHTML = slide1 + " - " + slide2
  }

function getVals2(){

    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat( slides[0].value );
    var slide2 = parseFloat( slides[1].value );

    if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }

    minAno = slide1
    maxAno = slide2

    var displayElement = parent.getElementsByClassName("rangeValues2")[0];
        displayElement.innerHTML = slide1 + " - " + slide2
  }

  function getVals3(){
    // Get slider values

    var parent = this.parentNode;
    var slides = parent.getElementsByTagName("input");
      var slide1 = parseFloat( slides[0].value );
      var slide2 = parseFloat( slides[1].value );

    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ) {
        var tmp = slide2; slide2 = slide1; slide1 = tmp;
    }

    minLet = slide1
    maxLet = slide2
    var displayElement = parent.getElementsByClassName("valorletra")[0];
    displayElement.innerHTML = String.fromCharCode(65 + slide1) + " - " + String.fromCharCode(65 + slide2)
  }  
  
  
window.onload = function(){
    // Initialize Sliders
    var sliderSections = document.getElementsByClassName("range-slider");
        for( var x = 0; x < sliderSections.length; x++ ){
          var sliders = sliderSections[x].getElementsByTagName("input");
          for( var y = 0; y < sliders.length; y++ ){
            if( sliders[y].type ==="range" ){
              sliders[y].oninput = getVals;
              // Manually trigger event first time to display values
              sliders[y].oninput();
            }
          }
        }
    var sliderSections2 = document.getElementsByClassName("range-slider2");
        for( var x = 0; x < sliderSections2.length; x++ ){
          var sliders2 = sliderSections2[x].getElementsByTagName("input");
          for( var y = 0; y < sliders2.length; y++ ){
            if( sliders2[y].type ==="range" ){
              sliders2[y].oninput = getVals2;
              // Manually trigger event first time to display values
              sliders2[y].oninput();
            }
          }
        }
    var sliderSections3 = document.getElementsByClassName("sliderletra");
        for( var x = 0; x < sliderSections3.length; x++ ){
          var sliders3 = sliderSections3[x].getElementsByTagName("input");
          for( var y = 0; y < sliders3.length; y++ ){
            if( sliders3[y].type ==="range" ){
              sliders3[y].oninput = getVals3;
              // Manually trigger event first time to display values
              sliders3[y].oninput();
            }
          }
        }                  
        
}


window.addEventListener("keydown", function(event) {
    if(event.keyCode == 39) {
        // Manipula el evento con KeyboardEvent.key
        nextSong()
    } else if(event.keyCode == 37) {
        // Manipula el evento con KeyboardEvent.key
        beforeSong()
    } else if(event.keyCode == 46) {
        // Manipula el evento con KeyboardEvent.key
        accionEliminar()
        nextSong()
    }
});

window.addEventListener('load', iniciar, false)
