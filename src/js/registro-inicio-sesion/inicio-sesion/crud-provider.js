const urlCrud = 'http://127.0.0.1:8000/api/iniciarSesion';

const iniciarSesion = async(usuario) => {
    const resp = await fetch(urlCrud, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await resp.json();
}

// const eresDios = async(auth) => {

// }

export{
    iniciarSesion
}