const generarPruebaHtml = (prueba) => {
    const tipo = (prueba.tipo.charAt(0).toUpperCase() + prueba.tipo.slice(1)).replaceAll('-', ' ');
    const html = `<td class="${[prueba.tipo]}" scope="col">${[tipo]}</td>
                  <td scope="col">${[prueba.nombreDios]}</td>
                  <td scope="col">${[prueba.preguntaDescripcion]}</td>
                  <td scope="col">${[prueba.cantidadDestino]}</td>
                  <td scope="col" colspan="2">${[prueba.fechaCreacion]}</td>
                  <td scope="col">
                    <span><i class="fa fa-pencil" aria-hidden="true"></i></span>
                    <span><i class="fa fa-trash" aria-hidden="true"></i></span>
                  </td>`;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    document.querySelector('.tabla-pruebas tbody').append(tr);
}


const mostrarRespuestaCreacion = (respuesta) => {
    const contenedor = document.querySelector('.crud-pruebas .respuesta-creacion');
    if (respuesta.estado == 'ok') {
        contenedor.innerHTML = 'La prueba se ha creado con éxito';
        contenedor.classList.add('alert', 'alert-success');
    } else {
        contenedor.innerHTML = 'Error al crear la prueba';
        contenedor.classList.add('alert', 'alert-danger');
    }
}


export {
    generarPruebaHtml,
    mostrarRespuestaCreacion
}