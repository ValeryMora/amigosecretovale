document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const input = document.getElementById("amigo");
  const btnAgregar = document.getElementById("btnAgregar");
  const btnSortear = document.getElementById("btnSortear");
  const btnReset = document.getElementById("btnReset");
  const listaAmigos = document.getElementById("listaAmigos");
  const resultado = document.getElementById("resultado");

  let amigos = [];

  // Cargar amigos desde localStorage (si existen)
  if (localStorage.getItem("amigos")) {
    amigos = JSON.parse(localStorage.getItem("amigos"));
    amigos.forEach(nombre => {
      agregarElementoLista(nombre);
    });
  }

  // Actualiza localStorage
  function actualizarLocalStorage() {
    localStorage.setItem("amigos", JSON.stringify(amigos));
  }

  // Agrega un elemento <li> con el nombre y botón eliminar
  function agregarElementoLista(nombre) {
    const li = document.createElement("li");
    li.textContent = nombre;
    li.setAttribute("data-nombre", nombre);

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarAmigo(nombre, li);
    });

    li.appendChild(btnEliminar);
    listaAmigos.appendChild(li);
  }

  // Función para eliminar un amigo manualmente
  function eliminarAmigo(nombre, li) {
    const index = amigos.indexOf(nombre);
    if (index !== -1) {
      amigos.splice(index, 1);
      actualizarLocalStorage();
    }
    li.remove();
  }

  // Función para agregar amigo
  function agregarAmigo() {
    const nombre = input.value.trim();
    if (nombre === "") {
      resultado.innerHTML = "<p style='color: red;'>Por favor, ingrese un nombre válido.</p>";
      return;
    }
    if (amigos.includes(nombre)) {
      resultado.innerHTML = "<p style='color: red;'>Este nombre ya ha sido agregado.</p>";
      return;
    }
    amigos.push(nombre);
    agregarElementoLista(nombre);
    actualizarLocalStorage();
    input.value = "";
    input.focus();
    resultado.innerHTML = ""; // Limpiar mensajes previos
  }

  // Función para sortear un amigo
  function sortearAmigo() {
    if (amigos.length === 0) {
      resultado.innerHTML = "<p style='color: red;'>No quedan amigos por sortear. Por favor, agrega más nombres.</p>";
      return;
    }
    // Mostrar mensaje de "Sorteando..." con animación
    resultado.innerHTML = `<p style="font-size: 22px; font-weight: bold; color: white; background-color: purple; padding: 10px; border-radius: 10px; text-align: center;">Sorteando...</p>`;
    
    setTimeout(() => {
      const indiceAleatorio = Math.floor(Math.random() * amigos.length);
      const amigoSorteado = amigos[indiceAleatorio];
      resultado.innerHTML = `<p style="font-size: 22px; font-weight: bold; color: white; background-color: purple; padding: 10px; border-radius: 10px; text-align: center;">
        🎉 El amigo secreto sorteado es: <span style="color: #FFD700;">${amigoSorteado}</span> 🎉
      </p>`;
      // Eliminar el amigo sorteado del arreglo y la lista
      amigos.splice(indiceAleatorio, 1);
      actualizarLocalStorage();
      const items = listaAmigos.getElementsByTagName("li");
      for (let item of items) {
        if (item.getAttribute("data-nombre") === amigoSorteado) {
          item.remove();
          break;
        }
      }
    }, 1000);
  }

  // Función para resetear la lista
  function resetearLista() {
    amigos = [];
    actualizarLocalStorage();
    listaAmigos.innerHTML = "";
    resultado.innerHTML = "<p style='color: red;'>La lista ha sido reseteada.</p>";
  }

  // Asignar event listeners a los botones
  btnAgregar.addEventListener("click", agregarAmigo);
  btnSortear.addEventListener("click", sortearAmigo);
  btnReset.addEventListener("click", resetearLista);

  // Permitir agregar con la tecla Enter
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      agregarAmigo();
    }
  });
});
