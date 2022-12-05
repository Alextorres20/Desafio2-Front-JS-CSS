// Import our custom CSS
import './styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { recuperarToken } from './js/auxiliar/local-storage'


export const token = recuperarToken();