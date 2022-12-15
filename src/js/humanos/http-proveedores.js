import { usuario } from "../..";

const urlMostrarUnHumanoVivo = 'http://127.0.0.1:8000/api/mostrarHumanoVivo',
    urlMostrarHumanosVivos = 'http://127.0.0.1:8000/api/mostrarHumanosVivos',
    urlCrearHumanoscomoDios = 'http://127.0.0.1:8000/api/crearUsuarios',
    urlMostrarCaracteristicas_Dios = 'http://127.0.0.1:8000/api/mostrarCaracteristicas_Dios',
    urlMatarHumanosAleatorio = 'http://127.0.0.1:8000/api/matarUsuariosAlAzar',
    urlMatarUnHumano = 'http://127.0.0.1:8000/api/matarUsuario',    
    urlmostrarCaracteristicasUsuario = 'http://127.0.0.1:8000/api/mostrarCaracteristicasUsuario',
    urlObtenerHumanosDios = 'http://127.0.0.1:8000/api/obtenerHumanosDios',
    urlObtenerHumanosPrueba = 'http://127.0.0.1:8000/api/obtenerHumanosPrueba',
    urlMostrarMuertosPredeterminado = 'http://127.0.0.1:8000/api/mostrarMuertos',
    urlMostrarMuertosAscendiente = 'http://127.0.0.1:8000/api/mostrarMuertosAscendiente',
    urlMostrarMuertosDescendiente = 'http://127.0.0.1:8000/api/mostrarMuertosDescendiente'; 



//Alejandro
const MostrarUnHumanoVivo = async(id) => {
    const resp = await fetch(`${urlMostrarUnHumanoVivo}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${usuario.token}`
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
            'Authorization' : 'Bearer ' + usuario.token
            
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
            'Authorization' : `Bearer ${usuario.token}`
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
                'Authorization': 'Bearer ' + usuario.token 
            }
        });
        if (!resp.ok) throw Error('Error');
        return await resp.json();
    } catch (err) {
        throw Error('No se han encontrado resultados');
    }
}

//Alicia
const mostrarCaracteristicasUsuario = async(id_usuario)=> {
    try {
        const resp = await fetch(`${urlmostrarCaracteristicasUsuario}/${id_usuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + usuario.token 
            }
        });
        if (!resp.ok) throw Error('Error');
        return await resp.json();
    } catch (err) {
        throw Error('No se han encontrado resultados');
    }
}

//Alicia
const obtenerHumanosDios = async() => {
    try {
        const resp = await fetch(urlObtenerHumanosDios, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + usuario.token }
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
            headers: {'Authorization': 'Bearer ' + usuario.token }
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
            'Authorization' : `Bearer ${usuario.token}`
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
            'Authorization' : `Bearer ${usuario.token}`
        }
    });
    return await resp.json();
}

const mostrarTablaMuertosPredeterminado = async() => {
    const resp = await fetch(urlMostrarMuertosPredeterminado, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${usuario.token}`
        }
    });
    const data = await resp.json();
    return data;
}

const mostrarTablaMuertosAscendiente = async() => {
    const resp = await fetch(urlMostrarMuertosAscendiente, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${usuario.token}`
        }
    });
    const data = await resp.json();
    return data;
}

const mostrarTablaMuertosDescendiente = async() => {
    const resp = await fetch(urlMostrarMuertosDescendiente, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${usuario.token}`
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
    matarAleatorioHumanos,
    mostrarCaracteristicasUsuario,
    obtenerHumanosDios,
    obtenerHumanosPrueba,
    mostrarTablaMuertosPredeterminado,
    mostrarTablaMuertosAscendiente,
    mostrarTablaMuertosDescendiente
}