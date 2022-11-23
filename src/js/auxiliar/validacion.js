import { crearPrueba } from '../pruebas/crud-pruebas';

const formularioPruebas = document.querySelector('.formulariosPruebas');


export const initValidacion = () => {
    validarInputsPruebas();
}


const validarInputsPruebas = () => {
    const listaInputs = document.querySelectorAll('.validar input');

    listaInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            let errorContenedor = input.parentElement.nextElementSibling;
            if(input.validity.valid) {
                errorContenedor.innerHTML = '';
            } else {
                mostrarError(input, errorContenedor);
            }
        });
  
        formularioPruebas.addEventListener('submit', (event) => {
            listaInputs.forEach(input => {
                if(!input.validity.valid) {
                    input.classList.add("is-invalid");
                    input.classList.remove('is-valid');
                    mostrarError(input, input.parentElement.nextElementSibling);
                } else {
                    input.classList.add('is-valid');
                    input.classList.remove('is-invalid');
                }
            });

            if (!formularioPruebas.checkValidity()) {
                event.preventDefault();
            } else {
                const datos = new FormData(formularioPruebas);
                const prueba = Object.fromEntries(datos);
                crearPrueba(prueba);
            }
        }); 
    });  
}
/* 
const validacionEmail = () => {
    email.addEventListener('input', (event) => {
        if(email.validity.valid) {
            emailError.innerHTML=''; //Restablece el contenido del mensaje
            emailError.className='error'; //Restablece el estado visual el mensaje
        } else { //Si todavía hay error, muestra el error
            showError();
        }
    });

    form.addEventListener('submit', (event) => {
        if(!email.validity.valid) {
            showError();
            event.preventDefault(); //Evitamos que se envíe el formulario
        } else {
            const data = new FormData(document.getElementById('formulario'));
            const usuario = Object.fromEntries(data);
            crearUsuario(usuario).then(console.log);
            event.preventDefault();
        }
    });
} */

const mostrarError = (input, contenedor) => {
    if(input.validity.valueMissing) {
        contenedor.textContent = 'Debes introducir un valor.';
    } else if (input.validity.rangeOverflow) {
        contenedor.textContent = `Debe ser menor o igual que 100`;
    }
} 