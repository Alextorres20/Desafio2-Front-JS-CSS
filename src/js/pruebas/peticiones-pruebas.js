const urlPruebas = 'http://127.0.0.1:8000/api/pruebas/';

import { token } from "../..";

const crearPrueba = async(prueba) => {
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


const obtenerPruebas = async() => {
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


const eliminarPrueba = async(id) => {
    const resp = await fetch(urlPruebas + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
    
    return await resp.json();
}


export {
    eliminarPrueba,
    crearPrueba,
    obtenerPruebas
}