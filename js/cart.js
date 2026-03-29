let cart = JSON.parse(localStorage.getItem('zclothing_cart') || '[]');

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  localStorage.setItem('zclothing_cart', JSON.stringify(cart));
  updateCartDisplay();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('zclothing_cart', JSON.stringify(cart));
  updateCartDisplay();
}

function updateCartQuantity(productId, newQty) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQty;
      localStorage.setItem('zclothing_cart', JSON.stringify(cart));
    }
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const cartItems = document.getElementById('cartItems');
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (cartCount) cartCount.textContent = totalItems;
  if (cartTotal) cartTotal.textContent = `₹${totalAmount.toLocaleString()}`;
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = '<div class="empty-state" style="text-align:center;padding:2rem">Your cart is empty</div>';
    } else {
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-img">${item.emoji}</div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">${item.brand} · Qty: ${item.quantity}</div>
            <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
            <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
              <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" style="background:var(--surface); border:1px solid var(--border); padding:0.2rem 0.5rem; cursor:pointer;">-</button>
              <span>${item.quantity}</span>
              <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" style="background:var(--surface); border:1px solid var(--border); padding:0.2rem 0.5rem; cursor:pointer;">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
      `).join('');
    }
  }
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('show');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('show');
}

function getCart() {
  return cart;
}

function clearCart() {
  cart = [];
  localStorage.setItem('zclothing_cart', JSON.stringify(cart));
  updateCartDisplay();
}