import { recuperarToken } from '../auxiliar/local-storage';

const urlMostrarHumanosVivos = 'http://127.0.0.1:8000/api/mostrarHumanosVivos';
const urlCrearHumanoscomoDios = 'http://127.0.0.1:8000/api/crearUsuarios';

const mostrarUsuariosVivos = async() => {
    const token = recuperarToken();
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

export {
    mostrarUsuariosVivos,
    crearHumanos
}