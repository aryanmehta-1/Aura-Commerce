document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  const product = products.find(p => p.id === productId);

  if (product) {
    // Basic dynamic updates
    document.title = `AURA — ${product.name}`;
    document.querySelector(".product-title").textContent = product.name;
    document.querySelector(".product-brand").textContent = "AURA Originals";
    document.querySelector(".main-img").src = product.image;
    document.querySelector(".main-img").alt = product.name;
    document.querySelector(".stars-lg").textContent = getStarsHTML(product.rating);
    document.querySelector(".review-count").textContent = `${product.rating} (128 reviews)`;
    
    const priceMain = document.querySelector(".price-main");
    const priceOld = document.querySelector(".price-old");
    const priceSave = document.querySelector(".price-save");
    
    priceMain.textContent = `₹${product.price.toLocaleString()}`;
    if (product.originalPrice) {
      priceOld.textContent = `₹${product.originalPrice.toLocaleString()}`;
      const savePercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      priceSave.textContent = `${savePercent}% OFF`;
    } else {
      priceOld.style.display = "none";
      priceSave.style.display = "none";
    }

    // Breadcrumb
    const breadcrumb = document.querySelector(".breadcrumb");
    breadcrumb.innerHTML = `<a href="index.html">Home</a><span>›</span><a href="shop.html">Shop</a><span>›</span>${product.name}`;

    // Add to Cart Logic
    const btnCart = document.querySelector(".btn-cart");
    const qtyInput = document.getElementById("qty");
    const qtyBtns = document.querySelectorAll(".qty-btn");

    qtyBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        let val = parseInt(qtyInput.value);
        if (btn.textContent === "+") val++;
        if (btn.textContent === "−" && val > 1) val--;
        qtyInput.value = val;
      });
    });

    btnCart.addEventListener("click", () => {
      const qty = parseInt(qtyInput.value);
      for (let i = 0; i < qty; i++) {
        addToCart(product.id);
      }
      
      btnCart.textContent = "Added to Cart ✓";
      btnCart.style.background = "var(--accent)";
      setTimeout(() => {
        btnCart.textContent = "Add to Cart →";
        btnCart.style.background = "";
      }, 2000);
    });

    // Wishlist Logic
    const btnWish = document.querySelector(".btn-wish");
    btnWish.addEventListener("click", () => {
      toggleWishlist(product.id);
      updateBtnWishState();
    });

    function updateBtnWishState() {
      const wishlist = JSON.parse(localStorage.getItem("aura_wishlist")) || [];
      if (wishlist.includes(product.id)) {
        btnWish.textContent = "❤️";
        btnWish.style.color = "var(--accent)";
      } else {
        btnWish.textContent = "♡";
        btnWish.style.color = "";
      }
    }
    updateBtnWishState();

  } else {
    document.querySelector(".product-layout").innerHTML = `<div style="text-align:center; padding: 100px; width:100%;"><h2>Product Not Found</h2><p><a href="shop.html">Return to Shop</a></p></div>`;
  }

  // Size buttons
  const sizeBtns = document.querySelectorAll(".size-btn:not(.unavail)");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Color dots
  const colorDots = document.querySelectorAll(".color-dot");
  colorDots.forEach(dot => {
    dot.addEventListener("click", () => {
      colorDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });
});

