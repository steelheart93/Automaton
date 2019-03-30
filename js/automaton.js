/**
 * Compilador del Lenguaje Automaton, diseñado para la clase de Estructuras de Lenguajes.
 * @autor Stiven Muñoz Murillo
 * @version 29/03/2019
 */

$(function () {
    // EJECUCION DEL PROGRAMA
    contenido = "$Problema de los Baldes$";
    contenido += "\nDom {da:{[0..5], db:{[0,1,2,3]}";
    contenido += "\nStruct [da:{A:{\"Balde A de 5 litros\", db:{B:{\"Balde B de 3 litros\"]";
    contenido += "\nLaw {vaciarA:{¿A>0?:{[0,B], vaciarB:{¿B>0?:{[A,0]}";
    contenido += "\nEnd {[4,0], ¿A+B==4?}";
    contenido += "\n$Fin del Problema$";

    inicio(contenido);
    document.getElementById("parrafo").innerText += (contenido + "\n\n");

    for (var s of salida) {
        if (s == "Error Lexico") {
            document.getElementById("parrafo").innerText += (" [" + s + "] ");
        } else {
            document.getElementById("parrafo").innerText += (" " + s);
        }
    }
});

// VARIABLES GLOBALES
salida = [];
permisos = [" ", "\n", "\t"];
dig = "0123456789";
lminus = "abcdefghijklmnopqrstuvwxyz";
lMayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function inicio(palabra) {
    if (palabra.length > 0) {
        letra = palabra.charAt(0);
        avanzar = palabra.substr(1);
        if (letra == "O") {
            ror(avanzar); palabra = avanzar;
        } else if (letra == "A") {
            rand1(avanzar); palabra = avanzar;
        } else if (letra == "D") {
            rdom1(avanzar); palabra = avanzar;
        } else if (letra == "E") {
            rend1(avanzar); palabra = avanzar;
        } else if (letra == "L") {
            rlaw1(avanzar); palabra = avanzar;
        } else if (letra == "S") {
            rstruct1(avanzar); palabra = avanzar;
        } else if (letra == "\"") {
            cadena(avanzar); palabra = avanzar;
        } else if (letra == "$") {
            comentario(avanzar); palabra = avanzar;
        } else if (letra == "{") {
            salida.push("Abrir Llave");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == "}") {
            salida.push("Cerrar Llave");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == "[") {
            salida.push("Abrir Corchete");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == "]") {
            salida.push("Cerrar Corchete");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == "¿") {
            salida.push("Abrir Boolean");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == "?") {
            salida.push("Cerrar Boolean");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == ":") {
            salida.push("Separador");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == ",") {
            salida.push("Coma");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == "+") {
            salida.push("Sumar");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == "-") {
            salida.push("Restar");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == "*") {
            salida.push("Multiplicar");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == "/") {
            salida.push("Dividir");
            inicio(avanzar); palabra = avanzar;
        } else if (letra == ".") {
            puntos(avanzar); palabra = avanzar;
        } else if (letra == "=") {
            igual(avanzar); palabra = avanzar;
        } else if (letra == ">") {
            mayor(avanzar); palabra = avanzar;
        } else if (letra == "<") {
            menor(avanzar); palabra = avanzar;
        } else if (lMayus.includes(letra)) {
            salida.push("Letra Mayuscula");
            inicio(avanzar); palabra = avanzar;
        } else if (lminus.includes(letra)) {
            ident(avanzar); palabra = avanzar;
        } else if (dig.includes(letra)) {
            num(avanzar); palabra = avanzar;
        } else {

            if (permisos.includes(letra)) {
                salida.push(letra);
                inicio(avanzar); palabra = avanzar;
            } else {
                salida.push("Error Lexico");
                inicio(avanzar); palabra = avanzar;
            }
        }
    } else {
        alert("TERMINE\n");
    }
}

function ror(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "r") {
        salida.push("Reservada Or");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Letra Mayuscula");
        inicio(palabra);
    }
}


function rand1(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "n") {
        rand2(avanzar); palabra = avanzar;
    } else {
        salida.push("Letra Mayuscula");
        inicio(palabra);
    }
}


function rand2(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "d") {
        salida.push("Reservada And");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function rdom1(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "o") {
        rdom2(avanzar); palabra = avanzar;
    } else {
        salida.push("Letra Mayuscula");
        inicio(palabra);
    }
}


function rdom2(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "m") {
        salida.push("Reservada Dom");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function rend1(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "n") {
        rend2(avanzar); palabra = avanzar;
    } else {
        salida.push("Letra Mayuscula");
        inicio(palabra);
    }
}


function rend2(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "d") {
        salida.push("Reservada End");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function rlaw1(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "a") {
        rlaw2(avanzar); palabra = avanzar;
    } else {
        salida.push("Letra Mayuscula");
        inicio(palabra);
    }
}


function rlaw2(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "w") {
        salida.push("Reservada Law");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function rstruct1(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "t") {
        rstruct2(avanzar); palabra = avanzar;
    } else {
        salida.push("Letra Mayuscula");
        inicio(palabra);
    }
}


function rstruct2(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "r") {
        rstruct3(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function rstruct3(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "u") {
        rstruct4(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function rstruct4(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "c") {
        rstruct5(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function rstruct5(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "t") {
        salida.push("Reservada Struct");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function cadena(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (lminus.includes(letra) || lMayus.includes(letra) || dig.includes(letra) || letra == " ") {
        cadena(avanzar); palabra = avanzar;
    } else if (letra == "\"") {
        salida.push("Cadena");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function comentario(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (lminus.includes(letra) || lMayus.includes(letra) || dig.includes(letra) || letra == " ") {
        comentario(avanzar); palabra = avanzar;
    } else if (letra == "$") {
        salida.push("Comentario");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function puntos(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == ".") {
        salida.push("Puntos");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function igual(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "=") {
        salida.push("Igualdad");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}


function mayor(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "=") {
        salida.push("MayorIgual");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("Mayor");
        inicio(palabra);
    }
}


function menor(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "=") {
        salida.push("menorIgual");
        inicio(avanzar); palabra = avanzar;
    } else if (letra == ">") {
        salida.push("Diferente");
        inicio(avanzar); palabra = avanzar;
    } else {
        salida.push("menor");
        inicio(palabra);
    }
}

function ident(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (lminus.includes(letra) || lMayus.includes(letra)) {
        ident(avanzar); palabra = avanzar;
    } else {
        salida.push("Identificador");
        inicio(palabra);
    }
}


function num(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (dig.includes(letra)) {
        num(avanzar); palabra = avanzar;
    } else {
        salida.push("Número");
        inicio(palabra);
    }
}