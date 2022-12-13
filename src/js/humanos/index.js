// Import our custom CSS
import '../../styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Imports JavaScript

import { initModal } from './menu-humanos';
import { matarHumanos } from './matar-humanos';
import { initModalHumanosMuertos } from './humanos-muertos';

initModal();

matarHumanos()

initModalHumanosMuertos();



