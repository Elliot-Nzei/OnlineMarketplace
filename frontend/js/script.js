document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the side menu for index.html
    function toggleMenu() {
        const sideMenu = document.querySelector('.side-menu');
        const overlay = document.querySelector('.overlay');
        const menuToggle = document.querySelector('.menu-toggle');

        if (sideMenu && overlay && menuToggle) {
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            menuToggle.classList.toggle('active');
        }
    }

    // Expose toggleMenu to the global scope if needed by inline onclick
    window.toggleMenu = toggleMenu;

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

    // Mobile Search Icon functionality
    const mobileSearchIcon = document.querySelector('.mobile-search-icon');
    const mobileSearchOverlay = document.querySelector('.mobile-search-overlay');
    const closeSearchIcon = document.querySelector('.close-search-icon');

    if (mobileSearchIcon && mobileSearchOverlay && closeSearchIcon) {
        mobileSearchIcon.addEventListener('click', () => {
            mobileSearchOverlay.classList.add('active');
        });

        closeSearchIcon.addEventListener('click', () => {
            mobileSearchOverlay.classList.remove('active');
        });

        mobileSearchOverlay.addEventListener('click', (e) => {
            if (e.target === mobileSearchOverlay) {
                mobileSearchOverlay.classList.remove('active');
            }
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

    // Mobile Category Sidebar Toggle (retained, but filters moved)
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

        categoryOverlay.addEventListener('click', (e) => {
            if (e.target === categoryOverlay) {
                categorySidebar.classList.remove('active');
                categoryOverlay.classList.remove('active');
            }
        });
    }

    // Category Page Specific JavaScript
    const filterSortModalOverlay = document.querySelector('.filter-sort-modal-overlay');
    const closeFilterSortModalBtn = document.querySelector('.filter-sort-modal .close-modal-btn');
    const applyFiltersModalBtn = document.querySelector('.filter-sort-modal .apply-filters-modal');
    const clearAllFiltersModalBtn = document.querySelector('.filter-sort-modal .clear-all-filters-modal');
    const mobileFilterSortBar = document.querySelector('.mobile-filter-sort-bar'); // Assuming this button will open the modal

    if (mobileFilterSortBar && filterSortModalOverlay && closeFilterSortModalBtn && applyFiltersModalBtn && clearAllFiltersModalBtn) {
        // Open modal when mobile filter/sort bar is clicked
        mobileFilterSortBar.addEventListener('click', () => {
            filterSortModalOverlay.classList.add('active');
        });

        // Close modal
        closeFilterSortModalBtn.addEventListener('click', () => {
            filterSortModalOverlay.classList.remove('active');
        });

        // Close modal when clicking outside
        filterSortModalOverlay.addEventListener('click', (e) => {
            if (e.target === filterSortModalOverlay) {
                filterSortModalOverlay.classList.remove('active');
            }
        });

        // Apply Filters (in modal)
        applyFiltersModalBtn.addEventListener('click', () => {
            console.log('Applying filters from modal...');
            // Add logic to apply filters here
            filterSortModalOverlay.classList.remove('active');
        });

        // Clear All Filters (in modal)
        clearAllFiltersModalBtn.addEventListener('click', () => {
            console.log('Clearing all filters from modal...');
            // Add logic to clear all filters here
            // Reset checkboxes
            document.querySelectorAll('.filter-sort-modal input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            // Reset radio buttons
            document.querySelectorAll('.filter-sort-modal input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });
            // Reset price range slider
            const priceRangeSliderModal = document.querySelector('.filter-sort-modal .price-range-slider');
            const priceRangeDisplayModal = document.querySelector('.filter-sort-modal .price-range-display');
            if (priceRangeSliderModal) {
                priceRangeSliderModal.value = priceRangeSliderModal.min;
                if (priceRangeDisplayModal) priceRangeDisplayModal.textContent = `$${priceRangeSliderModal.value} - $${priceRangeSliderModal.max}+`;
            }
        });
    }

    // View Toggle (Grid/List)
    document.querySelectorAll('.view-toggle').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.view-toggle').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const viewType = button.dataset.view;
            const productGrid = document.querySelector('.product-listing.category-product-grid .product-grid');
            if (productGrid) {
                if (viewType === 'list') {
                    productGrid.classList.add('list-view');
                } else {
                    productGrid.classList.remove('list-view');
                }
            }
            console.log(`Switched to ${viewType} view`);
        });
    });

    // Price Range Slider (Desktop and Mobile Modal)
    document.querySelectorAll('.price-range-slider').forEach(slider => {
        const display = slider.closest('.filter-group').querySelector('.price-range-display');
        if (display) {
            display.textContent = `$${slider.value} - $${slider.max}+`;
            slider.addEventListener('input', (event) => {
                display.textContent = `$${event.target.value} - $${event.target.max}+`;
            });
        }
    });

    // Clear Filters Button (Desktop)
    const desktopClearFiltersBtn = document.querySelector('.sticky-filter-sort-bar .clear-filters-btn');
    if (desktopClearFiltersBtn) {
        desktopClearFiltersBtn.addEventListener('click', () => {
            console.log('Clearing desktop filters...');
            // Reset checkboxes
            document.querySelectorAll('.category-sidebar.desktop-filters input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            // Reset radio buttons
            document.querySelectorAll('.category-sidebar.desktop-filters input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });
            // Reset price range slider
            const priceRangeSliderDesktop = document.querySelector('.category-sidebar.desktop-filters .price-range-slider');
            const priceRangeDisplayDesktop = document.querySelector('.category-sidebar.desktop-filters .price-range-display');
            if (priceRangeSliderDesktop) {
                priceRangeSliderDesktop.value = priceRangeSliderDesktop.min;
                if (priceRangeDisplayDesktop) priceRangeDisplayDesktop.textContent = `$${priceRangeSliderDesktop.value} - $${priceRangeSliderDesktop.max}+`;
            }
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
