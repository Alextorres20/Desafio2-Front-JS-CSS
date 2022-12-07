import { recuperarToken } from '../auxiliar/local-storage';

const urlMostrarUnHumanoVivo = 'http://127.0.0.1:8000/api/mostrarHumanoVivo',
    urlMostrarHumanosVivos = 'http://127.0.0.1:8000/api/mostrarHumanosVivos',
    urlCrearHumanoscomoDios = 'http://127.0.0.1:8000/api/crearUsuarios',
    urlMostrarCaracteristicas_Dios = 'http://127.0.0.1:8000/api/mostrarCaracteristicas_Dios',
    urlMatarHumanosAleatorio = 'http://127.0.0.1:8000/api/matarUsuariosAlAzar',
    urlMatarUnHumano = 'http://127.0.0.1:8000/api/matarUsuario';

const token = recuperarToken();
const MostrarUnHumanoVivo = async(id) => {
    const resp = await fetch(`${urlMostrarUnHumanoVivo}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    const data = await resp.json();
    return data;
}
const mostrarUsuariosVivos = async() => {
    const resp = await fetch(urlMostrarHumanosVivos, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
            
        }
    });
    const data = await resp.json();
    return data;
}

const crearHumanos = async(cantidad)=> {
    const resp = await fetch(urlCrearHumanoscomoDios, {
        method: 'POST',
        body: JSON.stringify(cantidad),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    const data = await resp.json();
    return data;
}

const mostrarCaracteristicas_Dios = async(id_usuario)=> {
    const resp = await fetch(`${urlMostrarCaracteristicas_Dios}/${id_usuario}`);
    const data = await resp.json();
    return data;
}

const matarAleatorioHumanos = async() => {
    
    const resp = await fetch(urlMatarHumanosAleatorio, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    const data = await resp.json();
    return data;
}

const matarUnHumano = async(id_usuario) => {
    
    const resp = await fetch(urlMatarUnHumano, {
        method: 'PUT',
        body: JSON.stringify(id_usuario),
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    const data = await resp.json();
    return data;
}

export {
    MostrarUnHumanoVivo,
    mostrarUsuariosVivos,
    crearHumanos,
    mostrarCaracteristicas_Dios,
    matarUnHumano,
    matarAleatorioHumanos
}