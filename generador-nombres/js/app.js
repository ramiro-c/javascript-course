const formulario = document.querySelector("#generar-nombre");

formulario.addEventListener("submit", cargarNombres);

function cargarNombres(e) {
  e.preventDefault();

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
  console.log(url);
  // Conectar con ajax
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (this.status === 200) {
      const respuesta = JSON.parse(this.responseText);
      const personas = respuesta.results;

      let htmlNombres = "<h2>Nombres Generados</h2>";
      htmlNombres += '<ul class="lista">';
      personas.map((persona) => {
        const nombre = persona.name.first;
        htmlNombres += `<li>${nombre}</li>`;
      });
      htmlNombres += "</ul>";

      document.getElementById("resultado").innerHTML = htmlNombres;
    }
  };
  xhr.send();
}
