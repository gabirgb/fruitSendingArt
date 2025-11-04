// traigo el array de preguntas jugadas para capturar la última
let preguntasJugadas = localStorage.getItem("preguntasJugadas")
preguntasJugadas = JSON.parse(preguntasJugadas)

//Traigo el score
let score = localStorage.getItem("score")

//Capturo el container donde voy a cargar las preguntas y opciones de rta
let triviaContainer = document.querySelector(".trivia-container")

//guardo en una const la ultima preg a la q le hice clic {objeto}
const ultimaJugada = preguntasJugadas[preguntasJugadas.length - 1];
console.log(ultimaJugada)

//rendereo la pregunta con sus opciones en el html
function armarPregunta() {
    let pregunta = document.querySelector(".pregunta")
    pregunta.innerHTML = ultimaJugada.nombre

    if (ultimaJugada.obra) {
        let obras = document.querySelector(".obra")
        obras.innerHTML = `<img src="${ultimaJugada.obra}" alt="" class="obra-img" />`
    }

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
            //para cada boton
            respuesta.forEach(button => {
                //los deshabilito luego del clic
                button.disabled = true
                // si es el boton correcto lo pinto de verde
                if (button.id == ultimaJugada.respuesta) {
                    button.className = "opcion btn btn-success"
                } else {
                    // si no de rojo
                    button.className = "opcion btn btn-danger"
                }
            })
            //muestro rta correcta

            // comparo el id de respuesta seleccionada con id rta correcta a ver si coinciden
            if (respuestaId == ultimaJugada.respuesta) {
                let evaluacion = document.createElement("div")
                evaluacion.className = "correcto"
                evaluacion.innerHTML = `<div class="alert alert-success" role="alert">Correcto!</div>
                                        <a href="../index.html" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Volver</a>`
                triviaContainer.appendChild(evaluacion)
                //sumar score
                const totalPuntos = parseInt(score) + parseInt(ultimaJugada.puntos)
                localStorage.setItem("score", totalPuntos)
            } else {
                let evaluacion = document.createElement("div")
                evaluacion.className = "incorrecto"
                evaluacion.innerHTML = `<div class="alert alert-danger" role="alert">Incorecto :(</div>
                                        <a href="../index.html" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Volver</a>`
                triviaContainer.appendChild(evaluacion)
            }
        }
    })
}


armarPregunta()