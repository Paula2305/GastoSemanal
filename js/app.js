// Variables y selectores 

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
// const formulario = document.querySelector('#agregar-gasto');

// Eventos 

eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}

// Clases

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

class UI {

}

const ui = new UI();

let presupuesto ;

// Funciones 

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto?');
    // console.log(presupuestoUsuario);

    // Si el prompt esta vacio/no se carga el campo/es una letra y se apreta aceptar/cancelar, se vuelve a recargar la pagina 
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }

    // Presupuesto valido 
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);
}



