class Cancion {
    constructor( name, link, number, aprendida) {
        this.name = name
        this.link = link
        this.number = number
        this.aprendida = aprendida
    }
}

class Season {
    constructor(name, list) {
        this.name = name
        this.list = list
    }
}

let randomBoolean = false
let lista = null
let listaCancion = null
let posicion = 0
let season = 0
let loopBoolean = false
let cantidad = null

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
    var aprendida=document.getElementById('aprendida')

    boton.addEventListener('click', presionar, false)
    reiniciar.addEventListener('click', accionReiniciar, false)
    retrasar.addEventListener('click', accionRetrasar)
	adelantar.addEventListener('click', accionAdelantar)
    loop.addEventListener('click', accionLoop)
    next.addEventListener('click', nextSong)
    before.addEventListener('click', beforeSong)
    rdm.addEventListener('click', random)
    aprendida.addEventListener('click', songAprendida)
    desaprender.addEventListener('click', desaprenderTodo)

    info.innerHTML = "Video: "

    video.addEventListener("ended", nextSong, false)
    
    anadirSeasons()
 }

function cambiarCancion()
{
    var seleccion=document.getElementById('select2')
    info.innerHTML = "Video: " + seleccion.options[seleccion.selectedIndex].text;
    video.src=seleccion.options[seleccion.selectedIndex].value
    posicion = seleccion.selectedIndex-1
    document.title = seleccion.options[seleccion.selectedIndex].text

    video.play()
}

function anadirSeasons() {
    document.getElementById('inputfile').addEventListener('change', function() {
        borrarOpciones("select1")
        
        var fr=new FileReader()
        fr.onload=function(){
            cantidad = contarLineas(fr.result, '///')
            const myArray = fr.result.split("///");
            switch(cantidad) {
                case 1:
                    listaCancion = new Array(1)
                    const node = document.createElement("option")
                    listaCancion[0] = new Season(
                        "Lista de Canciones",
                        myArray[0]
                    )
                    const textnode = document.createTextNode("Lista de Canciones")
                    node.appendChild(textnode)
                    option = document.getElementById('select1').appendChild(node)
                    option.value = "Lista de Canciones"
                    option.id = 1
                    break;
                default:
                    listaCancion = new Array(cantidad/2)
                    for (i = 0; i < cantidad/2; i++) {
                        const node = document.createElement("option")
                        myArray2 = myArray[i*2 + 1].split('///')
                        myArray3 = myArray[i*2 + 2].split('///')
                        listaCancion[i] = new Season(
                            myArray2[0],
                            myArray3[0]
                        )
                        const textnode = document.createTextNode(myArray2[0])
                        node.appendChild(textnode)
                        option = document.getElementById('select1').appendChild(node)
                        option.value = myArray2[0]
                        option.id = i + 1
                    }
                    break;
            }
        }
        fr.readAsText(this.files[0]);
    })
}

function anadirOpciones() {
    borrarOpciones("select2")

    var seleccion=document.getElementById('select1')
    let myArray = null
    switch (cantidad) {
        case 1:
            season = seleccion.selectedIndex - 1
            cantidad = contarLineas(listaCancion[season].list, '\n')
            myArray = listaCancion[season].list.split("\n");
            lista = new Array(cantidad)
            for (i = 0; i < cantidad; i++) {
                const node = document.createElement("option")
                myArray2 = myArray[i].split('|')
                const textnode = document.createTextNode(myArray2[0])
                node.appendChild(textnode)
                option = document.getElementById('select2').appendChild(node)
                option.value = myArray2[1]
                option.id = i + 1
                lista[i] = new Cancion(
                    myArray2[0],
                    myArray2[1],
                    i+1,
                    false
                )
            }
            crearLista(lista)
            break;

        default:
            season = seleccion.selectedIndex-1
            cantidad = contarLineas(listaCancion[season].list, '\n')
        
            myArray = listaCancion[season].list.split("\n");
            lista = new Array(cantidad)
            for (i = 1; i < cantidad; i++) {
                const node = document.createElement("option")
                myArray2 = myArray[i].split('|')
                const textnode = document.createTextNode(myArray2[0])
                node.appendChild(textnode)
                option = document.getElementById('select2').appendChild(node)
                option.value = myArray2[1]
                option.id = i + 1
                lista[i] = new Cancion(
                    myArray2[0],
                    myArray2[1],
                    i+1,
                    false
                )
            }
            crearLista(lista)
        break;

    }
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

function crearLista(lista) {
    count = document.getElementById("tablaCanciones").childElementCount
    let list = document.getElementById("tablaCanciones")
    let textnode
    switch (count) {
        case 1:
            for (i=1; i<lista.length;i++) {
                let node = document.createElement("tr")
                let node2 = document.createElement("td")
                list.appendChild(node)
                let tr = list.lastChild
                tr.appendChild(node2)
                let td = tr.lastChild
                textnode = document.createTextNode(lista[i].name)
                td.appendChild(textnode)
            }
            break;
        default:
            cont = count
            while (cont != 1) {
                list.removeChild(list.children[1])
                cont--
            }
            crearLista(lista)
    }

}
function contarLineas(str, sep) {
    const arr = str.split(sep);
    return arr.filter(word => word !== '').length;
  }

function random() {
    if (!randomBoolean) {
        video.removeEventListener('ended', nextSong, false)
        video.addEventListener('ended', randomSong, false)
        randomBoolean = true
        rdm.value = "Unrandom"
    } else {
        video.removeEventListener('ended', randomSong, false)
        video.addEventListener('ended', nextSong, false)
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

window.addEventListener('load', iniciar, false)