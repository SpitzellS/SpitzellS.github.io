function filtroDiff(diffLista) {
    console.log(posicion)
    var diffBoolean = true
    if(diffLista[posicion-1].difficulty > minDiff && diffLista[posicion-1].difficulty < maxDiff) {
        document.title = diffLista[posicion-1].name
        info.innerHTML = "Video: " + diffLista[posicion-1].name + ' ' + 
                            diffLista[posicion-1].tipo + ' ' + 
                            diffLista[posicion-1].number
        video.src=diffLista[posicion-1].link
        var pagAnilist=document.getElementById('atributo')
        pagAnilist.href = anilistURL + diffLista[posicion-1].anilistID
    } else {
        diffBoolean = false
    }
    return diffBoolean
}

function filtroLetra(letraLista) {
    var letraBoolean = true
    var titulo = letraLista[posicion-1].name
    var primeraLetra = titulo[0].charCodeAt(0) - 65

    if(primeraLetra >= minLet && primeraLetra <= maxLet || minLet == -1 && primeraLetra <= minLet) {
        document.title = letraLista[posicion-1].name
        info.innerHTML = "Video: " + letraLista[posicion-1].name + ' ' + 
                                letraLista[posicion-1].tipo + ' ' + 
                                letraLista[posicion-1].number
        video.src=letraLista[posicion-1].link
        var pagAnilist=document.getElementById('atributo')
        pagAnilist.href = anilistURL + letraLista[posicion-1].anilistID
    } else {
        letraBoolean = false
    }
    
    return letraBoolean
}