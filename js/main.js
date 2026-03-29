let currentUser = null;
let activeFilters = {
  category: 'All',
  subCategories: [],
  priceMax: 100000,
  colors: [],
  sizes: [],
  sort: 0,
  search: ''
};

document.addEventListener('DOMContentLoaded', () => {
  loadUserSession();
  initFilters();
  initEventListeners();
  renderProducts();
  updateCartDisplay();
});

function loadUserSession() {
  const saved = localStorage.getItem('zclothing_user');
  if (saved) {
    currentUser = JSON.parse(saved);
    const nameDisplay = document.getElementById('userNameDisplay');
    if (nameDisplay) nameDisplay.innerHTML = currentUser.name.split(' ')[0];
  }
}

function initFilters() {
  const categoryList = document.getElementById('categoryList');
  if (categoryList) {
    CATEGORIES.forEach(cat => {
      const li = document.createElement('li');
      li.className = 'category-item';
      if (cat === 'All') li.classList.add('active');
      li.setAttribute('data-category', cat);
      li.innerHTML = `<span class="cat-name">${cat}</span>`;
      li.onclick = () => filterByCategory(cat);
      categoryList.appendChild(li);
    });
  }

  const swatchesDiv = document.getElementById('colorSwatches');
  if (swatchesDiv) {
    COLORS.forEach(c => {
      const swatch = document.createElement('div');
      swatch.className = 'swatch';
      swatch.style.background = c.hex;
      swatch.setAttribute('data-hex', c.hex);
      swatch.setAttribute('data-name', c.name);
      swatch.onclick = () => toggleColorFilter(swatch);
      swatchesDiv.appendChild(swatch);
    });
  }

  const sizeDiv = document.getElementById('sizeChips');
  if (sizeDiv) {
    SIZES.forEach(sz => {
      const chip = document.createElement('span');
      chip.className = 'size-chip';
      chip.textContent = sz;
      chip.onclick = () => toggleSizeFilter(chip);
      sizeDiv.appendChild(chip);
    });
  }

  const sortDiv = document.getElementById('sortOptions');
  if (sortDiv) {
    const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low'];
    sortOptions.forEach((opt, idx) => {
      const span = document.createElement('span');
      span.className = 'sort-option';
      if (idx === 0) span.classList.add('active');
      span.textContent = opt;
      span.onclick = () => setSort(span, idx);
      sortDiv.appendChild(span);
    });
  }

  const priceRange = document.getElementById('priceRange');
  if (priceRange) {
    priceRange.addEventListener('input', (e) => {
      document.getElementById('priceValue').textContent = parseInt(e.target.value).toLocaleString();
      activeFilters.priceMax = parseInt(e.target.value);
      applyFilters();
    });
  }

  const clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) clearBtn.addEventListener('click', clearAllFilters);
}

function filterByCategory(cat) {
  activeFilters.category = cat;
  activeFilters.subCategories = [];
  
  document.querySelectorAll('.category-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-category') === cat) item.classList.add('active');
  });
  
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('data-category') === cat) a.classList.add('active');
  });
  
  applyFilters();
}

function toggleColorFilter(swatch) {
  const hex = swatch.getAttribute('data-hex');
  if (activeFilters.colors.includes(hex)) {
    activeFilters.colors = activeFilters.colors.filter(c => c !== hex);
    swatch.classList.remove('active');
  } else {
    activeFilters.colors.push(hex);
    swatch.classList.add('active');
  }
  applyFilters();
}

function toggleSizeFilter(chip) {
  const size = chip.textContent;
  if (activeFilters.sizes.includes(size)) {
    activeFilters.sizes = activeFilters.sizes.filter(s => s !== size);
    chip.classList.remove('active');
  } else {
    activeFilters.sizes.push(size);
    chip.classList.add('active');
  }
  applyFilters();
}

function setSort(el, idx) {
  document.querySelectorAll('.sort-option').forEach(opt => opt.classList.remove('active'));
  el.classList.add('active');
  activeFilters.sort = idx;
  applyFilters();
}

function applyFilters() {
  renderProducts();
  renderActiveFilters();
}

function renderActiveFilters() {
  const container = document.getElementById('activeFilters');
  if (!container) return;
  
  const tags = [];
  if (activeFilters.category !== 'All') tags.push({ label: activeFilters.category, key: 'category' });
  activeFilters.colors.forEach(c => {
    const color = COLORS.find(col => col.hex === c);
    tags.push({ label: color?.name || c, key: `color:${c}` });
  });
  activeFilters.sizes.forEach(s => tags.push({ label: s, key: `size:${s}` }));
  if (activeFilters.priceMax < 100000) tags.push({ label: `Under ₹${activeFilters.priceMax.toLocaleString()}`, key: 'price' });
  
  container.innerHTML = tags.map(t => `
    <span class="filter-tag">
      ${t.label}
      <button onclick="removeFilter('${t.key}')">×</button>
    </span>
  `).join('');
}

window.removeFilter = function(key) {
  if (key === 'category') {
    filterByCategory('All');
  } else if (key.startsWith('color:')) {
    const hex = key.split(':')[1];
    activeFilters.colors = activeFilters.colors.filter(c => c !== hex);
    document.querySelectorAll('.swatch').forEach(s => {
      if (s.getAttribute('data-hex') === hex) s.classList.remove('active');
    });
  } else if (key.startsWith('size:')) {
    const size = key.split(':')[1];
    activeFilters.sizes = activeFilters.sizes.filter(s => s !== size);
    document.querySelectorAll('.size-chip').forEach(chip => {
      if (chip.textContent === size) chip.classList.remove('active');
    });
  } else if (key === 'price') {
    activeFilters.priceMax = 100000;
    document.getElementById('priceRange').value = 100000;
    document.getElementById('priceValue').textContent = '100,000';
  }
  applyFilters();
};

function clearAllFilters() {
  activeFilters = {
    category: 'All',
    subCategories: [],
    priceMax: 100000,
    colors: [],
    sizes: [],
    sort: 0,
    search: ''
  };
  
  document.querySelectorAll('.category-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-category') === 'All') item.classList.add('active');
  });
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.sort-option').forEach((opt, i) => {
    opt.classList.toggle('active', i === 0);
  });
  document.getElementById('priceRange').value = 100000;
  document.getElementById('priceValue').textContent = '100,000';
  document.getElementById('searchInput').value = '';
  activeFilters.search = '';
  
  applyFilters();
}

function renderProducts() {
  let filtered = PRODUCTS.filter(p => {
    if (activeFilters.category !== 'All' && p.category !== activeFilters.category) return false;
    if (p.price > activeFilters.priceMax) return false;
    if (activeFilters.colors.length > 0 && !activeFilters.colors.some(c => p.colors.includes(c))) return false;
    if (activeFilters.sizes.length > 0 && !activeFilters.sizes.some(s => p.sizes.includes(s))) return false;
    if (activeFilters.search && !p.name.toLowerCase().includes(activeFilters.search.toLowerCase()) && !p.brand.toLowerCase().includes(activeFilters.search.toLowerCase())) return false;
    return true;
  });
  
  if (activeFilters.sort === 1) filtered.sort((a, b) => a.price - b.price);
  if (activeFilters.sort === 2) filtered.sort((a, b) => b.price - a.price);
  
  const resultCount = document.getElementById('resultCount');
  if (resultCount) resultCount.textContent = `Showing ${filtered.length} items`;
  
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  
  if (!filtered.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--warm-gray)">No products found</div>';
    return;
  }
  
  const wishlist = JSON.parse(localStorage.getItem('zclothing_wishlist') || '[]');
  
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-image">
        ${p.emoji}
        <div class="product-overlay">
          <button class="quick-add" onclick="event.stopPropagation(); addToCart(${p.id})">Quick Add</button>
        </div>
      </div>
      ${p.badge ? `<div class="product-badge ${p.badge === 'Sale' ? 'sale' : 'new'}">${p.badge}</div>` : ''}
      <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
        ${wishlist.includes(p.id) ? '♥' : '♡'}
      </button>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">
          <span class="price-current">₹${p.price.toLocaleString()}</span>
          ${p.originalPrice ? `<span class="price-original">₹${p.originalPrice.toLocaleString()}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

window.toggleWishlist = function(id) {
  let wishlist = JSON.parse(localStorage.getItem('zclothing_wishlist') || '[]');
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(i => i !== id);
    showToast('Removed from wishlist');
  } else {
    wishlist.push(id);
    showToast('Added to wishlist');
  }
  localStorage.setItem('zclothing_wishlist', JSON.stringify(wishlist));
  renderProducts();
};

function initEventListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.search = e.target.value;
      applyFilters();
    });
  }
  
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);
  
  const closeCartBtn = document.getElementById('closeCartBtn');
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
  
  const userMenuBtn = document.getElementById('userMenuBtn');
  if (userMenuBtn) {
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('userDropdown').classList.toggle('open');
      userMenuBtn.classList.toggle('open');
    });
  }
  
  document.addEventListener('click', function(e) {
    const menu = document.getElementById('userMenu');
    if (menu && !menu.contains(e.target)) {
      document.getElementById('userDropdown').classList.remove('open');
      if (userMenuBtn) userMenuBtn.classList.remove('open');
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function logout() {
  localStorage.removeItem('zclothing_user');
  window.location.href = 'index.html';
}