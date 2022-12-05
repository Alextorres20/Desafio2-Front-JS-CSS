import { crearPrueba } from '../pruebas/peticiones-pruebas';
import { cerrarModal } from '../pruebas/modal-crear-pruebas';
import { generarPruebaHtml, mostrarRespuestaCreacion } from '../pruebas/crud_pruebas';
import { token } from '../..';/* 
import { listaPruebas } from '../pruebas/index'; */


const initvalidarFormularioPruebas = () => {
    const formularioPruebas = document.querySelector('.formulario-pruebas');

    formularioPruebas.addEventListener('submit', async (event) => {
        event.stopImmediatePropagation(); //Para que no salte 2 veces
        event.preventDefault();

        if (formularioPruebas.checkValidity()) {
            const datos = new FormData(formularioPruebas);
            const prueba = Object.fromEntries(datos);
            const respuesta = await crearPrueba(prueba, token);/* 
            if (respuesta.estado == 'ok') listaPruebas.nuevaPrueba(respuesta.respuesta); */
            cerrarModal();
            mostrarRespuestaCreacion(respuesta);
            generarPruebaHtml(respuesta.respuesta);
        }
        formularioPruebas.classList.add('was-validated');
    })
};


const initValidarInputs = () => {
    const listaInputs = document.querySelectorAll('.validar');

    listaInputs.forEach(input => {
        input.addEventListener('input', () => {
            let errorContenedor = input.parentElement.nextElementSibling;
            if (input.validity.valid) {
                errorContenedor.innerHTML = '';
            } else {
                mostrarError(input, errorContenedor);
            }
        });
    });
};


const mostrarError = (input, contenedor) => {
    if (input.validity.valueMissing) {
        contenedor.textContent = 'Debes introducir un valor.';
    } else if (input.validity.rangeOverflow) {
        contenedor.textContent = `Debe ser menor o igual que 100`;
    } else if (input.validity.rangeUnderflow) {
        contenedor.textContent = `Debe ser mayor o igual que 1`;
    } else if(input.validity.tooLong) {
        contenedor.textContent = `No puede superar el número máximo de caracteres`;
    }
} 

export {
    initvalidarFormularioPruebas,
    initValidarInputs
}