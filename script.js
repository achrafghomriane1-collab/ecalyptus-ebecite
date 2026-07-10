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
let cart = {}; 

// 2. التبديل بين الصفحات
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

// 3. تحديث العداد
function updateTotal() {
    let totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    document.getElementById('total-display').innerText = "سلة الطلبات: " + totalItems + " أصناف";
}

// 4. إضافة/حذف من الطلب
function addToOrder(name) {
    cart[name] = (cart[name] || 0) + 1;
    updateTotal();
}

function removeFromOrder(name) {
    if (cart[name] > 1) {
        cart[name]--;
    } else {
        delete cart[name];
    }
    updateTotal();
    showCart(); // تحديث السلة بعد الحذف
}

// 5. إنشاء أزرار التصنيفات (مدمج مع المنطق السابق)
const btnContainer = document.getElementById('category-buttons');
for (let cat in menuData) {
    let btn = document.createElement('button');
    btn.innerText = cat;
    btn.className = "category-btn"; // استخدم هذا الكلاس في CSS
    btn.onclick = () => {
        showPage('page3');
        const container = document.getElementById('category-items');
        container.innerHTML = `<h2>${cat}</h2>`;
        menuData[cat].forEach(item => {
            container.innerHTML += `
                <div class="item">
                    <span>${item.name} (${item.price} DA)</span>
                    <button onclick="addToOrder('${item.name}')">+</button>
                </div>`;
        });
        container.innerHTML += `<button onclick="showCart()">عرض السلة النهائية</button>`;
    };
    btnContainer.appendChild(btn);
}

// 6. عرض السلة
function showCart() {
    showPage('page3');
    const container = document.getElementById('category-items');
    container.innerHTML = `<h2>سلة الطلبات</h2>`;
    for (let name in cart) {
        container.innerHTML += `
            <div class="item">
                <span>${name}</span>
                <span>
                    <button onclick="removeFromOrder('${name}')">-</button>
                    (${cart[name]})
                    <button onclick="addToOrder('${name}')">+</button>
                </span>
            </div>`;
    }
    container.innerHTML += `<button class="send-btn" onclick="sendOrder()">إرسال الطلب النهائي</button>`;
}

function sendOrder() {
    alert("تم استلام طلبكم! شكراً لاختياركم إستراحة الكاليتوسة.");
}

