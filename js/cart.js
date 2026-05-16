const cartItemsContainer = document.getElementById("cartItems");
const itemCountEl = document.getElementById("itemCount");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const discountEl = document.getElementById("discount");
const couponInput = document.getElementById("couponInput");
const applyCouponBtn = document.querySelector(".coupon-btn");

let discount = 0;

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  applyCouponBtn.addEventListener("click", () => {
    const code = couponInput.value.trim().toUpperCase();
    if (code === "AURA10") {
      const subtotal = calculateSubtotal();
      discount = Math.floor(subtotal * 0.1);
      discountEl.textContent = `-₹${discount.toLocaleString()}`;
      renderCart(); // Re-render to update final total
      alert("Coupon applied! 10% discount added.");
    } else {
      alert("Invalid coupon code.");
    }
  });

  document.querySelector(".checkout-btn").addEventListener("click", () => {
    if (getCart().length > 0) {
      window.location.href = "checkout.html";
    } else {
      alert("Your cart is empty!");
    }
  });
});

function renderCart() {
  const cart = getCart();
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Start adding some aura to your collection.</p>
        <a href="shop.html">Continue Shopping</a>
      </div>
    `;
    updateTotals(0);
    return;
  }

  cart.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.style.animationDelay = `${index * 0.1}s`;
    
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-img">
      <div class="item-details">
        <div class="item-brand">AURA ORIGINAL</div>
        <h3 class="item-name">${item.name}</h3>
        <div class="item-meta">Category: ${item.category} | SKU: ${item.id}00${index}</div>
        <div class="item-qty">
          <button class="qty-btn" onclick="updateQtyByUid(${item.uid}, -1)">−</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="updateQtyByUid(${item.uid}, 1)">+</button>
        </div>
      </div>
      <div class="item-actions">
        <div class="item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
        <button class="item-remove" onclick="removeItemByUid(${item.uid})">Remove Item —</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  const subtotal = calculateSubtotal();
  updateTotals(subtotal);
}

function calculateSubtotal() {
  const cart = getCart();
  return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
}

function updateTotals(subtotal) {
  const cart = getCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  itemCountEl.textContent = totalItems;
  subtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
  
  if (discount > 0) {
     discount = Math.floor(subtotal * 0.1);
     discountEl.textContent = `-₹${discount.toLocaleString()}`;
  }

  const finalTotal = subtotal - discount;
  totalEl.textContent = `₹${finalTotal.toLocaleString()}`;
}

window.updateQtyByUid = (uid, delta) => {
  let cart = getCart();
  const item = cart.find(i => i.uid === uid);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.uid !== uid);
    }
    saveCart(cart);
    renderCart();
  }
};

window.removeItemByUid = (uid) => {
  let cart = getCart();
  cart = cart.filter(i => i.uid !== uid);
  saveCart(cart);
  renderCart();
};

