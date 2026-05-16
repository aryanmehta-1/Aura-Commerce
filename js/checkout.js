document.addEventListener("DOMContentLoaded", () => {
  const steps = {
    shipping: document.getElementById("step1"),
    payment: document.getElementById("step2"),
    review: document.getElementById("step3"),
    success: document.getElementById("step-success")
  };

  const indicators = {
    step2: document.getElementById("step2-indicator"),
    line2: document.getElementById("line2-indicator"),
    step3: document.getElementById("step3-indicator"),
    line3: document.getElementById("line3-indicator")
  };

  const orderItemsContainer = document.getElementById("orderItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  // Initial Render
  renderOrderSummary();

  // Navigation: To Payment
  document.getElementById("toPayment").addEventListener("click", () => {
    if (validateShipping()) {
      showStep("payment");
      indicators.step2.classList.add("active");
      indicators.line2.classList.add("active");
    }
  });

  // Navigation: Back to Shipping
  document.getElementById("backToShipping").addEventListener("click", () => {
    showStep("shipping");
    indicators.step2.classList.remove("active");
    indicators.line2.classList.remove("active");
  });

  // Navigation: To Review
  document.getElementById("toReview").addEventListener("click", () => {
    showStep("review");
    indicators.step3.classList.add("active");
    indicators.line3.classList.add("active");
    populateReview();
  });

  // Navigation: Back to Payment
  document.getElementById("backToPayment").addEventListener("click", () => {
    showStep("payment");
    indicators.step3.classList.remove("active");
    indicators.line3.classList.remove("active");
  });

  // Navigation: Place Order
  document.getElementById("placeOrder").addEventListener("click", () => {
    const btn = document.getElementById("placeOrder");
    btn.textContent = "Processing... ✦";
    btn.disabled = true;

    setTimeout(() => {
      showStep("success");
      // Clear cart
      localStorage.removeItem("aura_cart");
      updateCartCount();
      
      // Generate random order ID
      document.getElementById("orderId").textContent = `#AURA-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Hide Sidebar
      document.querySelector(".order-sidebar").style.display = "none";
      document.querySelector(".steps").style.display = "none";
      document.querySelector(".checkout-layout").style.gridTemplateColumns = "1fr";
    }, 2000);
  });

  function showStep(stepName) {
    Object.values(steps).forEach(step => step.classList.remove("active"));
    steps[stepName].classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderOrderSummary() {
    const cart = getCart();
    orderItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      window.location.href = "cart.html";
      return;
    }

    let subtotal = 0;
    cart.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = "order-item-mini";
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="mini-details">
          <span class="mini-name">${item.name} x ${item.quantity}</span>
          <span class="mini-price">₹${(item.price * item.quantity).toLocaleString()}</span>
        </div>
      `;
      orderItemsContainer.appendChild(itemEl);
      subtotal += item.price * item.quantity;
    });

    subtotalEl.textContent = `₹${subtotal.toLocaleString()}`;
    
    // Check for discount from localStorage if you want to persist it from cart
    // For now, let's just use subtotal
    totalEl.textContent = `₹${subtotal.toLocaleString()}`;
  }

  function validateShipping() {
    const rules = [
      { id: "firstName", test: v => /^[A-Za-z\s]{2,}$/.test(v),  error: "First name: letters only, min 2 chars" },
      { id: "lastName",  test: v => /^[A-Za-z\s]{2,}$/.test(v),  error: "Last name: letters only, min 2 chars" },
      { id: "address",   test: v => v.length >= 5,                 error: "Address: min 5 characters" },
      { id: "city",      test: v => /^[A-Za-z\s]{2,}$/.test(v),  error: "City: letters only, min 2 chars" },
      { id: "state",     test: v => /^[A-Za-z\s]{2,}$/.test(v),  error: "State: letters only, min 2 chars" },
      { id: "pincode",   test: v => /^\d{6}$/.test(v),            error: "Pincode must be exactly 6 digits" },
      { id: "phone",     test: v => /^\d{10}$/.test(v),           error: "Phone must be exactly 10 digits" }
    ];

    let isValid = true;
    rules.forEach(({ id, test, error }) => {
      const el = document.getElementById(id);
      const val = el.value.trim();
      let errEl = document.getElementById("err-" + id) || Object.assign(document.createElement("small"), { id: "err-" + id, style: "color:#e53935;font-size:11px;margin-top:4px;display:block;" });
      if (!el.parentNode.contains(errEl)) el.parentNode.appendChild(errEl);

      const ok = test(val);
      el.style.borderColor = ok ? "" : "rgba(229,57,53,0.6)";
      errEl.textContent   = ok ? "" : error;
      if (!ok) isValid = false;
    });

    return isValid;
  }

  function populateReview() {
    const address = `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}<br>${document.getElementById("address").value}, ${document.getElementById("city").value}, ${document.getElementById("state").value} - ${document.getElementById("pincode").value}`;
    document.getElementById("review-address").innerHTML = address;
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const paymentTexts = {
      card: "Credit/Debit Card",
      upi: "UPI (GPay/PhonePe)",
      cod: "Cash on Delivery"
    };
    document.getElementById("review-payment").textContent = paymentTexts[paymentMethod];
  }
});

