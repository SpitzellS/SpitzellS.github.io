let json = localStorage.getItem('playlistSp')
let playlistSp = JSON.parse(json)

function creaTabla() {
    const tabla = document.querySelector('#miTabla tbody')
    for (const url in playlistSp) {

        const nuevaFila = document.createElement('tr')
        const celdaURL = document.createElement('td')
        const celdaName = document.createElement('td')
        const celdaBoton = document.createElement('td')
        const boton = document.createElement('button')

        celdaName.textContent = playlistSp[url].name
        nuevaFila.appendChild(celdaName)

        celdaURL.textContent = url
        nuevaFila.appendChild(celdaURL)

        boton.textContent = 'Añadir'
        boton.addEventListener('click', () => {
            delete playlistSp[url]
            const objetoActualizado = JSON.stringify(playlistSp)
            localStorage.setItem('playlistSp', objetoActualizado)
            tabla.removeChild(nuevaFila);
        });
        celdaBoton.appendChild(boton)
        nuevaFila.appendChild(celdaBoton)
            
        tabla.appendChild(nuevaFila)
      }
}

function buscador() {
    let input = document.getElementById("buscador")
    let tabla = document.querySelector('#miTabla tbody')
    let filas = tabla.getElementsByTagName("tr")
    let filter = input.value.toUpperCase()
    for (var i=0; i < filas.length; i++) {
        var celdas = filas[i].getElementsByTagName("td")
        var mostrar = false
        for (var j=0; j < celdas.length; j++) {
          var texto = celdas[j].textContent.toUpperCase()
          console.log(texto.indexOf(filter))
          if (texto.indexOf(filter) > -1) {
            mostrar = true
            break
          }
        }
        if (mostrar) {
          filas[i].style.display = ""
        } else {
          filas[i].style.display = "none"
        }
      }
}

window.addEventListener('load', creaTabla, false)