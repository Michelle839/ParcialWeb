// Cargar categorías y productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadProducts();
});

// Función para cargar categorías
function loadCategories() {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((categories) => {
      const categoriesList = document.getElementById("categoriesList");
      categories.forEach((category) => {
        const categoryDiv = document.createElement("button");
        categoryDiv.classList.add("category");
        categoryDiv.textContent = category;
        categoryDiv.addEventListener("click", () =>
          loadProductsByCategory(category)
        );
        categoriesList.appendChild(categoryDiv);
      });
    });
}

// Función para cargar todos los productos
function loadProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      displayProducts(products);
    });
}

// Función para cargar productos por categoría
function loadProductsByCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((products) => {
      displayProducts(products);
    });
}

// Función para mostrar los productos en la página
function displayProducts(products) {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = ""; // Limpiar productos anteriores
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h4>${product.title}</h4>
      <div class="product-price-add">
        <p>$${product.price.toFixed(2)}</p>
        <button>Add</button>
      </div>
    `;
    productsList.appendChild(productDiv);
  });
}

// Función de búsqueda
document.getElementById("searchBtn").addEventListener("click", () => {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
      displayProducts(filteredProducts);
    });
});
// Función para redirigir al usuario al index.html
function redirigirAlIndex() {
  window.location.href = "../index.html"; // Redirige a index.html
}
// Función para redirigir al usuario al carrito.html
function redirigirAlCarrito() {
  window.location.href = "../html/carrito.html"; // Redirige a carrito.html
}

// Agregar eventos de click a la imagen y al texto de "Salir"
const logoutElement = document.getElementById("logout");
logoutElement.addEventListener("click", redirigirAlIndex);

// Agregar eventos de click a la imagen y al texto de "Carrito de compras"
const cartElement = document.querySelector(".cart");
cartElement.addEventListener("click", redirigirAlCarrito);
