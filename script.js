// 1. البيانات
const menuData = {
    "PIZZAS": [{ name: "Pizza Margherita", price: 600 }, { name: "Pizza Thon", price: 800 }],
    "POISSONS": [{ name: "Dorade Grillée", price: 2200 }]
};

// 2. التنقل بين الصفحات
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

// 3. إنشاء الأزرار
const btnContainer = document.getElementById('category-buttons');
for (let cat in menuData) {
    let btn = document.createElement('button');
    btn.innerText = cat;
    btn.onclick = () => {
        const container = document.getElementById('category-items');
        container.innerHTML = menuData[cat].map(item => `
            <div class="item">
                <span>${item.name} (${item.price} DA)</span>
                <button onclick="addToCart('${item.name}', ${item.price})">+</button>
            </div>
        `).join('');
    };
    btnContainer.appendChild(btn);
}

// 4. العمليات الحسابية
let cart = {};
function addToCart(name, price) {
    cart[name] = cart[name] ? { ...cart[name], qty: cart[name].qty + 1 } : { price, qty: 1 };
    updateTotal();
}

function updateTotal() {
    let total = Object.values(cart).reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('total-price').innerText = total;
    document.getElementById('final-total').innerText = total;
}

function toggleCart() {
    let modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'none') ? 'block' : 'none';
}

function sendOrder() {
    document.getElementById('msg').style.display = 'block';
    document.getElementById('send-btn').style.display = 'none';
}
