//Trivia de preguntas y respuestas por niveles


const preguntas = [
    {
        id: 1,
        categoria: "Historia",
        nombre: "¿Quién pintó la Mona Lisa?",
        opciones: ["Rafael", "Miguel Angel", "Leonardo da Vinci"],
        respuesta: 2,
        puntos: 100
    },
    {
        id: 2,
        categoria: "Historia",
        nombre: "¿En qué año nació Georges Pierre Seurat?",
        opciones: ["1654", "1859", "1998"],
        respuesta: 1,
        puntos: 200
    },
    {
        id: 3,
        categoria: "Historia",
        nombre: "¿Qué estilo dominó el Renacimiento?",
        opciones: ["Humanismo y arte inspirado en la Antigüedad clásica", "Manierismo, barroco y rococó", "Impresionismo y expresionismo"],
        respuesta: 0,
        puntos: 300
    },
    {
        id: 4,
        categoria: "Técnicas",
        nombre: "¿¿Qué es el puntillismo?",
        opciones: ["Una técnica pictorica que utiliza diminutos puntos de color para formar imágenes", "La forma en que las impresoras de punto imprimen sobre el papel", "Una tecnica textil que usa acabados de puntillas en las telas"],
        respuesta: 0,
        puntos: 100
    },
    {
        id: 5,
        categoria: "Técnicas",
        nombre: "¿Qué es el impasto?",
        opciones: ["Una técnica en la que se usa pegamento para empastar distintos objetos", "Una técnica de acuarela para pintar pasto y hierbas", "Una técnica que consiste en aplicar la pintura en capas gruesas y con volumen sobre la superficie"],
        respuesta: 2,
        puntos: 200
    },
    {
        id: 6,
        categoria: "Técnicas",
        nombre: "¿Qué implica el collage?",
        opciones: ["Cortar y pegar papeles", "Unir elementos de distinto origen", "Juntar cosas separadas"],
        respuesta: 1,
        puntos: 300
    },
    {
        id: 7,
        categoria: "Chismes",
        nombre: "¿Qué artista vendió un plátano pegado con cinta?",
        opciones: ["Andy Warhol", "Stephen Prina", "Maurizio Cattela"],
        respuesta: 2,
        puntos: 100
    },
    {
        id: 8,
        categoria: "Chismes",
        nombre: "¿Quién rompió su obra en una subasta?",
        opciones: ["Banksy", "Christo Javacheff", "Claes Oldenburg"],
        respuesta: 0,
        puntos: 200
    } ,
    {
        id: 9,
        categoria: "Chismes",
        nombre: "¿Qué pintor vivió con una oreja menos?",
        opciones: ["Henri Toulouse-Lautrec", "Vincent Van Gogh","Amadeo Modigliani"],
        respuesta: 1,
        puntos: 300
    }
]


let preguntasJugadas = []

//Reviso si el usuario ya jugó, declaro la var y traigo los puntos guardados en localStorage
let score = localStorage.getItem("score")

// si está undefined creo la clave
if (score == undefined) {
    localStorage.setItem("score", 0)
    score = 0
}

let rowTitle = document.getElementById("row-title")
rowTitle.innerHTML =  "Tenes " + score + " puntos"

//Falta mostrar el score en la interfaazzzz

let jeopardyBoard = document.getElementById("jeopardy-board") // como nombre de va uso "products" porque el nombre "productos" ya lo usé en el array
// // recordar q los arrays de obj se recorren con la f de orden sup/ metodo "forEach", no usar "for-of"

function armarJeopardy() {
    preguntas.forEach(pregunta => {
        let contenedor = document.createElement("div")
        contenedor.className = "cell valor-"+pregunta.puntos
        contenedor.innerHTML = `${pregunta.nombre} 
                                <button class="jugar" id="${pregunta.id}">Jugar!</button>`
        jeopardyBoard.appendChild(contenedor)
    })
    escucharBoton()
}

function escucharBoton() {
    jugar = document.querySelectorAll(".jugar")
    jugar.forEach(button => {
        button.onclick = (e) => {
            const preguntaId = e.currentTarget.id
            const preguntaSeleccionada = preguntas.find(pregunta => pregunta.id == preguntaId)

            preguntasJugadas.push(preguntaSeleccionada)
            console.log(preguntasJugadas)
            // grisar la pregunta ya jugada (falta css y checkear la logica al ir y volver entre los htmls)
            preguntaSeleccionada.className = "jugada"

            //guardo en localStorage las preguntas q ya respondió el usuario para inhabilitarlas
            localStorage.setItem("preguntasJugadas", JSON.stringify(preguntasJugadas))
            //cambio de html luego de procesar todo
            window.location.href = "./pages/pregunta.html"
        }
    })
}

armarJeopardy()
