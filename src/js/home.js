import { usuario } from '../index';
import { generarPruebaHtml, agregarHtml } from './asignar-pruebas';
import { obtenerPruebasHumano } from './pruebas/peticiones-pruebas';
const contenendor = document.querySelector('main');

const initHome = async() => {
    if (usuario.roles.includes('dios')) {
        agregarHtml(generarDiosHtml(), contenendor);
    } else {
        const pruebas = await obtenerPruebasHumano(usuario.id);
        agregarHtml(generarHumanosHtml(), contenendor);
        const contenedorPruebas = document.querySelector('.pruebas-asignadas .contenido');
        pruebas.forEach(p => {
            agregarHtml(generarPruebaHtml(p), contenedorPruebas);
        });
    }
}

const generarDiosHtml = () => {
    const html = `<div class="contenedor-principal d-flex">
                    <div class="contenedor humanos flex-fill me-sm-5 mb-4 bg-opacity-50 bg-white">
                        <a href="humanos.html">
                            <i class="fa fa-users" aria-hidden="true"></i>
                            <div class="nombres-iconos">Humanos</div>
                        </a>
                    </div>

                    <div class="contenedor pruebas flex-fill bg-opacity-50 bg-white">
                        <a href="pruebas.html">
                            <i class="fa fa-book" aria-hidden="true"></i>
                            <div class="nombres-iconos">Pruebas</div> 
                        </a>
                    </div>
                </div>`;
    return html;
}


const generarHumanosHtml = () => {
    const html = `<div class="contenedor-principal d-flex">
                    <div class="contenedor flex-fill pruebas-asignadas me-sm-5 mb-4 bg-opacity-50 bg-white">
                        <h5 class="cabecera p-2">Pruebas asignadas</h5>
                        <div class="contenido">
                        </div>
                    </div>
                    <div class="contenedor flex-fill perfil bg-opacity-50 bg-white" href="pruebas.html">
                        <div class="cabecera p-5">
                            <img class="imagen-perfil mb-3 me-3" src="../assets/img/Zeus.png">
                            <h5 class="pt-2 pb-1">${[usuario.name]}</h5>
                            <h4>Destino: ${[usuario.destino]}</h4>
                        </div>
                        <div class="bg-white m-3 p-4 info">
                            <div class="atributos mb-4 pb-4 d-flex flex-wrap">${[generarAtributosHtml(usuario.atributos)]}</div>
                            <div class="dios row">
                                <img class="col-xl-3 col-12 imagen-perfil" src="../assets/img/${[usuario.dios]}.png">
                                <p class="col-xl-9 col-12 ps-xl-3">Estás bajo la protección de <span class="fw-bold">${[usuario.dios]}</span></p>
                            </div>
                        </div>
                    </div>
                </div>`;
    return html;
}


const generarAtributosHtml = (atributos) => {
    let html = '';
    atributos.forEach(a => {
        html += `<span class="atributo flex-fill text-center pt-1 pb-1 ps-2 pe-2 
                    ${[a.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()]}">
                    ${[a.nombre]} <span class="fw-bold">${[a.valor]}</span>
                </span>`;
    });

    return html;
}


initHome();


