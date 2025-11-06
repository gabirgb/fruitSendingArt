//Trivia de preguntas y respuestas por niveles
// Al usar sweetalert tuve que cambiar los listeners que habia creado originalmente por los metodods que trae la libreria por defecto para escuchar los eventos de sus botones.


//======================
// Inicializo variables
//======================
let preguntasDisponibles = []
let preguntasJugadas = []

if (localStorage.getItem("preguntasJugadas")) {
    preguntasJugadas = localStorage.getItem("preguntasJugadas")
    preguntasJugadas = JSON.parse(preguntasJugadas)

}

console.log("preguntasJugadas: ", preguntasJugadas)

// Cargo localStorages
let nombreGuardado = localStorage.getItem("nombreUsuario")
let score = localStorage.getItem("score")

// Vinculo el div que contiene las preguntas
let jeopardyBoard = document.getElementById("jeopardy-board")

// Vinculo el json con la data
const URL = "./db/data.json"


//======================================================================
// Funcion usuario cargado
//======================================================================
function usuarioCargado() {
    const bienvenide = document.getElementById("welcome")
    bienvenide.className = "salude"
    bienvenide.innerHTML = `¡Bienvenid@ ${nombreGuardado}!<br />Tenes ${score} puntos`
}

//======================================================================
// Funcion usuario nuevo
//======================================================================
function usuarioNuevo() {
    // USUARIO NUEVO - INICIALIZO SCORE EN 0
    // Si o si siempre va a haber un usuario, salvo la 1ra vez q se abre la pag xq no hay un localStorage guardado
    // Luego, si el usuario no guarda nu nombre, va a quedar como Anonimo
    // El usuario puede optar por cambiar el nombre y reiniciar el juego
    localStorage.setItem("score", 0)
    let score = 0
    let nombreUsuario = ""

    Swal.fire({
        // PIDO EL NOMBRE
        title: "Bienvenido a <strong>Mandá FrutArte!</strong>",
        html: `
            <p class="descripcion">Bienvenidos a Fruit Sending Art, la trivia donde el conocimiento es opcional
                y la improvisación es arte. Acá no importa si sabés quién pintó qué o en qué siglo nació tal
                escultor:lo que importa es tu capacidad para responder con estilo, convicción y una pizca de
                fruta bien mandada. ¡A improvisar se ha dicho!</p>
            <p><strong>¿Cómo te llamas?</strong></p>
        `,
        input: "text",
        inputValidator: (value) => {
            if (!value) {
                return "No te olvides tu nombre"
            }
        },
        // Botones
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: "Guardar",
        confirmButtonAriaLabel: "Guardar",

        //Guardo los datos, el preConfirm recibe automaticamente el valor del input del modal
        preConfirm: (valorInput) => {
            nombreUsuario = valorInput.trim()

            if (nombreUsuario !== "") {
                // Si el nombre no está vacio lo guardo
                localStorage.setItem("nombreUsuario", nombreUsuario)
                // Muestro el saludo en nav
                const bienvenide = document.getElementById("welcome")
                bienvenide.className = "salude"
                bienvenide.innerHTML = `¡Bienvenid@ ${nombreUsuario}!<br />Tenes ${score} puntos`
                //para asegurarme de q el modal se cierre retorno true
                return true
            }
        },
        // Con este metodo detecto si el modal se cierra haciendo clic afuera y evaluo si el input tiene texto para guardar el nombre
        didClose: () => {
            // Si no se ingresó nombre, lo guardo como Anónimo
            if (!nombreUsuario) {
                // si no hay nombre le pongo "anonimo"
                nombreUsuario = "Anonimo"
                localStorage.setItem("nombreUsuario", nombreUsuario)
                const bienvenide = document.getElementById("welcome")
                bienvenide.className = "salude"
                bienvenide.innerHTML = `¡Bienvenid@ ${nombreUsuario}!<br />Tenés ${score} puntos`
            }
        }
    })
}

//=======================================
// Funcion cambio usuario
//=======================================
function cambiarUsuario() {
    Swal.fire({
        // USUARIO ACTIVO - TRAIGO DATOS DEL LOCALSTORAGE
        title: `${nombreGuardado} tenés ${score} puntos`,
        html: `
            <p><strong>¿Querés cambiar de usuario?</strong></p>
        `,
        input: "text",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Guardar",
        confirmButtonAriaLabel: "Guardar",

        // Si el usuario quiere cambiar de nombre
        // preConfirm: f que se ejecuta cuando el usuario hace clic en el botón de confirmación (en este caso, "Guardar"). SweetAlert2 le pasa automáticamente como argumento el valor del input que definí como input: "text"
        preConfirm: (nombreUsuario) => {
            nombreUsuario = nombreUsuario.trim()
            score = 0
            if (nombreUsuario !== "") {
                localStorage.setItem("nombreUsuario", nombreUsuario)
                localStorage.setItem("score", 0)
                //muestro nombre y puntos nuevos en nav
                const bienvenide = document.getElementById("welcome")
                bienvenide.className = "salude"
                bienvenide.innerHTML = `¡Bienvenid@ ${nombreUsuario}!<br />Tenes ${score} puntos`
                return true
            } else {
                // Si el campo nombre está en blanco, uso el nombre ya precargado
                return false
            }
        }
    })
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
        .catch(error =>
            Swal.fire({
                title: "Hubo un problema",
                text: `
                    Por favor intentá de nuevo en unos minutos. \n ${error}
                `,
                icon: "error"
            })
        )
        .finally(() =>
            // Muestro el modal cuando termina de cargarse el dom para obtener el nombre
            saludo()
        )
}


//=================
// Armo la trivia
//=================
function armarJeopardy(preguntas) {
    console.log("Array de preguntas disponibles: ", preguntas) //15 en total

    preguntas.forEach(pregunta => {
        const contenedor = document.createElement("div")
        contenedor.innerHTML = `<button class="jugar cell categ-${pregunta.categoria}" id="${pregunta.id}">${pregunta.puntos}</button>`
        jeopardyBoard.appendChild(contenedor)
        //el id a la pregunta 14 se asigna correctamente en el armado
    })
    escucharBotones()
    grisarPreguntas(preguntasJugadas)
}

//======================================================
// Funcion para inhabilitar preguntas ya jugadas
//======================================================

// traigo el array de preguntas jugadas para capturar la última


function grisarPreguntas(jugadas) {
    //Si existen preguntas jugadas (o sea "jugadas" NO es NULL), las griso 
    if (jugadas !== null) {
        console.log("Array de preguntas jugadas: ", jugadas)

        jugadas.forEach(jugada => {
            console.log(jugada.id)
            const grisar = document.getElementById(jugada.id)
            grisar.setAttribute("class", "jugar cell grisada")
            grisar.setAttribute("disabled", "")
        })
    }
    //Verifico si ya contesto todas las preguntas
    if (jugadas !== null && jugadas.length == preguntasDisponibles.length) {
        Swal.fire({
            // USUARIO ACTIVO - TRAIGO DATOS DEL LOCALSTORAGE
            title: `Felicitaciones ${nombreGuardado}, terminaste el juego! \n Total: ${score} puntos`,
            html: `
                <p><strong>¿Querés jugar de nuevo?</strong></p>
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Guardar",
            confirmButtonAriaLabel: "Guardar",

            // Si el usuario quiere cambiar de nombre
            // preConfirm: f que se ejecuta cuando el usuario hace clic en el botón de confirmación (en este caso, "Guardar"). SweetAlert2 le pasa automáticamente como argumento el valor del input que definí como input: "text"
            preConfirm: (nombreUsuario) => {
                nombreUsuario = nombreUsuario.trim()
                score = 0
                if (nombreUsuario !== "") {
                    localStorage.setItem("nombreUsuario", nombreUsuario)
                    localStorage.setItem("score", 0)
                    //muestro nombre y puntos nuevos en nav
                    const bienvenide = document.getElementById("welcome")
                    bienvenide.className = "salude"
                    bienvenide.innerHTML = `¡Bienvenid@ ${nombreUsuario}!<br />Tenes ${score} puntos`
                    return true
                } else {
                    // Si el campo nombre está en blanco, uso el nombre ya precargado
                    return false
                }
            }
        })
    }
}




//======================================================
// Funcion para escuchar los botones de las preguntas
//======================================================
function escucharBotones() {
    let botones = document.querySelectorAll(".jugar")
    //el boton 14 tiene la clase jugar
    console.log("Array de nodos que va a ser escuchado para capturar el clic: ", botones)

    botones.forEach(button => {
        button.onclick = (e) => {
            const botonId = e.currentTarget.id
            const botonSeleccionado = preguntasDisponibles.find(preguntasDisponibles => preguntasDisponibles.id == botonId)

            console.log("botonID: ", botonId) //ID del boton, es 14 
            console.log("botonSeleccionado: ", botonSeleccionado) // objeto completo con id 14

            preguntasJugadas.push(botonSeleccionado)

            //guardo en localStorage las preguntas q ya respondió el usuario para inhabilitarlas
            localStorage.setItem("preguntasJugadas", JSON.stringify(preguntasJugadas))
            //cambio de html luego de procesar todo
            window.location.href = "./pages/pregunta.html"
        }
    })
}


//=======================================
// Llamo a las funciones
//=======================================

// Nombre y score
function saludo() {
    if (nombreGuardado) {
        usuarioCargado()
    } else if (nombreGuardado == null) {
        usuarioNuevo()
    }
}

// Habilito cambio de usuario
let cambioUsuario = document.getElementById("cambio-usuario")
cambioUsuario.onclick = () => {
    cambiarUsuario()
}

// Hago petición preguntas
obtenerPreguntas()
