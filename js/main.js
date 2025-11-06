//Trivia de preguntas y respuestas por niveles


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

// Vinculo HTML con var
let jeopardyBoard = document.getElementById("jeopardy-board")
let about = document.getElementById("about")

// Vinculo el JSON con var
const URL = "./db/data.json"


//======================================================================
// 2- DEFINO LAS FUNCIONES
//======================================================================


// Funcion usuario cargado *********************************************
function usuarioCargado() {
    const bienvenide = document.getElementById("welcome")
    bienvenide.className = "salude"
    bienvenide.innerHTML = `¡Bienvenid@ ${nombreGuardado}! Tenes ${score} puntos`
}


// Funcion para resetear css preguntas jugadas******************************************
function resetearEstilos(datos) {
    datos.forEach(dato => {
        const resetear = document.getElementById(dato.id)
        resetear.setAttribute("class", `jugar cell categ-${dato.categoria}`)
        resetear.removeAttribute("disabled")

    })
}

// Funcion usuario nuevo ***********************************************
function usuarioNuevo() {
    // USUARIO NUEVO - INICIALIZO SCORE EN 0
    // Si o si siempre va a haber un usuario, salvo la 1ra vez q se abre la pag xq no hay un localStorage guardado
    // Luego, si el usuario no guarda nu nombre, va a quedar como Anonimo
    // El usuario puede optar por cambiar el nombre y reiniciar el juego
    localStorage.setItem("score", 0)
    score = 0
    let nombreUsuario = ""

    Swal.fire({
        // PIDO EL NOMBRE
        title: "Bienvenid@ a <strong>Mandá Fruta y Arte!</strong>",
        html: `
            <p class="descripcion">Bienvenidos a la trivia donde el conocimiento es opcional
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
                bienvenide.innerHTML = `¡Bienvenid@ ${nombreUsuario}! Tenes ${score} puntos`
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
                bienvenide.innerHTML = `¡Bienvenid@ ${nombreUsuario}! Tenés ${score} puntos`
            }
        }
    })
}


// Funcion cambio usuario ***********************************************
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
                //reseteo estilos
                resetearEstilos(preguntasJugadas)
                console.log("PreguntasJugadas: ", preguntasJugadas)
                // despues de resetear el css de las preguntas jugadas, reseteo var y localstorage
                preguntasJugadas = []
                // reseteo localStorage
                localStorage.setItem("nombreUsuario", nombreUsuario)
                localStorage.setItem("score", 0)
                localStorage.setItem("preguntasJugadas", "")
                console.log("PreguntasJugadas2: ", preguntasJugadas)

                //muestro nombre y puntos nuevos en nav
                const bienvenide = document.getElementById("welcome")
                bienvenide.className = "salude"
                bienvenide.innerHTML = `¡Bienvenid@ ${nombreUsuario}! Tenes ${score} puntos`
                return true
            } else {
                // Si el campo nombre está en blanco, uso el nombre ya precargado
                return false
            }
        }
    })
}


// Funcion simulada peticion a servidor externo ***************************************
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


// Funcion para inhabilitar preguntas ya jugadas y reiniciar el juego *************
function grisarPreguntas(jugadas) {
    //Si existen preguntas jugadas (o sea "jugadas" NO es NULL), las griso 
    if (jugadas !== "") {
        jugadas.forEach(jugada => {
            const grisar = document.getElementById(jugada.id)
            grisar.setAttribute("class", "jugar cell grisada")
            grisar.setAttribute("disabled", "")
        })
    }
    //Verifico si ya contesto todas las preguntas y le pregunto si quiere jugar de nuevo
    if (jugadas !== "" && jugadas.length == preguntasDisponibles.length) {
        Swal.fire({
            title: `Felicitaciones ${nombreGuardado}, terminaste el juego! \n Total: ${score} puntos`,
            html: `
                <p><strong>¿Querés jugar de nuevo?</strong></p>
            `,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // => El usuario quiere jugar de nuevo
                //reseteo localStorage de preguntasJugadas y Score
                localStorage.setItem("preguntasJugadas", "")
                localStorage.setItem("score", 0)

                // reseteo las variables
                preguntasJugadas = []
                score = 0

                //muestro nombre y puntos nuevos en nav
                const bienvenide = document.getElementById("welcome")
                bienvenide.className = "salude"
                bienvenide.innerHTML = `¡Bienvenid@ ${nombreUsuario}! Tenes ${score} puntos`

                //reseteo las clases
                resetearEstilos(jugadas)

            } else if (result.isDenied) {
                // => El usuario no quiere jugar más
                Swal.fire('Gracias por jugar :)', '', '')
            }
        })
    }
}


// Funcion para escuchar los botones preguntas ***********************************************
function escucharBotones() {
    let botones = document.querySelectorAll(".jugar")
    botones.forEach(button => {
        button.onclick = (e) => {
            const botonId = e.currentTarget.id
            const botonSeleccionado = preguntasDisponibles.find(preguntasDisponibles => preguntasDisponibles.id == botonId)

            preguntasJugadas.push(botonSeleccionado)

            //guardo en localStorage las preguntas q ya respondió el usuario para inhabilitarlas
            localStorage.setItem("preguntasJugadas", JSON.stringify(preguntasJugadas))
            //cambio de html luego de procesar todo
            window.location.href = "./pages/pregunta.html"
        }
    })
}

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

//======================================================================================
// 3- LLAMO A LAS FUNCIONES
//======================================================================================

// Funcion para armar la trivia ***************************************************
function armarJeopardy(preguntas) {

    preguntas.forEach(pregunta => {
        const contenedor = document.createElement("div")
        contenedor.innerHTML = `<button class="jugar cell categ-${pregunta.categoria}" id="${pregunta.id}">${pregunta.puntos}</button>`
        jeopardyBoard.appendChild(contenedor)
        //el id a la pregunta 14 se asigna correctamente en el armado
    })
    escucharBotones()
    grisarPreguntas(preguntasJugadas)
}

escucharAbout()

// Nombre y score
function saludo() {
    if (nombreGuardado) {
        usuarioCargado()
    } else if (nombreGuardado == "") {
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
