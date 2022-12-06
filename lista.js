function deletePerm() {

    if (!localStorage.getItem('playlistSp')) {
        localStorage.setItem('playlistSp', '{}')

        if(allBoolean) {
            const webm = lista2[posicion-1].link
        
            const playlistSp = JSON.parse(localStorage.getItem('playlistSp'))
            //const current = playlistSp[webm] ?? {elminada: false}
    
            localStorage.setItem('playlistSp', JSON.stringify({
                ...playlistSp,
            [webm]: {
                    eliminada: true
                }
            }))
        } else {
            const webm = lista[posicion-1].link
        
            const playlistSp = JSON.parse(localStorage.getItem('playlistSp'));
            localStorage.setItem('playlistSp', JSON.stringify({
                ...playlistSp,
            [webm]: {
                    eliminada: true
                }
            }))
        }
    } else {
        
        if(allBoolean) {
            const webm = lista2[posicion-1].link
        
            const playlistSp = JSON.parse(localStorage.getItem('playlistSp'))
    
            localStorage.setItem('playlistSp', JSON.stringify({
                ...playlistSp,
            [webm]: {
                    eliminada: true
                }
            }))
        } else {
            const webm = lista[posicion-1].link
        
            const playlistSp = JSON.parse(localStorage.getItem('playlistSp'));
            localStorage.setItem('playlistSp', JSON.stringify({
                ...playlistSp,
            [webm]: {
                    eliminada: true
                }
            }))
        }
    }

}

function restaurarTodo() {
    localStorage.removeItem('playlistSp')
}

function contarBorrado(posicion) {
    let variable=0
    if (localStorage.getItem('playlistSp')) {
        let playlistSp = JSON.parse(localStorage.getItem('playlistSp'))

        var count = Object.keys(playlistSp).length

        for ( k = 0; k < posicion ; k++) {
            eliminada3 = playlistSp[arrayOpciones[k][3]] ? true : false

            if (eliminada3) {
                variable++
            }
        }
        
    } else {
        variable = 0
    }
    return variable
}