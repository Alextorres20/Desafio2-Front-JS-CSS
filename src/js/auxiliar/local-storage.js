
const guardarToken = (usuario) => window.localStorage.setItem('token', usuario.data.token);

const recuperarToken = () => localStorage.getItem('token');

export {
    guardarToken,
    recuperarToken
}