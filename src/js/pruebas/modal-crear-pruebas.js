import { initValidarInputs } from "../auxiliar/validacion";
import { Modal } from 'bootstrap'


const modal = document.querySelector('.modal'),
    selectTipo = document.querySelector('.select-tipo-prueba'),
    contenedorFormulario = document.querySelector('.opciones-prueba'),
    contenedoresError = document.querySelectorAll('.error'),
    listaValidar = document.querySelectorAll('.validar'),
    formulario = document.querySelector('.formulario-pruebas');

const initModal = () => {
    modal.addEventListener('show.bs.modal', function () {
        resetModal();
        selectTipo.selectedIndex = 0;
        generarPuntualHTML();
        initValidarInputs();
    });

    selectTipo.addEventListener('change', (e) => {
        resetModal();
        const tipoPrueba = e.target.value;

        switch (tipoPrueba) {
            case 'puntual':
                generarPuntualHTML();
                break;
            case 'respuesta-libre':
                generarRespuestaLibreHTML();
                break;
        }
        initValidarInputs();
    });
}


const generarPuntualHTML = () => {
    const html = `<div class="prueba puntual">
                    <div class="descripcion">
                        <div class="row">
                            <label for="descripcion">Descripción</label>
                            <textarea class="form-control validar" name="descripcion" required maxLength="255"></textarea>
                        </div>
                        <div class="error"></div>
                    </div>
                    <div class="row">
                        <label class="col-12 col-sm-5" for="atributo">Atributo evaluado</label>
                        <select class="col-12 col-sm-7 form-select select-atributo" name="atributo"
                            aria-label="atributo">
                            <option selected>Audacia</option>
                            <option>Maldad</option>
                            <option>Nobleza</option>
                            <option>Sabiduría</option>
                            <option>Virtud</option>
                        </select>
                    </div>
                    <div class="dificultad">
                        <div class="row">
                            <label class="col-12 col-sm-5" for="dificultad">Porcentaje de dificultad</label>
                            <input class="col-12 col-sm-7 validar form-control" type="number"
                                name="dificultad" required min="1" max="100">
                        </div>
                        <div class="error"></div>
                    </div>

                    <div class="destino">
                        <div class="row">
                            <label class="col-12 col-sm-5" for="destino">Cantidad de destino</label>
                            <input class="col-12 col-sm-7 validar form-control" type="number" name="destino"
                                required min="1" max="100">
                        </div>
                        <div class="error"></div>
                    </div>
                </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    contenedorFormulario.append(div.firstElementChild);
}


const generarRespuestaLibreHTML = () => {
    const html = `<div class="prueba respuesta-libre">
                    <div class="pregunta">
                        <div class="row">
                            <label class="col-12 col-sm-5" for="pregunta">Pregunta</label>
                            <input class="col-12 col-sm-7 validar form-control" type="text" name="pregunta" required>
                        </div>
                        <div class="error"></div>
                    </div>
                    
                    <div class="palabras-clave">
                        <div class="row">
                            <label class="col-12 col-sm-5" for="palabras_clave">Palabras clave</label>
                            <textarea class="col-12 col-sm-7 validar form-control" name="palabras_clave" required></textarea>
                        </div>
                        <div class="error"></div>
                        <span class="info">Introduce las palabras clave separadas por una coma</span>
                    </div>

                    <div class="destino">
                        <div class="row">
                            <label class="col-12 col-sm-5" for="destino">Cantidad de destino</label>
                            <input class="col-12 col-sm-7 validar form-control" type="number" name="destino" required min="1" max="100">
                        </div>
                        <div class="error"></div>
                    </div>

                    <div class="porcentaje">
                        <div class="row">
                            <label class="col-12 col-sm-5" for="porcentaje">Porcentaje necesario</label>
                            <input class="col-12 col-sm-7 validar form-control" type="number" name="porcentaje" required min="1" max="100">
                        </div>
                        <div class="error"></div>
                    </div>
                </div>`;

    const div = document.createElement('div');
    div.innerHTML = html;
    contenedorFormulario.append(div.firstElementChild);
}


const cerrarModal = () => {
    let myModal = new Modal(modal);
    myModal.hide();
    const elementos = [modal, document.querySelector('.modal-backdrop')];
    elementos.forEach(e => {
        e.style.display = 'none'
        e.classList.add('hide');
        e.classList.remove('show');
    });
}


const resetModal = () => {
    formulario.classList.remove('was-validated');
    contenedorFormulario.innerHTML = '';
    listaValidar.forEach(e => e.classList.remove('is-valid', 'is-invalid'));
    contenedoresError.forEach(e => e.innerHTML = '');
    /* pruebas.forEach(p => p.classList.remove('mostrar')); */
    const elementos = document.querySelector('.opciones-prueba').querySelectorAll('textarea, input, select');
    elementos.forEach(e => (e.tagName == 'SELECT') ? e.selectedIndex = 0 : e.value = '');
}


export {
    initModal,
    cerrarModal
}