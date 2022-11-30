// Import our custom CSS
import '../../styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { initRegistro } from "./registro/componente_registro";
import { initInicioSesion } from "./inicio-sesion/componente_inicioSesion"

initRegistro();
initInicioSesion();
