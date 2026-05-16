const wishlistGrid = document.getElementById("wishlistGrid");

document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();

  // Delegation for buttons
  wishlistGrid.addEventListener("click", (e) => {
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

    // Toggle Wishlist (Remove from wishlist page)
    if (e.target.classList.contains("product-wishlist")) {
      const productId = parseInt(e.target.dataset.id);
      toggleWishlist(productId);
      renderWishlist(); // Re-render to show it's removed
    }
  });
});

function renderWishlist() {
  const wishlistIds = JSON.parse(localStorage.getItem("aura_wishlist")) || [];
  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  wishlistGrid.innerHTML = "";

  if (wishlistedProducts.length === 0) {
    wishlistGrid.innerHTML = `
      <div class="empty-wishlist" style="grid-column: 1/-1;">
        <h2>Your wishlist is empty</h2>
        <p style="color:var(--text2); margin-bottom:30px;">Go explore our collections and find something you love.</p>
        <a href="shop.html" class="btn-shop">Explore Shop</a>
      </div>
    `;
    return;
  }

  wishlistedProducts.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card reveal-active"; // Use reveal-active to show immediately
    card.style.animationDelay = `${index * 0.1}s`;
    
    const badgeHTML = p.badge ? `<span class="product-badge">${p.badge}</span>` : "";
    const priceHTML = p.originalPrice 
      ? `<s>₹${p.originalPrice.toLocaleString()}</s> ₹${p.price.toLocaleString()}` 
      : `₹${p.price.toLocaleString()}`;

    card.innerHTML = `
      <div class="product-img">
        <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a>
        ${badgeHTML}
        <div class="product-wishlist active" data-id="${p.id}">❤️</div>
        <div class="quick-add" data-id="${p.id}">＋ Add to Cart</div>
      </div>
      <div class="stars">${getStarsHTML(p.rating)}</div>
      <div class="product-cat">${p.category}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">${priceHTML}</div>
    `;
    wishlistGrid.appendChild(card);
  });
}



