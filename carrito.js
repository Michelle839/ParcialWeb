document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");

  if (orderId) {
    fetchOrderDetails(orderId);
  }

  // Funciones para los botones
  document.getElementById("updateOrder").addEventListener("click", () => {
    alert("Pedido actualizado");
  });

  document.getElementById("confirmOrder").addEventListener("click", () => {
    alert("Pedido confirmado");
  });

  document.getElementById("continueShopping").addEventListener("click", () => {
    window.location.href = "index.html"; // Redirigir de vuelta a la tienda principal
  });
});

// Función para obtener y mostrar los detalles del pedido
function fetchOrderDetails(orderId) {
  fetch(`https://fakestoreapi.com/carts/${orderId}`)
    .then((res) => res.json())
    .then((order) => {
      // Mostrar los detalles del pedido en la interfaz
      document.getElementById("orderId").textContent = orderId;
      document.getElementById("orderDate").textContent = new Date(
        order.date
      ).toLocaleDateString();
      document.getElementById("customerName").textContent = "Jhon Doe"; // Puedes cambiarlo si obtienes el nombre del cliente

      const productsList = document.getElementById("productsList");
      productsList.innerHTML = ""; // Limpiar la tabla antes de llenarla

      let total = 0;
      order.products.forEach(async (product) => {
        const productData = await fetch(
          `https://fakestoreapi.com/products/${product.productId}`
        ).then((res) => res.json());

        const subtotal = product.quantity * productData.price;
        total += subtotal;

        const productRow = document.createElement("tr");
        productRow.innerHTML = `
            <td>${productData.title}</td>
            <td>${product.quantity}</td>
            <td>${productData.price.toFixed(2)}</td>
            <td>${subtotal.toFixed(2)}</td>
          `;
        productsList.appendChild(productRow);
      });

      document.getElementById("totalAmount").textContent = total.toFixed(2);
    })
    .catch((error) =>
      console.error("Error al cargar los detalles del pedido:", error)
    );
  function viewOrder(orderId) {
    window.location.href = `ordenpedido.html?orderId=${orderId}`;
  }
}
