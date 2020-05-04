// Variables
const presupuestoSemanal = prompt("Cual es tu presupuesto Semanal?");
const formulario = document.getElementById("agregar-gasto");
let cantidadPresupuesto;

class Presupuesto {
  constructor(cantidad) {
    this.presupuesto = Number(cantidad);
    this.restante = Number(cantidad);
  }
  // todo para ir restando del presupuesto actual
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
}

class UI {
  insertarPresupuesto(cantidad) {
    const presupuestoSpan = document.querySelector("span#total");
    const restanteSpan = document.querySelector("span#restante");

    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }

  imprimirMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");

    divMensaje.classList.add("text-center", "alert");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.appendChild(document.createTextNode(mensaje));
    // insertar en el DOM
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    // eliminar el alert despues de 3 segundos
    setTimeout(function () {
      document.querySelector(".primario .alert").remove();
      formulario.reset();
    }, 3000);
  }
  // inserta los gastos a la lista
  agregarGastoListado(nombre, cantidad) {
    const gastosListado = document.querySelector("#gastos ul");
    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      ${nombre}
      <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
    `;

    gastosListado.appendChild(li);
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  if (presupuestoSemanal <= 0 || presupuestoSemanal === "") {
    // window.location.reload();
  }
  const presupuesto = new Presupuesto(presupuestoSemanal);
  const ui = new UI();
  ui.insertarPresupuesto(presupuesto.presupuesto);
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombreGasto = document.getElementById("gasto").value;
  const cantidadGasto = document.getElementById("cantidad").value;

  const ui = new UI();

  // comprobar que los campos no esten vacios
  if (nombreGasto === "" || cantidadGasto === "") {
    ui.imprimirMensaje("Los dos campos son obligatorios", "error");
  } else {
    ui.imprimirMensaje("Gasto insertado con exito", "exito");
    ui.agregarGastoListado(nombreGasto, cantidadGasto);
  }
});
