const watchData = {
"Top-Selling": [],
"Men": [],
"Women": [],
"Popular": []
};

// Coupon codes object (edit here)
const couponCodes = {
"SUPTO10": 10,
"SUPTO50": 50,
"SUPTO100": 100
};

// Load all watches from Watch-Collection folder
async function loadWatches(category) {
try {
const response = await fetch("Watch-Collection/${category}/index.json");
const folders = await response.json();
watchData[category] = [];

    for (const folder of folders) {
        const watchRes = await fetch(`Watch-Collection/${category}/${folder}/watch.json`);
        const watch = await watchRes.json();
        watchData[category].push(watch);
    }
} catch (error) {
    console.error(`Failed to load watches for ${category}:`, error);
}

}

// Generate HTML for watch card
function generateWatchCard(watch) {
const discount = watch.discount && watch.discount > 0 ? "<div class="original-price">BDT ${watch.price}</div><div class="discount-price">BDT ${Math.round(watch.price * (1 - watch.discount/100))}</div>" : "<div class="price">BDT ${watch.price}</div>";
return "<div class="watch-card" onclick="openWatch('${watch.category}','${watch.folder}')"> <img src="${watch.images[0]}" alt="${watch.name}" class="watch-img"> <h3>${watch.name}</h3> ${discount} <button class="buy-now">Buy Now</button> <button class="add-cart">Add to Cart</button> </div>";
}

// Open watch details page
function openWatch(category, folder) {
localStorage.setItem('currentWatch', JSON.stringify({category, folder}));
window.location.href = 'watch.html';
}

// Load watch details in watch.html
async function loadWatchDetails() {
const current = JSON.parse(localStorage.getItem('currentWatch'));
if (!current) return;

const res = await fetch(`Watch-Collection/${current.category}/${current.folder}/watch.json`);
const watch = await res.json();

// Populate details
document.getElementById('watch-name').textContent = watch.name;
const imgContainer = document.getElementById('watch-images');
imgContainer.innerHTML = '';
watch.images.forEach((img, idx) => {
    imgContainer.innerHTML += `<img src="${img}" alt="${watch.name} ${idx+1}" class="watch-thumb" onclick="openFullScreen('${img}')"><span class="img-counter">${idx+1}/${watch.images.length}</span>`;
});

const priceContainer = document.getElementById('watch-price');
if (watch.discount && watch.discount > 0) {
    priceContainer.innerHTML = `<div class="original-price">BDT ${watch.price}</div>
                                <div class="discount-price">BDT ${Math.round(watch.price * (1 - watch.discount/100))}</div>`;
} else {
    priceContainer.innerHTML = `<div class="price">BDT ${watch.price}</div>`;
}

document.getElementById('watch-description').textContent = watch.description || '';

}

// Fullscreen image
function openFullScreen(src) {
const overlay = document.createElement('div');
overlay.className = 'fullscreen-overlay';
overlay.innerHTML = "<img src="${src}" class="fullscreen-img"><span class="close-fullscreen" onclick="this.parentElement.remove()">×</span>";
document.body.appendChild(overlay);
}

// Apply coupon code
function applyCoupon() {
const code = document.getElementById('coupon-code').value.toUpperCase();
const discount = couponCodes[code] || 0;
const subtotal = parseFloat(document.getElementById('cart-subtotal').dataset.subtotal || 0);
if (discount > 0) {
const discounted = subtotal - discount;
document.getElementById('cart-total').textContent = "BDT ${discounted}";
} else {
document.getElementById('cart-total').textContent = "BDT ${subtotal}";
}
  }
