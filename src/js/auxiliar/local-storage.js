
const guardarToken = (usuario) => window.localStorage.setItem('token', usuario.data.token);

const recuperarToken = (usuario) => {};

export {
    guardarToken,
    recuperarToken
}