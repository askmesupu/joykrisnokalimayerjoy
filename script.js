document.addEventListener('DOMContentLoaded', async () => {
const categories = ["Top-Selling","Men","Women","Popular"];

// Load all categories
for (const cat of categories) {
    await loadWatches(cat);
    const container = document.getElementById(cat.replace("-", "").toLowerCase());
    if (container) {
        watchData[cat].forEach(watch => {
            container.innerHTML += generateWatchCard(watch);
        });
    }
}

// Scroll animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.watch-card').forEach(card => observer.observe(card));

// Sidebar toggle
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuBtn.classList.toggle('open'); // three line to cross
});

});
