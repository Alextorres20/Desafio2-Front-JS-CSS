import { crearPrueba } from '../pruebas/crud-pruebas';



export const initValidacion = () => {
    validarInputsPruebas();
}


const validarInputsPruebas = () => {
    const formularioPruebas = document.querySelector('.formulario-pruebas');
    const listaInputs = document.querySelectorAll('.validar');

    listaInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            let errorContenedor = input.parentElement.nextElementSibling;
            if (input.validity.valid) {
                errorContenedor.innerHTML = '';
            } else {
                mostrarError(input, errorContenedor);
            }
        });

        formularioPruebas.addEventListener('submit', (event) => {
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
                crearPrueba(prueba);
                const modal = document.querySelectorAll('#modalPruebas, .modal-backdrop');
                modal.forEach(element => {
                    element.classList.add('hide');
                    element.classList.remove('show');
                });
            }
        });
    });
}


const mostrarError = (input, contenedor) => {
    if (input.validity.valueMissing) {
        contenedor.textContent = 'Debes introducir un valor.';
    } else if (input.validity.rangeOverflow) {
        contenedor.textContent = `Debe ser menor o igual que 100`;
    } else if (input.validity.rangeUnderflow) {
        contenedor.textContent = `Debe ser mayor o igual que 1`;
    }
} 