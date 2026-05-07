const entrada = document.getElementById("entrada");
const salida = document.getElementById("salida");

const colores = ["red", "blue", "green", "purple", "orange"];

entrada.addEventListener("input", function() {
    salida.textContent = entrada.value;
});

function cambiarColor() {
    let colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    salida.style.color = colorAleatorio;
}

function limpiarTexto() {
    salida.textContent = "";
    entrada.value = "";
}

function modoOscuro() {
    document.body.classList.toggle("dark");
}