document.addEventListener("DOMContentLoaded", () => {
  // Navigation scroll effect
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.style.background = "rgba(0, 0, 0, 0.8)";
      nav.style.backdropFilter = "blur(10px)";
    } else {
      nav.style.background = "transparent";
      nav.style.backdropFilter = "none";
    }
  });

  // Add to Cart for trending products
  document.querySelectorAll(".quick-add").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      if (productId) {
        addToCart(productId);
        
        // Visual feedback
        const originalText = e.target.textContent;
        e.target.textContent = "Added! ✓";
        setTimeout(() => {
          e.target.textContent = originalText;
        }, 1500);
      }
    });
  });
});

