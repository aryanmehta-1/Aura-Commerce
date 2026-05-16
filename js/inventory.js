const products = [
  {
    id: 1,
    name: "Celestial Wrap Dress",
    price: 2799,
    originalPrice: 4299,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
    rating: 4.5,
    badge: "New"
  },
  {
    id: 6,
    name: "Oversized Linen Blazer",
    price: 3499,
    originalPrice: 5200,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
    rating: 4.0,
    badge: ""
  },
  {
    id: 11,
    name: "Ribbed Knit Co-ord",
    price: 2599,
    originalPrice: 3800,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400",
    rating: 4.5,
    badge: "Sale"
  },
  {
    id: 13,
    name: "Midnight Tote Bag",
    price: 1899,
    category: "Fashion",
    image: "https://nestasia.in/cdn/shop/files/Tote_bag_2.jpg?v=1720879425&width=2000",
    rating: 5.0,
    badge: ""
  },
  {
    id: 14,
    name: "Classic Blue Jeans",
    price: 4100,
    originalPrice: 5500,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
    rating: 4.0,
    badge: ""
  },
  {
    id: 15,
    name: "Canvas Backpack",
    price: 5999,
    category: "Fashion",
    image: "https://assets.myntassets.com/assets/images/21416312/2023/2/3/bba63ab6-454d-427e-9c10-f4b6773f54a81675423598526-Mona-B-Canvas-Backpack-2481675423597732-1.jpg",
    rating: 5.0,
    badge: "Hot"
  },
  {
    id: 2,
    name: "Obsidian Watch Pro",
    price: 8499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    rating: 5.0,
    badge: "Hot"
  },
  {
    id: 7,
    name: "Noise Pro Buds",
    price: 2999,
    category: "Electronics",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQmNhQmwb5EOKW29pMYkL6m2rJzpkvNELWilMbGE4dtLfOEnYTx2VTWpEbto_fj8I-G1DYNvWwyaMGOEZHu6ts8y13ZddIAMEY9OetKXUDIJaGlsyqco1A0OJyvAgr_I8WxHyVpO0kGgcQ&usqp=CAc",
    rating: 4.0,
    badge: "New"
  },
  {
    id: 12,
    name: "Smart Desk Lamp",
    price: 3299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    rating: 4.0,
    badge: ""
  },
  {
    id: 16,
    name: "Polaroid Camera",
    price: 5999,
    originalPrice: 15000,
    category: "Electronics",
    image: "https://www.instax.in/cdn/shop/files/CopyofCopyof1_2.webp?v=1707396954",
    rating: 4.5,
    badge: ""
  },
  {
    id: 17,
    name: "Leather Wallet",
    price: 1499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
    rating: 4.0,
    badge: "Sale"
  },
  {
    id: 18,
    name: "Over-Ear Headphones",
    price: 4500,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 5.0,
    badge: ""
  },
  {
    id: 3,
    name: "Lunar Runner X",
    price: 4599,
    originalPrice: 6999,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    rating: 4.0,
    badge: ""
  },
  {
    id: 8,
    name: "Velvet Slip Heels",
    price: 2199,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
    rating: 4.5,
    badge: ""
  },
  {
    id: 19,
    name: "Classic White Sneaker",
    price: 2999,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    rating: 5.0,
    badge: ""
  },
  {
    id: 20,
    name: "Chic Sunglasses",
    price: 5499,
    originalPrice: 7200,
    category: "Footwear", // Note: The HTML says Footwear for sunglasses?
    image: "https://m.media-amazon.com/images/I/61qDaOZzfKL._AC_UY1100_.jpg",
    rating: 4.0,
    badge: "New"
  },
  {
    id: 21,
    name: "Elevated Heels",
    price: 1899,
    category: "Footwear",
    image: "https://www.oceedee.com/cdn/shop/products/ROSEMISSINDIA1_300x300.jpg?v=1663223873",
    rating: 4.5,
    badge: ""
  },
  {
    id: 22,
    name: "Suede Loafers",
    price: 3999,
    category: "Footwear",
    image: "https://egoss.in/cdn/shop/files/DSC_0000_2.jpg?v=1753877117&width=1950",
    rating: 4.0,
    badge: ""
  },
  {
    id: 4,
    name: "Aura Glow Serum Kit",
    price: 1999,
    originalPrice: 3200,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400",
    rating: 4.5,
    badge: "Sale"
  },
  {
    id: 9,
    name: "Aura Perfume",
    price: 799,
    category: "Beauty",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtXDdZcy7IE_H1RBV4WKhxh85vHRGT9G7SNg&s",
    rating: 5.0,
    badge: ""
  },
  {
    id: 23,
    name: "Organic Soap",
    price: 1499,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400",
    rating: 4.0,
    badge: "Hot"
  },
  {
    id: 24,
    name: "Night Cream",
    price: 599,
    category: "Beauty",
    image: "https://img.forestessentialsindia.com/pub/media/catalog/15591_Transformative_Soundarya_Night_Cream_MoodShot.jpg",
    rating: 4.5,
    badge: ""
  },
  {
    id: 25,
    name: "Vit-C Brightening Drop",
    price: 2100,
    originalPrice: 2800,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
    rating: 4.0,
    badge: "Sale"
  },
  {
    id: 26,
    name: "Essential Oil",
    price: 499,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
    rating: 5.0,
    badge: ""
  },
  {
    id: 5,
    name: "Minimalist Chair",
    price: 1299,
    category: "Living",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYXxA4G6xqlS_8gm7jPVEwLy_-BCS1f2LtZQ&s",
    rating: 5.0,
    badge: ""
  },
  {
    id: 10,
    name: "Woven Rattan Vase",
    price: 1599,
    category: "Living",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
    rating: 4.0,
    badge: ""
  },
  {
    id: 27,
    name: "Ceramic Plant Pot",
    price: 899,
    category: "Living",
    image: "https://m.media-amazon.com/images/I/713ZvA5hL9L.jpg",
    rating: 4.5,
    badge: ""
  },
  {
    id: 28,
    name: "Linen Throw Blanket",
    price: 2499,
    originalPrice: 3200,
    category: "Living",
    image: "https://m.media-amazon.com/images/I/71EUmwZhM6L._AC_UF1000,1000_QL80_.jpg",
    rating: 5.0,
    badge: ""
  },
  {
    id: 29,
    name: "Minimalist Wall Clock",
    price: 1899,
    category: "Living",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400",
    rating: 4.0,
    badge: "New"
  },
  {
    id: 30,
    name: "Teakwood Incense Hold",
    price: 599,
    category: "Living",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNab6QgQ-NbQCOI97gT5g-90c4_fKcd-6Gnw&s",
    rating: 4.5,
    badge: ""
  }
];

// Utility to get stars HTML
function getStarsHTML(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += "★";
    } else if (i - 0.5 <= rating) {
      stars += "½";
    } else {
      stars += "☆";
    }
  }
  return stars;
}

// Global cart utilities
function getCart() {
  return JSON.parse(localStorage.getItem("aura_cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("aura_cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Add new item with a unique instance ID for the first time
    cart.push({ ...product, uid: Date.now() + Math.random(), quantity: 1 });
  }

  saveCart(cart);
  console.log(`${product.name} updated in cart`);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartCountElements = document.querySelectorAll("#cartCount");
  cartCountElements.forEach(el => {
    el.textContent = count;
  });
}

// Sync cart count on load
document.addEventListener("DOMContentLoaded", updateCartCount);
