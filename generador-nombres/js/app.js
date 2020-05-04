document
  .querySelector("#generar-nombre")
  .addEventListener("submit", cargarNombres);

function cargarNombres(e) {
  e.preventDefault();

  // Leer las variables

  const origen = document.getElementById("origen");
  const origenSeleccionado = origen.options[origen.selectedIndex].value;

  const genero = document.getElementById("genero");
  const generoSeleccionado = genero.options[genero.selectedIndex].value;

  const cantidad = document.getElementById("numero").value;

  // url para que solo traiga los nombres
  let url = "https://randomuser.me/api/?inc=name&";
  if (origenSeleccionado !== "") {
    url += `nat=${origenSeleccionado}&`;
  }
  if (generoSeleccionado !== "") {
    url += `gender=${generoSeleccionado}&`;
  }
  if (cantidad !== "") {
    url += `results=${cantidad}`;
  }
}
