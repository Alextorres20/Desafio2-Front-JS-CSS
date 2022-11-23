const modal = document.querySelector('.modal'),
    selectTipo = document.querySelector('.select-tipo-prueba'),
    opcionesPruebas = document.querySelectorAll('.opciones-prueba .prueba'),
    btnGuardar = document.querySelector('.guardar');


export const initModal = () => {
    modal.addEventListener('hidden.bs.modal', function () {
        resetModal();
    });

    selectTipo.addEventListener('change', (e) => {
        resetModal();
        const tipoPrueba = e.target.value;
        const formulario = document.querySelector('.formulariosPruebas');
        formulario.firstElementChild.remove();
        switch (tipoPrueba) {
            case 'puntual':
                generarPuntualHTML();
                break;
            case 'eleccion':
                generarEleccionHTML();
                break;
        }
        /* const opcionesPrueba = document.querySelector(`.opciones-prueba .${[tipoPrueba]}`);
        opcionesPrueba.classList.add('mostrar'); */
        /* opcionesPrueba.style.height = "400px"; */
    });

    /*  btnGuardar.addEventListener('click', (e) => { */
    /* const descripcionTexto = descripcion.value, */
    /* atributoValor = selectAtributos.options[selectAtributos.selectedIndex].text,
    dificultadValor = dificultad.value,
    destinoValor = destino.value;
    destinoValor = destino.value;
    // -----Validar
    const prueba = new Prueba(descripcionTexto, atributoValor, dificultadValor, destinoValor); */
    /*  }); */
}


const generarPuntualHTML = () => {
    const html = `<div class="prueba puntual">
                    <label for="descripcion">Descripción</label>
                    <textarea class="form-control" name="descripcion"></textarea>
                    <div class="d-flex">
                        <label class="flex-fill" for="selectAtributo">Atributo evaluado</label>
                        <select class="flex-fill form-select select-atributo" name="selectAtributo" aria-label="selectAtributo">
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
    const formulario = document.querySelector('.formulariosPruebas');
    formulario.insertBefore(div.firstElementChild, formulario.firstElementChild);
}


const resetModal = () => {
    opcionesPruebas.forEach(p => p.classList.remove('mostrar'));
    const elementos = document.querySelector('.opciones-prueba').querySelectorAll('textarea, input, select');
    elementos.forEach(e => {
        (e.tagName == 'SELECT') ? e.selectedIndex = 0 : e.value = '';
    });
}
