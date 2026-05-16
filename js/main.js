// --- GLOBAL INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initMood();
  initScrollAnimations();
  updateCartCount(); // From products.js (shared)
});

// --- 1. MOOD SYSTEM PERSISTENCE ---
function initMood() {
  const savedMood = localStorage.getItem("aura_mood");
  if (savedMood) {
    const radio = document.getElementById(savedMood);
    if (radio) radio.checked = true;
  }

  document.querySelectorAll("input[name='mood']").forEach(radio => {
    radio.addEventListener("change", () => {
      localStorage.setItem("aura_mood", radio.id);
    });
  });
}

// --- 2. SCROLL REVEAL ANIMATIONS ---
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
      }
    });
  }, observerOptions);

  // Target common elements for reveal
  const targets = document.querySelectorAll(".product-card, .section-header, .cat-card, .review-card, .legal-content section");
  targets.forEach(el => {
    el.classList.add("reveal-hidden");
    observer.observe(el);
  });
}

// --- 3. WISHLIST SYSTEM ---
function getWishlist() {
  return JSON.parse(localStorage.getItem("aura_wishlist")) || [];
}

function saveWishlist(list) {
  localStorage.setItem("aura_wishlist", JSON.stringify(list));
}

window.toggleWishlist = (productId) => {
  let list = getWishlist();
  const index = list.indexOf(productId);
  
  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(productId);
  }
  
  saveWishlist(list);
  updateWishlistUI();
};

function updateWishlistUI() {
  const list = getWishlist();
  
  // Update heart icons
  document.querySelectorAll(".product-wishlist").forEach(btn => {
    const id = parseInt(btn.dataset.id);
    if (list.includes(id)) {
      btn.textContent = "❤️";
      btn.classList.add("active");
    } else {
      btn.textContent = "♡";
      btn.classList.remove("active");
    }
  });

  // Update navbar wishlist count badge
  const wishlistCountElements = document.querySelectorAll("#wishlistCount");
  wishlistCountElements.forEach(el => {
    el.textContent = list.length;
  });
}

// Sync wishlist on load
document.addEventListener("DOMContentLoaded", updateWishlistUI);

