import { getPruebas, eliminarPrueba } from "./peticiones-pruebas";
import { token } from "../..";

const modal = document.querySelector('#modalConfirmarBorrar'),
    btnBorrarPrueba = document.querySelector('#modalConfirmarBorrar .borrar'),
    btnCancelarBorrar = document.querySelector('#modalConfirmarBorrar .cancelar'),
    btnAsignarPrueba = document.querySelector('.btn.asignar');


const initListaPruebas = async() => {
    const pruebas = await getPruebas(token);
    pruebas.map(generarPruebaHtml);
}

const generarPruebaHtml = (prueba) => {
    const tipo = (prueba.tipo.charAt(0).toUpperCase() + prueba.tipo.slice(1)).replaceAll('-', ' ');
    const html = `<div class="row" data-id="${[prueba.id]}">
                    <div class="col-1 ${[prueba.tipo]}">${[tipo]}</div>
                    <div class="col-1">${[prueba.nombreDios]}</div>
                    <div class="col-6">${[prueba.preguntaDescripcion]}</div>
                    <div class="col-1">${[prueba.cantidadDestino]}</div>
                    <div class="col-2">${[prueba.fechaCreacion]}</div>
                    <div class="col-1">
                        <span><i class="fa fa-pencil" aria-hidden="true"></i></span>
                        <span><i class="borrar fa fa-trash" aria-hidden="true" data-bs-toggle="modal" data-bs-target="#modalConfirmarBorrar"></i></span>
                    </div>
                </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('.tabla-pruebas .contenido').append(div.firstElementChild);
}


const mostrarMensajesRespuesta = (respuesta, mensaje) => {
    const contenedor = document.querySelector('.crud-pruebas .mensaje-respuesta');
    if (respuesta.estado == 'ok') {
        contenedor.innerHTML = `La prueba se ha ${[mensaje]} con éxito`;
        contenedor.classList.add('alert', 'alert-success');
    } else {
        contenedor.innerHTML = `Error al ${[mensaje]} la prueba`;
        contenedor.classList.add('alert', 'alert-danger');
    }
}

modal.addEventListener('show.bs.modal', (e) => {
    (e.relatedTarget.closest('.row')).classList.add('objetivo')
});


btnBorrarPrueba.addEventListener('click', async() => {
    const prueba = document.querySelector('.objetivo');
    prueba.remove();
    const respuesta = await eliminarPrueba(prueba.getAttribute('data-id'));
    mostrarMensajesRespuesta(respuesta, 'eliminado');
});


btnCancelarBorrar.addEventListener('click', () => {
    document.querySelector('.objetivo').classList.remove('objetivo');
});


btnAsignarPrueba.addEventListener('click', () => {
    location.href = "./asignar-pruebas.html";
});


export {
    initListaPruebas,
    generarPruebaHtml,
    mostrarMensajesRespuesta
}