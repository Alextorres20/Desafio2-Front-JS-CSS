import { recuperarToken } from '../auxiliar/local-storage';

const urlMostrarUnHumanoVivo = 'http://127.0.0.1:8000/api/mostrarHumanoVivo';
const urlMostrarHumanosVivos = 'http://127.0.0.1:8000/api/mostrarHumanosVivos';
const urlCrearHumanoscomoDios = 'http://127.0.0.1:8000/api/crearUsuarios';
const urlMostrarCaracteristicas_Dios = 'http://127.0.0.1:8000/api/mostrarCaracteristicas_Dios';
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
    
    console.log(token);
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
    const token = recuperarToken();
    console.log(JSON.stringify(cantidad));
    console.log(cantidad);
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

export {
    MostrarUnHumanoVivo,
    mostrarUsuariosVivos,
    crearHumanos,
    mostrarCaracteristicas_Dios
}