// Import our custom CSS
import '../../styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Imports JavaScript
import { initModal } from './modal-crear-pruebas';
import { initvalidarFormularioPruebas } from '../auxiliar/validacion'; 
import { initListaPruebas } from './crud_pruebas';


initModal();
initListaPruebas();
initvalidarFormularioPruebas();



