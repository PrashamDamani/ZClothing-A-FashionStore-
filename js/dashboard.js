let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
  currentUser = JSON.parse(localStorage.getItem('zclothing_user'));
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }
  
  document.getElementById('userFullName').textContent = currentUser.name;
  document.getElementById('userEmail').textContent = currentUser.email;
  document.getElementById('welcomeName').textContent = currentUser.name.split(' ')[0];
  document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
  
  loadDashboardData();
  setupTabs();
  updateCartDisplay();
});

function loadDashboardData() {
  const orders = JSON.parse(localStorage.getItem('zclothing_orders') || '[]');
  const wishlist = JSON.parse(localStorage.getItem('zclothing_wishlist') || '[]');
  
  document.getElementById('totalOrders').textContent = orders.length;
  document.getElementById('wishlistCount').textContent = wishlist.length;
  
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  document.getElementById('totalSpent').textContent = `₹${totalSpent.toLocaleString()}`;
  
  renderOrders(orders);
  renderWishlist(wishlist);
}

function renderOrders(orders) {
  const container = document.getElementById('ordersList');
  if (!orders.length) {
    container.innerHTML = '<div class="empty-state">No orders yet. Start shopping!</div>';
    return;
  }
  
  container.innerHTML = orders.map(order => `
    <div class="order-card">
      <div class="order-header">
        <span class="order-id">Order #${order.id}</span>
        <span>${order.date}</span>
        <span class="order-status">✓ ${order.status}</span>
      </div>
      <div style="margin: 0.8rem 0;">
        ${order.items.map(item => `
          <div style="display: flex; justify-content: space-between; padding: 0.3rem 0;">
            <span>${item.emoji} ${item.name} x${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        `).join('')}
      </div>
      <div style="border-top: 1px solid var(--border); padding-top: 0.8rem; display: flex; justify-content: space-between;">
        <strong>Total</strong>
        <strong style="color: var(--gold)">₹${order.total.toLocaleString()}</strong>
      </div>
    </div>
  `).join('');
}

function renderWishlist(wishlistIds) {
  const container = document.getElementById('wishlistGrid');
  const wishlistProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));
  
  if (!wishlistProducts.length) {
    container.innerHTML = '<div class="empty-state">Your wishlist is empty</div>';
    return;
  }
  
  container.innerHTML = wishlistProducts.map(p => `
    <div class="wishlist-item">
      <div class="wishlist-item-image">${p.emoji}</div>
      <h4>${p.name}</h4>
      <p style="color: var(--warm-gray); font-size: 0.8rem;">${p.brand}</p>
      <div style="color: var(--gold); font-family: monospace; margin: 0.5rem 0;">₹${p.price.toLocaleString()}</div>
      <button class="quick-add" onclick="addToCartAndRefresh(${p.id})" style="width: 100%;">Add to Cart</button>
    </div>
  `).join('');
}

window.addToCartAndRefresh = function(productId) {
  addToCart(productId);
  loadDashboardData();
};

function setupTabs() {
  const tabs = document.querySelectorAll('.dashboard-nav a');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = tab.getAttribute('data-tab');
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
}