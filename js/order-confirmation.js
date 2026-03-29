document.addEventListener('DOMContentLoaded', () => {
  const lastOrder = JSON.parse(localStorage.getItem('last_order'));
  
  if (!lastOrder) {
    window.location.href = 'home.html';
    return;
  }
  
  document.getElementById('orderNumberDisplay').textContent = lastOrder.id;
  
  const emailConfirmation = document.getElementById('emailConfirmation');
  emailConfirmation.innerHTML = `📧 A confirmation email has been sent to <strong>${lastOrder.shipping.email}</strong>`;
  
  setTimeout(() => {
    localStorage.removeItem('last_order');
  }, 1000);
});