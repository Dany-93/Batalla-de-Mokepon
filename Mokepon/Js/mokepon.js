const sectionSeleccionarAtaque = document.getElementById('Selecionar-ataque')
const sectionReiniciar = document.getElementById('Reiniciar')
const botonMascota = document.getElementById ('Boton-mascota')
sectionSeleccionarAtaque.style.display = 'none'
const botonReiniciar = document.getElementById('boton-reiniciar')


const sectionSeleccionarMascota = document.getElementById('Selecionar-Mascota')

const MascotaJugador = document.getElementById('mascota-jugador')

const mascotaEnemiga = document.getElementById('mascota-enemigo')

const vidasJugadors=document.getElementById('vidas-jugador')
const vidasEnemigos=document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataqueJugador')
const ataqueDelEnemigo = document.getElementById('ataqueEnemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorBotones = document.getElementById('contenedorBotones')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionesDeMokepones
let ataquesMokepon
let ataquesMokeponEnemigo


let botonFuego 
let botonAgua 
let botonTierra 
let botones = []

let input1=document.getElementById("hipodoge")
let input2=document.getElementById("capipepo")
let input3=document.getElementById("ratigueya")
let indexAtaqueJugador
let indexAtaqueEnemigo
let mascotaJugado
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3

let lienzo = mapa.getContext("2d")

class Mokepon {
    constructor (nombre, foto, vida ){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)

let capipepo = new Mokepon ('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5 )

let ratigueya = new Mokepon ('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5)




hipodoge.ataques.push(
    { nombre: '💧', id: 'Bnt-Agua'},
    { nombre: '💧', id: 'Bnt-Agua'},
    { nombre: '💧', id: 'Bnt-Agua'},
    { nombre: '🪨', id: 'Bnt-Tierra'},
    { nombre: '🔥', id: 'Bnt-Fuego'}
)

capipepo.ataques.push(
    { nombre: '💧', id: 'Bnt-Agua'},
    { nombre: '🔥', id: 'Bnt-Fuego'},
    { nombre: '🪨', id: 'Bnt-Tierra'},
    { nombre: '🪨', id: 'Bnt-Tierra'},
    { nombre: '🪨', id: 'Bnt-Tierra'}
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'Bnt-Fuego'},
    { nombre: '🔥', id: 'Bnt-Fuego'},
    { nombre: '🔥', id: 'Bnt-Fuego'},
    { nombre: '💧', id: 'Bnt-Agua'},
    { nombre: '🪨', id: 'Bnt-Tierra'}
)
mokepones.push(hipodoge,capipepo,ratigueya)


function iniciarJuego(){
    
    sectionReiniciar.style.display = 'none'

    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionesDeMokepones = `
        <input type="radio" name="Mascota" id=${mokepon.nombre}>
        <label class="terjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionesDeMokepones

    input1=document.getElementById("Hipodoge")
    input2=document.getElementById("Capipepo")
    input3=document.getElementById("Ratigueya")
    })

    botonMascota.addEventListener ('click',selecionarmascotajugador)
    botonReiniciar.addEventListener('click',reiniciarJuego)
}

function selecionarmascotajugador () {
    sectionSeleccionarMascota.style.display = 'none'

   // sectionSeleccionarAtaque.style.display = 'flex'
    
    sectionVerMapa.style.display = 'flex'
    let imagenDeCapipepo = new Image()
    imagenDeCapipepo.src = capipepo.foto
    lienzo.drawImage(
        imagenDeCapipepo,
        20,40,100,100
    ) /*fillrect crea retangulo en el canvas */

   if(input1.checked){
        MascotaJugador.innerHTML = input1.id
        mascotaJugado = input1.id
          
    }
    else if (input2.checked){
        MascotaJugador.innerHTML = input2.id
        mascotaJugado = input2.id

    }
    else if (input3.checked){
        MascotaJugador.innerHTML = input3.id
        mascotaJugado = input3.id
    }
    else {
        alert("Seleciona una mascota")
        sectionSeleccionarAtaque.style.display = 'none'
    }
    extraerAtaque(mascotaJugado)
    selecionarmascotaEnemigo ()
}

function extraerAtaque(mascotaJugado) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugado == mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)

}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="boton-Ataque BAtaque">${ataque.nombre}</button>`

        contenedorBotones.innerHTML += ataquesMokepon

    } )
    botonFuego = document.getElementById('Bnt-Fuego')
    botonAgua = document.getElementById('Bnt-Agua')
    botonTierra = document.getElementById('Bnt-Tierra')
    botones=document.querySelectorAll('.BAtaque')
    
    
}
function secuenciaAtaques() {
    botones.forEach((boton) =>{
        boton.addEventListener('click',(e) => {
            if (e.target.textContent == '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                document.getElementById ('Bnt-Fuego').disabled = true
                
            }else if (e.target.textContent == '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                document.getElementById ('Bnt-Agua').disabled = true
            }else {ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                document.getElementById ('Bnt-Tierra').disabled = true
            }
            ataqueAleatorioEnemigo()
        })

    } )
    
}



function aleatorio(min,max) {
    return Math.floor(Math.random() * (max-min +1) + min )
   
}
function selecionarmascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0,mokepones.length - 1)

    mascotaEnemiga.innerHTML = mokepones [mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones [mascotaAleatorio].ataques
    secuenciaAtaques()
}


function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length - 1)
       if (ataqueAleatorio == 0 || ataqueAleatorio ==1){
        ataqueEnemigo.push('FUEGO')
        
    } else if (ataqueAleatorio == 2 || ataqueAleatorio == 3){
        ataqueEnemigo.push('AGUA')
       
    }else{
        ataqueEnemigo.push('TIERRA')
        
    }
    
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length ==5) {
        combate()
    }
}

function indexOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexOponentes(index, index);
            crearMensaje("EMPATE");
        } else if (ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA' || ataqueJugador[index] =='AGUA' && ataqueEnemigo[index] == 'FUEGO' || ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA' ) {
            indexOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            vidasJugadors.innerHTML = victoriasJugador;
        } else {
            indexOponentes(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++;
            vidasEnemigos.innerHTML = victoriasEnemigo;
        }
    }
        
    revisarVictorias()
}
function crearMensaje(resultado) {
    let  nuevoAtaqueDelJugador = document.createElement('p')
    let  nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

  /*   let parrafo = document.createElement('p')
    parrafo.innerHTML ='Tu mascota ataco con ' + ataqueJugador + ' la mascota del enemigo ataco con ' + ataqueEnemigo + ' ' + resultado
     */
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)  
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)  
    
    
}
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML =  resultadoFinal
    
   
   
    document.getElementById ('Boton-mascota').disabled = true 

    sectionReiniciar.style.display = 'block'
}

function revisarVictorias() {
    if (victoriasEnemigo < victoriasJugador){
        crearMensajeFinal(" Ganastes! Muy bien ")
        
    }else if (victoriasJugador < victoriasEnemigo){
        crearMensajeFinal(" Tu enemigo jugo mejor que tu ")
       
    }else {
        crearMensajeFinal("Fue un empate")
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