import { token } from "../..";

const urlMostrarUnHumanoVivo = 'http://127.0.0.1:8000/api/mostrarHumanoVivo',
    urlMostrarHumanosVivos = 'http://127.0.0.1:8000/api/mostrarHumanosVivos',
    urlCrearHumanoscomoDios = 'http://127.0.0.1:8000/api/crearUsuarios',
    urlMostrarCaracteristicas_Dios = 'http://127.0.0.1:8000/api/mostrarCaracteristicas_Dios',
    urlMatarHumanosAleatorio = 'http://127.0.0.1:8000/api/matarUsuariosAlAzar',
    urlMatarUnHumano = 'http://127.0.0.1:8000/api/matarUsuario',    
    urlMostrarCaracteristicasHumano = 'http://127.0.0.1:8000/api/mostrarCaracteristicasHumano',
    urlObtenerHumanosDios = 'http://127.0.0.1:8000/api/obtenerHumanosDios',
    urlObtenerHumanosPrueba = 'http://127.0.0.1:8000/api/obtenerHumanosPrueba'; 


//Alejandro
const MostrarUnHumanoVivo = async(id) => {
    const resp = await fetch(`${urlMostrarUnHumanoVivo}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    return await resp.json();
}

//Alejandro
const mostrarUsuariosVivos = async() => {
    const resp = await fetch(urlMostrarHumanosVivos, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
            
        }
    });
    return await resp.json();
}

//Alejandro
const crearHumanos = async(cantidad)=> {
    const resp = await fetch(urlCrearHumanoscomoDios, {
        method: 'POST',
        body: JSON.stringify(cantidad),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    return await resp.json();
}

//Alejandro
const mostrarCaracteristicas_Dios = async(id_usuario)=> {
    try {
        const resp = await fetch(`${urlMostrarCaracteristicas_Dios}/${id_usuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            }
        });
        if (!resp.ok) throw Error('Error');
        return await resp.json();
    } catch (err) {
        throw Error('No se han encontrado resultados');
    }
}

//Alicia
const mostrarCaracteristicasHumano = async(id_usuario)=> {
    try {
        const resp = await fetch(`${urlMostrarCaracteristicasHumano}/${id_usuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            }
        });
        if (!resp.ok) throw Error('Error');
        const { caracteristicas } = await resp.json();
        return caracteristicas;
    } catch (err) {
        throw Error('No se han encontrado resultados');
    }
}

//Alicia
const obtenerHumanosDios = async() => {
    try {
        const resp = await fetch(urlObtenerHumanosDios, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token }
        });
        if (!resp.ok) throw Error('Error');
        return await resp.json();
    } catch (err) {
        throw Error('No se han encontrado resultados');
    }
}


//Alicia
const obtenerHumanosPrueba = async(idPrueba) => {
    try {
        const resp = await fetch(`${urlObtenerHumanosPrueba}/${idPrueba}`, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + token }
        });
        if (!resp.ok) throw Error('Error');
        return await resp.json();
    } catch (err) {
        throw Error('No se han encontrado resultados');
    }
}

//Alejandro
const matarAleatorioHumanos = async() => {
    const resp = await fetch(urlMatarHumanosAleatorio, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    return await resp.json();
}


//Alejandro
const matarUnHumano = async(id_usuario) => {
    
    const resp = await fetch(urlMatarUnHumano, {
        method: 'PUT',
        body: JSON.stringify(id_usuario),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    return await resp.json();
}

export {
    MostrarUnHumanoVivo,
    mostrarUsuariosVivos,
    crearHumanos,
    mostrarCaracteristicas_Dios,
    matarUnHumano,
    matarAleatorioHumanos,
    mostrarCaracteristicasHumano,
    obtenerHumanosDios,
    obtenerHumanosPrueba
}