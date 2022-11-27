const generarPruebaHtml = (prueba, tipo) => {
    console.log(prueba);
    const html = `<td class="${[tipo]}" scope="col">Prueba ${[tipo]}</td>
                <td scope="col">${[prueba.cantidad_destino]}</td>
                <td scope="col">${[prueba.fecha_creacion]}</td>
                <td scope="col">Editar</td>
                <td scope="col">Borrar</td>`;

    const tr = document.createElement('tr');
    tr.innerHTML = html;
    document.querySelector('.tabla-pruebas tbody').append(tr);
}

export {
    generarPruebaHtml
}