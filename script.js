let cart = [];
let totalPrice = 0;

const prices = {
    "Beras": 12000,
    "Gula": 15000,
    "Minyak Goreng": 14000,
    "Tepung Terigu": 9000,
    "Susu": 18000,
    "Kopi": 10000,
    "Teh": 5000,
    "Mie Instan": 2500,
    "Telur": 2000,
    "Garam": 3000
};

function updatePrice() {
    const item = document.getElementById('item').value;
    document.getElementById('price').value = prices[item];
}

function addItem() {
    const item = document.getElementById('item').value;
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (item && price && quantity) {
        const total = price * quantity;
        cart.push({ item, price, quantity, total });
        renderCart();
        updateTotalPrice();
    } else {
        alert('Silakan masukkan semua informasi barang');
    }

    // Clear input fields
    document.getElementById('quantity').value = '';
}

function renderCart() {
    const cartTable = document.getElementById('cart').getElementsByTagName('tbody')[0];
    cartTable.innerHTML = '';

    cart.forEach((product, index) => {
        const row = cartTable.insertRow();

        row.insertCell(0).innerText = product.item;
        row.insertCell(1).innerText = product.price;
        row.insertCell(2).innerText = product.quantity;
        row.insertCell(3).innerText = product.total;
        const actionCell = row.insertCell(4);
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Hapus';
        removeButton.onclick = () => removeItem(index);
        actionCell.appendChild(removeButton);
    });
}

function updateTotalPrice() {
    totalPrice = cart.reduce((sum, product) => sum + product.total, 0);
    document.getElementById('totalPrice').innerText = totalPrice;
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
    updateTotalPrice();
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja kosong');
    } else {
        alert(`Total belanja: Rp ${totalPrice}`);
        cart = [];
        renderCart();
        updateTotalPrice();
    }
}

// Set initial price
updatePrice();
