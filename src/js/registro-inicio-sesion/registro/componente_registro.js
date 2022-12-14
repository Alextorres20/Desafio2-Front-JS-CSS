import { crearUsuario } from "./crud-provider";
const name = document.getElementsByName('name')[0];
const email = document.getElementsByName('email')[1];
const emailError = document.querySelector('span.errorEmail.Registro');
const password = document.getElementsByName('password')[1];
const confirm_password = document.getElementsByName('confirm_password')[0];
const passwordError = document.querySelector('span.errorPassword.Registro');
const revelarContraseña = document.getElementsByName('revelarContraseña')[1];
const botonRegistrar = document.getElementsByTagName('button')[1];

const initRegistro = () => {
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


    botonRegistrar.addEventListener('click', (event) => {
        if(!email.validity.valid || !password.validity.valid || !confirm_password.validity.valid || 
            password.value != confirm_password.value) {
            showError();
            event.preventDefault();
        } else {
            crearUsuario({
                name: name.value,
                email: email.value,
                password: password.value
            }).then(registrado => {
                if(registrado.mens.success == true){
                    location.href = "../../html/home.html"
                    guardarUsuario(registrado);
                }
                
            });
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
    initRegistro
}