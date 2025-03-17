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

  // Agregar el nombre al arreglo y a la lista visual
  amigos.push(nombre);
  const li = document.createElement("li");
  li.textContent = nombre;
  listaAmigos.appendChild(li);

  // Limpiar el campo de texto y mantener el foco
  input.value = "";
  input.focus();
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

  // Eliminar el <li> correspondiente de la lista visual usando "children" en lugar de "childNodes"
  listaAmigosElement.removeChild(listaAmigosElement.children[indiceAleatorio]);
}
