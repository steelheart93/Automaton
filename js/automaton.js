/**
 * Compilador del Lenguaje Automaton, diseñado para la clase de Estructuras de Lenguajes.
 * @autor Stiven Muñoz Murillo
 * @version 29/03/2019
 */

$(function () {
    // EJECUCION DEL PROGRAMA
    contenido = "$ Inicio del Programa $";
    contenido += "\na0 = { [s0, s1, s2], ['A', 'B', 'C'], s0, [f(s0, 'A') := s1, f(s0, 'B') := s2], [s2] };";
    contenido += "\na1 = { [s0, s1, s2], ['1', '2', '3'], s0, [f(s0, '1') := s1, f(s0, '2') := s2], [s1, s2] };";
    contenido += "\ne0 = /Esto es un expresion regular/g;";
    contenido += "\ne1 = /Esto es otra expresion regular/g;";
    contenido += "\ne2 = /Y este es otro ejemplo más de expresion regular/g;";
    contenido += "\nEdit(a0); Edit(e0); Minimizar(a1); Graph(e2); Graph(a0);";
    contenido += "\na0 = toAFND(e2); a1 = toAFD(a0); e1 = toER(a1);";
    contenido += "\na3 = Union(a0, a1); a4 = Intersect(a0, a1); a5 = Diferencia(a0, a1);";
    contenido += "\nTest(e1, 'Esta es una cadena de prueba para la ER número 1');";
    contenido += "\n$ Fin del Programa $";

    document.getElementById("grammar").value += contenido;

    $("#test").click(function () {
        salida = [];
        document.getElementById("lexico").innerText = "";

        inicio(document.getElementById("grammar").value);

        if (salida.includes("Error Lexico")) {
            alert("Se encontraron Errores Lexicos");
        }

        for (var s of salida) {
            if (s == "Error Lexico") {
                document.getElementById("lexico").innerText += (" [" + s + "] ");
            } else {
                document.getElementById("lexico").innerText += (" " + s);
            }
        }
    });
});

// VARIABLES GLOBALES
salida = [];
espaciadores = [" ", "\n", "\t"];
dig = "0123456789";

function inicio(palabra) {
    if (palabra.length > 0) {
        letra = palabra.charAt(0);
        avanzar = palabra.substr(1);
        if (letra == "E") {
            palabra = avanzar;
            palabra_reservada(avanzar, "dit", "Edit");
        } else if (letra == "M") {
            palabra = avanzar;
            palabra_reservada(avanzar, "inimizar", "Minimizar");
        } else if (letra == "G") {
            palabra = avanzar;
            palabra_reservada(avanzar, "raph", "Graph");
        } else if (letra == "U") {
            palabra = avanzar;
            palabra_reservada(avanzar, "nion", "Union");
        } else if (letra == "I") {
            palabra = avanzar;
            palabra_reservada(avanzar, "ntersect", "Intersect");
        } else if (letra == "D") {
            palabra = avanzar;
            palabra_reservada(avanzar, "iferencia", "Diferencia");
        } else if (letra == "T") {
            palabra = avanzar;
            palabra_reservada(avanzar, "est", "Test");
        } else if (letra == "t") {
            palabra = avanzar;
            conversion(avanzar);
        } else if (letra == "$") {
            palabra = avanzar;
            comentario(avanzar);
        } else if (letra == "'") {
            palabra = avanzar;
            cadena(avanzar);
        } else if (letra == "/") {
            palabra = avanzar;
            er(avanzar);
        } else if (letra == ";") {
            salida.push("PR: (;)");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == "a") {
            salida.push("PR: (a)");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == "e") {
            salida.push("PR: (e)");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == "f") {
            salida.push("PR: (f)");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == "s") {
            salida.push("PR: (s)");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == "(") {
            salida.push("Abro Parentesis");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == ")") {
            salida.push("Cierro Parentesis");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == "{") {
            salida.push("PR: ({)");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == "}") {
            salida.push("PR: (})");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == "[") {
            salida.push("PR: ([)");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == "]") {
            salida.push("PR: (])");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == ",") {
            salida.push("PR: (,)");
            palabra = avanzar;
            inicio(avanzar);
        } else if (letra == ":") {
            palabra = avanzar;
            transicionar(avanzar);
        } else if (letra == "=") {
            salida.push("OPER: (Asignar)");
            palabra = avanzar;
            inicio(avanzar);
        } else if (dig.includes(letra)) {
            palabra = avanzar;
            num(avanzar);
        } else {
            // Principal Captura de Errores Lexicos.
            if (espaciadores.includes(letra)) {
                salida.push(letra);
                palabra = avanzar;
                inicio(avanzar);
            } else {
                salida.push("Error Lexico");
                palabra = avanzar;
                inicio(avanzar);
            }
        }
    } else {
        alert("TERMINE\n");
    }
}

function num(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (dig.includes(letra)) {
        palabra = avanzar;
        num(avanzar);
    } else {
        salida.push("NT: (NUM)");
        inicio(palabra);
    }
}

function transicionar(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "=") {
        salida.push("OPER: Transicionar");
        palabra = avanzar;
        inicio(avanzar);
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}

function conversion(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "o") {
        palabra = avanzar;
        letra = palabra.charAt(0);
        avanzar = palabra.substr(1);
        if (letra == "A") {
            palabra = avanzar;
            toAFD(avanzar);
        } else if (letra == "E") {
            palabra = avanzar;
            toER(avanzar);
        } else {
            salida.push("Error Lexico");
            inicio(palabra);
        }
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}

function toER(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "R") {
        salida.push("PR: (toER)");
        palabra = avanzar;
        inicio(avanzar);
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}

function toAFD(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "F") {
        palabra = avanzar;
        toAFD1(avanzar);
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}

function toAFD1(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "D") {
        salida.push("PR: (toAFD)");
        palabra = avanzar;
        inicio(avanzar);
    } else if (letra == "N") {
        palabra = avanzar;
        toAFND(avanzar);
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}

function toAFND(palabra) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == "D") {
        salida.push("PR: (toAFND)");
        palabra = avanzar;
        inicio(avanzar);
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}

function comentario(palabra) {
    if (palabra.length >= 1) {
        letra = palabra.charAt(0);
        avanzar = palabra.substr(1);
        if (letra != "$") {
            palabra = avanzar;
            comentario(avanzar);
        } else {
            salida.push("NT: (COMENTARIO)");
            palabra = avanzar;
            inicio(palabra);
        }
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}

function cadena(palabra) {
    if (palabra.length >= 1) {
        letra = palabra.charAt(0);
        avanzar = palabra.substr(1);
        if (letra != "'") {
            palabra = avanzar;
            cadena(avanzar);
        } else {
            salida.push("NT: (CADENA)");
            palabra = avanzar;
            inicio(palabra);
        }
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}

function er(palabra) {
    if (palabra.length >= 1) {
        letra = palabra.charAt(0);
        avanzar = palabra.substr(1);
        if (letra != "/") {
            palabra = avanzar;
            er(avanzar);
        } else {
            palabra = avanzar;
            letra = palabra.charAt(0);
            avanzar = palabra.substr(1);
            if (letra == "g") {
                salida.push("NT: (ER)");
                palabra = avanzar;
                inicio(palabra);
            } else {
                salida.push("Error Lexico");
                inicio(palabra);
            }
        }
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}

function palabra_reservada(palabra, sub, reservada) {
    letra = palabra.charAt(0);
    avanzar = palabra.substr(1);
    if (letra == sub.charAt(0)) {
        if (sub.length == 1) {
            salida.push("PR: (" + reservada + ")");
            inicio(avanzar);
            palabra = avanzar;
        } else {
            sub = sub.substr(1);
            palabra_reservada(avanzar, sub, reservada);
        }
    } else {
        salida.push("Error Lexico");
        inicio(palabra);
    }
}