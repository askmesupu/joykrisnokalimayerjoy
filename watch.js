async function loadWatches(sectionId, folder) {
const container = document.getElementById(sectionId);
try {
const resIndex = await fetch("Watch-Collection/${folder}/index.json");
const indexData = await resIndex.json();
container.innerHTML = '';
for (const key in indexData) {
const watchData = indexData[key];
const card = document.createElement('div');
card.classList.add('watch-card');
card.innerHTML = "<h3>${watchData.name}</h3> <p>Price: ${watchData.price} BDT</p> <button onclick="location.href='watch.html?id=${watchData.id}'">View Details</button>";
container.appendChild(card);
}
} catch (err) {
container.innerHTML = '<p>Failed to load watches.</p>';
}
}

// Example usage
loadWatches('top-selling-container', 'Top-Selling');
loadWatches('all-watches-container', 'Men'); // load all Men as example
