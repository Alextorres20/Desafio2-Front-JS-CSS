
/*
    Realizar cambios para mi pagina de Humanos
*/

// const modal = document.querySelector('.modal'),
//     selectTipo = document.querySelector('.select-tipo-matar'),
//     contenedorFormulario = document.querySelector('.opciones-matar'),
//     contenedoresError = document.querySelectorAll('.error'),
//     listaValidar = document.querySelectorAll('.validar');

// const initModal = () => {
//     modal.addEventListener('show.bs.modal', function () {
//         resetModal();
//         selectTipo.selectedIndex = 0;
//         generarPuntualHTML(generarFormularioHTML());
//         initValidacion();
//     });

//     selectTipo.addEventListener('change', (e) => {
//         resetModal();
//         const formulario = generarFormularioHTML();
//         const tipoPrueba = e.target.value;

//         switch (tipoPrueba) {
//             case 'puntual':
//                 generarPuntualHTML(formulario);
//                 break;
//             case 'respuesta-libre':
//                 generarRespuestaLibreHTML(formulario);
//                 break;
//         }
//         initValidacion();
//     });
// }