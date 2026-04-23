const body = document.body;

/*--------------------------------------------*/
/*Creando el formulario*/
/*--------------------------------------------*/
const formulario = document.createElement('form');

/*--------------------------------------------*/
/*Metiendo el formulario al body*/
/*--------------------------------------------*/
body.appendChild(formulario);

/*--------------------------------------------*/
/*Creando el cuadro de Tipo de Tarjeta*/
/*--------------------------------------------*/
const filaLista = document.createElement('div');
filaLista.style.marginBottom = "15px";
formulario.appendChild(filaLista);

const tipoTarjeta = document.createElement('label');
tipoTarjeta.innerText = "Seleccione: ";
filaLista.appendChild(tipoTarjeta);

const listaTarjetas = document.createElement('select');

const opcion1 = document.createElement('option');
opcion1.value = "bcp";
opcion1.innerText = "Banco de Credito del Peru";

const opcion2 = document.createElement('option');
opcion2.value = "visa";
opcion2.innerText = "VISA";

listaTarjetas.appendChild(opcion1);
listaTarjetas.appendChild(opcion2);

filaLista.appendChild(listaTarjetas);

/*--------------------------------------------*/
/*Creando el cuadro del Numero de Tarjeta*/
/*--------------------------------------------*/
const filaTarjeta = document.createElement('div');
filaTarjeta.style.marginBottom = "15px";
formulario.appendChild(filaTarjeta);

const etiquetaTarjeta = document.createElement('label');
etiquetaTarjeta.innerText = "Numero de Tarjeta: ";

const inputTarjeta = document.createElement('input');
inputTarjeta.type = "text";
inputTarjeta.placeholder = "XXXX XXXX XXXX XXXX"

filaTarjeta.appendChild(etiquetaTarjeta);
filaTarjeta.appendChild(inputTarjeta);

/*--------------------------------------------*/
/*Creando el cuadro de Tipo de Documento*/
/*--------------------------------------------*/
const filaTipo = document.createElement('div');
filaTipo.style.marginBottom = "15px";
formulario.appendChild(filaTipo);

const tipoDocumento = document.createElement('label');
tipoDocumento.innerText = "Seleccione: ";
filaTipo.appendChild(tipoDocumento);

const listaDocumentos = document.createElement('select');

const opcionD = document.createElement('option');
opcionD.value = "dni";
opcionD.innerText = "DNI";

const opcionC = document.createElement('option');
opcionC.value = "carnet";
opcionC.innerText = "Carnet de Extranjeria";

listaDocumentos.appendChild(opcionD);
listaDocumentos.appendChild(opcionC);

filaTipo.appendChild(listaDocumentos);

/*--------------------------------------------*/
/*Creando el cuadro de Numero de Documento*/
/*--------------------------------------------*/
const filaDocumento = document.createElement('div');
filaDocumento.style.marginBottom = "15px";    
formulario.appendChild(filaDocumento);

const etiquetaDocumento = document.createElement('label');
etiquetaDocumento.innerText = "Numero de Documento: ";

const inputDocumento = document.createElement('input');
inputDocumento.type = "text";
inputDocumento.placeholder = "XXXXXX"

filaDocumento.appendChild(etiquetaDocumento);
filaDocumento.appendChild(inputDocumento);

/*--------------------------------------------*/
/*Creando el cuadro de Clave de Internet*/
/*--------------------------------------------*/
const filaClave = document.createElement('div');
filaClave.style.marginBottom = "15px";    
formulario.appendChild(filaClave);

const etiquetaClave = document.createElement('label');
etiquetaClave.innerText = "Genera tu Clave de Internet: ";

const inputClave = document.createElement('input');
inputClave.type = "password";
inputClave.placeholder = "XXXXXX"
inputClave.readOnly = true;

filaClave.appendChild(etiquetaClave);
filaClave.appendChild(inputClave);

/*--------------------------------------------*/
/*Creando el Teclado Aleatorio*/
/*--------------------------------------------*/
const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
numeros.sort(() => Math.random() - 0.5);

const tecladoDiv = document.createElement('div');
tecladoDiv.style.display = 'grid';
tecladoDiv.style.gridTemplateColumns = 'repeat(3, 40px)';
tecladoDiv.style.gap = '5px';
tecladoDiv.style.marginTop = '10px';

numeros.forEach(num => {
    const boton = document.createElement('button');
    boton.innerText = num;
    boton.type = "button";
    boton.style.cursor = 'pointer';

    boton.onclick = () => {
        if (inputClave.value.length < 6) {
            inputClave.value += num;
        }
    };
    tecladoDiv.appendChild(boton);
});

const botonLimpiar = document.createElement('button');
botonLimpiar.innerText = "LIMPIAR";
botonLimpiar.type = "button";
botonLimpiar.style.gridColumn = 'span 2'; 
botonLimpiar.style.cursor = 'pointer';

botonLimpiar.onclick = () => {
    inputClave.value = "";
};

tecladoDiv.appendChild(botonLimpiar);
filaClave.appendChild(tecladoDiv);

/*--------------------------------------------*/
/*Creando el cuadro de Texto de la Imagen*/
/*--------------------------------------------*/
const filaTexto = document.createElement('div');
filaTexto.style.marginBottom = "15px";    
formulario.appendChild(filaTexto);

const imagenCaptcha = document.createElement('img');
imagenCaptcha.src = "captcha.png";
imagenCaptcha.style.width = "120px"

const etiquetaTexto = document.createElement('label');
etiquetaTexto.innerText = "Ingresa el texto de la imagen: ";

const inputTexto = document.createElement('input');
inputTexto.type = "text";
inputTexto.placeholder = "XXXXXX"

filaTexto.appendChild(imagenCaptcha);
filaTexto.appendChild(etiquetaTexto);
filaTexto.appendChild(inputTexto);

/*--------------------------------------------*/
/*Creando el Boton de Ingresar*/
/*--------------------------------------------*/
const botonContenedor = document.createElement('div');

const botonIngresar = document.createElement('button');
botonIngresar.innerText = "INGRESAR";
botonIngresar.type = "submit";

botonContenedor.appendChild(botonIngresar);
formulario.appendChild(botonContenedor);

/*--------------------------------------------*/
/*Agregando Estilo (hace rato era)*/
/*--------------------------------------------*/
Object.assign(formulario.style, {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    maxWidth: "500px",
    margin: "40px auto",
    border: "1px solid #ddd"
});

const todasLasFilas = formulario.querySelectorAll('div');
todasLasFilas.forEach(div => {
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.gap = "5px";
});

const controles = formulario.querySelectorAll('input, select');
controles.forEach(control => {
    Object.assign(control.style, {
        padding: "8px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "14px",
        outline: "none"
    });
});

Object.assign(tecladoDiv.style, {
    display: "grid",
    gridTemplateColumns: "repeat(3, 45px)",
    gap: "8px",
    alignSelf: "center",
    marginTop: "15px"
});


const botonesTeclado = tecladoDiv.querySelectorAll('button');
botonesTeclado.forEach(btn => {
    Object.assign(btn.style, {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #bbb",
        backgroundColor: "#eee",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    });

    btn.onmouseover = () => btn.style.backgroundColor = "#ddd";
    btn.onmouseout = () => btn.style.backgroundColor = "#eee";
});

Object.assign(botonLimpiar.style, {
    backgroundColor: "#666",
    color: "white",
    fontSize: "11px"
});

Object.assign(botonIngresar.style, {
    backgroundColor: "#b00000",
    color: "white",
    border: "none",
    padding: "12px 40px",
    borderRadius: "25px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    boxShadow: "0px 4px 0px #700"
});

filaTexto.style.flexDirection = "row";
filaTexto.style.alignItems = "center";
filaTexto.style.gap = "15px";