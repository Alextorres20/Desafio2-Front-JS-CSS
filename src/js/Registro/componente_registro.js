import { crearUsuario } from "./crud-provider";
const name = document.getElementsByName('name')[0];
const email = document.getElementsByName('email')[1];
const emailError = document.querySelector('span.errorEmail');
const password = document.getElementsByName('password')[1];
const confirm_password = document.getElementsByName('confirm_password')[0];
const passwordError = document.querySelector('span.errorPassword');
const revelarContraseña = document.getElementsByName('revelarContraseña')[0];
const formularioRegistro = document.getElementById('formularioRegistro');
const botonRegistrar = document.getElementsByTagName('button')[1];

const init = () => {
    validation();
    revelarContraseña.addEventListener('click', (event) => {
        if(password.type === "password") {
            password.type = "text";
            confirm_password.type= "text";
        }
        else{
            password.type = "password";
            confirm_password.type = "password";
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
        if(password.validity.valid && password.value == confirm_password.value){
            passwordError.innerHTML='';
            passwordError.className='error';
        } else{
            showError();
        }
    })
    confirm_password.addEventListener('input', (event) => {
        if(confirm_password.validity.valid && password.value == confirm_password.value){
            passwordError.innerHTML='';
            passwordError.className='error';
        } else{
            showError();
        }
    })

    // formularioRegistro.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     if(!email.validity.valid || !password.validity.valid || !confirm_password.validity.valid || 
    //         password.value != confirm_password.value) {
    //         showError();

    //     } else {
    //         const datos = new FormData(formularioRegistro);
    //         const usuario = Object.fromEntries(datos);
    //         crearUsuario(usuario);
    //     }
    // })


    botonRegistrar.addEventListener('click', (event) => {
        console.log(name.value);
        if(!email.validity.valid || !password.validity.valid || !confirm_password.validity.valid || 
            password.value != confirm_password.value) {
            console.log('patata');
            showError();
            event.preventDefault();
        } else {
            crearUsuario({
                name: name.value,
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

    if(password.validity.valueMissing || confirm_password.validity.valueMissing) {
        passwordError.innerHTML = "Debe introducir una contraseña.<br>"
    }
    else if(password.value != confirm_password.value){
        passwordError.innerHTML = "Las contraseñas no coinciden.<br>"
    }
    passwordError.className='error';
}



export{
    init
}