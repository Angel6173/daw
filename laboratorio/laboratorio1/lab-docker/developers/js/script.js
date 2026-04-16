// Selección de elementos del DOM
const btnColor = document.getElementById('btn-color');
const btnTexto = document.getElementById('btn-texto');
const mainContent = document.getElementById('main-content');

// Evento para cambiar el color de fondo al hacer clic
btnColor.addEventListener('click', () => {
    const colores = ['#f0f8ff', '#e6e6fa', '#fff5ee', '#f5f5dc'];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    document.body.style.backgroundColor = colorAleatorio;
});

// Evento para cambiar el color del texto
btnTexto.addEventListener('click', () => {
    if (mainContent.style.color === 'blue') {
        mainContent.style.color = 'black';
    } else {
        mainContent.style.color = 'blue';
    }
});