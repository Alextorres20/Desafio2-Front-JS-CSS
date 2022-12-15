import { iniciarSesion } from "./crud-provider";
import { guardarUsuario } from "../../auxiliar/local-storage";
import { Usuario } from "../../humanos/clases/Usuario";

const email = document.getElementsByName('email')[0];
const emailError = document.querySelector('span.errorEmail.Inicio');
const password = document.getElementsByName('password')[0];
const passwordError = document.querySelector('span.errorPassword.Inicio');
const revelarContraseña = document.getElementsByName('revelarContraseña')[0];
const botonIniciar = document.getElementsByTagName('button')[0];
const mensajeError = document.querySelector('.error.Inicio');

const initInicioSesion = () => {
    validation();
    revelarContraseña.addEventListener('click', (event) => {
        if (password.type === "password") {
            password.type = "text";
        }
        else {
            password.type = "password";
        }
    })
}

const validation = () => {
    email.addEventListener('input', (event) => {
        if (email.validity.valid) {
            emailError.innerHTML = '';
            emailError.className = 'error';
        } else {
            showError();
        }
    });
    password.addEventListener('input', (event) => {
        if (password.validity.valid) {
            passwordError.innerHTML = '';
            passwordError.className = 'error';
        } else {
            showError();
        }
    })


    botonIniciar.addEventListener('click', (event) => {
        event.preventDefault();
        if (!email.validity.valid || !password.validity.valid || email.value.length == 0 || password.value.length == 0) {
            showError();
        } else {
            iniciarSesion({
                email: email.value,
                password: password.value
            }).then(iniciado => {
                if (iniciado.success == true) {
                    location.href = "../../html/home.html";
                    guardarUsuario(JSON.stringify(new Usuario(iniciado.data)));
                } else{
                    mensajeError.classList.add("alert", "alert-danger");
                    mensajeError.innerHTML = "El correo o la contraseña no están correctas";
                    mensajeError.setAttribute("style", "margin-top: -35px");
                    const simbolo = document.createElement('svg');
                    simbolo.classList.add("bi", "flex-shrink-0", "me-2");
                    simbolo.setAttribute("role", "img")
                    simbolo.setAttribute("aria-label", "Danger:");
                    const link = document.createElement('use');
                    link.setAttribute("xlink:href", "#exclamation-triangle-fill");
                }
            });
        }
    })
}

const showError = () => {
    if (email.validity.valueMissing) {
        emailError.textContent = "Debe introducir una dirección de correo electrónico."
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "El valor introducido debe ser una dirección de correo electrónico."
    } else if (email.validity.tooShort) {
        emailError.textContent = `El correo electrónico debe tener al menos ${email.minLenght} caracteres.`
    }
    emailError.className = 'error';

    if (password.validity.valueMissing) {
        passwordError.innerHTML = "Debe introducir una contraseña.<br>"
    }
    passwordError.className = 'error';
}



export {
    initInicioSesion
}