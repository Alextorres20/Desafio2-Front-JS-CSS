const urlPruebas = 'http://127.0.0.1:8000/api/pruebas/';

export const crearPrueba = async(prueba) => {
    console.log(JSON.stringify(prueba))
    const resp = await fetch(urlPruebas, {
        method: 'POST',
        body: JSON.stringify(prueba),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    console.log(await resp.json());
}
