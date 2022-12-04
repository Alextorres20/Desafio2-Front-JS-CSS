// Import our custom CSS
import '../../styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Imports JavaScript
import { initModal } from './modal-crear-pruebas';
import { ListaPruebas } from './clases/lista-pruebas.class';
import { generarPruebaHtml } from './crud_pruebas';
import { initvalidarFormularioPruebas } from '../auxiliar/validacion'; 
/* 
localStorage.clear();
console.log(localStorage) */

export const listaPruebas = new ListaPruebas();
listaPruebas.pruebas.forEach(generarPruebaHtml);

initModal();
initvalidarFormularioPruebas();



