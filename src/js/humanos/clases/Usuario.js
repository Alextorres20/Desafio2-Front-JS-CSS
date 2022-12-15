export class Usuario {
    static fromJSON( usuario ) {
        const usuarioNuevo = new Usuario(usuario);

        return usuarioNuevo;
    }

    constructor( usuario ) {
        this.id = usuario.id;
        this.name = usuario.name;
        this.token = usuario.token;
        this.roles = usuario.roles;
        this.atributos = usuario.atributos;
        this.destino = usuario.destino;
        this.dios = usuario.dios;
        this.creado = new Date();
    }
}