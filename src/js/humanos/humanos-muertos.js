import * as server from './http-proveedores';
const modal = document.querySelector('#modalMostrarHumanoMuertos'),
selectTipo = document.querySelector('.select-tipo-humanosMuertos'),
contenedorFormulario = document.querySelector('.opciones-humanosMuertos')

const initModalHumanosMuertos = () => {
    modal.addEventListener('show.bs.modal', function () {
        resetModal()
        selectTipo.selectedIndex = 0;
        generarTablaPredeterminadaHTML();
    });

    selectTipo.addEventListener('change', (e) => {
        resetModal();
        const tipoMuerte = e.target.value;

        switch (tipoMuerte) {
            case 'Predeterminado':
                generarTablaPredeterminadaHTML();
                break;
            case 'Fecha_muerte_Ascendiente':
                generarTablaAscendienteHTML();
                break;
            case 'Fecha_muerte_Descendiente':
                generarTablaDescendienteHTML();
                break;
        }
    });
}

const resetModal = () => {
    const tbody = document.querySelector('.tabla-humanos-muertos tbody') 
    console.log(tbody.childNodes)
    if(tbody.childNodes.length > 0){
        tbody.innerHTML = "";
    }
}

const generarTablaPredeterminadaHTML = () => {
    console.log('Predeterminado');
    server.mostrarTablaMuertosPredeterminado().then( humanos => {
        humanos.forEach(humano => {
            generarHumanoHTMLMuerto(humano);
        });
    })
}

const generarTablaAscendienteHTML = () => {
    console.log('Ascendiente');
    server.mostrarTablaMuertosAscendiente().then( humanos => {
        humanos.forEach(humano => {
            generarHumanoHTMLMuerto(humano);
        });
    })
}

const generarTablaDescendienteHTML = () => {
    console.log('Descendiente');
    server.mostrarTablaMuertosDescendiente().then( humanos => {
        humanos.forEach(humano => {
            generarHumanoHTMLMuerto(humano);
        });
    })
}

const generarHumanoHTMLMuerto = (humano) => {
    
    // const botonCaracteristicas = <td scope="col"><button type="button" class="btn btn-secondary" data-bs-toggle="modal" 
    // data-bs-target="#modalCaracteristicas_${[humano.id_usuario]}">Sus Caracteristicas</button></td>
    const html = `<td class="Identificador ${[humano.id_usuario]}" scope="col">${[humano.id_usuario]}</td>
                    
                    <td scope="col">${[humano.destino]}</td>
                    <td class="${[humano.donde_murio]}" scope="col">${[humano.donde_murio]}</td>
                    <td class="${[humano.fecha_de_muerte]}" scope="col">${[humano.fecha_de_muerte]}</td>`;

    const tr = document.createElement('tr');
    tr.setAttribute('data-id', humano.id_usuario)
    tr.innerHTML = html;
    // console.log(document.querySelector('table'));
    document.querySelector('.tabla-humanos-muertos tbody').append(tr);
}
export {
    initModalHumanosMuertos
}