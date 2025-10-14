// traigo el array de preguntas jugadas para capturar la última
let preguntasJugadas = localStorage.getItem("preguntasJugadas")
preguntasJugadas = JSON.parse(preguntasJugadas)

//Traigo el score
let score = localStorage.getItem("score")

//Capturo el container donde voy a cargar las preguntas y opciones de rta
let triviaContainer = document.querySelector(".trivia-container")

//guardo en una const la ultima preg a la q le hice clic {objeto}
const ultimaJugada = preguntasJugadas[preguntasJugadas.length - 1];
//console.log(ultimaJugada)

//rendereo la pregunta con sus opciones en el html
function armarPregunta() {
    let pregunta = document.querySelector(".pregunta")
    pregunta.innerHTML = ultimaJugada.nombre

    let puntos = document.querySelector(".puntos")
    puntos.innerHTML = `Valor: ${ultimaJugada.puntos} puntos`

    // un forEach() para recorrer el array de opciones y armar un boton por cada una
    ultimaJugada.opciones.forEach((opcion, index) => {
        //creo el boton
        let botonRta = document.createElement("button")
        //le asigno la clase
        botonRta.className = "opcion"
        //le asigno un ID
        botonRta.id = index
        //le asigno el texto
        botonRta.innerHTML = opcion
        //lo agrego al parent
        triviaContainer.appendChild(botonRta)
    })
    escucharRta()
} 


//escucho a que rta le hace clic el usuario
function escucharRta() {
    //selecciono todos los elementos .opcion
    respuesta = document.querySelectorAll(".opcion")
    //para cada bt
    respuesta.forEach(button => {
        //capturo el evento
        button.onclick = (e) => {
            const respuestaId = e.currentTarget.id
            //falta deshabilitar los botones luego del clic
            respuesta.forEach(button => {button.disabled = true})
            // comparo el id de respuesta seleccionada con id rta correcta a ver si coinciden
            if (respuestaId == ultimaJugada.respuesta){
                let evaluacion = document.createElement("div")
                evaluacion.className = "correcto"
                evaluacion.innerHTML = `Correcto!
                                        <a href="../index.html" class="volver">volver</a>`
                triviaContainer.appendChild(evaluacion)
                //sumar score
                const totalPuntos = parseInt(score) + parseInt(ultimaJugada.puntos)
                localStorage.setItem("score", totalPuntos)
            } else {
                let evaluacion = document.createElement("div")
                evaluacion.className = "incorrecto"
                evaluacion.innerHTML = `Incorrecto :(
                                        <a href="../index.html" class="volver">volver</a>`
                triviaContainer.appendChild(evaluacion)
            }
        }
    })
}


armarPregunta()