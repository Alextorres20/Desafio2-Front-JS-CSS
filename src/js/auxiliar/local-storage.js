import { Usuario } from "../humanos/clases/Usuario";


const guardarUsuario = (usuario) => window.localStorage.setItem('usuario', usuario);

const recuperarUsuario = () => Usuario.fromJSON(JSON.parse(localStorage.getItem('usuario')));
    

export {
    guardarUsuario,
    recuperarUsuario
}