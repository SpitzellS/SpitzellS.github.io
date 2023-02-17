//Funcion que cambia la cancion al clikear en una opcion
function cambiarCancion()
{
    //removeTrack()
    errorTrack = true
    var selectCancion =document.getElementById('selectCancion')
    var video = document.getElementById("video")
    posicion = selectCancion.selectedIndex
    cont3 = selectCancion.options[selectCancion.selectedIndex].id
    for (i=0; i < cont3; i++) {
        if(lista2[i].eliminada) {
            posicion++
        }
    }
    info.innerHTML = "Anime: " + selectCancion.options[selectCancion.selectedIndex].text
    anadirsrc(lista2)
    document.title = selectCancion.options[selectCancion.selectedIndex].text
    temp = selectCancion.options[selectCancion.selectedIndex].className
    var pagAnilist=document.getElementById('atributo')
    pagAnilist.href = anilistURL + temp
    eliminada.value = "Eliminar"
    actualizarInfo()
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
    addSeasonOpcion("Winter")
    addSeasonOpcion("Spring")
    addSeasonOpcion("Summer")
    addSeasonOpcion("Fall")
    addSeasonOpcion("All")
}

function addSeasonOpcion(temporada) {
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

    allSoloAno = elegido == 5 ? true : false
    if (allSoloAno) {
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
            for (i = 0; i < cantidad2; i++) {               
                myArray2[i] = myArray[i].split('|')
            }
            
            guardarLista(myArray2)

            if(allSoloAno || variosAnos) {
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
            myArray2[i][8],
            myArray2[i][9]
        )
        anadirOpciones(myArray2[i], i, temp)
    }
}

function anadirOpciones(myArray2, i, temp) {
    const node = document.createElement("option")
    const textnode = document.createTextNode(myArray2[0] + ' ' + myArray2[1] + ' ' + myArray2[2])
    node.appendChild(textnode)
    option = document.getElementById('selectCancion').appendChild(node)
    option.value = myArray2[3]
    option.id = i + 1
    option.className = myArray2[7]
}

function anadirLista2(temp, cantidad) {
    cantidadTotal = cantidadTotal + cantidad
    anadirOpciones2(arrayOpciones,temp)
    lista4 = lista2
}

function anadirOpciones2(opcionArray,i) {
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
                    arrayOpciones[j][8],
                    arrayOpciones[j][9]
                    )
                
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
                    arrayOpciones[j][8],
                    arrayOpciones[j][9],
                    )
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

function filtro() {
    let contador = 0
    lista2 = lista4
    
    let lista3 = new Array()
    borrarOpciones("selectCancion")
    for (j=0; j < lista2.length; j++) {
        var titulo = lista2[j].name
        var primeraLetra = titulo[0].charCodeAt(0) - 65
        if (lista2[j].difficulty > minDiff && lista2[j].difficulty < maxDiff && primeraLetra >= minLet && primeraLetra <= maxLet || minLet == -1 && primeraLetra <= minLet) {
                    if(!lista2[j].eliminada) {
                        lista3[contador] = lista2[j]
                        const node = document.createElement("option")
                        const textnode = document.createTextNode(lista2[j].name + ' OP ' + lista2[j].number)
                        //console.log(textnode)
                        node.appendChild(textnode)
                        option = document.getElementById('selectCancion').appendChild(node)
                        option.value = lista2[j].link
                        option.id = contador + 1
                    
                        //POR COMPROBAR
                        option.className = lista2[j].id

                        contador++
                    }
        }
    }
    lista2 = lista3
    cantidadTotal = contador
}