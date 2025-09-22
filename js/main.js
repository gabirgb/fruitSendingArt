//Holi =)

// Intro

let nombre = prompt("Bienvenido a FruitSending Art! Cómo te llamas?")
let score = 0;

const jugar = function() {
    let menu = prompt(nombre+" vamos a jugar! Por favor seleccioná tu nivel: \n P- Principiante \n I- Intermedio \n A- Avanzado \n\n O también podes: \n S- Ver tu score \n Q- Salir").toLowerCase()
    while (menu !== "q"){
        switch (menu){
            case "p":
                pregPrinc()
                break
            case "i":
                pregInt()
                break
            case "a":
                pregAvan()
                break
            case "s":
                if (score > 0){
                    alert("Tu puntaje es de "+score+" puntos, felicitaciones "+nombre+"!")
                } else {
                    alert("Todavía no tenes puntos, pero no te desanimes "+nombre+"! Aun tenes oportunidades de acertar.")
                }
            default:
                prompt("Opción no disponible.")
                break
        }
        menu = prompt(nombre+" por favor seleccioná tu nivel: \n P- Principiante \n I- Intermedio \n A- Avanzado \n\n O también podes: \n S- Ver tu score \n Q- Salir").toLowerCase()
    }
    alert("Gracias por jugar!")
}

function pregPrinc (){
    let tema = prompt("Seleccioná el tema: \n A- Técnicas \n B- Obras \n C- Historia \n D- Chismes \n V- Volver").toLowerCase()
    while (tema !== "v"){
        switch (tema){
            case "a":
                let rtaA = parseInt(prompt(pregPrincCateg[0]))
                if (rtaA == 1){
                    score++
                    alert("Correcto! Sumaste un punto =) \n Puntos totales: "+score)
                } else {
                    alert("Lo siento, respuesta incorrecta.")
                }
                break

            case "b":
                let rtaB = parseInt(prompt(pregPrincCateg[1]))
                if (rtaB == 2){
                    score++
                    alert("Correcto! Sumaste un punto =) \n Puntos totales: "+score)
                } else {
                    alert("Lo siento, respuesta incorrecta.")
                }
                break

            case "c":
                let rtaC = parseInt(prompt(pregPrincCateg[2]))
                if (rtaC == 1){
                    score++
                    alert("Correcto! Sumaste un punto =) \n Puntos totales: "+score)
                } else {
                    alert("Lo siento, respuesta incorrecta.")
                }
                break

            case "d":
                let rtaD = parseInt(prompt(pregPrincCateg[3]))
                if (rtaD == 2){
                    score++
                    alert("Correcto! Sumaste un punto =) \n Puntos totales: "+score)
                } else {
                    alert("Lo siento, respuesta incorrecta.")
                }
                break

            default:
                "Categoría no disponible."
                console.log("pasou")
                break
        }
        tema = prompt("Seleccioná el tema: \n A- Técnicas \n B- Obras \n C- Historia \n D- Chismes \n V- Volver").toLowerCase()
    }
}

const pregPrincipianteCateg = [
    "Que material se diluye en aceite? \n 1- Oleos \n 2- Acuarelas",
    "Qué artista es famoso por pintar girasoles? \n 1- Lucian Freud \n 2- Vincent Van Gogh",
    "Qué movimiento vino primero? \n 1- Renacimiento \n 2- Futurismo",
    "Con quién tuvo un romance Frida Khalo? \n 1- Lenin \n 2- Trotsky"
]

const pregIntermedioCateg = [
    "Como se fabrica la carbonilla? \n 1- quemando papel \n 2- quemando madera",
    "Que obra es conocida por sus relojes? \n 1- El mono relojero \n 2- El grito",
    "Qué técnica usó Miguel Ángel para pintar la Capilla Sixtina?  \n 1- fresco \n 2- secco",
    "Que artista renegaba de sus obras impresionistas? \n 1- Renoir \n 2- Monet"
]

const pregavanzadoCateg = [
    "cuales son los colores primarios en imprenta? \n 1- RGB \n 2- CMYK",
    "Qué tipo de obras hizo famoso a W Turner? \n 1- barcos \n 2- libelulas",
    "En que siglo nacieron los happenings? \n 1- XIX \n 2- XX",
    "Quien fue expulsado de la escuela de arte? \n 1- dali \n 2- modigliani"
]

jugar()