import * as server from './http-proveedores';

import { matarHumano } from './modal-matar-humano';

const botonCrearHumanos = document.getElementById('crearHumanos');
const botonMatarHumanos = document.getElementById('matarHumanos');

const contenedorMensajeCrear = document.querySelector('.mensajeCantidad.tipo'); 
const cantidadCrear = document.getElementById('cantidadCrear');

export const initModal = () => {
    mostrarHumanos();

    // console.log(botonMatarHumanos);
}

const mostrarHumanos = () => {
    server.mostrarUsuariosVivos().then(humanos => {
        console.log(humanos);
        humanos.forEach(humano => {
            generarHumanoHTML(humano);
            server.mostrarCaracteristicas_Dios(humano.id_usuario).then(caracteristicas_Dios => {
                generarCaracteristicasHTML(humano.id_usuario, caracteristicas_Dios)
            });
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
            }).then(humanosCreados => {
                humanosCreados.Usuarios.forEach(humano => {
                    server.MostrarUnHumanoVivo(humano.id).then( humanoVivo => {
                        generarHumanoHTML(humanoVivo);
                        server.mostrarCaracteristicas_Dios(humanoVivo.id_usuario).then(caracteristicas_Dios => {
                            generarCaracteristicasHTML(humanoVivo.id_usuario, caracteristicas_Dios)
                        });
                    });
                    
                });
            }) ;
            contenedorMensajeCrear.classList.add('ok');
            mostrarMensaje();
        }
    });


const generarHumanoHTML = (humano) => {
    const html = `<td class="${[humano.id_usuario]}" scope="col">${[humano.id_usuario]}</td>
                <td scope="col"><button type="button" class="btn btn-secondary" data-bs-toggle="modal" 
                data-bs-target="#modalCaracteristicas_${[humano.id_usuario]}">Sus Caracteristicas</button></td>
                <td scope="col">${[humano.destino]}</td>
                <td scope="col">${[humano.donde_murio]}</td>`;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    document.querySelector('.tabla-humanos tbody').append(tr);
}

const generarCaracteristicasHTML = (id_usuario, Caracteristicas_Dios) =>{
    const html = `<div class="modal fade" id="modalCaracteristicas_${[id_usuario]}" tabindex="-1" aria-labelledby="modalCaracteristicasHumano" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5">Caracteristicas y Dios que esta siendo protegido</h1>
                                <button type=" button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div class="modal-body Caracteristicas_Dios">
                                <div class="row">
                                    <div class="col-6">
                                        <h5>Caracteristicas</h5>
                                        <p><b>Sabiduría:</b> ${[Caracteristicas_Dios.caracteristicas[0].valor]}</p>
                                        <p><b>Nobleza:</b> ${[Caracteristicas_Dios.caracteristicas[1].valor]}</p>
                                        <p><b>Virtud:</b> ${[Caracteristicas_Dios.caracteristicas[2].valor]}</p>
                                        <p><b>Maldad:</b> ${[Caracteristicas_Dios.caracteristicas[3].valor]}</p>
                                        <p><b>Audacia:</b> ${[Caracteristicas_Dios.caracteristicas[4].valor]}</p>
                                    </div>
                                    <div class="col-6 Dios">
                                        <h5>Dios protegido</h5>
                                        <p>${[Caracteristicas_Dios.protegido_por]}</p>
                                        <img src="../../assets/img/${[Caracteristicas_Dios.protegido_por]}.png">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    const div = document.createElement('div');
    div.classList.add(`.Caracteristicas_DiosesProtegidos_${[id_usuario]}`);
    div.innerHTML = html;
    document.querySelector('.Caracteristicas_DiosesProtegidos').append(div);
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
