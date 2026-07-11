const menuData = {
    "ENTRÉES FROIDES": [{name:"Salade César",price:700},{name:"Salade Variée",price:600},{name:"Salade au Thon",price:700},{name:"Calamars Frits",price:1500},{name:"Scampi De Crevettes",price:1100}],
    "ENTRÉES CHAUDES": [{name:"Soupe De Poisson",price:600},{name:"Gratin Poulet",price:500},{name:"Gratin Fruit De Mer",price:600},{name:"Omelette Crevettes",price:800},{name:"Beignets De Camembert",price:600}],
    "POULETS": [{name:"Escalope à La Créme",price:1200},{name:"Vol Au Vent Sauce Pêcheur",price:1400},{name:"Escalope Chiken Curry",price:1100},{name:"Escalope Grillé",price:900},{name:"Cordan Bleu",price:1100},{name:"Wok De Poulet Façon thaï",price:1200}],
    "SPÉCIALITÉ TUNISIENNE": [{name:"Ojja Fruits De Mer",price:1500},{name:"Ojjà Merguez",price:1200}],
    "GRILLADES": [{name:"Filet De Boeuf Griller",price:2200},{name:"Entre Côte Grillée",price:1900},{name:"Côtelettes Grillées",price:1900},{name:"Noisettes Grillées",price:1800},{name:"Merguez Grillée",price:1300},{name:"Mixte Grillade",price:4500}],
    "PÂTES": [{name:"Bolognaise",price:1100},{name:"Putanesca",price:900},{name:"4 Fromages",price:1400},{name:"Pasta Alfredo",price:1100},{name:"Crevette Sauce Pesto",price:1600},{name:"Pasta Fruit De Mer",price:1800}],
    "PAELLA": [{name:"Paella Dimarisco",price:2500},{name:"Paella Valencienne",price:3000}],
    "PIZZAS": [{name:"Pizza Végétarienne",price:700},{name:"Pizza Margherita",price:600},{name:"Pizza Napolitaine",price:700},{name:"Pizza Poulet",price:800},{name:"Pizza Algéroise",price:700},{name:"Pizza Thon",price:800},{name:"Pizza Viande Hachée",price:800},{name:"Pizza Alpina",price:900},{name:"Pizza Capricieuse",price:800},{name:"Pizza Sauce Pesto",price:1000},{name:"Pizza 4 Fromages",price:1200},{name:"Pizza Fruits De Mer",price:1400}],
    "POISSONS": [{name:"Crevettes Sauté À L'ail",price:2200},{name:"Crevettes En Sauce",price:2200},{name:"Calamares En Sauce",price:1800},{name:"Dorade Grillée",price:2200},{name:"Loup Grillée",price:2200},{name:"Espadon Sauce Normande",price:2600},{name:"Espadon Sauce Meunière",price:2400},{name:"Crevettes Grillée",price:2200}],
    "DESSERTS & BOISSONS": [{name:"Tiramisu",price:400},{name:"Fondant au Chocolat",price:400},{name:"Mousse au Chocolat",price:400},{name:"Crème Brûlée",price:400},{name:"Soda",price:200},{name:"Jus Nature",price:400},{name:"Virgin Mojito",price:500},{name:"Café / Thé",price:150}]
};

let cart = {};
const app = document.getElementById('app');

function showPage(page) {
    if(page === 'welcome') app.innerHTML = `<div class="page"><h1>Bienvenue à Istirahat El Kalitoussa</h1><button onclick="showPage('table')">Entrer</button></div>`;
    else if(page === 'table') app.innerHTML = `<div class="page"><h2>Numéro de table</h2><input type="number" id="tableNum"><br><button onclick="showPage('menu')">Continuer</button></div>`;
    else if(page === 'menu') {
        app.innerHTML = `<h1>Menu</h1>` + Object.keys(menuData).map(c => `<button onclick="renderCat('${c}')">${c}</button>`).join('');
        document.getElementById('cart-footer').classList.remove('hidden');
    }
}

function renderCat(cat) {
    app.innerHTML = `<h1>${cat}</h1><button onclick="showPage('menu')">Retour</button>`;
    menuData[cat].forEach(i => app.innerHTML += `<div class="menu-item"><div>${i.name}<br>${i.price}da</div><div><button onclick="update('${i.name}',${i.price},-1)">-</button><span id="q-${i.name}">0</span><button onclick="update('${i.name}',${i.price},1)">+</button></div></div>`);
}

function update(n, p, c) {
    if(!cart[n]) cart[n] = {q:0, p:p};
    cart[n].q = Math.max(0, cart[n].q + c);
    if(cart[n].q === 0) delete cart[n];
    document.getElementById(`q-${n}`) ? document.getElementById(`q-${n}`).innerText = cart[n].q : null;
    let t = Object.values(cart).reduce((s, i) => s + (i.q * i.p), 0);
    document.getElementById('total-price').innerText = t;
}

function showCartModal() {
    document.getElementById('cart-items-list').innerHTML = Object.entries(cart).map(([n, i]) => `<div>${n} (${i.q}) - ${i.q*i.p}da</div>`).join('');
    document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCartModal() { document.getElementById('cart-modal').classList.add('hidden'); }
showPage('welcome');

