document.addEventListener('DOMContentLoaded', () => {
    // Account Dropdown Toggle
    const accountMenuToggle = document.querySelector('.account-menu-toggle');
    const accountDropdown = document.querySelector('.account-dropdown');

    if (accountMenuToggle && accountDropdown) {
        accountMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            accountDropdown.style.display = accountDropdown.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (e) => {
            if (!accountMenuToggle.contains(e.target) && !accountDropdown.contains(e.target)) {
                accountDropdown.style.display = 'none';
            }
        });
    }

    // Wishlist Icon Toggle
    document.querySelectorAll('.wishlist-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            // In a real application, you would send an AJAX request here to update the wishlist
            console.log('Wishlist icon toggled!');
        });
    });

    // Mobile Search Icon (Placeholder for modal/slide-down)
    const mobileSearchIcon = document.querySelector('.mobile-search-icon');
    if (mobileSearchIcon) {
        mobileSearchIcon.addEventListener('click', () => {
            alert('Mobile search functionality coming soon!');
            // In a real app, you'd show a search modal or expand the search bar
        });
    }

    // Dark mode toggle (retained from previous)
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode', darkModeToggle.checked);
        });
    }

    // Basic Lazy Loading (for product images)
    const lazyLoadImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyLoadImages.forEach(img => {
        imageObserver.observe(img);
    });

    // Mobile Category Sidebar Toggle
    const btnFilterCategory = document.querySelector('.btn-filter-category');
    const categorySidebar = document.querySelector('.category-sidebar');
    const closeSidebarBtn = document.querySelector('.close-sidebar-btn');
    const categoryOverlay = document.querySelector('.category-overlay');

    if (btnFilterCategory && categorySidebar && closeSidebarBtn && categoryOverlay) {
        btnFilterCategory.addEventListener('click', () => {
            categorySidebar.classList.add('active');
            categoryOverlay.classList.add('active');
        });

        closeSidebarBtn.addEventListener('click', () => {
            categorySidebar.classList.remove('active');
            categoryOverlay.classList.remove('active');
        });

        categoryOverlay.addEventListener('click', () => {
            categorySidebar.classList.remove('active');
            categoryOverlay.classList.remove('active');
        });
    }

    // Product Card Tap for Mobile (to reveal actions)
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Check if it's a mobile view (based on CSS media query breakpoint)
            if (window.innerWidth <= 992) {
                // Prevent default link behavior if any, but allow clicks on buttons inside
                if (!e.target.closest('.product-actions button')) {
                    card.classList.toggle('show-actions');
                }
            }
        });
    });
});