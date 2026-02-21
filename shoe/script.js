// Product Data
const products = [
    { id: 1, name: 'Shadow Striders', price: 49.99, image: '1.jpg', category: 'casual' },
    { id: 2, name: 'Electric Glide', price: 59.99, image: '2.jpg', category: 'skate' },
    { id: 3, name: 'Inferno Steps', price: 59.99, image: '3.jpg', category: 'skate' },
    { id: 4, name: 'Frostbite Kicks', price: 64.99, image: '4.jpg', category: 'high-tops' },
    { id: 5, name: 'Terra Force Highs', price: 79.99, image: '5.jpg', category: 'high-tops' }
];

let cart = [];

// Initialize Store
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    startHeroSlideshow();
});

// Render Products to DOM
function renderProducts(productsToRender = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <span class="price">$${product.price.toFixed(2)}</span>
                <select class="size-select">
                    <option>Select Size</option>
                    <option>US 7</option>
                    <option>US 8</option>
                    <option>US 9</option>
                    <option>US 10</option>
                    <option>US 11</option>
                </select>
                <br>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Filter Products
function filterProducts(category) {
    // Update active button style
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category || (category === 'high-tops' && btn.innerText === 'High-Tops')) {
            btn.classList.add('active');
        }
    });

    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    renderProducts(filtered);
}

// Hero Slideshow Logic
function startHeroSlideshow() {
    const images = products.map(product => product.image);
    let currentIndex = 0;
    const hero = document.querySelector('.hero');

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${images[currentIndex]}')`;
    }, 3000); // Change image every 3 seconds
}

// Add Item to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    toggleCart(true); // Open cart when item added
}

// Remove Item from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Update Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Update Total Price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = total.toFixed(2);

    // Render Cart Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <div style="display:flex; align-items:center;">
                    <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:red; cursor:pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Toggle Cart Modal
function toggleCart(forceOpen = false) {
    const modal = document.getElementById('cart-modal');
    if (forceOpen) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartUI();
    toggleCart();
}