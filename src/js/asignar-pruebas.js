import '../styles.scss';
import { obtenerHumanosDios, mostrarCaracteristicasHumano } from './humanos/http-proveedores';


const initAsignarPruebas = () => {
    cargarHumanos();
    cargarPruebas();
}


const cargarHumanos = async() => {
    const humanos = await obtenerHumanosDios();
    humanos.map(generarHumanoHtml);
}


const generarHumanoHtml = async(humano) => {
    const atributos = await mostrarCaracteristicasHumano(humano.id_usuario);
    const html = `<div class="humano mb-2">
                    <img class="imagen-perfil" src="../assets/img/Zeus.png">
                    <div class="datos">
                        <h5 class="nombre fw-bold">${[humano.user.name]}</h5>
                        <p class="destino"><span class="fw-bold">Destino: </span>${[humano.destino]}</p>
                    </div>
                    <div class="atributos">${[generarAtributosHtml(atributos)]}</div>
                    <div class="borrar"></div>
                </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('.contenedor.humanos .card-body').append(div.firstElementChild);
}


const generarAtributosHtml = (atributos) => { 
    let html = '';
    atributos.forEach(a => {
        let nombre = a.caracteristica.nombre;
        html += `<p><span class="fw-bold">${[ (nombre.charAt(0).toUpperCase() + nombre.slice(1)).replaceAll('-', ' ')]}:</span> ${[a.valor]}</p>`;
    });

    return html;
}

const cargarPruebas = () => {

}


initAsignarPruebas();