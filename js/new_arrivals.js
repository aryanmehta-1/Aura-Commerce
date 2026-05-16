// Ensure syllabus compliance: var/let/const, arrays, objects, functions, basic DOM methods, events, timers.

document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Dot Navigation & Scroll Tracking ---
    const snapContainer = document.getElementById("snapContainer");
    const sections = document.querySelectorAll(".snap-section");
    const dots = document.querySelectorAll(".dot");
    const revealCards = document.querySelectorAll(".reveal-card");
    
    // Function to calculate which section is currently active
    function updateActiveSection() {
        const containerScrollTop = snapContainer.scrollTop;
        const sectionHeight = window.innerHeight;
        
        // Calculate the current index based on scroll position
        // Math.round helps us snap to the nearest index
        const currentIndex = Math.round(containerScrollTop / sectionHeight);
        
        // Update dots
        for (let i = 0; i < dots.length; i++) {
            if (i === currentIndex) {
                dots[i].classList.add("active");
            } else {
                dots[i].classList.remove("active");
            }
        }

        // Trigger reveal animations for cards in view
        for (let j = 0; j < revealCards.length; j++) {
            // If the card is inside the current active section, make it visible
            // We use standard DOM traversal parentNode
            let parentSection = revealCards[j].parentNode;
            while (parentSection && !parentSection.classList.contains("snap-section")) {
                parentSection = parentSection.parentNode;
            }
            
            // Check if this card's section is the active one
            if (parentSection === sections[currentIndex]) {
                // Add a small timeout for a smoother sequential feel
                setTimeout(function() {
                    revealCards[j].classList.add("visible");
                }, 100);
            }
        }
    }

    // Listen to scroll event on the container
    snapContainer.addEventListener("scroll", updateActiveSection);
    
    // Initial call to set state on load
    updateActiveSection();

    // Allow clicking dots to scroll to section
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function() {
            const targetIndex = parseInt(this.getAttribute("data-index"));
            sections[targetIndex].scrollIntoView({ behavior: "smooth" });
        });
    }

    // --- 2. Add to Cart Functionality ---
    const buyBtns = document.querySelectorAll(".buy-btn");
    for (let i = 0; i < buyBtns.length; i++) {
        buyBtns[i].addEventListener("click", function() {
            const productId = parseInt(this.getAttribute("data-id"));
            
            // We can call the addToCart function defined in data/products.js
            if (typeof addToCart === "function") {
                addToCart(productId);
                
                // Visual feedback
                const originalText = this.innerHTML;
                this.innerHTML = "Added ✓";
                this.style.background = "var(--accent)";
                this.style.color = "var(--bg)";
                
                const btn = this;
                setTimeout(function() {
                    btn.innerHTML = originalText;
                    btn.style.background = "";
                    btn.style.color = "";
                }, 1500);
            }
        });
    }

    // --- 3. Notify Me Forms (Form Validation basics) ---
    const notifyBtns = document.querySelectorAll(".notify-btn");
    for (let i = 0; i < notifyBtns.length; i++) {
        notifyBtns[i].addEventListener("click", function() {
            const inputId = this.getAttribute("id").replace("Btn", "Email");
            const inputElement = document.getElementById(inputId);
            const emailValue = inputElement.value;
            
            // Basic string validation
            if (emailValue === "" || emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
                alert("Please enter a valid email address.");
            } else {
                this.innerHTML = "Subscribed!";
                this.style.background = "var(--accent)";
                this.style.color = "var(--bg)";
                inputElement.value = "";
                inputElement.disabled = true;
            }
        });
    }

});

