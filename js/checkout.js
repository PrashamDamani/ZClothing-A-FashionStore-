document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('zclothing_cart') || '[]');
  if (!cart.length) {
    window.location.href = 'home.html';
    return;
  }
  
  renderCheckoutItems(cart);
  updateCheckoutTotals(cart);
  setupPaymentOptions();
  
  document.getElementById('placeOrderBtn').addEventListener('click', () => processOrder(cart));
  
  // Pre-fill user data if logged in
  const user = JSON.parse(localStorage.getItem('zclothing_user'));
  if (user) {
    document.getElementById('checkoutFullName').value = user.name;
    if (user.email) document.getElementById('checkoutEmail').value = user.email;
  }
});

function renderCheckoutItems(cart) {
  const container = document.getElementById('checkoutItems');
  container.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <div>
        <div class="checkout-item-name">${item.name} x${item.quantity}</div>
        <div style="font-size:0.7rem; color:var(--text-muted)">${item.brand}</div>
      </div>
      <div class="checkout-item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
    </div>
  `).join('');
}

function updateCheckoutTotals(cart) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;
  
  document.getElementById('checkoutSubtotal').textContent = `₹${subtotal.toLocaleString()}`;
  document.getElementById('checkoutTax').textContent = `₹${tax.toLocaleString()}`;
  document.getElementById('checkoutGrandTotal').textContent = `₹${total.toLocaleString()}`;
}

function setupPaymentOptions() {
  const options = document.querySelectorAll('.payment-option');
  const cardDetails = document.getElementById('cardDetails');
  const upiDetails = document.getElementById('upiDetails');
  
  options.forEach(opt => {
    const radio = opt.querySelector('input');
    radio.addEventListener('change', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      
      cardDetails.classList.remove('show');
      upiDetails.classList.remove('show');
      
      if (radio.value === 'card') {
        cardDetails.classList.add('show');
      } else if (radio.value === 'upi') {
        upiDetails.classList.add('show');
      }
    });
  });
}

function processOrder(cart) {
  const email = document.getElementById('checkoutEmail').value;
  const phone = document.getElementById('checkoutPhone').value;
  const fullName = document.getElementById('checkoutFullName').value;
  const address = document.getElementById('checkoutAddress').value;
  const city = document.getElementById('checkoutCity').value;
  const pincode = document.getElementById('checkoutPincode').value;
  
  if (!email || !fullName || !address || !city || !pincode) {
    showToast('Please fill all required fields');
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;
  
  const order = {
    id: 'ZCL' + Date.now(),
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: new Date().toLocaleTimeString(),
    items: cart.map(item => ({ ...item })),
    subtotal: subtotal,
    tax: tax,
    total: total,
    shipping: { fullName, address, city, pincode, email, phone },
    paymentMethod: document.querySelector('input[name="payment"]:checked').value,
    notes: document.getElementById('orderNotes').value,
    status: 'Confirmed'
  };
  
  showPaymentModal(order);
}

function showPaymentModal(order) {
  const modal = document.getElementById('paymentModal');
  const progressBar = document.getElementById('progressBar');
  const paymentStatus = document.getElementById('paymentStatus');
  
  modal.classList.add('show');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += 20;
    progressBar.style.width = progress + '%';
    
    if (progress === 40) paymentStatus.textContent = 'Verifying payment details...';
    if (progress === 60) paymentStatus.textContent = 'Processing transaction...';
    if (progress === 80) paymentStatus.textContent = 'Finalizing order...';
    
    if (progress >= 100) {
      clearInterval(interval);
      completeOrder(order);
    }
  }, 400);
}

function completeOrder(order) {
  const orders = JSON.parse(localStorage.getItem('zclothing_orders') || '[]');
  orders.unshift(order);
  localStorage.setItem('zclothing_orders', JSON.stringify(orders));
  
  localStorage.removeItem('zclothing_cart');
  
  sendEmailConfirmation(order);
  
  localStorage.setItem('last_order', JSON.stringify(order));
  
  setTimeout(() => {
    window.location.href = 'order-confirmation.html';
  }, 500);
}

function sendEmailConfirmation(order) {
  console.log('📧 Sending confirmation email to:', order.shipping.email);
  console.log('Order Details:', order);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}