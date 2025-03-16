let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    const listaAmigos = document.getElementById("listaAmigos");

    if (nombre === "") {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }

    amigos.push(nombre);
    
    // Crear elemento de lista
    const li = document.createElement("li");
    li.textContent = nombre;
    listaAmigos.appendChild(li);

    // Limpiar el input
    input.value = "";
}

function sortearAmigo() {
    const resultado = document.getElementById("resultado");

    if (amigos.length === 0) {
        resultado.innerHTML = "<p style='color: red;'>Debe agregar al menos un amigo.</p>";
        return;
    }

    // Seleccionar un nombre al azar
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio];

    // Mostrar el resultado con mensaje personalizado
    resultado.innerHTML = `<p style="font-size: 22px; font-weight: bold; color: white; background-color: purple; padding: 10px; border-radius: 10px; text-align: center;">🎉 El amigo secreto sorteado es: <span style="color: #FFD700;">${amigoSorteado}</span> 🎉</p>`;
}