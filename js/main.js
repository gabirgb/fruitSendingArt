//Trivia de preguntas y respuestas por niveles

//======================
// Inicializo variables
//======================
let preguntasDisponibles = []
let preguntasJugadas = []

// Cargo localStorages
let nombreGuardado = localStorage.getItem("nombreUsuario")
let score = localStorage.getItem("score")

// Vinculo el div que contiene las preguntas
let jeopardyBoard = document.getElementById("jeopardy-board")

// Vinculo el json con la data
const URL = "./db/data.json"


//======================================================================
// Funcion que chequea si el usuario es nuevo o si lo saludo nuevamente
//======================================================================
function saludo() {
    if (nombreGuardado !== null) {
        // traigo los localstorage guardados
        // NOMBRE y saludo
        const saludo = document.getElementById("row-welcome")
        saludo.innerHTML = `¡Bienvenid@ de nuevo, ${nombreGuardado}!`

        //SCORE y puntaje
        let rowTitle = document.getElementById("row-title")
        rowTitle.innerHTML = "Tenes " + score + " puntos"

        console.log(nombreGuardado + " - " + score)

    } else {
        //Si es usuario nuevo creo la clave e inicializo el score en 0
        localStorage.setItem("score", 0)
        let score = 0
        let rowTitle = document.getElementById("row-title")
        rowTitle.innerHTML = "Tenes " + score + " puntos"

        //Si es usuario nuevo capturo el nombre y creo la clave
        const modal = new bootstrap.Modal(document.getElementById("modalBienvenida"))
        modal.show()
        const botonGuardar = document.getElementById("botonGuardar")

        botonGuardar.onclick = () => {
            //acá tendria que validar el campo
            //.value.trim() elimina espacios en blanco adelante o detras del value
            const nombreNuevo = document.getElementById("nombreUsuario").value.trim()
            // Si nombreNuevo no está vacio
            if (nombreNuevo !== "") {
                // lo guardo en localStorage
                localStorage.setItem("nombreUsuario", nombreNuevo)
                const bienvenide = document.getElementById("row-welcome")
                bienvenide.innerHTML = `¡Bienvenid@, ${nombreNuevo}!`
            }
        }
    }
}


//==========================================================
// Simulo consulta a bbdd externa para obtener preguntas
//==========================================================
function obtenerPreguntas() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            preguntasDisponibles = data
            // ordeno preguntas s/ puntos de menor a mayor
            preguntasDisponibles.sort((a, b) => a.puntos - b.puntos)
            armarJeopardy(data)
        })
        .catch(error => console.log("Hubo un error: ", error))
        .finally(() => console.log("Finalizó la peticion"))
}


//=================
// Armo la trivia
//=================
function armarJeopardy(preguntas) {
    preguntas.forEach(pregunta => {
        const contenedor = document.createElement("div")
        contenedor.innerHTML = `<button class="jugar cell categ-${pregunta.categoria}" id="${pregunta.id}">${pregunta.puntos}</button>`
        jeopardyBoard.appendChild(contenedor)
    })
    escucharBotones()
}


//=======================================
// Escucho los botones de las preguntas
//=======================================
function escucharBotones() {
    let botones = document.querySelectorAll(".jugar")
    //recordar q es una lista de nodos

    botones.forEach(button => {
        button.onclick = (e) => {
            const botonId = e.currentTarget.id
            const botonSeleccionado = preguntasDisponibles.find(preguntasDisponibles => preguntasDisponibles.id == botonId)

            preguntasJugadas.push(botonSeleccionado)
            // grisar la pregunta ya jugada (falta css y checkear la logica al ir y volver entre los htmls)
            botonSeleccionado.className = "jugado"

            //guardo en localStorage las preguntas q ya respondió el usuario para inhabilitarlas
            localStorage.setItem("preguntasJugadas", JSON.stringify(preguntasJugadas))
            //cambio de html luego de procesar todo
            window.location.href = "./pages/pregunta.html"
        }
    })
}


//Muestro el modal cuando termina de cargarse el dom para obtener el nombre
document.addEventListener("DOMContentLoaded", saludo)

// Llamo a la funcion principal
obtenerPreguntas()
