class Cancion {
    constructor( name, tipo, number, link, songName, artist, difficulty, eliminada, id) {
        this.name = name
        this.tipo = tipo
        this.number = number
        this.link = link
        this.songName = songName
        this.artist = artist
        this.difficulty = difficulty
        this.eliminada = eliminada
        this.id = id
    }
}

class Season {
    constructor(list) {
        this.list = list
    }
}


let randomBoolean = false
let eliminarBoolean = false
let lista = null
let listaCancion = ''
let myArray = ''
let listaCancionModif = null
let posicion = 0
let loopBoolean = false
let cantidad = null
let texto
let direccion = "https://raw.githubusercontent.com/SpitzellS/SpitzellS.github.io/main/Listas/"
let anoElegido = ''
let seasonElegida = ''
let direccionGitHub = ''

function iniciar() { 
    var boton=document.getElementById('boton')
    var reiniciar=document.getElementById('reiniciar')
    var retrasar=document.getElementById('retrasar')
	var adelantar=document.getElementById('adelantar')
    var loop=document.getElementById('loop')
    var next=document.getElementById('next')
    var before=document.getElementById('before')
    var desaprender=document.getElementById('desaprender')
    var rdm=document.getElementById('rdm')
    var eliminada=document.getElementById('eliminada')

    boton.addEventListener('click', presionar, false)
    reiniciar.addEventListener('click', accionReiniciar, false)
    retrasar.addEventListener('click', accionRetrasar)
	adelantar.addEventListener('click', accionAdelantar)
    loop.addEventListener('click', accionLoop)
    next.addEventListener('click', nextSong)
    before.addEventListener('click', beforeSong)
    rdm.addEventListener('click', random)
    eliminada.addEventListener('click', accionEliminar)
    desaprender.addEventListener('click', desaprenderTodo)

    info.innerHTML = "Video: "

    video.addEventListener("ended", nextSong, false)
    
 }

function cambiarCancion()
{
    var seleccion=document.getElementById('select2')
    info.innerHTML = "Video: " + seleccion.options[seleccion.selectedIndex].text
    video.src=seleccion.options[seleccion.selectedIndex].value
    posicion = seleccion.selectedIndex
    document.title = seleccion.options[seleccion.selectedIndex].text
    actualizarInfo()
    presionar()
    video.play()
}

function borrarOpciones(select) {
    const list = document.getElementById(select);

    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    const node2 = document.createElement("option")
    const textnode2 = document.createTextNode("--")
    node2.appendChild(textnode2)
    list.appendChild(node2)
}


function contarLineas(str, sep) {
    const arr = str.split(sep);
    return arr.filter(word => word !== '').length;
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

function darkMode() {
    var element = document.body;
    element.className = "dark-mode";
}

function lightMode() {
    var element = document.body;
    element.className = "light-mode";
}

function anadirAno() {
    var seleccion=document.getElementById('ano')
    elegido = seleccion.selectedIndex*2 +1
    anoElegido = seleccion.childNodes[elegido].value

}

function anadirSeason() {
    direccionGitHub = ''
    var seleccion=document.getElementById('season')
    elegido = seleccion.selectedIndex*2 +1
    seasonElegida = seleccion.childNodes[elegido].value
    direccionGitHub = direccion + anoElegido + seasonElegida + 'OPs.txt'
    anadirOpciones(direccionGitHub)
}


function anadirOpciones(direccion) {
    borrarOpciones('select2')
    let listaCancion

    fetch(direccion)
        .then(function (response) {
            switch (response.status) {
                // status "OK"
                case 200:
                    return response.text();
                // status "Not Found"
                case 404:
                    throw response;
            }
        })
        .then(function (template) {
            listaCancion = template
            cantidad = contarLineas(listaCancion, '\n')
            //arreglado = arreglar(listaCancion[0].list, cantidad)
            myArray = listaCancion.split("\n");
            myArray.sort()
            lista = new Array(cantidad)
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
                    i+1
                )

                anadirOpciones2(myArray2[i], i)
            }
            option = document.getElementById('select2')   
        })
        .catch(function (response) {
            // "Not Found"
            //console.log(response.statusText);
        });
}

function anadirOpciones2(myArray2, i) {
    const node = document.createElement("option")
    const textnode = document.createTextNode(myArray2[0] + ' OP ' + myArray2[2])
    node.appendChild(textnode)
    option = document.getElementById('select2').appendChild(node)
    option.value = myArray2[3]
    option.id = i + 1
}

function actualizarOpciones(myArray) {
    cantidad--
    borrarOpciones('select2')
    let myArray2 = new Array(cantidad)
    for (i = 0; i < cantidad; i++) {
        myArray2[i] = myArray[i].split('|')
    }
    //console.log(myArray2)
    myarray2 = ordenarAlf(myArray2)
    //console.log(myArray2)
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
            i+1
        )
        anadirOpciones2(myArray2[i], i)
    }
    option = document.getElementById('select2')   
}
function actualizarInfo() {
    
    let tabla = document.getElementById('tablaCancion')
    cont = tabla.childElementCount
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

    tabla.appendChild(nodeSongName)
    tr = tabla.lastChild
    tr.appendChild(node3)
    let songName = tr.lastChild
    textnode = document.createTextNode('Song: ' +lista[posicion-1].songName)
    songName.appendChild(textnode)

    tabla.appendChild(nodeArtist)
    tr = tabla.lastChild
    tr.appendChild(node6)
    let artist = tr.lastChild
    textnode = document.createTextNode('Artist: ' +lista[posicion-1].artist)
    artist.appendChild(textnode)

    tabla.appendChild(nodeDiff)
    tr = tabla.lastChild
    tr.appendChild(node5)
    let diff = tr.lastChild
    textnode = document.createTextNode('Diff: ' +lista[posicion-1].difficulty)
    diff.appendChild(textnode)
}

function ordenarAlf(array) {
    array2 = array.sort()
    return array2
}

window.addEventListener('load', iniciar, false)