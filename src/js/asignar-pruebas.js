import '../styles.scss';
import { obtenerHumanosDios, mostrarCaracteristicasHumano } from './humanos/http-proveedores';
import { obtenerPruebas } from './pruebas/peticiones-pruebas';


const initAsignarPruebas = async () => {
    cargarHumanos();
    cargarPruebas();
    /* obtenerHumanosDios().then(humanos => humanos.map(generarHumanoHtml));
    obtenerPruebas().then(pruebas => pruebas.map(generarPruebaHtml)) */   
}


const cargarHumanos = async() => {
    const humanos = await obtenerHumanosDios();
    humanos.map(generarHumanoHtml);
}


const cargarPruebas = async() => {
    const pruebas = await obtenerPruebas();
    pruebas.map(generarPruebaHtml);
}


const generarPruebaHtml = (prueba) => {
    const tipo = (prueba.tipo.charAt(0).toUpperCase() + prueba.tipo.slice(1)).replaceAll('-', ' ');
    const html = `<div class="prueba mb-2">
                    <div class="row align-items-center">
                        <img class="col-2 imagen-perfil" src="../assets/img/Zeus.png">
                        <div class="col-8 ps-3 datos">
                            <h5 class="destino"><span class="fw-bold">Destino: </span>${[prueba.cantidadDestino]}</h5>
                            <p class="nombre fw-bold">Creador: ${[prueba.nombreDios]}</p>
                        </div>
                        <div class="col-1 align-self-start ms-auto borrar"><i class="fa fa-trash-o" aria-hidden="true"></i></div>
                    </div>

                    <div class="row">
                        <p class="pregunta-desc">${[prueba.preguntaDescripcion]}</p>
                    </div>
                    <div class="row mt-2">
                        <p class="col-2 tipo me-3 pe-2 ps-2 bg-primary text-white">${[tipo]}</p>
                        <p class="col-5 fecha">${[prueba.fechaCreacion]}</p>
                    </div>
                </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('.contenedor.pruebas .card-body').append(div.firstElementChild);
}


const generarHumanoHtml = async (humano) => {
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
        html += `<p><span class="fw-bold">${[(nombre.charAt(0).toUpperCase() + nombre.slice(1)).replaceAll('-', ' ')]}:</span> ${[a.valor]}</p>`;
    });

    return html;
}


initAsignarPruebas();