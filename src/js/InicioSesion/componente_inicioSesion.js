import { iniciarSesion } from "./crud-provider";
const email = document.getElementsByName('email')[0];
const emailError = document.querySelector('span.errorEmail.Inicio');
const password = document.getElementsByName('password')[0];
const passwordError = document.querySelector('span.errorPassword.Inicio');
const revelarContraseña = document.getElementsByName('revelarContraseña')[0];
const botonIniciar = document.getElementsByTagName('button')[0];

const initInicioSesion = () => {
    validation();
    console.log(email);
    console.log(emailError);
    console.log(password);
    console.log(passwordError);
    console.log(revelarContraseña);
    console.log(botonIniciar);
    revelarContraseña.addEventListener('click', (event) => {
        if(password.type === "password") {
            password.type = "text";
        }
        else{
            password.type = "password";
        }
    })
}

const validation = () => {
    email.addEventListener('input', (event) => {
        if(email.validity.valid) {
            emailError.innerHTML='';
            emailError.className='error';
        } else{
            showError();
        }
    });
    password.addEventListener('input', (event) => {
        if(password.validity.valid){
            passwordError.innerHTML='';
            passwordError.className='error';
        } else{
            showError();
        }
    })


    botonIniciar.addEventListener('click', (event) => {
        if(!email.validity.valid || !password.validity.valid) {
            showError();
            event.preventDefault();
        } else {
            iniciarSesion({
                email: email.value,
                password: password.value
            }).then(console.log);
            event.preventDefault();
        }
    })
}

const showError = () => {
    if(email.validity.valueMissing) {
        emailError.textContent= "Debe introducir una dirección de correo electrónico."
    } else if(email.validity.typeMismatch) {
        emailError.textContent= "El valor introducido debe ser una dirección de correo electrónico."
    } else if(email.validity.tooShort) {
        emailError.textContent = `El correo electrónico debe tener al menos ${email.minLenght} caracteres.`
    }
    emailError.className='error';

    if(password.validity.valueMissing) {
        passwordError.innerHTML = "Debe introducir una contraseña.<br>"
    }
    passwordError.className='error';
}



export{
    initInicioSesion
}