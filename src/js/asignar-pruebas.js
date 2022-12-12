import '../styles.scss';
import { obtenerHumanosDios, mostrarCaracteristicasHumano } from './humanos/http-proveedores';
import { obtenerPruebas, asignarPruebaHumano } from './pruebas/peticiones-pruebas';


const initAsignarPruebas = async() => {
    await Promise.all([cargarHumanos(), cargarPruebas()])
    agregarDraggable();
    agregarEventosDrop();

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
    const html = `<div class="prueba mt-2" data-id="${[prueba.id]}">
                    <div class="d-flex align-items-center">
                        <img class="imagen-perfil" src="../assets/img/Zeus.png" draggable="false">
                        <div class="ps-3 datos">
                            <h5 class="destino"><span class="fw-bold">Destino: </span>${[prueba.cantidadDestino]}</h5>
                            <p class="nombre fw-bold">Creador: ${[prueba.nombreDios]}</p>
                        </div>
                        <div class="align-self-start ms-auto borrar"></div>
                    </div>

                    <p class="pregunta-desc">${[prueba.preguntaDescripcion]}</p>

                    <div class="d-flex mt-2">
                        <div class="me-2 pe-2 ps-2 humanos bg-primary text-white" data-bs-toggle="collapse" data-bs-target="#p${[prueba.id]}" aria-expanded="true" aria-controls="p${[prueba.id]}">
                            <i class="fa fa-caret-down me-1" aria-hidden="true"></i>
                            Humanos
                        </div>
                        <p class="tipo">${[tipo]}</p>
                        <p class="fecha ms-auto">${[prueba.fechaCreacion]}</p>
                    </div>

                    <div id="p${[prueba.id]}" class="accordion-collapse collapse humanos-contenedor"></div>
                </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector('.contenedor.pruebas .card-body').append(div.firstElementChild);
}


const generarHumanoHtml = async (humano) => {
    const atributos = await mostrarCaracteristicasHumano(humano.id_usuario);
    const html = `<div class="humano mt-2" draggable="true" data-id="${[humano.id_usuario]}">
                    <img class="imagen-perfil" src="../assets/img/Zeus.png" draggable="false">
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


const agregarDraggable = () => {
    const humanos = document.querySelectorAll('.contenedor.humanos .card-body');
    humanos.forEach(h => {
        h.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-id'));
        });
    });
}


const agregarEventosDrop = () => {
    const pruebas = document.querySelectorAll('.contenedor.pruebas .prueba');
    pruebas.forEach(p => {
        p.addEventListener('dragenter', dragEnter);
        p.addEventListener('dragover', dragOver);
        p.addEventListener('drop', drop);
        p.addEventListener('dragleave', dragLeave);
    });
}

const drop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.currentTarget.classList.remove('destino');

    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.querySelector(`[data-id="${[id]}"]`);
    if (comprobarDrop(id, e.currentTarget)) {
        const clon = draggable.cloneNode(true);
        clon.setAttribute('draggable', false);
        e.currentTarget.querySelector('.humanos-contenedor').append(clon);
        asignarPruebaHumano(e.currentTarget.getAttribute('data-id'), id).then(
            respuesta => console.log(respuesta)
        );
    }
}


const comprobarDrop = (idDraggable, destino) => {
    const humanos = destino.querySelector('.humanos-contenedor').childNodes;
    const duplicado = Array.from(humanos).find(h => h.getAttribute('data-id') == idDraggable);
    if (duplicado) return false;
    else return true;
}


const dragEnter = (e) => {
    e.preventDefault();
    e.target.closest('.prueba').classList.add('destino');
}

const dragOver = (e) => {
    e.preventDefault();
    e.target.closest('.prueba').classList.add('destino');
}

const dragLeave = (e) => {
    e.preventDefault();
    e.target.closest('.prueba').classList.remove('destino');
}


initAsignarPruebas();