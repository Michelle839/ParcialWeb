// Obtener el nombre del usuario almacenado en localStorage
const usuarioNombre = localStorage.getItem("usuarioNombre");
const nombreUsuarioElemento = document.getElementById("usuarioNombre");
nombreUsuarioElemento.textContent = `Bienvenid@: ${usuarioNombre}`;

// Obtener el ID del pedido almacenado en localStorage
const pedidoId = localStorage.getItem("pedidoId");
obtenerDetallesDelPedido(pedidoId);

// Función para obtener los detalles del pedido
async function obtenerDetallesDelPedido(pedidoId) {
  try {
    const response = await fetch(`https://fakestoreapi.com/carts/${pedidoId}`);
    if (response.ok) {
      const pedido = await response.json();
      mostrarDetallesDelPedido(pedido);
      await llenarTablaProductos(pedido.products); // Llamar a la función para llenar la tabla de productos
    } else {
      console.error("Error al obtener los detalles del pedido.");
    }
  } catch (error) {
    console.error("Error en la solicitud de detalles del pedido:", error);
  }
}

// Función para mostrar los detalles del pedido en el HTML
function mostrarDetallesDelPedido(pedido) {
  const orderDateElement = document.getElementById("orderDate");
  const orderIdElement = document.getElementById("orderId");
  const customerNameElement = document.getElementById("customerName");

  // Mostrar la fecha del pedido
  orderDateElement.textContent = new Date().toLocaleDateString(); // Ajusta la fecha según la respuesta
  orderIdElement.textContent = pedidoId; // ID del pedido
  customerNameElement.textContent = usuarioNombre; // Nombre del cliente
}

// Función para llenar la tabla de productos
async function llenarTablaProductos(productos) {
  const productsList = document.getElementById("listaProductos");
  productsList.innerHTML = ""; // Limpiar la tabla antes de llenarla

  let totalAmount = 0; // Variable para el total

  // Obtener detalles de cada producto
  for (const producto of productos) {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${producto.productId}`
      );
      if (response.ok) {
        const productoDetalles = await response.json();

        // Crear una fila en la tabla
        const row = document.createElement("tr");

        // Crear columnas para nombre, cantidad y precio
        const concepto = document.createElement("td");
        concepto.textContent = productoDetalles.title; // Título del producto

        const cantidad = document.createElement("td");
        cantidad.textContent = producto.quantity; // Cantidad del producto en el pedido

        const valor = document.createElement("td");
        valor.textContent = `$${productoDetalles.price.toFixed(2)}`; // Valor del producto

        const subtotal = document.createElement("td");
        const subtotalValue = productoDetalles.price * producto.quantity; // Subtotal
        subtotal.textContent = `$${subtotalValue.toFixed(2)}`; // Formatear subtotal

        // Sumar al total
        totalAmount += subtotalValue;

        // Añadir las columnas a la fila
        row.appendChild(concepto);
        row.appendChild(cantidad);
        row.appendChild(valor);
        row.appendChild(subtotal);

        // Añadir la fila a la tabla
        productsList.appendChild(row);
      } else {
        console.error("Error al obtener detalles del producto.");
      }
    } catch (error) {
      console.error("Error en la solicitud de detalles del producto:", error);
    }
  }

  // Mostrar el total en la interfaz
  document.getElementById("totalAmount").textContent = `$${totalAmount.toFixed(
    2
  )}`;
}

// Función para redirigir al usuario al index.html
function redirigirAlIndex() {
  window.location.href = "../index.html"; // Redirige a index.html
}

// Función para redirigir al usuario al carrito.html
function redirigirAlCarrito() {
  window.location.href = "../html/carrito.html"; // Redirige a carrito.html
}

// Función para redirigir al shop.html al continuar comprando
function continuarComprando() {
  window.location.href = "../html/shop.html"; // Redirige a shop.html
}

// Función para mostrar un alert al actualizar
function actualizarPedido() {
  alert("El pedido ha sido actualizado.");
}
function confirmar() {
  alert("El pedido ha sido confirmado.");
}

// Agregar eventos de click a la imagen y al texto de "Salir"
const logoutElement = document.getElementById("logout");
logoutElement.addEventListener("click", redirigirAlIndex);

// Agregar eventos de click a la imagen y al texto de "Carrito de compras"
const cartElement = document.querySelector(".cart");
cartElement.addEventListener("click", redirigirAlCarrito);

// Agregar eventos de click a los botones
document
  .getElementById("actualizar")
  .addEventListener("click", actualizarPedido);
document.getElementById("confirmar").addEventListener("click", confirmar);
document
  .getElementById("continuarComprando")
  .addEventListener("click", continuarComprando);
