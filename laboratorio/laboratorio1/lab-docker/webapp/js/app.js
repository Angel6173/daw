// --- BASE DE DATOS LOCAL (SIMULADA) ---

let bandas = [
    {
        nombre: "Banda Demo",
        genero: "Rock",
        origen: "Lima, Perú",
        imagen: "https://via.placeholder.com/300",
        bio: "Banda de ejemplo para pruebas"
    }
];

let canciones = [
    {
        banda: "Banda Demo",
        titulo: "Track Demo",
        album: "Demo Album",
        link: "https://youtube.com",
        duracion: "3:00"
    }
];


// --- BANDAS ---
const inicializarBandas = () => {
    const gridBandas = document.querySelector('.contenedor-grid');
    if (!gridBandas) return;

    gridBandas.innerHTML = "";
    bandas.forEach(banda => {
        gridBandas.innerHTML += `
        <article class="tarjeta-banda">
            <div class="imagen-banda">
                <img src="${banda.imagen}">
            </div>
            <div class="info-banda">
                <h3>${banda.nombre}</h3>
                <p>${banda.genero}</p>
                <a href="perfil-banda.html?id=${encodeURIComponent(banda.nombre)}">Ver Perfil</a>
            </div>
        </article>`;
    });
};


// --- CANCIONES ---
const inicializarCanciones = () => {
    const lista = document.querySelector('.lista-canciones');
    if (!lista) return;

    const header = lista.querySelector('.track-header')?.outerHTML || "";
    lista.innerHTML = header;

    canciones.forEach((c, i) => {
        lista.innerHTML += `
        <div class="track-item">
            <span>${i + 1}</span>
            <span>${c.titulo}</span>
            <span>${c.album}</span>
            <a href="${c.link}" target="_blank">Escuchar</a>
        </div>`;
    });
};


// --- FORMULARIOS ---
document.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;

    // Banda
    if (form.id === 'form-registro-banda') {
        const nuevaBanda = {
            nombre: document.getElementById('nombre').value,
            genero: document.getElementById('genero').value,
            origen: document.getElementById('origen').value,
            imagen: document.getElementById('imagen').value || "https://via.placeholder.com/300",
            bio: document.getElementById('bio').value
        };

        bandas.push(nuevaBanda);
        alert("Banda registrada (demo)");
        window.location.href = "bandas.html";
    }

    // Canción
    if (form.id === 'form-registro-cancion') {
        const nuevaCancion = {
            banda: document.getElementById('banda-vinculo').value,
            titulo: document.getElementById('titulo-cancion').value,
            album: document.getElementById('album').value,
            link: document.getElementById('link-escuchar').value,
            duracion: document.getElementById('duracion').value
        };

        canciones.push(nuevaCancion);
        alert("Canción registrada (demo)");
        window.location.href = "canciones.html";
    }
});


// --- BUSCADOR ---
const ejecutarBusqueda = () => {
    const input = document.getElementById('input-busqueda');
    const contenedor = document.getElementById('resultados-busqueda');

    if (!input || !contenedor) return;

    const termino = input.value.toLowerCase();
    contenedor.innerHTML = "";

    const bandasFiltradas = bandas.filter(b =>
        b.nombre.toLowerCase().includes(termino)
    );

    const cancionesFiltradas = canciones.filter(c =>
        c.titulo.toLowerCase().includes(termino)
    );

    bandasFiltradas.forEach(b => {
        contenedor.innerHTML += `<p>BANDA: ${b.nombre}</p>`;
    });

    cancionesFiltradas.forEach(c => {
        contenedor.innerHTML += `<p>TRACK: ${c.titulo}</p>`;
    });
};


// --- PERFIL ---
const cargarPerfilBanda = () => {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('id');

    if (!nombre) return;

    const banda = bandas.find(b => b.nombre === nombre);
    if (!banda) return;

    document.getElementById('banda-nombre').innerText = banda.nombre;
    document.getElementById('banda-genero').innerText = banda.genero;
    document.getElementById('banda-bio').innerText = banda.bio;
    document.getElementById('banda-imagen-grande').src = banda.imagen;

    const lista = document.getElementById('banda-discos');
    const tracks = canciones.filter(c => c.banda === banda.nombre);

    lista.innerHTML = tracks.map(t => `<li>${t.titulo}</li>`).join('');
};


// --- INICIO ---
window.onload = () => {
    inicializarBandas();
    inicializarCanciones();
    cargarPerfilBanda();

    document.getElementById('btn-buscar')?.addEventListener('click', ejecutarBusqueda);
};