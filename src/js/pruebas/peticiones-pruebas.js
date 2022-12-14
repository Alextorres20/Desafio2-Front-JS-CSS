const urlPruebas = 'http://127.0.0.1:8000/api/pruebas/';
const urlAsignarPrueba = 'http://127.0.0.1:8000/api/pruebas/asignarPrueba';
const urlPruebasHumano = 'http://127.0.0.1:8000/api/pruebas/obtenerPruebasHumano';


import { usuario } from "../..";

const insertarPrueba = async(prueba) => {
    const resp = await fetch(urlPruebas, {
        method: 'POST',
        body: JSON.stringify(prueba),
        headers: {
            'Authorization': 'Bearer ' + usuario.token,
            'Content-Type': 'application/json'
        }
    });
    
    return await resp.json();
}


const asignarPruebaHumano = async(idPrueba, idHumano) => {
    const resp = await fetch(urlAsignarPrueba, {
        method: 'POST',
        body: JSON.stringify({"idPrueba": idPrueba ,"idHumano":idHumano}),
        headers: {
            'Authorization': 'Bearer ' + usuario.token,
            'Content-Type': 'application/json'
        }
    });
    
    return await resp.json();
}


const obtenerPruebas = async() => {
    try {
        const data = await fetch(urlPruebas, {
            headers: {
                'Authorization': 'Bearer ' + usuario.token
            }
        });
        if (!data.ok) throw Error('Error');
        const { respuesta } = await data.json();   
        return respuesta;
    } catch (err) {
        throw Error('No se han encontrado resultados');
    }
}


const obtenerPruebasHumano = async(id) => {
    try {
        const data = await fetch(`${[urlPruebasHumano]}/${[id]}`, {
            headers: {
                'Authorization': 'Bearer ' + usuario.token
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
            'Authorization': 'Bearer ' + usuario.token,
            'Content-Type': 'application/json'
        }
    });
    
    return await resp.json();
}


export {
    eliminarPrueba,
    insertarPrueba,
    obtenerPruebas,
    asignarPruebaHumano,
    obtenerPruebasHumano
}