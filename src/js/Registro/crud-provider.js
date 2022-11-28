const urlCrud = 'http://127.0.0.1:8000/api/registrar';

const crearUsuario = async(usuario) => {
    console.log(JSON.stringify(usuario));
    const resp = await fetch(urlCrud, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await resp.json();
}

export{
    crearUsuario
}