const products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, image: "images/headphones.png", description: "High-quality wireless headphones with noise cancellation." },
    { id: 2, name: "Smart Watch", price: 199.99, image: "images/smartwatch.png", description: "Stay connected on the go with this sleek smartwatch." },
    { id: 3, name: "Gaming Laptop", price: 1299.99, image: "images/laptop.webp", description: "Powerful gaming laptop with the latest graphics card." },
    { id: 4, name: "Drone Camera", price: 499.99, image: "images/drone.webp", description: "Capture stunning aerial footage with ease." },
    { id: 5, name: "VR Headset", price: 299.99, image: "images/vr.png", description: "Immerse yourself in virtual reality worlds." },
    { id: 6, name: "Smartphone", price: 899.99, image: "images/smartphone.png", description: "Experience lightning-fast performance and a brilliant display." },
    { id: 7, name: "Bluetooth Speaker", price: 59.99, image: "images/speakers.png", description: "Portable speaker with exceptional sound quality." },
    { id: 8, name: "Camera", price: 249.99, image: "images/camera.png", description: "Durable camera for all your adventure needs." },
    { id: 9, name: "Wireless Headphones", price: 79.99, image: "images/headphones.png", description: "High-quality wireless headphones with noise cancellation." },
    { id: 10, name: "Smart Watch", price: 49.99, image: "images/smartwatch.png", description: "Stay connected on the go with this sleek smartwatch." },
    { id: 11, name: "Gaming Laptop", price: 899.99, image: "images/laptop.webp", description: "Powerful gaming laptop with the latest graphics card." },
    { id: 12, name: "Drone Camera", price: 139.99, image: "images/drone.webp", description: "Capture stunning aerial footage with ease." },
    { id: 13, name: "VR Headset", price: 439.99, image: "images/vr.png", description: "Immerse yourself in virtual reality worlds." },
    { id: 14, name: "Smartphone", price: 699.99, image: "images/smartphone.png", description: "Experience lightning-fast performance and a brilliant display." },
    { id: 15, name: "Bluetooth Speaker", price: 129.99, image: "images/speakers.png", description: "Portable speaker with exceptional sound quality." },
    { id: 16, name: "Camera", price: 289.99, image: "images/camera.png", description: "Durable camera for all your adventure needs." },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

let visibleProducts = 4;

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    for (let i = 0; i < visibleProducts && i < products.length; i++) {
        const product = products[i];

        const col = document.createElement('div');
        col.className = 'col-md-3 product-card';

        col.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <p class="card-text font-weight-bold">$${product.price.toFixed(2)}</p>
                    <button class="btn add-to-cart-btn" onclick="addToCart(${product.id}, this)">Add to Cart</button>
                </div>
            </div>
        `;

        productList.appendChild(col);
    }

    if (visibleProducts >= products.length) {
        document.getElementById('load-more').style.display = 'none';
    }
}

document.getElementById('load-more').addEventListener('click', () => {
    visibleProducts += 4;
    renderProducts();
});

function addToCart(productId, btn) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.product.id === productId);

    flyToCartAnimation(btn, product.image);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCartCount();
    saveCart();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalQuantity;
}

function renderCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        cartItemDiv.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.name}">
            <div class="cart-item-details">
                <h5>${item.product.name}</h5>
                <p>$${item.product.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.product.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${item.product.id}, 1)">+</button>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.product.id})"><i class="fas fa-trash"></i></button>
            </div>
        `;

        cartItemsDiv.appendChild(cartItemDiv);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
    cartItemsDiv.appendChild(totalDiv);
}

function changeQuantity(productId, change) {
    const cartItem = cart.find(item => item.product.id === productId);

    if (cartItem) {
        cartItem.quantity += change;

        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            renderCartItems();
            saveCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartCount();
    renderCartItems();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.getElementById('cart-link').addEventListener('click', (e) => {
    e.preventDefault();
    renderCartItems();
    $('#cart-modal').modal('show');
});

function flyToCartAnimation(btn, imageSrc) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.className = 'fly-to-cart';
    const rect = btn.getBoundingClientRect();
    img.style.left = rect.left + 'px';
    img.style.top = rect.top + 'px';
    document.body.appendChild(img);

    setTimeout(() => {
        img.remove();
    }, 500);
}

renderProducts();
updateCartCount();