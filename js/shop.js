let currentCategory = "All";
let currentSort = "featured";
let maxPrice = 10000;
let minRating = 0;
let searchQuery = "";

const productsGrid = document.getElementById("productsGrid");
const categoryFilters = document.getElementById("categoryFilters");
const sortSelect = document.getElementById("sortSelect");
const priceRange = document.getElementById("priceRange");
const priceVal = document.getElementById("priceVal");
const ratingFilters = document.getElementById("ratingFilters");
const resultCount = document.getElementById("resultCount");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Parse URL for search or category
  const urlParams = new URLSearchParams(window.location.search);
  searchQuery = urlParams.get("q") || "";
  const catParam = urlParams.get("category");
  if (catParam) {
    currentCategory = catParam;
    // Update the visual selection in the sidebar
    categoryFilters.querySelectorAll(".filter-tag").forEach(tag => {
      tag.classList.remove("active");
      if (tag.dataset.category === currentCategory) {
        tag.classList.add("active");
      }
    });
  }

  renderProducts();

  // Category Filter
  categoryFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-tag")) {
      categoryFilters.querySelectorAll(".filter-tag").forEach(tag => tag.classList.remove("active"));
      e.target.classList.add("active");
      currentCategory = e.target.dataset.category;
      searchQuery = ""; // Clear search when filtering by category
      renderProducts();
    }
  });

  // Sort
  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  // Price Filter
  priceRange.addEventListener("input", (e) => {
    maxPrice = parseInt(e.target.value);
    priceVal.textContent = `₹${maxPrice.toLocaleString()}`;
    renderProducts();
  });

  // Rating Filter
  ratingFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-tag")) {
      const isAlreadyActive = e.target.classList.contains("active");
      ratingFilters.querySelectorAll(".filter-tag").forEach(tag => tag.classList.remove("active"));
      
      if (isAlreadyActive) {
        minRating = 0;
      } else {
        e.target.classList.add("active");
        minRating = parseFloat(e.target.dataset.rating);
      }
      renderProducts();
    }
  });

  // Delegation for buttons
  productsGrid.addEventListener("click", (e) => {
    // Add to Cart
    if (e.target.classList.contains("quick-add")) {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
      
      const originalText = e.target.textContent;
      e.target.textContent = "Added! ✓";
      e.target.style.background = "var(--accent)";
      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.background = "";
      }, 1500);
    }

    // Wishlist
    if (e.target.classList.contains("product-wishlist")) {
      const productId = parseInt(e.target.dataset.id);
      toggleWishlist(productId);
    }
  });
});

function renderProducts() {
  let filtered = products.filter(p => {
    const matchCategory = currentCategory === "All" || p.category === currentCategory;
    const matchPrice = p.price <= maxPrice;
    const matchRating = p.rating >= minRating;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchPrice && matchRating && matchSearch;
  });

  // Sorting
  if (currentSort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  productsGrid.innerHTML = "";
  
  if (filtered.length === 0) {
    productsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text2);">No products found matching your criteria.</div>`;
    resultCount.textContent = "Showing 0 products";
    return;
  }

  const wishlist = JSON.parse(localStorage.getItem("aura_wishlist")) || [];

  filtered.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${index * 0.05}s`;
    
    const badgeHTML = p.badge ? `<span class="product-badge">${p.badge}</span>` : "";
    const priceHTML = p.originalPrice 
      ? `<s>₹${p.originalPrice.toLocaleString()}</s> ₹${p.price.toLocaleString()}` 
      : `₹${p.price.toLocaleString()}`;
    
    const isWishlisted = wishlist.includes(p.id);

    card.innerHTML = `
      <div class="product-img">
        <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
        ${badgeHTML}
        <div class="product-wishlist ${isWishlisted ? 'active' : ''}" data-id="${p.id}">
          ${isWishlisted ? '❤️' : '♡'}
        </div>
        <div class="quick-add" data-id="${p.id}">＋ Add to Cart</div>
      </div>
      <div class="stars">${getStarsHTML(p.rating)}</div>
      <div class="product-cat">${p.category}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">${priceHTML}</div>
    `;
    productsGrid.appendChild(card);
  });

  resultCount.textContent = `Showing ${filtered.length} products`;
  
  // Re-run animation initialization if needed (though IntersectionObserver in main.js handles it)
}

