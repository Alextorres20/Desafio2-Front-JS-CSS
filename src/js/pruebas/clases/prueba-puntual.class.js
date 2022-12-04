export class PruebaPuntual {
    static fromJSON = ( prueba ) => new PruebaPuntual(prueba);

    constructor( prueba ) {
        this.tipo = prueba.tipo;
        this.nombreDios = prueba.nombreDios;
        this.cantidadDestino = prueba.cantidadDestino;
        this.atributo = prueba.atributo;
        this.preguntaDescripcion = prueba.preguntaDescripcion;
        this.dificultad = prueba.dificultad;
        this.fechaCreacion = prueba.fechaCreacion;
    }
}