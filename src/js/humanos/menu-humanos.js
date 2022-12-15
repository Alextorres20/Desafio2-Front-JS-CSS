import * as server from './http-proveedores';
import { eliminarUnaColumna, mostrarMensajeMatar } from './matar-humanos';

const botonCrearHumanos = document.getElementById('crearHumanos');

const contenedorMensajeCrear = document.querySelector('.mensajeCantidad.tipo'); 
const cantidadCrear = document.getElementById('cantidadCrear');

const mensaje = document.querySelector('.respuesta-mensaje');

const initModal = () => {
    mostrarHumanos();
    desaparecerMensaje();
}

const mostrarHumanos = () => {
    server.mostrarUsuariosVivos().then(humanos => {
        humanos.forEach(humano => {
            generarHumanoHTML(humano);
            server.mostrarCaracteristicas_Dios(humano.id_usuario).then(caracteristicas_Dios => {
                generarCaracteristicasHTML(humano.id_usuario, caracteristicas_Dios)
            });
        });
        matarUnHumano_basura();
    });
}        
    botonCrearHumanos.addEventListener('click', (event) => {
        if(!cantidadCrear.validity.valid || cantidadCrear.value <= 0 || cantidadCrear.value > 100 ){
            contenedorMensajeCrear.classList.add('error');
            mostrarMensaje()
        }
        else{
            server.crearHumanos({
                cantidad: cantidadCrear.value
            }).then(humanosCreados => {
                humanosCreados.Usuarios.forEach(humano => {
                    server.MostrarUnHumanoVivo(humano.id).then( humanoVivo => {
                        generarHumanoHTML(humanoVivo);
                        server.mostrarCaracteristicas_Dios(humanoVivo.id_usuario).then(caracteristicas_Dios => {
                            generarCaracteristicasHTML(humanoVivo.id_usuario, caracteristicas_Dios)
                        });
                        matarUnHumano_basura();  
                    });
                });
            });
            contenedorMensajeCrear.classList.add('ok');
            mostrarMensaje();
        }
    });


const generarHumanoHTML = (humano) => {
                
    const html = `<td class="Identificador ${[humano.id_usuario]}" scope="col-2">${[humano.id_usuario]}</td>
                    <td scope="col-4"><button type="button" class="btn btn-secondary" data-bs-toggle="modal" 
                    data-bs-target="#modalCaracteristicas_${[humano.id_usuario]}">Sus Caracteristicas</button></td>
                    <td scope="col-2">${[humano.destino]}</td>
                    <td class="col-2 ${[humano.donde_murio]}" scope="col">${[humano.donde_murio]}</td>
                    <td scope="col-2"><i class="fa fa-trash eliminarHumano" aria-hidden="true"></i><input class="checkboxes" type="checkbox"></td>`;

    const tr = document.createElement('tr');
    tr.setAttribute('data-id', humano.id_usuario)
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

const desaparecerMensaje = () => {
    const botonesCerrar = document.querySelectorAll('.btn-close');
    botonesCerrar.forEach(botonCerrar => {
        botonCerrar.addEventListener("click", (event) => {
            if(mensaje.hasChildNodes|| contenedorMensajeCrear.hasChildNodes){
                mensaje.className = 'mensajeMatar tipo';
                mensaje.innerHTML = ""
                contenedorMensajeCrear.className = 'mensajeCantidad tipo';
                contenedorMensajeCrear.innerHTML = "";
            }
        })
    });
}

const matarUnHumano_basura = async() => {
    const iconos_basura = document.querySelectorAll('i.fa.fa-trash.eliminarHumano');
    iconos_basura.forEach( icono_basura => {
        const humano_ID = icono_basura.parentNode.parentNode.getAttribute("data-id");
        icono_basura.addEventListener("click", (event) => {
            server.matarUnHumano({
                id_usuario: humano_ID
            }).then( humanosMuertos => {
                eliminarUnaColumna(humano_ID);
                mensaje.classList.add('ok')
                let datos = "";
                if(humanosMuertos.mens.includes('Campo Eliseos')){
                    datos += "El humano ha ido Campo de Eliseos, que descanse en Paz. <br>" 
                }
                else{
                    datos += "El humano ha ido a Tartaros, no pasa nada, tienes a Cerberos de compañia. <br>"
                }
                mostrarMensajeMatar(datos, mensaje);
            });
        });
        
    });
}
export{
    initModal
}