// Función para obtener la información del usuario
async function obtenerUsuario(userId) {
  try {
    const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
    if (response.ok) {
      const usuario = await response.json();
      mostrarNombreUsuario(usuario);
      localStorage.setItem(
        "usuarioNombre",
        `${usuario.name.firstname} ${usuario.name.lastname}`
      );
      // Guardar el usuario completo si es necesario
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      console.error("Error al obtener los datos del usuario.");
    }
  } catch (error) {
    console.error("Error en la solicitud de usuario:", error);
  }
}

// Función para mostrar el nombre del usuario
function mostrarNombreUsuario(usuario) {
  const headerCenter = document.querySelector(".header-center");
  const bienvenida = document.createElement("p");
  bienvenida.textContent = `Bienvenid@: ${usuario.name.firstname} ${usuario.name.lastname}`;
  headerCenter.appendChild(bienvenida); // Agregar el mensaje al encabezado
}

// Función para obtener los carritos de un usuario específico
async function obtenerPedidosDeUsuario(userId) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/carts/user/${userId}`
    );
    if (response.ok) {
      const pedidos = await response.json();
      llenarTablaPedidos(pedidos);
    } else {
      console.error("Error al obtener los pedidos.");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

// Función para llenar la tabla con los pedidos
function llenarTablaPedidos(pedidos) {
  const ordersList = document.getElementById("ordersList");
  ordersList.innerHTML = ""; // Limpiar la tabla antes de llenarla

  pedidos.forEach((pedido, index) => {
    const row = document.createElement("tr");

    // Crear columnas para número, fecha y acciones
    const numero = document.createElement("td");
    numero.textContent = index + 1;

    const fecha = document.createElement("td");
    fecha.textContent = new Date(pedido.date).toLocaleDateString();

    const acciones = document.createElement("td");
    acciones.innerHTML = `<button onclick="verDetalles(${pedido.id})">Ver detalles</button>`;

    // Añadir las columnas a la fila
    row.appendChild(numero);
    row.appendChild(fecha);
    row.appendChild(acciones);

    // Añadir la fila a la tabla
    ordersList.appendChild(row);
  });
}

// Función para ver detalles de un pedido (puedes implementarla como desees)
function verDetalles(pedidoId) {
  localStorage.setItem("pedidoId", pedidoId);
  window.location.href = "./pedidos.html";
}

// Función para redirigir al usuario al index.html
function redirigirAlIndex() {
  window.location.href = "./index.html"; // Redirige a index.html
}

// Agregar eventos de click a la imagen y al texto de "Salir"
const logoutElement = document.getElementById("logout");
logoutElement.addEventListener("click", redirigirAlIndex);

// Llamar a las funciones con el ID del usuario
const userId = 1; // Puedes cambiar este ID si usas otro usuario
obtenerUsuario(userId);
obtenerPedidosDeUsuario(userId);
