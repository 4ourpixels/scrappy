// app.js

async function fetchProducts(category) {
  try {
    const response = await fetch(`${category}.json`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching ${category} products:`, error);
    return [];
  }
}

function viewProduct(id) {
  window.location.href = `product.html?id=${id}`;
}
async function displayProducts(category) {
  const products = await fetchProducts(category);
  const productContainer = document.getElementById("product-container");
  let counter = 0;
  products.forEach((product) => {
    counter += 1;

    const productElement = document.createElement("div");
    productElement.classList.add("col-sm-3", "col-md-4");
    productElement.innerHTML = `
    <div class="product">
      <img src="${product.thumbnail}" class="thumbnail" alt="${product.name}' Image">
      <div class="card-body">
        <h4 class="product-name">${product.name}</h4>
        <a onclick="viewProduct(${product.id})" class="view-product">View</a>
      </div>
    </div>
    `;
    productContainer.appendChild(productElement);
    const tableHeading = document.getElementById("tableHeading");
    tableHeading.innerHTML = `We've got over ${counter} ${
      category.charAt(0).toUpperCase() + category.slice(1)
    }`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const categories = ["storage", "chairs", "sofas", "beds", "tables"];
  const categorySelect = document.getElementById("categorySelect");

  // Populate the Bootstrap Select dropdown with categories
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.text = category.charAt(0).toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
  });

  // Display products for the selected category on dropdown change
  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    document.getElementById("product-container").innerHTML = ""; // Clear existing products
    displayProducts(selectedCategory);
  });

  // Display products for the default category on page load
  const defaultCategory = categories[0];
  displayProducts(defaultCategory);
});
