let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3


function iniciarJuego(){
    let sectionSeleccionarAtaque = document.getElementById('Selecionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('Reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonMascota = document.getElementById ('Boton-mascota')
    botonMascota.addEventListener ('click',selecionarmascotajugador)

    let botonFuego = document.getElementById('Bnt-Fuego')
    botonFuego.addEventListener('click',ataqueFuego)
    let botonAgua = document.getElementById('Bnt-Agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('Bnt-Tierra')
    botonTierra.addEventListener('click',ataqueTierra)

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click',reiniciarJuego)
}

function selecionarmascotajugador () {
    let sectionSeleccionarMascota = document.getElementById('Selecionar-Mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById('Selecionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'

    let input1=document.getElementById("Hipodoge")
    let input2=document.getElementById("Capipepo")
    let input3=document.getElementById("Ratigueya")
    let MascotaJugador = document.getElementById('mascota-jugador')

    if(input1.checked){
        document.getElementById ('Bnt-Fuego').disabled = false
        document.getElementById ('Bnt-Tierra').disabled = false
        document.getElementById ('Boton-mascota').disabled = true
        MascotaJugador.innerHTML = 'Hipodoge'
        
          
    }
    else if (input2.checked){
        document.getElementById ('Bnt-Fuego').disabled = false
        document.getElementById ('Bnt-Agua').disabled = false
        document.getElementById ('Boton-mascota').disabled = true
        MascotaJugador.innerHTML = 'Capipepo'

    }
    else if (input3.checked){
        document.getElementById ('Bnt-Agua').disabled = false
        document.getElementById ('Bnt-Tierra').disabled = false
        document.getElementById ('Boton-mascota').disabled = true
        MascotaJugador.innerHTML = 'Ratigueya'
    }
    else {
        alert("Seleciona una mascota")
        sectionSeleccionarAtaque.style.display = 'none'
    }
    selecionarmascotaEnemigo ()
}


function aleatorio(min,max) {
    return Math.floor(Math.random() * (max-min +1) + min )
   
}
function selecionarmascotaEnemigo(){
    let mascotaAleatorio = aleatorio(1,3)

    let mascotaEnemiga = document.getElementById('mascota-enemigo')

    if(mascotaAleatorio == 1){
        mascotaEnemiga.innerHTML = 'Hipodoge'
    }
    else if (mascotaAleatorio == 2){
        mascotaEnemiga.innerHTML = 'Capipepo'

    }
    else {
        mascotaEnemiga.innerHTML = 'Ratigueya'
    } 
    
}

function ataqueFuego() {
    ataqueJugador = 'Fuego'
    ataqueAleatorioEnemigo()
}
function ataqueAgua() {
    ataqueJugador = 'Agua'
    ataqueAleatorioEnemigo()
}
function ataqueTierra() {
    ataqueJugador = 'Tierra'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)
       if (ataqueAleatorio==1){
        ataqueEnemigo = 'Fuego'
        
    } else if (ataqueAleatorio==2){
        ataqueEnemigo ='Agua'
       
    }else{
        ataqueEnemigo='Tierra'
        
    }

    combate()

}

function combate() {
    let vidasJugadors=document.getElementById('vidas-jugador')
    let vidasEnemigos=document.getElementById('vidas-enemigo')
    if(ataqueJugador==ataqueEnemigo){
        crearMensaje("empate")
    }else if (ataqueJugador== 'Fuego' && ataqueEnemigo== 'Tierra' 
              || ataqueJugador== 'Agua' && ataqueEnemigo == 'Fuego'
              || ataqueJugador == 'Tierra' && ataqueEnemigo == "Agua" ){
        crearMensaje("Ganaste")
        vidasEnemigo --
        vidasEnemigos.innerHTML = vidasEnemigo
    } else {
        crearMensaje ("Perdistes")
        vidasJugador --
        vidasJugadors.innerHTML = vidasJugador
    }
    revisarVidas()
}
function crearMensaje(resultado) {
    let sectionMensajes = document.getElementById('resultado')
    let ataqueDelJugador = document.getElementById('ataqueJugador')
    let ataqueDelEnemigo = document.getElementById('ataqueEnemigo')
    
  
    let  nuevoAtaqueDelJugador = document.createElement('p')
    let  nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

  /*   let parrafo = document.createElement('p')
    parrafo.innerHTML ='Tu mascota ataco con ' + ataqueJugador + ' la mascota del enemigo ataco con ' + ataqueEnemigo + ' ' + resultado
     */
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)  
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)  
    
    
}
function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById('resultado')

   sectionMensajes.innerHTML =  resultadoFinal
    
   
    document.getElementById ('Bnt-Fuego').disabled = true
    document.getElementById ('Bnt-Tierra').disabled = true
    document.getElementById ('Bnt-Agua').disabled = true
    document.getElementById ('Boton-mascota').disabled = true 

    let sectionReiniciar = document.getElementById('Reiniciar')
    sectionReiniciar.style.display = 'block'
}



function revisarVidas() {
    if (vidasEnemigo==0){
        crearMensajeFinal(" Ganastes! Muy bien ")
        
    }else if (vidasJugador == 0){
        crearMensajeFinal(" Tu enemigo jugo mejor que tu ")
       
    }
    
}




function reiniciarJuego() {
    location.reload()
    if (vidasJugador>vidasEnemigo){
        vidasEnemigo ++
        vidasEnemigos.innerHTML = vidasEnemigo
    }else {
        alert(" Sigue intentando ")
    }
    
}

window.addEventListener ('load',iniciarJuego)