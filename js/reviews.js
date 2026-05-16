document.addEventListener("DOMContentLoaded", () => {
  // --- INITIAL DATA & STORAGE ---
  const initialReviews = [
    {
      name: "Priya Sharma",
      date: "March 2026",
      rating: 5,
      verified: true,
      title: "Transformative Experience",
      body: "The 'Mood' switching on this site isn't just a gimmick, it genuinely changes how I shop. The Celestial Wrap Dress is stunning and fits like a dream.",
      helpfulCount: 64
    },
    {
      name: "Aarav Mehta",
      date: "March 2026",
      rating: 5,
      verified: true,
      title: "Exceptional Quality",
      body: "The Obsidian Watch Pro is a masterpiece. Arrived in premium packaging. The Midnight mode on the site perfectly set the tone for this purchase.",
      helpfulCount: 42
    },
    {
      name: "Zara K.",
      date: "February 2026",
      rating: 4,
      verified: true,
      title: "Great products, shipping was fast",
      body: "Ordered the Lunar Runner X and the Glow Serum Kit together. Both arrived within 3 days. The sneakers fit perfectly.",
      helpfulCount: 29
    }
  ];

  function getReviews() {
    const stored = localStorage.getItem("aura_reviews");
    return stored ? JSON.parse(stored) : initialReviews;
  }

  function saveReview(review) {
    const reviews = getReviews();
    reviews.unshift(review); // Add new review to the top
    localStorage.setItem("aura_reviews", JSON.stringify(reviews));
  }

  // --- RENDERING ---
  const reviewsGrid = document.getElementById("reviewsGrid");

  function renderReviews(filter = "All") {
    const reviews = getReviews();
    reviewsGrid.innerHTML = "";

    reviews.forEach(review => {
      // Simple filter simulation (in a real app, reviews would have a 'category' field)
      if (filter !== "All" && Math.random() > 0.5) return; 

      const card = document.createElement("div");
      card.className = "review-card";
      card.innerHTML = `
        <div class="review-card-header">
          <div class="reviewer-info">
            <h5>${review.name}</h5>
            <span>${review.date} ${review.verified ? '<span class="verify-badge">✓ Verified</span>' : ''}</span>
          </div>
          <div class="card-stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
        </div>
        <div class="review-content">
          <h4>${review.title}</h4>
          <p>"${review.body}"</p>
        </div>
        <div class="review-footer">
          <span class="helpful-count">${review.helpfulCount} people found this helpful</span>
          <button class="helpful-btn">Helpful</button>
        </div>
      `;
      reviewsGrid.appendChild(card);
    });

    reAttachHelpfulListeners();
  }

  // --- STAR PICKER ---
  const starPicker = document.getElementById("starPicker");
  const stars = starPicker.querySelectorAll(".star-pick");
  let selectedRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      highlightStars(index + 1);
    });

    star.addEventListener("mouseout", () => {
      highlightStars(selectedRating);
    });

    star.addEventListener("click", () => {
      selectedRating = index + 1;
      highlightStars(selectedRating);
    });
  });

  function highlightStars(count) {
    stars.forEach((s, i) => {
      if (i < count) s.classList.add("active");
      else s.classList.remove("active");
    });
  }

  // --- SUBMIT REVIEW ---
  const submitBtn = document.getElementById("submitReview");
  submitBtn.addEventListener("click", () => {
    const name = document.getElementById("rName").value.trim();
    const product = document.getElementById("rProduct").value.trim();
    const title = document.getElementById("rTitle").value.trim();
    const body = document.getElementById("rBody").value.trim();

    if (!name || !product || !title || !body || selectedRating === 0) {
      alert("Please complete all fields and select a rating.");
      return;
    }

    const newReview = {
      name: name,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      rating: selectedRating,
      verified: false, // New reviews aren't verified by default
      title: title,
      body: body,
      helpfulCount: 0
    };

    submitBtn.textContent = "Publishing Story... ✦";
    submitBtn.disabled = true;

    setTimeout(() => {
      saveReview(newReview);
      renderReviews(); // Refresh list
      
      alert(`Thank you, ${name}. Your story has been published to the Wall of Love.`);
      
      submitBtn.textContent = "Submit Review ✦";
      submitBtn.disabled = false;
      
      // Clear form
      document.getElementById("rName").value = "";
      document.getElementById("rProduct").value = "";
      document.getElementById("rTitle").value = "";
      document.getElementById("rBody").value = "";
      selectedRating = 0;
      highlightStars(0);
      
      window.scrollTo({ top: reviewsGrid.offsetTop - 100, behavior: "smooth" });
    }, 1500);
  });

  // --- HELPFUL BUTTONS ---
  function reAttachHelpfulListeners() {
    document.querySelectorAll(".helpful-btn").forEach(btn => {
      btn.addEventListener("click", function() {
        if (!this.classList.contains("voted")) {
          const countSpan = this.parentElement.querySelector(".helpful-count");
          let count = parseInt(countSpan.textContent.match(/\d+/)[0]);
          countSpan.textContent = `${count + 1} people found this helpful`;
          this.textContent = "✓ Helpful";
          this.classList.add("voted");
          this.style.color = "var(--accent)";
          this.style.borderColor = "var(--accent)";
          
          // In a real app, we'd update the storage here too
        }
      });
    });
  }

  // --- PHOTO GALLERY LIGHTBOX ---
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");
  const galleryItems = document.querySelectorAll(".photo-item");

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const src = item.querySelector("img").src;
      lightboxImg.src = src;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // --- FILTERS ---
  const tags = document.querySelectorAll(".tag");
  tags.forEach(tag => {
    tag.addEventListener("click", () => {
      tags.forEach(t => t.classList.remove("active"));
      tag.classList.add("active");
      
      const filter = tag.dataset.filter;
      reviewsGrid.style.opacity = "0";
      setTimeout(() => {
        renderReviews(filter);
        reviewsGrid.style.opacity = "1";
      }, 300);
    });
  });

  // --- INITIAL RENDER ---
  renderReviews();
});

