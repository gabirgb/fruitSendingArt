//Trivia de preguntas y respuestas por niveles

// NOMBRE
//================================

//Muestro el modal cuando termina de cargarse el dom para obtener el nombre
document.addEventListener("DOMContentLoaded", function () {
    const nombreGuardado = localStorage.getItem("nombreUsuario")
    // Checkeo si hay nombre
    if (!nombreGuardado) {
        // Si no hay nombre guardado, mostrar el modal usando la api de javascript de bootstrap
        const modal = new bootstrap.Modal(document.getElementById("modalBienvenida"))
        modal.show()
    } else {
        // Si ya hay nombre, mostrar saludo
        const saludo = document.getElementById("row-welcome")
        saludo.innerHTML = `¡Bienvenid@ de nuevo, ${nombreGuardado}!`
    }

    // Guardar el nombre cuando se hace clic en "Guardar"
    const botonGuardar = document.getElementById("botonGuardar")
    console.log(botonGuardar)
    botonGuardar.onclick = () => {
        //acá tendria que validar el campo
        //.value.trim() elimina espacios en blanco adelante o detras del value
        const nombreNuevo = document.getElementById("nombreUsuario").value.trim()
        // Si nombreNuevo no está vacio
        if (nombreNuevo !== "") {
            // lo guardo en localStorage
            localStorage.setItem("nombreUsuario", nombreNuevo)
            const saludo = document.getElementById("row-welcome")
            saludo.innerHTML = `¡Bienvenid@, ${nombreNuevo}!`
        }
    }
})


// Inicializo variables
// Inicializo los arrays de objetos
let preguntasDisponibles = []
let preguntasJugadas = []

// SCORE
//============================================

//Reviso si el usuario ya jugó, declaro la var y traigo los puntos guardados en localStorage
let score = localStorage.getItem("score")

// si está undefined creo la clave
if (score == undefined) {
    localStorage.setItem("score", 0)
    score = 0
}

// Muestro el score
let rowTitle = document.getElementById("row-title")
rowTitle.innerHTML = "Tenes " + score + " puntos"

// Vinculo el div que contiene las preguntas
let jeopardyBoard = document.getElementById("jeopardy-board")
// let preguntasContainer = document.getElementById("preguntas-container")
// // recordar q los arrays de obj se recorren con la f de orden sup/ metodo "forEach", no usar "for-of"

// Vinculo el json con la data
const URL = "./db/data.json"



function obtenerPreguntas() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            preguntasDisponibles = data
            preguntasDisponibles.sort((a, b) => a.puntos - b.puntos)
            armarJeopardy(data)
        })
        .catch(error => console.log("Hubo un error: ", error))
        .finally(() => console.log("Finalizó la peticion"))
}


function armarJeopardy(preguntas) {
    preguntas.forEach(pregunta => {
        const contenedor = document.createElement("div")
        contenedor.innerHTML = `<button class="jugar cell valor-${pregunta.puntos}" id="${pregunta.id}">${pregunta.puntos}</button>`
        jeopardyBoard.appendChild(contenedor)
    })
    escucharBotones()
}

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


// Llamo a la funcion principal
obtenerPreguntas()
