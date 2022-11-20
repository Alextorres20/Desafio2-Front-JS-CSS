const   selectTipo = document.querySelector('.select-tipo-prueba'),
        opcionesPruebas = document.querySelectorAll('.opciones-prueba .prueba');


export const initModal = () => {
    selectTipo.addEventListener('change', (e) => {
        opcionesPruebas.forEach(p => p.classList.remove('show'))
        const opcionElegida = e.target.options[e.target.selectedIndex].text.toLowerCase();
    });
}
