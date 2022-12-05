import { getPruebas } from "./peticiones-pruebas";
import { token } from "../..";

const initListaPruebas = async() => {
    const pruebas = await getPruebas(token);
    pruebas.map(generarPruebaHtml);
}

const generarPruebaHtml = (prueba) => {
    const tipo = (prueba.tipo.charAt(0).toUpperCase() + prueba.tipo.slice(1)).replaceAll('-', ' ');
    const html = `<div class="row">
                    <div class="col-1 ${[prueba.tipo]}">${[tipo]}</div>
                    <div class="col-1">${[prueba.nombreDios]}</div>
                    <div class="col-6">${[prueba.preguntaDescripcion]}</div>
                    <div class="col-1">${[prueba.cantidadDestino]}</div>
                    <div class="col-2">${[prueba.fechaCreacion]}</div>
                    <div class="col-1">
                        <span><i class="fa fa-pencil" aria-hidden="true"></i></span>
                        <span><i class="fa fa-trash" aria-hidden="true"></i></span>
                    </div>
                </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('.tabla-pruebas .contenido').append(div.firstElementChild);
}


const mostrarRespuestaCreacion = (respuesta) => {
    const contenedor = document.querySelector('.crud-pruebas .respuesta-creacion');
    if (respuesta.estado == 'ok') {
        contenedor.innerHTML = 'La prueba se ha creado con éxito';
        contenedor.classList.add('alert', 'alert-success');
    } else {
        contenedor.innerHTML = 'Error al crear la prueba';
        contenedor.classList.add('alert', 'alert-danger');
    }
}


export {
    initListaPruebas,
    generarPruebaHtml,
    mostrarRespuestaCreacion
}