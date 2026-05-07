let eventosGlobales = [];
let fechaMostrada = new Date();

async function enviarFormulario() {
    const data = {
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        descripcion: document.getElementById('descripcion').value,
        oldFecha: document.getElementById('oldFecha').value,
        oldHora: document.getElementById('oldHora').value
    };

    if (!data.fecha || !data.hora || !data.descripcion) {
        Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
        return;
    }

    const res = await fetch('/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        Swal.fire({
            title: '¡Guardado!',
            text: 'El evento se almacenó correctamente.',
            icon: 'success',
            confirmButtonColor: '#28a745'
        });
        resetForm();
        cargar();
    }
}

async function cargar() {
    const res = await fetch('/listar-eventos');
    eventosGlobales = await res.json();
    
    renderizarLista();
    renderizarCalendario();
}

function renderizarLista() {
    const lista = document.getElementById('lista-eventos');
    lista.innerHTML = '';

    const eventosPorFecha = {};
    eventosGlobales.forEach(ev => {
        if (!eventosPorFecha[ev.fecha]) {
            eventosPorFecha[ev.fecha] = [];
        }
        eventosPorFecha[ev.fecha].push(ev);
    });

    let totalEventos = 0;
    let totalDias = Object.keys(eventosPorFecha).length;

    for (const [fecha, listaEventos] of Object.entries(eventosPorFecha)) {
        totalEventos += listaEventos.length;
        const diaDiv = document.createElement('div');
        diaDiv.className = 'dia-item';

        let htmlEventos = `
            <div class="dia-header">
                <strong> Fecha: ${fecha}</strong>
            </div>
            <div class="dia-cuerpo">
        `;

        listaEventos.forEach(ev => {
            htmlEventos += `
                <div class="evento-item">
                    <div>
                        <span>Hora: <strong>${ev.hora}</strong></span>
                        <p style="margin: 5px 0 0 0; color:#444;">${ev.descripcion}</p>
                    </div>
                    <div>
                        <button class="btn-edit" onclick="editar('${ev.fecha}', '${ev.hora}', '${ev.descripcion}')">Editar</button>
                        <button class="btn-delete" onclick="eliminar('${ev.fecha}', '${ev.hora}')">Eliminar</button>
                    </div>
                </div>
            `;
        });

        htmlEventos += `</div>`;
        diaDiv.innerHTML = htmlEventos;
        lista.appendChild(diaDiv);
    }

    document.getElementById('count-ev').innerText = totalEventos;
    document.getElementById('count-days').innerText = totalDias;
}

function renderizarCalendario() {
    const cal = document.getElementById('calendario-contenedor');
    cal.innerHTML = '';

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    let mes = fechaMostrada.getMonth();
    let anio = fechaMostrada.getFullYear();
    
    let calHtml = `
        <div class="nav-calendario">
            <button onclick="cambiarMes(-1)">◀ Anterior</button>
            <h3>${meses[mes]} ${anio}</h3>
            <button onclick="cambiarMes(1)">Siguiente ▶</button>
        </div>
        <div class="calendario-grid">
    `;

    const diasEnMes = new Date(anio, mes + 1, 0).getDate();

    for (let i = 1; i <= diasEnMes; i++) {
        const diaStr = i < 10 ? `0${i}` : `${i}`;
        const mesStr = (mes + 1) < 10 ? `0${mes + 1}` : `${mes + 1}`;
        const fechaMes = `${anio}-${mesStr}-${diaStr}`;

        const eventosDelDia = eventosGlobales.filter(e => e.fecha === fechaMes);
        let claseDia = "cal-dia";
        let tooltip = "";

        if (eventosDelDia.length > 0) {
            claseDia += " ocupado";
            tooltip = eventosDelDia.map(e => `${e.hora}: ${e.descripcion}`).join(', ');
        }

        calHtml += `
            <div class="${claseDia}" title="${tooltip}">
                <span class="num">${i}</span>
                ${eventosDelDia.length > 0 ? `<div class="dots">${eventosDelDia.length} ev.</div>` : ''}
            </div>
        `;
    }
    
    calHtml += `</div>`;
    cal.innerHTML = calHtml;
}

function cambiarMes(direccion) {
    fechaMostrada.setMonth(fechaMostrada.getMonth() + direccion);
    renderizarCalendario();
}

function cambiarVista(vista) {
    document.getElementById('btn-vista-lista').classList.remove('active');
    document.getElementById('btn-vista-estructura').classList.remove('active');

    if (vista === 'lista') {
        document.getElementById('vista-lista').style.display = "block";
        document.getElementById('vista-estructura').style.display = "none";
        document.getElementById('btn-vista-lista').classList.add('active');
    } else {
        document.getElementById('vista-lista').style.display = "none";
        document.getElementById('vista-estructura').style.display = "block";
        document.getElementById('btn-vista-estructura').classList.add('active');
    }
}

function editar(f, h, d) {
    document.getElementById('fecha').value = f;
    document.getElementById('hora').value = h;
    document.getElementById('descripcion').value = d;
    document.getElementById('oldFecha').value = f;
    document.getElementById('oldHora').value = h;
    
    document.getElementById('title').innerText = "Editar Evento";
    document.getElementById('btn-submit').innerText = "Actualizar Evento";
    document.getElementById('btn-cancel').style.display = "block";
}

function eliminar(fecha, hora) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await fetch('/eliminar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fecha, hora })
            });
            Swal.fire('¡Eliminado!', 'El evento ha sido borrado.', 'success');
            cargar();
        }
    });
}

function resetForm() {
    document.getElementById('form-agenda').reset();
    document.getElementById('oldFecha').value = "";
    document.getElementById('oldHora').value = "";
    
    document.getElementById('title').innerText = "Nuevo Evento";
    document.getElementById('btn-submit').innerText = "Guardar Evento";
    document.getElementById('btn-cancel').style.display = "none";
}

cargar();