const modal = document.querySelector('.modal'),
    selectTipo = document.querySelector('.select-tipo-prueba'),
    pruebas = document.querySelectorAll('.opciones-prueba .prueba'),
    contenedoresError = document.querySelectorAll('.error'),
    listaValidar = document.querySelectorAll('.validar'),
    formulario = document.querySelector('.formulario-pruebas');


export const initModal = () => {
    modal.addEventListener('show.bs.modal', function () {
        resetModal();
    });

    selectTipo.addEventListener('change', (e) => {
        resetModal();
        const tipoPrueba = e.target.value;
        formulario.firstElementChild.remove();
        switch (tipoPrueba) {
            case 'puntual':
                generarPuntualHTML();
                break;
            case 'eleccion':
                generarEleccionHTML();
                break;
        }
    });
}


const generarPuntualHTML = () => {
    const html = `<div class="prueba puntual">
                    <label for="descripcion">Descripción</label>
                    <textarea class="form-control" name="descripcion"></textarea>
                    <div class="d-flex">
                        <label class="flex-fill" for="atributo">Atributo evaluado</label>
                        <select class="flex-fill form-select select-atributo" name="atributo" aria-label="atributo">
                            <option selected>Audacia</option>
                            <option>Maldad</option>
                            <option>Nobleza</option>
                            <option>Sabiduría</option>
                            <option>Virtud</option>
                        </select>
                    </div>
                    <div class="dificultad validar">
                        <div class="d-flex">
                            <label class="flex-fill" for="dificultad">Porcentaje de dificultad</label>
                            <input class="flex-fill form-control" type="number" name="dificultad" required max="100">
                        </div>
                        <div class="error"></div>
                    </div>

                    <div class="destino validar">
                        <div class="d-flex">
                            <label class="flex-fill" for="destino">Cantidad de destino</label>
                            <input class="flex-fill form-control" type="number" name="destino" required max="100">
                        </div>
                        <div class="error"></div>
                    </div>
                </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
   /*  const contenedorPruebas = document.querySelector('.opciones-prueba');
    contenedorPruebas.classList.add('mostrar'); */
    formulario.insertBefore(div.firstElementChild, formulario.firstElementChild);
}

const generarEleccionHTML = () => {
    const html = `<div class="prueba eleccion">
                    
                </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
   /*  const contenedorPruebas = document.querySelector('.opciones-prueba');
    contenedorPruebas.classList.add('mostrar'); */
    formulario.insertBefore(div.firstElementChild, formulario.firstElementChild);
}


const resetModal = () => {
    listaValidar.forEach(e => e.classList.remove('is-valid', 'is-invalid'));
    contenedoresError.forEach(e => e.innerHTML = '');
    pruebas.forEach(p => p.classList.remove('mostrar'));
    const elementos = document.querySelector('.opciones-prueba').querySelectorAll('textarea, input, select');
    elementos.forEach(e => (e.tagName == 'SELECT') ? e.selectedIndex = 0 : e.value = '');
}
