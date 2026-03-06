/* ============================================
   FB FERNÁNDEZ BELLINI — script.js
   ============================================ */

'use strict';

// ===== FEATURED PRODUCTS (Inicio — 4 productos) =====
const FEATURED_PRODUCTS = [
  {
    id: 101,
    name: 'Cartera Manhatann',
    price: 80000,
    originalPrice: null,
    image: 'cartera7.png',
    alt: 'Cartera Manhatann artesanal premium',
    badge: 'Destacado',
    outOfStock: false,
    url: 'productos/5.html'
  },
  {
    id: 102,
    name: 'Cartera Camel',
    price: 40000,
    originalPrice: null,
    image: 'cartera1.jpeg',
    alt: 'Cartera Camel diseño clásico premium',
    badge: null,
    outOfStock: false,
    url: 'productos/6.html'
  },

  {
    id: 104,
    name: 'Porta Cosméticos Cuadros',
    price: 20000,
    originalPrice: null,
    image: 'portacos.png',
    alt: 'Porta cosméticos artesanal femenino',
    badge: 'Nuevo',
    outOfStock: false,
    url: 'productos/8.html'
  }
];

// ===== FULL CATALOG (Sección Carteras y Bolsos) =====
const PRODUCTS = [
  {
  id: 1,
  name: 'Cartera Espresso',
  price: 42500,
  originalPrice: 50000,
  image: 'cartera2.jpg',
  alt: 'Cartera Espresso en oferta',
  badge: 'Oferta',
  outOfStock: false,
  url: 'productos/1.html'
},
{
  id: 2,
  name: 'Cartera Maison',
  price: 42500,
  originalPrice: 50000,
  image: 'cartera4.jpg',
  alt: 'Cartera Maison en oferta',
  badge: 'Oferta',
  outOfStock: true,
  url: 'productos/2.html'
},
{
  id: 3,
  name: 'Cartera Isa',
  price: 35000,
  originalPrice: null,
  image: '/cartera6.jpg',
  alt: 'Cartera Isa artesanal',
  badge: null,
  outOfStock: true,
  url: 'productos/3.html'
},
{
  id: 4,
  name: 'Cartera Clio',
  price: 60000,
  originalPrice: null,
  image: '/cartera5.jpg',
  alt: 'Cartera Clio premium',
  badge: null,
  outOfStock: false,
  url: 'productos/4.html'
},
{
  id: 5,
  name: 'Cartera Manhatann',
  price: 80000,
  originalPrice: null,
  image: '/cartera7.png',
  alt: 'Cartera Manhatann artesanal premium',
  badge: 'Destacado',
  outOfStock: false,
  url: 'productos/5.html'
},
{
  id: 6,
  name: 'Cartera Camel',
  price: 40000,
  originalPrice: null,
  image: '/cartera1.jpeg',
  alt: 'Cartera Camel diseño clásico premium',
  badge: null,
  outOfStock: false,
  url: 'productos/6.html'
},
{
  id: 7,
  name: 'Cartera Caliet',
  price: 50000,
  originalPrice: null,
  image: '/cartera3.jpg',
  alt: 'Cartera Caliet de diseño artesanal',
  badge: null,
  outOfStock: true,
  url: 'productos/7.html'
},
{
  id: 8,
  name: 'Porta Cosméticos Cuadros',
  price: 20000,
  originalPrice: null,
  image: '/portacos.png',
  alt: 'Porta cosméticos artesanal femenino',
  badge: 'Nuevo',
  outOfStock: false,
  url: 'productos/8.html'
},
{
  id: 9,
  name: 'Porta Cosméticos Croco',
  price: 20000,
  originalPrice: null,
  image: '/portacos2.png',
  alt: 'Porta cosméticos artesanal variante 2',
  badge: 'Nuevo',
  outOfStock: false,
  url: 'productos/9.html'
}
];

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('fbfb_cart') || '[]');

// ===== DOM REFS =====
const hamburger    = document.getElementById('hamburger');
const menuOverlay  = document.getElementById('menuOverlay');
const menuClose    = document.getElementById('menuClose');
const cartBtn      = document.getElementById('cartBtn');
const cartDrawer   = document.getElementById('cartDrawer');
const cartClose    = document.getElementById('cartClose');
const cartOverlay  = document.getElementById('cartOverlay');
const cartItems    = document.getElementById('cartItems');
const cartCount    = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const checkoutBtn  = document.getElementById('checkoutBtn');
const featuredGrid = document.getElementById('featuredGrid');
const carterasGrid = document.getElementById('carterasGrid');
const header       = document.getElementById('header');

// ===== CURRENCY FORMAT =====
const formatPrice = (n) =>
  '$' + n.toLocaleString('es-AR', { minimumFractionDigits: 0 });

// ===== RENDER PRODUCT CARD =====
function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card' + (product.outOfStock ? ' out-of-stock' : '');
  card.setAttribute('role', 'listitem');

  // Badge: sin stock takes priority
  let badgeHTML = '';
  if (product.outOfStock) {
    badgeHTML = `<span class="product-badge badge-stock">Sin stock</span>`;
  } else if (product.badge) {
    const cls = product.badge === 'Oferta' ? 'badge-sale' : '';
    badgeHTML = `<span class="product-badge ${cls}">${product.badge}</span>`;
  }

  // Price: show strikethrough original price if on sale
  const priceHTML = product.originalPrice
    ? `<p class="product-price sale-price">
        ${formatPrice(product.price)}
        <span class="price-original">${formatPrice(product.originalPrice)}</span>
       </p>`
    : `<p class="product-price">${formatPrice(product.price)}</p>`;

  const btnHTML = product.outOfStock
    ? `<button class="btn-add btn-disabled" disabled aria-label="${product.name} sin stock">Sin stock</button>`
    : `<button class="btn-add" data-id="${product.id}" aria-label="Agregar ${product.name} al carrito">Agregar al carrito</button>`;

  const imgContent = product.url
    ? `<a href="${product.url}" aria-label="Ver detalles de ${product.name}">
        <img src="${product.image}" alt="${product.alt}" loading="lazy" />
       </a>`
    : `<img src="${product.image}" alt="${product.alt}" loading="lazy" />`;

  card.innerHTML = `
    <div class="product-img-wrap">
      ${imgContent}
      ${badgeHTML}
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.url
        ? `<a href="${product.url}" style="color:inherit">${product.name}</a>`
        : product.name}</h3>
      ${priceHTML}
      ${btnHTML}
    </div>
  `;

  // Add to cart (only if in stock)
  if (!product.outOfStock) {
    card.querySelector('.btn-add').addEventListener('click', (e) => {
      addToCart(product);
      const btn = e.currentTarget;
      btn.textContent = '✓ Agregado';
      btn.style.background = 'var(--charcoal)';
      btn.style.color = 'var(--ivory)';
      setTimeout(() => {
        btn.textContent = 'Agregar al carrito';
        btn.style.background = '';
        btn.style.color = '';
      }, 1800);
    });
  }

  return card;
}

// ===== RENDER GRIDS =====
function renderGrids() {
  FEATURED_PRODUCTS.forEach(p => featuredGrid.appendChild(createProductCard(p)));
  PRODUCTS.forEach(p => carterasGrid.appendChild(createProductCard(p)));
}

// ===== CART LOGIC =====
function addToCart(product) {
  const key = `${product.id}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      key,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      alt: product.alt,
      qty: 1
    });
  }
  saveCart();
  renderCart();
  updateCartCount();
  openCart();
  showToast(`"${product.name}" agregada al carrito`);
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  renderCart();
  updateCartCount();
}

function changeQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCart();
  updateCartCount();
}

function saveCart() {
  localStorage.setItem('fbfb_cart', JSON.stringify(cart));
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = total;
  cartCount.classList.toggle('visible', total > 0);
}

function renderCart() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    cartSubtotal.textContent = '$0';
    return;
  }

  cartSubtotal.textContent = formatPrice(subtotal);
  cartItems.innerHTML = '';

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
 el.innerHTML = `
<img src="${item.image.replace(/^(\.\.\/)+/, '')}" alt="${item.alt}" loading="lazy" />
  <div class="cart-item-info">
    <p class="cart-item-name">${item.name}</p>
    <p class="cart-item-price">${formatPrice(item.price)}</p>
    <div class="cart-item-qty">
      <button class="qty-btn" data-key="${item.key}" data-delta="-1">−</button>
      <span class="qty-num">${item.qty}</span>
      <button class="qty-btn" data-key="${item.key}" data-delta="1">+</button>
    </div>
  </div>
  <button class="cart-item-remove" data-key="${item.key}">×</button>
`;
    cartItems.appendChild(el);
  });

  cartItems.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => changeQty(btn.dataset.key, parseInt(btn.dataset.delta)));
  });
  cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.key));
  });
}

// ===== CART OPEN/CLOSE =====
function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== MENU OPEN/CLOSE =====
function openMenu() {
  menuOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  menuOverlay.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', 'false');
}

// ===== CHECKOUT WHATSAPP =====
function buildWhatsAppMessage() {
  const lines = cart.map(i =>
    `• ${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`
  );
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const msg = [
    '¡Hola! Me gustaría hacer el siguiente pedido:',
    '',
    ...lines,
    '',
    `*Total: ${formatPrice(subtotal)}*`,
    '',
    '¿Pueden confirmarme disponibilidad y formas de pago? ¡Gracias! 😊'
  ].join('\n');
  return encodeURIComponent(msg);
}

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) { showToast('Tu carrito está vacío'); return; }
  window.open(`https://wa.me/5491144036133?text=${buildWhatsAppMessage()}`, '_blank', 'noopener,noreferrer');
});

// ===== TOAST =====
let toastTimer = null;
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== HERO SLIDER =====
function initSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  let current  = 0;
  let sliderInterval;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  function next() { goTo((current + 1) % slides.length); }

  sliderInterval = setInterval(next, 5000);
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(sliderInterval);
      goTo(i);
      sliderInterval = setInterval(next, 5000);
    });
  });
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== HEADER SCROLL =====
function initHeaderScroll() {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ===== SMOOTH NAV =====
function initNav() {

  document.querySelectorAll('.menu-link').forEach(link => {

    link.addEventListener('click', (e) => {

      const href = link.getAttribute('href');

      // Si es un link interno (#)
      if (href.startsWith('#')) {
        e.preventDefault();

        const target = document.querySelector(href);

        if (target) {

          closeMenu();

          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 300);

        }

      } 
      else {
        // Si es una página (tos.html)
        closeMenu();
      }

    });

  });

}

// ===== EVENT LISTENERS =====
hamburger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', (e) => { if (e.target === menuOverlay) closeMenu(); });
cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeMenu(); closeCart(); }
});
document.getElementById('year').textContent = new Date().getFullYear();

// ===== INIT =====
renderGrids();
renderCart();
updateCartCount();
initSlider();
initReveal();
initHeaderScroll();
initNav();





function toggleDevInfo(){
  document.getElementById("devCreditBox").classList.toggle("show");
}