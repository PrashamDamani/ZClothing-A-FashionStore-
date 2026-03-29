document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
});

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  const users = JSON.parse(localStorage.getItem('zclothing_users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem('zclothing_user', JSON.stringify(user));
    showAuthToast('Login successful! Redirecting...');
    setTimeout(() => window.location.href = 'home.html', 1000);
  } else {
    showAuthToast('Invalid email or password');
  }
}

function handleRegister(e) {
  e.preventDefault();
  const firstName = document.getElementById('regFirstName').value;
  const lastName = document.getElementById('regLastName').value;
  const email = document.getElementById('regEmail').value;
  const phone = document.getElementById('regPhone').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const terms = document.getElementById('regTerms').checked;
  
  if (password !== confirmPassword) {
    showAuthToast('Passwords do not match');
    return;
  }
  
  if (!terms) {
    showAuthToast('Please accept the Terms & Conditions');
    return;
  }
  
  const users = JSON.parse(localStorage.getItem('zclothing_users') || '[]');
  if (users.find(u => u.email === email)) {
    showAuthToast('Email already registered');
    return;
  }
  
  const newUser = {
    id: Date.now(),
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email,
    phone,
    password,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('zclothing_users', JSON.stringify(users));
  localStorage.setItem('zclothing_user', JSON.stringify(newUser));
  
  showAuthToast('Account created successfully!');
  setTimeout(() => window.location.href = 'home.html', 1500);
}

function showAuthToast(message) {
  let toast = document.getElementById('authToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'authToast';
    toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--surface);border:1px solid var(--gold);padding:1rem 2rem;color:var(--gold);z-index:2000;font-family:monospace;border-radius:8px';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 3000);
}