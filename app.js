// Arreglo para almacenar los nombres de los amigos
let amigos = [];

/**
 * Función para agregar un amigo a la lista.
 * Valida que el nombre no esté vacío ni duplicado.
 */
function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();
  const listaAmigos = document.getElementById("listaAmigos");

  // Validación: campo vacío
  if (nombre === "") {
    alert("Por favor, ingrese un nombre válido.");
    return;
  }

  // Validación: evitar duplicados
  if (amigos.includes(nombre)) {
    alert("Este nombre ya ha sido agregado.");
    return;
  }

  // Agregar el nombre al arreglo
  amigos.push(nombre);

  // Crear el elemento de lista y asignar un atributo data para identificarlo
  const li = document.createElement("li");
  li.textContent = nombre;
  li.setAttribute("data-nombre", nombre);

  // Crear el botón para eliminar manualmente
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.className = "btn-eliminar";
  btnEliminar.onclick = function() {
    eliminarAmigo(nombre, li);
  };

  // Agregar el botón al elemento li y luego el li a la lista visual
  li.appendChild(btnEliminar);
  listaAmigos.appendChild(li);

  // Limpiar el campo de texto y mantener el foco
  input.value = "";
  input.focus();
}

/**
 * Función para eliminar un amigo manualmente.
 */
function eliminarAmigo(nombre, li) {
  // Eliminar el nombre del arreglo
  const index = amigos.indexOf(nombre);
  if (index !== -1) {
    amigos.splice(index, 1);
  }
  // Eliminar el elemento li de la lista
  li.remove();
}

/**
 * Función para sortear el amigo secreto.
 * Selecciona un nombre al azar, muestra el mensaje y elimina el nombre sorteado.
 */
function sortearAmigo() {
  const resultado = document.getElementById("resultado");
  const listaAmigosElement = document.getElementById("listaAmigos");

  // Validación: debe haber al menos un amigo
  if (amigos.length === 0) {
    resultado.innerHTML = "<p style='color: red;'>No quedan amigos por sortear. Por favor, agrega más nombres.</p>";
    return;
  }

  // Seleccionar aleatoriamente un amigo
  const indiceAleatorio = Math.floor(Math.random() * amigos.length);
  const amigoSorteado = amigos[indiceAleatorio];

  // Mostrar el resultado con un mensaje personalizado
  resultado.innerHTML = `<p style="font-size: 22px; font-weight: bold; color: white; background-color: purple; padding: 10px; border-radius: 10px; text-align: center;">
    🎉 El amigo secreto sorteado es: <span style="color: #FFD700;">${amigoSorteado}</span> 🎉
  </p>`;

  // Eliminar el nombre sorteado del arreglo
  amigos.splice(indiceAleatorio, 1);

  // Eliminar el <li> correspondiente de la lista visual usando el atributo data-nombre
  for (let li of listaAmigosElement.children) {
    if (li.getAttribute("data-nombre") === amigoSorteado) {
      li.remove();
      break;
    }
  }
}
