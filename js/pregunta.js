// PREGUNTA


//======================================================================
// 1- DECLARO/ INICIO VARIABLES
//======================================================================
let preguntasDisponibles = []
let preguntasJugadas = []
let score = ""
let nombreGuardado = ""

// reviso si ya hay localStorage y si existe guardo los valores en la variable
if (localStorage.getItem("preguntasJugadas")) {
    preguntasJugadas = localStorage.getItem("preguntasJugadas")
    preguntasJugadas = JSON.parse(preguntasJugadas)
}

if (localStorage.getItem("nombreUsuario")) {
    nombreGuardado = localStorage.getItem("nombreUsuario")
}

if (localStorage.getItem("score")) {
    score = localStorage.getItem("score")
}

//Capturo el container donde voy a cargar las preguntas y opciones de rta
let triviaContainer = document.querySelector(".trivia-container")

//guardo en una const la ultima preg a la q le hice clic {objeto}
const ultimaJugada = preguntasJugadas[preguntasJugadas.length - 1];

//======================================================================
// 2- DEFINO LAS FUNCIONES
//======================================================================

// Funcion para escuchar boton "La trivia" ***********************************************
function escucharAbout() {
    about.onclick = (e) => {
        Swal.fire({
            title: "Bienvenid@ a <strong>Mandá Fruta y Arte!</strong>",
            html: `
                <p class="descripcion">Bienvenidos a la trivia donde el conocimiento es opcional
                    y la improvisación es arte. Acá no importa si sabés quién pintó qué o en qué siglo nació tal
                    escultor:lo que importa es tu capacidad para responder con estilo, convicción y una pizca de
                    fruta bien mandada. ¡A improvisar se ha dicho!</p>
                <p>Si querés ponerte en contacto podes encontrarme en IG <strong>@gabienelmundo</strong></p>
            `,
            showCloseButton: true
        })
    }
}


// Funcion usuario cargado *********************************************
function usuarioCargado() {
    const bienvenide = document.getElementById("welcome")
    bienvenide.className = "salude"
    bienvenide.innerHTML = `¡Bienvenid@ ${nombreGuardado}! Tenes ${score} puntos`
}

// Funcion constructora pregunta *********************************************
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

// Funcion evaluacion respuesta *********************************************
function escucharRta() {
    //selecciono todos los elementos .opcion
    let respuesta = document.querySelectorAll(".opcion")
    //para cada bt
    respuesta.forEach(button => {
        //capturo el evento
        button.onclick = (e) => {
            // capturo el id de la rta correcta
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
                Toastify({
                    text: `Correcto! Ganaste ${ultimaJugada.puntos}`,
                    duration: 3000,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                        right: "20px",
                        left: "auto", // esto anula el centrado
                    }
                }).showToast()
                //sumar score
                const totalPuntos = parseInt(score) + parseInt(ultimaJugada.puntos)
                localStorage.setItem("score", totalPuntos)
                // volver
                let evaluacion = document.createElement("div")
                evaluacion.className = "correcto"
                evaluacion.innerHTML = `<div class="alert alert-success" role="alert">
                                            <a href="../index.html" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Volver</a>
                                        </div>`
                triviaContainer.appendChild(evaluacion)
            } else {
                Toastify({
                    text: `Incorrecto :(`,
                    duration: 3000,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, rgba(176, 0, 0, 1), rgba(201, 91, 61, 1))",
                        right: "20px",
                        left: "auto", // esto anula el centrado
                    }
                }).showToast()
                let evaluacion = document.createElement("div")
                evaluacion.className = "incorrecto"
                evaluacion.innerHTML = `<div class="alert alert-danger" role="alert">
                                            <a href="../index.html" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Volver</a>
                                        </div>`
                triviaContainer.appendChild(evaluacion)
            }
        }
    })
}

escucharAbout()
usuarioCargado()
armarPregunta()