const urlPruebas = 'http://127.0.0.1:8000/api/pruebas/';

const crearPrueba = async(prueba, token) => {
    const resp = await fetch(urlPruebas, {
        method: 'POST',
        body: JSON.stringify(prueba),
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
    
    return await resp.json();
}


const getPruebas = async(token) => {
    try {
        const data = await fetch(urlPruebas, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!data.ok) throw Error('Error');
        const { respuesta } = await data.json();   
        return respuesta;
    } catch (err) {
        throw Error('No se han encontrado resultados');
    }
}


export {
    crearPrueba,
    getPruebas
}