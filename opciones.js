//Funcion que cambia la cancion al clikear en una opcion
function cambiarCancion()
{
    var selectCancion =document.getElementById('selectCancion')
    var video = document.getElementById("video")
    info.innerHTML = "Video: " + selectCancion.options[selectCancion.selectedIndex].text
    video.src = selectCancion.options[selectCancion.selectedIndex].value
    posicion = selectCancion.selectedIndex
    cont3 = posicion
    for (i=0; i < cont3; i++) {
        if(lista2[i].eliminada) {
            posicion++
        }
    }
    document.title = selectCancion.options[selectCancion.selectedIndex].text
    temp = selectCancion.options[selectCancion.selectedIndex].className
    var pagAnilist=document.getElementById('atributo')
    pagAnilist.href = anilistURL + temp
    eliminada.value = "Eliminar"
    actualizarInfo()
    presionar()
    video.play()
    removeTrack()
    errorTrack = true
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
    cantidad = 0
    cantidadTotal = 0
    anoElegido=document.getElementById('selectAno').value

    variosAnos = minAno == maxAno ? false : true

    if(variosAnos) {
        leerVariosAnos()
        document.getElementById("elegirSeason").style.visibility = "hidden"
    } else {
        document.getElementById("elegirSeason").style.visibility = "visible"
    }

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
// Si se elige cualquier otra --> Lo llama 1 vez
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
        leerTexto(direccionGitHub, elegido-1)
    }
}

function leerVariosAnos() {
    direccionGitHub = ''
    allBoolean = true
    for (i=minAno; i<maxAno+1; i++) {
        leerCadaAno(i)
    }

}

function leerCadaAno(ano) {
    let direccion1 = ''
    let direccion2 = ''
    let direccion3 = ''
    let direccion4 = ''

    direccion1 = direccion + ano + '/' + ano + 'Winter' + 'OPs.txt'
    direccion2 = direccion + ano + '/' + ano + 'Spring' + 'OPs.txt'
    direccion3 = direccion + ano + '/' + ano + 'Summer' + 'OPs.txt'
    direccion4 = direccion + ano + '/' + ano + 'Fall' + 'OPs.txt'

    arrayOpciones = []
    leerTexto(direccion1, 0);
    leerTexto(direccion2, 1);
    leerTexto(direccion3, 2);
    leerTexto(direccion4, 3);

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
            myArray = listaCancion.split("\n")
            myArray.sort()
            let myArray2 = new Array(cantidad)

            cantidad2 = cantidad
            let playlistSp = JSON.parse(localStorage.getItem('playlistSp'))
            let u = 0
            for (i = 0; i < cantidad2; i++) {
                
                myArray2[i] = myArray[i-u].split('|')
                //if (playlistSp[myArray2[i-u][3]]) {
                //    u++
                //    cantidad2--
                //    i--
                //}
                
            }
            
            guardarLista(myArray2)

            if(allBoolean && !variosAnos) {
                anadirLista2(temp, cantidad)
            } else if (variosAnos){
                anadirLista3(temp, cantidad)
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
}

function anadirOpciones(myArray2, i, temp) {
    const node = document.createElement("option")
    const textnode = document.createTextNode(myArray2[0] + ' OP ' + myArray2[2])
    node.appendChild(textnode)
    option = document.getElementById('selectCancion').appendChild(node)
    option.value = myArray2[3]
    option.id = i + 1
    option.className = myArray2[7]
}

function anadirLista2(temp, cantidad) {
    cantidadTotal = cantidadTotal + cantidad
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
            anadirOpciones2(arrayOpciones[i], i)
        }
    }
}

function anadirOpciones2(opcionArray, i) {
    if(!lista2[i].eliminada) {
        const node = document.createElement("option")
        const textnode = document.createTextNode(opcionArray[i][0] + ' OP ' + opcionArray[i][2])
        node.appendChild(textnode)
        option = document.getElementById('selectCancion').appendChild(node)
        option.value = opcionArray[i][3]
        option.id = i + 1
    
        //POR COMPROBAR
        option.className = opcionArray[i][7]
    } else {

    }

}

function anadirLista3(temp, cantidad) {
    cantidadTotal = cantidadTotal + cantidad

    anadirOpciones3(arrayOpciones,temp)
}

function anadirOpciones3(opcionArray,i) {
    if(i==3) {
        borrarOpciones("selectCancion")
        for (j = 0; j < opcionArray.length; j++ ) {
            let eliminada2

            if (localStorage.getItem('playlistSp')) {
                let playlistSp = JSON.parse(localStorage.getItem('playlistSp'))
                eliminada2 = playlistSp[arrayOpciones[j][3]] ? true : false
                lista2[j] = new Cancion(
                    arrayOpciones[j][0],
                    arrayOpciones[j][1],
                    arrayOpciones[j][2],
                    arrayOpciones[j][3],
                    arrayOpciones[j][4],
                    arrayOpciones[j][5],
                    arrayOpciones[j][6],
                    eliminada2,
                    j+1,
                    null,
                    arrayOpciones[j][7],
                    arrayOpciones[j][8])
                
                if(!lista2[j].eliminada) {
                    const node = document.createElement("option")
                    const textnode = document.createTextNode(opcionArray[j][0] + ' OP ' + opcionArray[j][2])
                    node.appendChild(textnode)
                    option = document.getElementById('selectCancion').appendChild(node)
                    option.value = opcionArray[j][3]
                    option.id = j + 1
                
                    //POR COMPROBAR
                    option.className = opcionArray[j][7]
                }

            } else {
                lista2[j] = new Cancion(
                    arrayOpciones[j][0],
                    arrayOpciones[j][1],
                    arrayOpciones[j][2],
                    arrayOpciones[j][3],
                    arrayOpciones[j][4],
                    arrayOpciones[j][5],
                    arrayOpciones[j][6],
                    false,
                    j+1,
                    null,
                    arrayOpciones[j][7],
                    arrayOpciones[j][8])
                const node = document.createElement("option")
                const textnode = document.createTextNode(opcionArray[j][0] + ' OP ' + opcionArray[j][2])
                node.appendChild(textnode)
                option = document.getElementById('selectCancion').appendChild(node)
                option.value = opcionArray[j][3]
                option.id = j + 1
            
                //POR COMPROBAR
                option.className = opcionArray[j][7]
            }

        }

    }

}
