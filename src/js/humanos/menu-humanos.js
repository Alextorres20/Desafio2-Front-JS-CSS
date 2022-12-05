import * as server from './http-proveedores';

import { matarHumano } from './modal-matar-humano';

const botonCrearHumanos = document.getElementById('crearHumanos');
const botonMatarHumanos = document.getElementById('matarHumanos');

const contenedorMensajeCrear = document.querySelector('.mensajeCantidad.tipo'); 
const cantidadCrear = document.getElementById('cantidadCrear');

export const initModal = () => {
    mostrarHumanos();

    console.log(botonCrearHumanos);
    // console.log(botonMatarHumanos);
}

const mostrarHumanos = () => {
    server.mostrarUsuariosVivos().then(humanos => {
        console.log(humanos);
        humanos.forEach(humano => {
            generarHumanoHTML(humano);
        });
    });
        
}
    botonCrearHumanos.addEventListener('click', (event) => {
        if(!cantidadCrear.validity.valid || cantidadCrear.value <= 0 || cantidadCrear.value > 100 ){
            contenedorMensajeCrear.classList.add('error');
            mostrarMensaje()
        }
        else{
            console.log(cantidadCrear.value);
            server.crearHumanos({
                cantidad: cantidadCrear.value
            }).then(mostrarHumanos);
            contenedorMensajeCrear.classList.add('ok');
            mostrarMensaje();
        }
    });


const generarHumanoHTML = (humano) => {
    const html = `<td class="${[humano.id_usuario]}" scope="col">${[humano.id_usuario]}</td>
                <td scope="col">${[humano.destino]}</td>
                <td scope="col">${[humano.donde_murio]}</td>`;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    document.querySelector('.tabla-humanos tbody').append(tr);
}

const mostrarMensaje = () => {
    if(contenedorMensajeCrear.classList.contains('error')){
        contenedorMensajeCrear.innerHTML = 'Solo se permite numeros del 1 hasta 100';
        contenedorMensajeCrear.classList.add('alert', 'alert-danger');
    }
    else{
        contenedorMensajeCrear.innerHTML = 'Has creado ' + cantidadCrear.value + ' humanos';
        contenedorMensajeCrear.classList.add('alert', 'alert-success');
    }
}