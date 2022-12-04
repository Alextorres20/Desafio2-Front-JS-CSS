import { PruebaPuntual } from "./prueba-puntual.class";

export class ListaPruebas {
    
    constructor() {
        this.cargarLocalStorage();
    }


    nuevaPrueba(prueba) {
        this.pruebas.push(prueba);
        this.guardarLocalStorage();
    }


    borrarPrueba(id) {
        this.pruebas = this.pruebas.filter( prueba => prueba.id != id );
        this.guardarLocalStorage();
    }


    guardarLocalStorage() {
        localStorage.setItem('pruebas', JSON.stringify(this.pruebas));
    }

    cargarLocalStorage() {
        this.pruebas = (localStorage.getItem('pruebas')) 
                        ? JSON.parse(localStorage.getItem('pruebas'))
                        :[];
        
        /* this.pruebas = this.pruebas.map((prueba) => {
            switch(prueba.tipo) {
                case 'puntual':
                    return PruebaPuntual.fromJSON(prueba);
                
                case 'respuesta-libre':
                    return PruebaRespuestaLibre.fromJSON(prueba);
                
                case 'eleccion':
                    return PruebaEleccion.fromJSON(prueba);
                
                case 'valoracion':
                    return PruebaValoracion.fromJSON(prueba);                
            }
        });  */
    }
}