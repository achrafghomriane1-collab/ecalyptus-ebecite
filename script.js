// 1. البيانات
const menuData = {
    "PIZZAS": [
        { name: "Pizza Margherita", price: 600 },
        { name: "Pizza Végétarienne", price: 700 },
        { name: "Pizza Napolitaine", price: 700 },
        { name: "Pizza Poulet", price: 800 },
        { name: "Pizza Algéroise", price: 700 },
        { name: "Pizza Thon", price: 800 },
        { name: "Pizza Viande Hachée", price: 800 },
        { name: "Pizza Alpina", price: 900 },
        { name: "Pizza Capricieuse", price: 800 },
        { name: "Pizza Sauce Pesto", price: 1000 },
        { name: "Pizza 4 Fromages", price: 1200 },
        { name: "Pizza Fruits De Mer", price: 1400 }
    ],
    "ENTRÉES FROIDES": [
        { name: "Salade César", price: 700 },
        { name: "Salade Variée", price: 600 },
        { name: "Salade au Thon À La Catalane", price: 700 },
        { name: "Calamars Frits", price: 1500 },
        { name: "Scampi De Crevettes", price: 1100 }
    ],
    "ENTRÉES CHAUDES": [
        { name: "Soupe De Poisson", price: 600 },
        { name: "Gratin Poulet", price: 500 },
        { name: "Gratin Fruit De Mer", price: 600 },
        { name: "Omelette Crevettes", price: 800 },
        { name: "Beignets De Camembert", price: 600 }
    ],
    "POULETS": [
        { name: "Escalope à La Crème", price: 1200 },
        { name: "Vol Au Vent Sauce Pêcheur", price: 1400 },
        { name: "Escalope Chiken Curry", price: 1100 },
        { name: "Escalope Grillé", price: 900 },
        { name: "Cordan Bleu", price: 1100 },
        { name: "Wok De Poulet Façon thaï", price: 1200 }
    ],
    "SPÉCIALITÉ TUNISIENNE": [
        { name: "Ojja Fruits De Mer", price: 1500 },
        { name: "Ojjà Merguez", price: 1200 }
    ],
    "GRILLADES": [
        { name: "Filet De Boeuf Griller", price: 2200 },
        { name: "Entre Côte Grillée", price: 1900 },
        { name: "Côtelettes Grillées", price: 1900 },
        { name: "Noisettes Grillées", price: 1800 },
        { name: "Merguez Grillée", price: 1300 },
        { name: "Mixte Grillade", price: 4500 }
    ],
    "VIANDES ROUGES": [
        { name: "Filet Mignon", price: 2200 },
        { name: "Entrecôte", price: 1900 },
        { name: "Côtelettes", price: 0 }
    ],
    "PÂTES": [
        { name: "Bolognaise", price: 1100 },
        { name: "Putanesca", price: 900 },
        { name: "4 Fromages", price: 1400 },
        { name: "Pasta Alfredo", price: 1100 },
        { name: "Crevette Sauce Pesto", price: 1600 },
        { name: "Pasta Fruit De Mer", price: 1800 }
    ],
    "PAELLA": [
        { name: "Paella Dimarisco", price: 2500 },
        { name: "Paella Valencienne", price: 3000 }
    ],
    "POISSONS": [
        { name: "Crevettes Sauté À L'ail", price: 2200 },
        { name: "Crevettes En Sauce", price: 2200 },
        { name: "Calamares En Sauce", price: 1800 },
        { name: "Dorade Grillée", price: 2200 },
        { name: "Loup Grillée", price: 2200 },
        { name: "Espadon Sauce Normande", price: 2600 },
        { name: "Espadon Sauce Meunière", price: 2400 },
        { name: "Crevettes Grillée", price: 2200 }
    ],
    "DESSERTS & BOISSONS": [
        { name: "Soda", price: 150 },
        { name: "Eau minérale", price: 100 },
        { name: "Milshakes", price: 400 },
        { name: "Jus Nature", price: 400 },
        { name: "Café", price: 120 },
        { name: "Tiramisu", price: 400 },
        { name: "Crêpe Nutella", price: 400 }
    ]
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
