//Funcion que cambia la cancion al clikear en una opcion
function cambiarCancion()
{
    var selectCancion =document.getElementById('selectCancion')
    info.innerHTML = "Video: " + selectCancion.options[selectCancion.selectedIndex].text
    video.src = selectCancion.options[selectCancion.selectedIndex].value
    posicion = selectCancion.selectedIndex
    document.title = selectCancion.options[selectCancion.selectedIndex].text
    temp = selectCancion.options[selectCancion.selectedIndex].className
    //console.log(temp)
    actualizarInfo(temp)
    presionar()
    video.play()
}

//Funcion que borra todas las opcions con el id pasado
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

//Funcion que resetea el selectSeason
function anadirAno() {
    var seleccion=document.getElementById('selectAno')
    var index = seleccion.selectedIndex*2 +1
    anoElegido = seleccion.childNodes[index].value
    
    borrarOpciones('selectSeason')

    resetSeason("Winter")
    resetSeason("Spring")
    resetSeason("Summer")
    resetSeason("Fall")
    resetSeason("All")
}

function resetSeason(temporada) {
    opcion = document.getElementById('selectSeason')

    season = document.createElement("option")
    textnode = document.createTextNode(temporada)
    season.appendChild(textnode)
    opcion.appendChild(season)
}

//Funcion que llama a leerTexto()
// Si se elige 'All' --> Lo llama 4 veces
// Si se elgie cualquier otra --> Lo llama 1 vez
function anadirSeason() {
    direccionGitHub = ''
    var seleccion=document.getElementById('selectSeason')
    elegido = seleccion.selectedIndex
    
    allBoolean = elegido == 5 ? true : false

    if (allBoolean) {
        let direccion1 = ''
        let direccion2 = ''
        let direccion3 = ''
        let direccion4 = ''

        direccion1 = direccion + anoElegido + '/' + anoElegido + 'Winter' + 'OPs.txt'
        direccion2 = direccion + anoElegido + '/' + anoElegido + 'Spring' + 'OPs.txt'
        direccion3 = direccion + anoElegido + '/' + anoElegido + 'Summer' + 'OPs.txt'
        direccion4 = direccion + anoElegido + '/' + anoElegido + 'Fall' + 'OPs.txt'

        arrayOpciones = []
        leerTexto(direccion1, 0)
        leerTexto(direccion2, 1)
        leerTexto(direccion3, 2)
        leerTexto(direccion4, 3)

    } else {
        seasonElegida = seleccion.childNodes[elegido].value
        direccionGitHub = direccion + anoElegido + '/' + anoElegido + seasonElegida + 'OPs.txt'
        //ARREGLAR 0
        leerTexto(direccionGitHub, 0)
    }
}


function leerTexto(direccion, temp) {
    borrarOpciones('selectCancion')
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
            let myArray2 = new Array(cantidad)
            for (i = 0; i < cantidad; i++) {
                myArray2[i] = myArray[i].split('|')
            }

            guardarLista(myArray2)

            if(allBoolean) {
                anadirLista2(temp, cantidad)
                
            } else {
                myArray2 = ordenarAlf(myArray2)
                anadirLista(myArray2, temp, cantidad)
            }

        })
        .catch(function (response) {
            // "Not Found"
            //console.log(response.statusText);
            
        });
}

//Modifica el array arrayOpciones cuando se elige 'All'
function guardarLista(myArray2) {
    arrayOpciones = ordenarAlf(arrayOpciones.concat(myArray2))
}

//Funcion que añade el array pasado a la variable 'lista'
function anadirLista(myArray2, temp, cantidad) {
    lista = new Array(cantidad)
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
            temp,
            myArray2[i][7],
            myArray2[i][8]
        )
        anadirOpciones(myArray2[i], i, temp)
    }
    arrayCantidad[temp] = cantidad
    arrayLista[temp] = lista
}

function anadirOpciones(myArray2, i, temp) {
    const node = document.createElement("option")
    const textnode = document.createTextNode(myArray2[0] + ' OP ' + myArray2[2])
    node.appendChild(textnode)
    option = document.getElementById('selectCancion').appendChild(node)
    option.value = myArray2[3]
    option.id = i + 1
    option.className = temp
}

function anadirLista2(temp, cantidad) {
    //console.log(arrayOpciones)
    lista2 = new Array(arrayOpciones.length)
    for (i = 0; i < arrayOpciones.length; i++) {
        lista2[i] = new Cancion(
            arrayOpciones[i][0],
            arrayOpciones[i][1],
            arrayOpciones[i][2],
            arrayOpciones[i][3],
            arrayOpciones[i][4],
            arrayOpciones[i][5],
            arrayOpciones[i][6],
            false,
            i+1,
            temp,
            arrayOpciones[i][7],
            arrayOpciones[i][8]
        )
        if(temp == 3) {
            anadirOpciones2(arrayOpciones[i], i, temp)
        }
    }

    //POR COMPROBAR
    arrayCantidad[temp] = cantidad
    arrayLista[temp] = lista
}

function anadirOpciones2(opcionArray, i, temp) {

    const node = document.createElement("option")
    const textnode = document.createTextNode(opcionArray[0] + ' OP ' + opcionArray[2])
    node.appendChild(textnode)
    option = document.getElementById('selectCancion').appendChild(node)
    option.value = opcionArray[3]
    option.id = i + 1

    //POR COMPROBAR
    option.className = temp
}

