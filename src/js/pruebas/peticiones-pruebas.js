const urlPruebas = 'http://127.0.0.1:8000/api/pruebas/';

export const crearPrueba = async(prueba, token) => {
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
