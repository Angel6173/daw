
const palabras = [ "AREQUIPA", "MISTI", "CHACHANI", "CHARACATO", "YANAHUARA", "SABANDIA", "CAYMA", "TIABAYA"];
let palabraSecreta = "";
let palabraAdivinada = [];
let errores = 0;
let letrasIncorrectas = [];
const maxErrores = 10;

const titulo = document.createElement("h1");
titulo.innerText = "El Ahorcado - Arequipa";
titulo.style.textAlign = "center";
titulo.style.color = "blue";
titulo.style.fontFamily = "Arial, sans-serif";

const contenedorPrincipal = document.createElement("div");
contenedorPrincipal.style.display = "flex";
contenedorPrincipal.style.flexDirection = "column";
contenedorPrincipal.style.alignItems = "center";
contenedorPrincipal.style.gap = "20px";

// Fila superior: Canvas y Datos de palabra
const filaSuperior = document.createElement("div");
filaSuperior.style.display = "flex";
filaSuperior.style.alignItems = "center";
filaSuperior.style.gap = "40px";

const canvas = document.createElement("canvas");
canvas.width = 250;
canvas.height = 300;
canvas.style.backgroundColor = "#f9f9f9";
canvas.style.border = "1px solid #ddd";
const ctx = canvas.getContext("2d");

const seccionInfo = document.createElement("div");
const textoPalabra = document.createElement("p");
textoPalabra.innerText = "Palabra a adivinar:";
const textoAdivinar = document.createElement("p");
textoAdivinar.style.fontSize = "2.5rem";
textoAdivinar.style.letterSpacing = "5px";
textoAdivinar.style.fontWeight = "bold";

const panelErrores = document.createElement("div");
panelErrores.style.backgroundColor = "#ffebee";
panelErrores.style.padding = "10px";
panelErrores.style.borderRadius = "8px";
panelErrores.style.color = "red";
const textoErrores = document.createElement("p");
const textoIncorrectas = document.createElement("p");

//parte mensaje final
const pantallaFinal = document.createElement("div");
pantallaFinal.style.display = "none";
pantallaFinal.style.width = "80%";
pantallaFinal.style.textAlign = "center";
pantallaFinal.style.padding = "20px";
pantallaFinal.style.borderRadius = "10px";
pantallaFinal.style.marginBottom = "10px";

//parte teclado
const contenedorTeclado = document.createElement("div");
contenedorTeclado.style.display = "flex";
contenedorTeclado.style.flexDirection = "column";
contenedorTeclado.style.alignItems = "center";
contenedorTeclado.style.gap = "10px";

function crearTeclado() {
    contenedorTeclado.innerHTML = "";
    const filas = ["ABCDEFGHIJKLMNÑ", "OPQRSTUVWXYZ"];
    filas.forEach(filaStr => {
        const divFila = document.createElement("div");
        filaStr.split("").forEach(l => {
            const btn = document.createElement("button");
            btn.innerText = l;
            btn.style.width = "40px";
            btn.style.height = "40px";
            btn.style.margin = "3px";
            btn.style.fontSize = "1rem";
            btn.style.fontWeight = "bold";
            btn.style.cursor = "pointer";
            btn.style.border = "1px solid #ccc";
            btn.style.borderRadius = "4px";
            btn.onclick = () => manejarIntento(l, btn);
            divFila.appendChild(btn);
        });
        contenedorTeclado.appendChild(divFila);
    });
}

//parte canva(dibujo)
function dibujar(parte) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#222";
    ctx.beginPath();
    switch(parte) {
        case 1: ctx.moveTo(20, 280); ctx.lineTo(150, 280); break; // Base
        case 2: ctx.moveTo(50, 280); ctx.lineTo(50, 20); break;  // Poste 
        case 3: ctx.moveTo(50, 20); ctx.lineTo(180, 20); break;  // Poste 
        case 4: ctx.moveTo(180, 20); ctx.lineTo(180, 60); break; // Cuerda
        case 5: ctx.arc(180, 90, 30, 0, Math.PI * 2); break;      // Cabeza
        case 6: ctx.moveTo(180, 120); ctx.lineTo(180, 200); break; // Cuerpo
        case 7: ctx.moveTo(180, 140); ctx.lineTo(140, 180); break; // B. Izq
        case 8: ctx.moveTo(180, 140); ctx.lineTo(220, 180); break; // B. Der
        case 9: ctx.moveTo(180, 200); ctx.lineTo(140, 250); break; // P. Izq
        case 10: ctx.moveTo(180, 200); ctx.lineTo(220, 250); break;// P. Der
    }
    ctx.stroke();
}

function iniciarJuego() {
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    palabraAdivinada = Array(palabraSecreta.length).fill("_");
    errores = 0;
    letrasIncorrectas = [];
    pantallaFinal.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actualizarVista();
    crearTeclado();
}

function actualizarVista() {
    textoAdivinar.innerText = palabraAdivinada.join(" ");
    textoErrores.innerText = `Errores: ${errores} / ${maxErrores}`;
    textoIncorrectas.innerText = `Letras incorrectas: ${letrasIncorrectas.join(", ")}`;
}

function manejarIntento(letra, boton) {
    if (palabraSecreta.includes(letra)) {
        boton.style.backgroundColor = "#2ecc71"; 
        boton.style.color = "white";
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) palabraAdivinada[i] = letra;
        }
    } else {
        boton.style.backgroundColor = "#e74c3c"; 
        boton.style.color = "white";
        errores++;
        letrasIncorrectas.push(letra);
        dibujar(errores);
    }
    boton.disabled = true;
    actualizarVista();
    revisarEstado();
}

function revisarEstado() {
    if (!palabraAdivinada.includes("_")) {
        mostrarPantallaFinal(true);
    } else if (errores >= maxErrores) {
        mostrarPantallaFinal(false);
    }
}

function mostrarPantallaFinal(victoria) {
    pantallaFinal.style.display = "block";
    pantallaFinal.innerHTML = ""; // Limpiar
    
    const msg = document.createElement("h2");
    msg.innerText = victoria ? "¡Ganaste! " : "¡Perdiste! ";
    pantallaFinal.style.backgroundColor = victoria ? "#d4edda" : "#f8d7da";
    pantallaFinal.style.color = victoria ? "#155724" : "#721c24";
    
    const desc = document.createElement("p");
    desc.innerText = `La palabra era: ${palabraSecreta}`;
    
    const btnReiniciar = document.createElement("button");
    btnReiniciar.innerText = victoria ? "Jugar de nuevo" : "Reintentar";
    btnReiniciar.style.marginTop = "10px";
    btnReiniciar.style.padding = "10px 20px";
    btnReiniciar.style.cursor = "pointer";
    btnReiniciar.onclick = iniciarJuego;

    pantallaFinal.appendChild(msg);
    pantallaFinal.appendChild(desc);
    pantallaFinal.appendChild(btnReiniciar);

    // Desactivar todos los botones del teclado
    const botones = contenedorTeclado.querySelectorAll("button");
    botones.forEach(b => b.disabled = true);
}
document.addEventListener("keydown", (event) => {
    let tecla = event.key.toUpperCase();

    // Validar que sea una letra del abecedario español
    const letrasValidas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

    if (!letrasValidas.includes(tecla)) return;

    // Buscar el botón correspondiente
    const botones = contenedorTeclado.querySelectorAll("button");

    botones.forEach(boton => {
        if (boton.innerText === tecla && !boton.disabled) {
            manejarIntento(tecla, boton);
        }
    });
});


//dom
seccionInfo.appendChild(textoAdivinar);
seccionInfo.appendChild(textoPalabra);
panelErrores.appendChild(textoErrores);
panelErrores.appendChild(textoIncorrectas);
seccionInfo.appendChild(panelErrores);

filaSuperior.appendChild(canvas);
filaSuperior.appendChild(seccionInfo);

contenedorPrincipal.appendChild(filaSuperior);
contenedorPrincipal.appendChild(pantallaFinal);
contenedorPrincipal.appendChild(contenedorTeclado);

document.body.appendChild(titulo);
document.body.appendChild(contenedorPrincipal);

iniciarJuego();