//Hola profes =)

// Aca guardamos nombre del usuario
let nombre = prompt("Bienvenido a FruitSending Art! Cómo te llamas?")
// Acá guardamos el puntaje total
let score = 0;

//Funcion principal
const jugar = function() {
    // pregunto la opcion deseada al usuario
    let menu = prompt(nombre+" vamos a jugar! Por favor seleccioná tu nivel: \n P- Principiante \n I- Intermedio \n A- Avanzado \n\n O también podes: \n S- Ver tu score \n Q- Salir").toLowerCase()
    // segun la opcion selecciono el case
    while (menu !== "q"){
        switch (menu){
            case "p":
                preguntar(listaPreguntasP, menu)
                break
            case "i":
                preguntar(listaPreguntasI, menu)
                break
            case "a":
                preguntar(listaPreguntasA, menu)
                break
            case "s":
                checkearScore()
                break
            default:
                alert("Opción no disponible.")
                break
        }
        //Vuelvo a consultar la opcion al terminar el switch
        menu = prompt(nombre+" por favor seleccioná tu nivel: \n P- Principiante \n I- Intermedio \n A- Avanzado \n\n O también podes: \n S- Ver tu score \n Q- Salir").toLowerCase()
    }
    // Mensaje de despedida para cuando se selecciona Q
    alert("Gracias por jugar!")
}


// Listados de arrays de preguntas, cada array contiene un array con la pregunta y su respuesta
const listaPreguntasP = [
    ["Que material se diluye en aceite? \n 1- Oleos \n 2- Acuarelas", 1],
    ["Qué artista es famoso por pintar girasoles? \n 1- Lucian Freud \n 2- Vincent Van Gogh", 2],
    ["Qué movimiento vino primero? \n 1- Renacimiento \n 2- Futurismo", 1],
    ["Con quién tuvo un romance Frida Khalo? \n 1- Lenin \n 2- Trotsky", 2]
]

const listaPreguntasI = [
    ["Como se fabrica la carbonilla? \n 1- quemando papel \n 2- quemando madera", 2],
    ["Que obra es conocida por sus relojes? \n 1- El mono relojero \n 2- La persistencia de la memoria", 2],
    ["Qué técnica usó Miguel Ángel para pintar la Capilla Sixtina?  \n 1- fresco \n 2- secco", 1],
    ["Que artista renegaba de sus obras impresionistas? \n 1- Renoir \n 2- Monet", 1]
]

const listaPreguntasA = [
    ["Cuales son los colores primarios en imprenta? \n 1- RGB \n 2- CMYK", 2],
    ["Qué tipo de obras hizo famoso a W Turner? \n 1- barcos \n 2- libelulas", 1],
    ["En que siglo nacieron los happenings? \n 1- XIX \n 2- XX", 2],
    ["Quien fue expulsado de la escuela de arte? \n 1- dali \n 2- modigliani", 1]
]

// Funcion para iterar 
const preguntar = function(listaPreguntas, nivel){
    let ganados = 0
    let nivelCompletado
    // For-Of para recorer los arrays 
    for (const pregunta of listaPreguntas) {
        //realizo la pregunta
        let respuesta = prompt(pregunta[0]).toLowerCase()
        //evalúo la respuesta
        if (respuesta == pregunta[1]){
            score++
            ganados++
            alert("Correcto! Sumaste un punto =) \n Puntos totales: "+score)
        } else {
            alert("Lo siento, respuesta incorrecta.")
        }
    }

    //Calculo el nivel
    if (nivel == "p"){
        nivelCompletado = "Principiante"
    } else if  (nivel == "i") {
        nivelCompletado = "Intermedio"
    } else {
        nivelCompletado = "Avanzado"
    }
    alert("Felicitaciones, concluiste el nivel "+nivelCompletado+" y ganaste "+ganados+" puntos.")
}

// Funcion para mostrar los puntos ganados en total
const checkearScore = function() {
    if (score > 0){
        alert("Tu puntaje es de "+score+" puntos, felicitaciones "+nombre+"!")
    } else {
        alert("Todavía no tenes puntos, pero no te desanimes "+nombre+"! Aun tenes oportunidades de acertar.")
    }
}


jugar()