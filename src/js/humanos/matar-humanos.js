
import { Modal } from 'bootstrap'
import * as server from './http-proveedores';
const botonMatarAleatorio = document.querySelector('.matarAleatorio'),
    botonMatarHumanosSeleccionados = document.querySelector('#confirmarMatarHumanos'),

    mensajeModal = document.querySelector('.mensajeMatar'),
    mensaje = document.querySelector('.respuesta-mensaje'),
    tablaHumanoID = document.getElementsByClassName('Identificador'),
    tablasHumanosVivo = document.getElementsByClassName('Vivo');
    

    
    
const matarHumanos = () => {
    

    botonMatarAleatorio.addEventListener("click", (event) => {
        server.matarAleatorioHumanos().then( humanosMuertos => {
            const datos = humanosMuertos;
            eliminarColumnas(humanosMuertos);
            mensaje.classList.add('ok')
            mostrarMensajeMatar(datos, mensaje);
        });
        
    }); 

    botonMatarHumanosSeleccionados.addEventListener("click", (event) => {
        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        const humanosSeleccionados = [].filter.call( checkboxes, function( humanos ) {
            return humanos.checked;
        })

        if(humanosSeleccionados.length == 0){
            mensajeModal.classList.add('error');
            const datos = 'No has seleccionado a ningun humano para que perezca';
            mostrarMensajeMatar(datos,mensajeModal);
        }
        else{
            humanosSeleccionados.forEach(humanoSeleccionado => {
                const humano_ID = humanoSeleccionado.parentNode.parentNode.getAttribute("data-id");
                server.matarUnHumano({
                    id_usuario: humano_ID
                }).then( humanosMuertos => {
                    eliminarUnaColumna(humano_ID);
                    mensajeModal.classList.add('ok')
                    const datos = humanosMuertos;
                    mostrarMensajeMatar(datos, mensajeModal);
                });
            });
        }
    });


    
    

    // modal.addEventListener('show.bs.modal', function () {
    //     resetModal();
    //     initValidarInputs();
    // });

    // selectTipo.addEventListener('change', (e) => {
    //     resetModal();
    //     const tipoPrueba = e.target.value;

    //     switch (tipoPrueba) {
    //         case 'uno':
    //             generarUnHumanoMatarHTML();
    //             break;
    //         case 'varios':
    //             generarHumanoAleatorioMatarHTML();
    //             break;
    //     }
    //     initValidarInputs();
    // });
}


// const generarUnHumanoMatarHTML = () => {
//     const opcionesHumanoVivo = [];
//     const html_1 = `<div class="Humano Matar">
//                     <h5>Selecciona a un humano al que deseas matar</h5>
//                     <select class="col-12 col-sm-9 form-select select-matar-UnHumano" name="select-humano" aria-label="selectTipoMatar">
//                         <option value="ninguno">Selecciona un humano a que deseas matar:</option>`
//                         ;
//     for (let i = 0; i < tablasHumanosVivo.length; i++) {
//         opcionesHumanoVivo.push(`<option value="${[tablaHumanoID[i].classList[1]]}">${[tablaHumanoID[i].classList[1]]}</option>`); 
//         ;     
//     }
//     let html_2 = ``;
//     opcionesHumanoVivo.forEach(opcion => {
//         html_2 = html_2 + opcion;
//     })


//     const html_3 = `</select>
//                     </div>`;

    
//     const html_definitivo = html_1 + html_2 + html_3;
//     const div = document.createElement('div');
//     div.innerHTML = html_definitivo;
//     contenedorFormulario.append(div.firstElementChild);

//     const selectHumano = document.querySelector('.select-matar-UnHumano');
    
//     selectHumano.addEventListener('change', (e) => {
//         const humano_ID = e.target.value;

//         switch (humano_ID) {
//             case 'ninguno':
//                 break;
//             default:
//                 generarMatarHumanoHTML(humano_ID);
                
//                 break;
//         }
//     });
// }

// const generarMatarHumanoHTML = (humano_ID) => {
//     const html_Existe = document.querySelector('.Boton.matarUnHumano');
//     if(html_Existe == null){
//         const html = `
//             <div class="Boton matarUnHumano">
//                 <div class="col-12"> 
//                     <button type="button" class="btn btn-warning" id="matarUnHumano">Matar</button>
//                 </div>
//                 <div class="col-12">
//                     <div class="mensajeMatarManual tipo"></div>
//                 </div>
//             </div>`;
                
//         const div = document.createElement('div');
//         div.innerHTML = html;
//         contenedorFormulario.append(div.firstElementChild);
//     }
    
//     const botonMatarUnHumano = document.getElementById('matarUnHumano');
//     botonMatarUnHumano.addEventListener("click", (event) => {
//         server.matarUnHumano({
//             id_usuario: humano_ID
//         }).then( humanosMuertos => {
//             eliminarUnaColumna(humano_ID);
//             contenedorFormulario.classList.add('ok')
//             const contenedorMensajeMatar = document.querySelector('.mensajeMatarManual.tipo');
//             mostrarMensajeMatar(humanosMuertos, contenedorMensajeMatar);
//         });
        
//     });
// }

const generarHumanoAleatorioMatarHTML = () => {
    const html = `<div class="Humano Aleatorio Matar">
                    <div class="col-12">
                        <p>Este metodo lanzará un proceso que matará a cualquier usuario de forma aleatoria</p> 
                        <button type="button" class="btn btn-primary" id="matarAleatorioHumanos">Matar</button>
                    </div>
                    <div class="col-12">
                        <div class="mensajeMatarAleatorio tipo"></div>
                    </div>
                </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    contenedorFormulario.append(div.firstElementChild);


    const botonMatarAleatorio = document.getElementById('matarAleatorioHumanos');
    const contenedorMensajeMatar = document.querySelector('.mensajeMatarAleatorio.tipo');
    botonMatarAleatorio.addEventListener("click", (event) => {
        server.matarAleatorioHumanos().then( humanosMuertos => {
            eliminarColumnas(humanosMuertos);
            contenedorFormulario.classList.add('ok')
            mostrarMensajeMatar(humanosMuertos, contenedorMensajeMatar);
        });
        
    }); 
}



const mostrarMensajeMatar = (datos , mensaje ) => {
    if(mensaje.classList.contains('error')){
        mensaje.innerHTML = datos;
        mensaje.classList.add('alert', 'alert-danger');
    }
    else{
        mensaje.innerHTML = JSON.stringify(datos);
        mensaje.classList.add('alert', 'alert-success');
    }
    desaparecerMensaje();
}
const eliminarUnaColumna = (humano_ID) => {
    const fila = document.querySelector(`[data-id="${[humano_ID]}"]`);
    fila.remove();
}

const eliminarColumnas = (humanosMuertos) => {
    humanosMuertos.Humano_Campo_Eliseos.forEach(humano_campo_eliseo => {
        const fila = document.querySelector(`[data-id="${[humano_campo_eliseo.id_usuario]}"]`);
        fila.remove();
    });

    humanosMuertos.Humano_Tartaros.forEach(humano_tartaro => {
        const fila = document.querySelector(`[data-id="${[humano_tartaro.id_usuario]}"]`);
        fila.remove();
    });

}

const desaparecerMensaje = () => {
    const botonesCerrar = document.querySelectorAll('.btn-close');
    botonesCerrar.forEach(botonCerrar => {
        botonCerrar.addEventListener("click", (event) => {
            if(mensajeModal.hasChildNodes|| mensaje.hasChildNodes){
                mensajeModal.className = 'mensajeMatar tipo';
                mensajeModal.innerHTML = ""
                mensaje.className = 'respuesta-mensaje';
                mensaje.innerHTML = "";
            }
        })
    });
}

// const resetModal = () => {
//     formulario.classList.remove('was-validated');
//     contenedorFormulario.innerHTML = '';
//     listaValidar.forEach(e => e.classList.remove('is-valid', 'is-invalid'));
//     contenedoresError.forEach(e => e.innerHTML = '');
//     /* pruebas.forEach(p => p.classList.remove('mostrar')); */
//     const elementos = document.querySelector('.opciones-matar').querySelectorAll('textarea, input, select');
//     elementos.forEach(e => (e.tagName == 'SELECT') ? e.selectedIndex = 0 : e.value = '');
// }


export {
    matarHumanos,
    eliminarUnaColumna,
    mostrarMensajeMatar
}