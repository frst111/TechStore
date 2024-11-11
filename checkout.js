let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderOrderSummary() {
    const orderSummaryList = document.getElementById('order-summary');
    orderSummaryList.innerHTML = '';

    if (cart.length === 0) {
        orderSummaryList.innerHTML = '<li class="list-group-item">Your cart is empty.</li>';
        document.querySelector('.cart-total').textContent = '';
        return;
    }

    cart.forEach(item => {
        const orderItem = document.createElement('li');
        orderItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        orderItem.innerHTML = `
            <div>
                <h6 class="my-0">${item.product.name} (x${item.quantity})</h6>
                <small class="text-muted">$${item.product.price.toFixed(2)} each</small>
            </div>
            <span class="text-muted">$${(item.product.price * item.quantity).toFixed(2)}</span>
        `;

        orderSummaryList.appendChild(orderItem);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    document.querySelector('.cart-total').textContent = `Total: $${totalPrice.toFixed(2)}`;
}

document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    alert(`Thank you for your purchase, ${firstName} ${lastName}! A confirmation email will be sent to ${email}.`);

    cart = [];
    localStorage.removeItem('cart');

    window.location.href = 'index.html';
});

renderOrderSummary();