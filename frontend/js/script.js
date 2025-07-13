function toggleMenu() {
    console.log('toggleMenu called!');
    const sideMenu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.overlay');
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode', darkModeToggle.checked);
        });
    }
});