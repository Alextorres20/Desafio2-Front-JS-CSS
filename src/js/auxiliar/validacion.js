import { crearPrueba } from '../pruebas/peticiones-pruebas';
import { cerrarModal } from '../pruebas/modal-crear-pruebas';
import { generarPruebaHtml, mostrarRespuestaCreacion } from '../pruebas/crud_pruebas';


const initValidacion = () => {
    valdiarFormularioPruebas();
}

const valdiarFormularioPruebas = () => {
    const listaInputs = document.querySelectorAll('.validar');
    const formularioPruebas = document.querySelector('.formulario-pruebas');

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

    formularioPruebas.addEventListener('submit', async (event) => {
        event.stopImmediatePropagation(); //Para que no salte 2 veces
        event.preventDefault();

        listaInputs.forEach(input => {
            if (!input.validity.valid) {
                input.classList.add("is-invalid");
                input.classList.remove('is-valid');
                mostrarError(input, input.parentElement.nextElementSibling);
            } else {
                input.classList.add('is-valid');
                input.classList.remove('is-invalid');
            }
        });

        if (formularioPruebas.checkValidity()) {
            const selectTipoPrueba = document.querySelector('.select-tipo-prueba');
            const tipo = selectTipoPrueba.options[selectTipoPrueba.selectedIndex].value;
            const datos = new FormData(formularioPruebas);
            datos.append('tipo', tipo);
            const prueba = Object.fromEntries(datos);
            const respuesta = await crearPrueba(prueba);
            cerrarModal();
            mostrarRespuestaCreacion(respuesta);
            generarPruebaHtml(respuesta.respuesta, tipo);
        }
    });
}


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
    initValidacion
}