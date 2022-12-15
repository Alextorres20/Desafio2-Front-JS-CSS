
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
            let datos = ""
                    if(humanosMuertos.Cantidad_Campo_Eliseos > 0){
                        datos += 'La cantidad de humanos que han caido a Campo de Eliseos son: ' + humanosMuertos.Cantidad_Campo_Eliseos + '<br>'
                    }
                    else{
                        datos += 'Ningun humano ha podido alcanzar al Campo de Eliseos, que los Dioses le tengan piedad <br>'
                    }
                    if(humanosMuertos.Cantidad_Tartaros > 0){
                        datos += 'La cantidad de humanos que han caido a Tartaros son: ' + humanosMuertos.Cantidad_Tartaros + '<br>'
                    }  
                    else{
                        datos += 'Santo bendito sea Dios, ningun humano ha ido a Tartaros. Sera que no les apetece jugar con Cerberos <br>'
                    }

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
                    let datos = "";
                    if(humanosMuertos.mens.includes('Campo Eliseos')){
                        datos += "El humano ha ido Campo de Eliseos, que descanse en Paz. <br>" 
                    }
                    else{
                        datos += "El humano ha ido a Tartaros, no pasa nada, tienes a Cerberos de compañia. <br>"
                    }
                    mostrarMensajeMatar(datos, mensajeModal);
                });
            });
        }
    });

}



const mostrarMensajeMatar = (datos , mensaje ) => {
    if(mensaje.classList.contains('error')){
        mensaje.innerHTML = datos;
        mensaje.classList.add('alert', 'alert-danger');
    }
    else{
        mensaje.innerHTML = datos;
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



export {
    matarHumanos,
    eliminarUnaColumna,
    mostrarMensajeMatar
}