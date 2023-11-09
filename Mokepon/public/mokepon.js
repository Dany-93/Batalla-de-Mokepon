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

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos=[]
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
let mascotaJugadorObjeto
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350
if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos



let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src= './assets/mokemap.png'

class Mokepon {
    constructor (nombre, foto, vida,fotoMapa, id = null ){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5,'./assets/hipodoge.png')

let capipepo = new Mokepon ('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png', 5,'./assets/capipepo.png' )

let ratigueya = new Mokepon ('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')


const hipodoge_ataques=[
    { nombre: '💧', id: 'Bnt-Agua'},
    { nombre: '💧', id: 'Bnt-Agua'},
    { nombre: '💧', id: 'Bnt-Agua'},
    { nombre: '🪨', id: 'Bnt-Tierra'},
    { nombre: '🔥', id: 'Bnt-Fuego'}
]
const capipepo_ataques=[
    { nombre: '💧', id: 'Bnt-Agua'},
    { nombre: '🔥', id: 'Bnt-Fuego'},
    { nombre: '🪨', id: 'Bnt-Tierra'},
    { nombre: '🪨', id: 'Bnt-Tierra'},
    { nombre: '🪨', id: 'Bnt-Tierra'}
]
const ratigueya_ataques=[
    { nombre: '🔥', id: 'Bnt-Fuego'},
    { nombre: '🔥', id: 'Bnt-Fuego'},
    { nombre: '🔥', id: 'Bnt-Fuego'},
    { nombre: '💧', id: 'Bnt-Agua'},
    { nombre: '🪨', id: 'Bnt-Tierra'}

]
hipodoge.ataques.push(...hipodoge_ataques)

capipepo.ataques.push(...capipepo_ataques)

ratigueya.ataques.push(...ratigueya_ataques)

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

    unirseAlJego()
}

function unirseAlJego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function selecionarmascotajugador () {
    
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
        return
    }

    seleccionarMokepon(mascotaJugado)

    extraerAtaque(mascotaJugado)
    sectionVerMapa.style.display = 'flex'
    /*fillrect crea retangulo en el canvas */
    iniciarMapa()
   
}

function seleccionarMokepon(mascotaJugado) {
    fetch (`http://localhost:8080/mokepon/${jugadorId}`,{
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon:mascotaJugado
        })
    })
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
            //ataqueAleatorioEnemigo()
            if(ataqueJugador.length == 5){
                enviarAtaques()
            }   
        })

    } )
    
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers:{"Content-Type":"application/json"
        },
        body:JSON.stringify({
            ataques:ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques,50)
}

function obtenerAtaques() {
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function({ataques}){
                if(ataques.length == 5){
                    ataqueEnemigo= ataques
                    combate()
                }
            })
        }
    })
    
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
    clearInterval(intervalo)

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
function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x+ mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y+ mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)/*limpia el canvas*/
    lienzo.drawImage (
        mapaBackground,
        0,0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)
    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColiciones(mokepon)
    })
    /*hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()

    if(mascotaJugadorObjeto.velocidadX !==0 || mascotaJugadorObjeto.velocidadY !=0 ){
        revisarColiciones(hipodogeEnemigo)
        revisarColiciones(capipepoEnemigo)
        revisarColiciones(ratigueyaEnemigo)
    }
    */
}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png',enemigo.id)
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png',enemigo.id)
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png',enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    
                    })
                })
        }
    })
}
function moverarriba() {
    mascotaJugadorObjeto.velocidadY = - 5
}
function moverizquierda() {
    mascotaJugadorObjeto.velocidadX = -5 
}
function moverderecha() {
    mascotaJugadorObjeto.velocidadX =  5
    
}
function moverabajo() {
    mascotaJugadorObjeto.velocidadY =  5
    
}
function detenermovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePresionounatecla(event) {
    switch (event.key){
        case 'ArrowUp':
            moverarriba()
            break

        case 'ArrowDown':
            moverabajo()
            break
        
        case 'ArrowLeft':
            moverizquierda()
            break

        case 'ArrowRight':
            moverderecha()
            break

        default:
            break;
    }
}

function iniciarMapa() {

    mascotaJugadorObjeto= obtenerObjetoMascota(mascotaJugadorObjeto)
    intervalo = setInterval(pintarCanvas,50)

    window.addEventListener('keydown', sePresionounatecla)
    window.addEventListener('keyup', detenermovimiento)
}
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugado == mokepones[i].nombre) {
          return mokepones[i]

        }
    }
}
function revisarColiciones(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo||
        izquierdaMascota > derechaEnemigo) {
        return
    }
    

    detenermovimiento()
    clearInterval(intervalo)
    enemigoId=enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    //alert("Colicion con "+ enemigo.nombre)
    sectionVerMapa.style.display = 'none'
    
    
    console.log('se detecto');
  
    selecionarmascotaEnemigo (enemigo)

}
window.addEventListener ('load',iniciarJuego)