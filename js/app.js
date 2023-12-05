// Variables y selectores 

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
// const formulario = document.querySelector('#agregar-gasto');

// Eventos 

eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}

// Clases

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce( (total, gasto) => total +  parseFloat(gasto.cantidad),0) 
        this.restante = this.presupuesto - gastado;
        console.log(this.restante)
    }
}

class UI {
    insertarPresupuesto(cantidad){
        // Extrayendo los valores
        const {presupuesto, restante} = cantidad;

        // Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
    imprimirAlerta(mensaje,tipo){
        
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success')
        }

        // mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el html
        document.querySelector('.primario').insertBefore(divMensaje,formulario);

        // quitar del HTML
        setTimeout(() => {
            divMensaje.remove();
        },3000)
    };

    agregarGastoListado(gastos){
        this.limpiarHTML();

        gastos.forEach(gasto => {
            const {cantidad, nombre, id} = gasto;
            

            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            // nuevoGasto.setAttribute('data-id', id); // version antigua de cambiar un atributo en html
            nuevoGasto.dataset.id = id; // version nueva en html5

            // Agregar el html del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;

            // Boton borrar gasto

            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times'
            nuevoGasto.appendChild(btnBorrar);

            // Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        })
    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;
    }
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

    ui.insertarPresupuesto(presupuesto);
}


// Añade gastos

function agregarGasto(e){
    e.preventDefault();

    // Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    // Validar
    if(nombre === '' || cantidad === '' ){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }else if( cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida', 'error');
        return;
    }

    // Opuesto a destructuring - Es un object literal, crea un objeto con las propiedades
    const gasto = {nombre, cantidad, id: Date.now()};

    // Añadir un nuevo gasto
    presupuesto.nuevoGasto(gasto);

    ui.imprimirAlerta('Gasto agregado correctamente')

    // Mostrar gastos
    const {gastos, restante} = presupuesto
    ui.agregarGastoListado(gastos)
    
    ui.actualizarRestante(restante);

    // Reinicia el formulario
    formulario.reset()
}


