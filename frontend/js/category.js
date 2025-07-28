document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.getElementById('category-list');
    const categoryBodyTitle = document.getElementById('category-body-title');
    const categoryDescription = document.getElementById('category-description');
    const categoryBanner = document.getElementById('category-banner');
    const categoryContent = document.getElementById('category-content');

    const sortBySelect = document.getElementById('sort-by');
    const gridViewToggle = document.getElementById('grid-view-toggle');
    const listViewToggle = document.getElementById('list-view-toggle');
    const activeFilterChips = document.getElementById('active-filter-chips');
    const clearAllFiltersBtn = document.getElementById('clear-all-filters');

    const priceRangeSlider = document.getElementById('price-range');
    const minPriceDisplay = document.getElementById('min-price-display');
    const maxPriceDisplay = document.getElementById('max-price-display');

    const filterSortModalOverlay = document.getElementById('filter-sort-modal-overlay');
    const closeFilterModalBtn = document.getElementById('close-filter-modal');
    const openFilterModalMobileBtn = document.getElementById('open-filter-modal-mobile');
    const applyFiltersMobileBtn = document.getElementById('apply-filters-mobile');
    const resetFiltersMobileBtn = document.getElementById('reset-filters-mobile');

    const priceRangeSliderMobile = document.getElementById('price-range-mobile');
    const minPriceDisplayMobile = document.getElementById('min-price-display-mobile');
    const maxPriceDisplayMobile = document.getElementById('max-price-display-mobile');
    const sortOptionsMobile = document.querySelector('.sort-options-mobile');
    const inStockFilterMobile = document.getElementById('in-stock-filter-mobile');
    const ratingFiltersMobile = document.querySelectorAll('input[name="rating-mobile"]');

    let currentFilters = {
        sortBy: 'featured',
        price: 1000,
        rating: 0,
        inStock: false,
        brand: []
    };
    let currentView = 'grid';

    // Comprehensive category data including subcategories and products
    // (Updated to include mainCategory and subcategory in product data for easier filtering/view all)

    // Comprehensive category data including subcategories and products
    const allCategoryData = {
        "Electronics": {
            banner: "https://via.placeholder.com/800x200/007bff/ffffff?text=Electronics+Banner",
            description: "Explore the latest in electronics, from cutting-edge smartphones to powerful laptops and essential accessories.",
            subcategories: {
                "Smartphones": [
                    { name: "Smartphone X", price: "$699", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.5 },
                    { name: "Smartphone Y", price: "$599", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.0 },
                    { name: "Smartphone Z", price: "$799", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 3.8 },
                    { name: "Smartphone A", price: "$499", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.2 }
                ],
                "Laptops": [
                    { name: "Laptop Pro", price: "$1200", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.8 },
                    { name: "Gaming Laptop", price: "$1500", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.7 },
                    { name: "Ultrabook", price: "$900", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 4.1 }
                ],
                "Accessories": [
                    { name: "Wireless Earbuds", price: "$99", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.5 },
                    { name: "Smartwatch", price: "$150", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.0 }
                ],
                "Televisions": [
                    { name: "Smart TV 4K", price: "$800", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.6 },
                    { name: "LED TV", price: "$400", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.9 }
                ],
                "Cameras": [
                    { name: "DSLR Camera", price: "$700", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.4 },
                    { name: "Mirrorless Camera", price: "$900", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 4.2 }
                ]
            }
        },
        "Fashion": {
            banner: "https://via.placeholder.com/800x200/28a745/ffffff?text=Fashion+Trends",
            description: "Stay in style with our diverse collection of fashion apparel for men, women, and kids.",
            subcategories: {
                "Men's Fashion": [
                    { name: "Men's T-Shirt", price: "$25", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.5 },
                    { name: "Men's Jeans", price: "$50", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.0 },
                    { name: "Men's Jacket", price: "$80", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 3.7 }
                ],
                "Women's Fashion": [
                    { name: "Women's Dress", price: "$45", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.2 },
                    { name: "Women's Skirt", price: "$30", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.9 },
                    { name: "Women's Blouse", price: "$35", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 4.1 }
                ],
                "Kids' Fashion": [
                    { name: "Kids' T-Shirt", price: "$15", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.0 },
                    { name: "Kids' Jeans", price: "$25", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.5 }
                ],
                "Footwear": [
                    { name: "Sneakers", price: "$60", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.3 },
                    { name: "Sandals", price: "$30", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 3.8 }
                ]
            }
        },
        "Home & Garden": {
            banner: "https://via.placeholder.com/800x200/ffc107/000000?text=Home+%26+Garden+Essentials",
            description: "Furnish your home and cultivate your garden with our wide range of products.",
            subcategories: {
                "Furniture": [
                    { name: "Sofa Set", price: "$800", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.5 },
                    { name: "Dining Table", price: "$400", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.0 }
                ],
                "Decor": [
                    { name: "Wall Art", price: "$50", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.9 },
                    { name: "Vase", price: "$20", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 3.5 }
                ],
                "Kitchenware": [
                    { name: "Blender", price: "$70", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.1 },
                    { name: "Cookware Set", price: "$120", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.3 }
                ],
                "Gardening": [
                    { name: "Garden Hose", price: "$20", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.7 },
                    { name: "Gardening Tools Set", price: "$40", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 4.0 }
                ]
            }
        },
        "Books & Media": {
            banner: "https://via.placeholder.com/800x200/17a2b8/ffffff?text=Books+%26+Media+Collection",
            description: "Dive into new worlds with our extensive collection of books, movies, and music.",
            subcategories: {
                "Fiction": [
                    { name: "Fantasy Novel", price: "$15", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.0 },
                    { name: "Mystery Thriller", price: "$12", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.8 }
                ],
                "Non-Fiction": [
                    { name: "Biography", price: "$18", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.2 },
                    { name: "Cookbook", price: "$20", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 4.0 }
                ],
                "Movies": [
                    { name: "Sci-Fi Movie", price: "$10", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.5 },
                    { name: "Action Movie", price: "$10", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.7 }
                ],
                "Music": [
                    { name: "Pop Album", price: "$15", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.1 },
                    { name: "Rock Album", price: "$15", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 3.9 }
                ]
            }
        },
        "Sports & Outdoors": {
            banner: "https://via.placeholder.com/800x200/dc3545/ffffff?text=Sports+%26+Outdoors+Gear",
            description: "Gear up for your next adventure with our sports and outdoor equipment.",
            subcategories: {
                "Fitness": [
                    { name: "Running Shoes", price: "$70", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.3 },
                    { name: "Dumbbell Set", price: "$50", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.0 }
                ],
                "Camping": [
                    { name: "Camping Tent", price: "$120", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.5 },
                    { name: "Sleeping Bag", price: "$40", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 4.1 }
                ],
                "Cycling": [
                    { name: "Mountain Bike", price: "$500", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.6 },
                    { name: "Bike Helmet", price: "$30", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.9 }
                ]
            }
        },
        "Automotive": {
            banner: "https://via.placeholder.com/800x200/6f42c1/ffffff?text=Automotive+Parts",
            description: "Find everything you need for your vehicle, from parts to accessories.",
            subcategories: {
                "Car Parts": [
                    { name: "Car Wax", price: "$18", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.7 },
                    { name: "Tire Pressure Gauge", price: "$12", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 3.5 }
                ],
                "Motorcycles": [
                    { name: "Motorcycle Helmet", price: "$100", image: "../../assets/placeholder-product.jpg", inStock: true, rating: 4.0 },
                    { name: "Motorcycle Jacket", price: "$150", image: "../../assets/placeholder-product.jpg", inStock: false, rating: 4.2 }
                ]
            }
        }
    };

    const generateProductCards = (productsToDisplay, mainCategoryName = '', subcategoryName = '', isPreview = false) => {
        let html = '<div class="product-grid">';
        productsToDisplay.forEach(product => {
            html += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <div class="product-actions">
                        <button class="add-to-cart"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                        <button class="quick-view-btn">Quick View</button>
                        <button class="add-to-wishlist"><i class="fas fa-heart"></i></button>
                    </div>
                </div>
            `;
        });
        html += '</div>';

        if (isPreview && productsToDisplay.length > 4) {
            html += `<button class="view-all-products-button" data-main-category="${encodeURIComponent(mainCategoryName)}" data-subcategory="${encodeURIComponent(subcategoryName)}">View All Products</button>`;
        }
        return html;
    };

    // Function to generate subcategory blocks for a main category
    const generateSubcategoryBlocks = (mainCategoryName) => {
        const mainCategoryData = allCategoryData[mainCategoryName];
        if (!mainCategoryData || !mainCategoryData.subcategories) {
            return '<p>No subcategories found for this category.</p>';
        }

        let html = '';
        for (const subcategoryName in mainCategoryData.subcategories) {
            const products = mainCategoryData.subcategories[subcategoryName];
            html += `
                <section class="subcategory-section">
                    <div class="subcategory-header">
                        <h3>${subcategoryName}</h3>
                        <a href="./products.html?category=${encodeURIComponent(mainCategoryName)}&subcategory=${encodeURIComponent(subcategoryName)}" class="view-all-link">View All <i class="fas fa-arrow-right"></i></a>
                    </div>
                    ${generateProductCards(products, mainCategoryName, subcategoryName, true)}
                </section>
            `;
        }
        return html;
    };

    // Function to generate skeleton product cards
    const generateSkeletonProductCards = () => {
        let html = '<div class="product-grid">';
        for (let i = 0; i < 4; i++) { // Generate 4 skeleton cards
            html += `
                <div class="product-card skeleton-loader">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-text" style="width: 80%;"></div>
                    <div class="skeleton-text" style="width: 50%;"></div>
                    <div class="product-actions">
                        <div class="skeleton-button" style="width: 60%;"></div>
                        <div class="skeleton-button" style="width: 30%;"></div>
                    </div>
                </div>
            `;
        }
        html += '</div>';
        return html;
    };

    // Function to generate skeleton subcategory blocks
    const generateSkeletonSubcategoryBlocks = () => {
        let html = '';
        for (let i = 0; i < 2; i++) { // Generate 2 skeleton subcategory blocks
            html += `
                <section class="subcategory-section skeleton-loader">
                    <div class="subcategory-header">
                        <div class="skeleton-text" style="width: 40%; height: 1.4em;"></div>
                        <div class="skeleton-text" style="width: 20%; height: 1em;"></div>
                    </div>
                    ${generateSkeletonProductCards()}
                </section>
            `;
        }
        return html;
    };

    // Function to handle category selection
    const selectCategory = (categoryElement) => {
        // Remove 'active' class from previously selected item
        const currentActive = categoryList.querySelector('li.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }

        // Add 'active' class to the clicked item
        categoryElement.classList.add('active');

        const selectedCategory = categoryElement.dataset.category;
        let categoryInfo = allCategoryData[selectedCategory];
        let isMainCategory = true;

        if (!categoryInfo) { // It's a subcategory
            isMainCategory = false;
            for (const mainCat in allCategoryData) {
                if (allCategoryData[mainCat].subcategories && allCategoryData[mainCat].subcategories[selectedCategory]) {
                    categoryInfo = {
                        banner: allCategoryData[mainCat].banner, // Use main category banner for subcategory
                        description: `Explore all products in ${selectedCategory}.`,
                        products: allCategoryData[mainCat].subcategories[selectedCategory]
                    };
                    break;
                }
            }
        }

        categoryBodyTitle.textContent = selectedCategory;

        // Show skeleton loaders immediately
        categoryBanner.innerHTML = '<div class="skeleton-image" style="height: 200px;"></div>';
        categoryDescription.innerHTML = '<div class="skeleton-text" style="width: 100%;"></div><div class="skeleton-text" style="width: 80%;"></div>';

        if (isMainCategory) {
            categoryContent.innerHTML = generateSkeletonSubcategoryBlocks();
        } else {
            categoryContent.innerHTML = generateSkeletonProductCards();
        }

        // Simulate network request delay
        setTimeout(() => {
            // Update banner and description with actual content
            if (categoryInfo) {
                categoryBanner.innerHTML = `<img src="${categoryInfo.banner}" alt="${selectedCategory} Banner">`;
                categoryDescription.textContent = categoryInfo.description;
            } else {
                categoryBanner.innerHTML = '';
                categoryDescription.textContent = '';
            }

            // Render actual content after delay
            if (isMainCategory) {
                categoryContent.innerHTML = generateSubcategoryBlocks(selectedCategory);
            } else if (categoryInfo && categoryInfo.products) {
                categoryContent.innerHTML = generateProductCards(categoryInfo.products, selectedCategory, '', false);
            } else {
                categoryContent.innerHTML = `<p>No content available for ${selectedCategory}.</p>`;
            }
            applyFiltersAndSort(); // Apply filters and sort after content is loaded
        }, 800); // Simulate 800ms loading time
    };

    categoryList.addEventListener('click', (event) => {
        const target = event.target;
        const listItem = target.closest('li');

        if (listItem) {
            if (listItem.classList.contains('has-submenu')) {
                // Toggle submenu
                listItem.classList.toggle('expanded');
                const submenu = listItem.querySelector('.submenu');
                if (submenu) {
                    submenu.style.maxHeight = listItem.classList.contains('expanded') ? submenu.scrollHeight + "px" : "0";
                }
                // If a main category with submenu is clicked, also select it
                selectCategory(listItem);
            } else if (listItem.closest('.submenu')) {
                // If a subcategory is clicked
                selectCategory(listItem);
            } else {
                // If a regular category (without submenu) is clicked
                selectCategory(listItem);
            }
        }
    });

    // Event Listeners for new elements
    sortBySelect.addEventListener('change', (e) => {
        currentFilters.sortBy = e.target.value;
        applyFiltersAndSort();
    });

    gridViewToggle.addEventListener('click', () => {
        currentView = 'grid';
        gridViewToggle.classList.add('active');
        listViewToggle.classList.remove('active');
        applyFiltersAndSort();
    });

    listViewToggle.addEventListener('click', () => {
        currentView = 'list';
        listViewToggle.classList.add('active');
        gridViewToggle.classList.remove('active');
        applyFiltersAndSort();
    });

    clearAllFiltersBtn.addEventListener('click', () => {
        currentFilters = {
            sortBy: 'featured',
            price: 1000,
            rating: 0,
            inStock: false,
            brand: []
        };
        // Reset UI elements
        sortBySelect.value = 'featured';
        priceRangeSlider.value = 1000;
        minPriceDisplay.textContent = '$0';
        maxPriceDisplay.textContent = '$1000+';
        document.getElementById('in-stock-filter').checked = false;
        document.querySelectorAll('input[name="rating"]').forEach(radio => radio.checked = false);
        activeFilterChips.innerHTML = '';
        applyFiltersAndSort();
    });

    priceRangeSlider.addEventListener('input', (e) => {
        currentFilters.price = parseInt(e.target.value);
        maxPriceDisplay.textContent = `${e.target.value}${e.target.value == 1000 ? '+' : ''}`;
        applyFiltersAndSort();
    });

    // Mobile Filter Modal Event Listeners
    openFilterModalMobileBtn.addEventListener('click', () => {
        filterSortModalOverlay.classList.add('active');
    });

    closeFilterModalBtn.addEventListener('click', () => {
        filterSortModalOverlay.classList.remove('active');
    });

    applyFiltersMobileBtn.addEventListener('click', () => {
        currentFilters.sortBy = sortOptionsMobile.querySelector('input[name="sort-mobile"]:checked').value;
        currentFilters.price = parseInt(priceRangeSliderMobile.value);
        currentFilters.inStock = inStockFilterMobile.checked;
        currentFilters.rating = parseInt(Array.from(ratingFiltersMobile).find(radio => radio.checked)?.value || 0);
        // Brand filter for mobile can be added here if needed

        filterSortModalOverlay.classList.remove('active');
        applyFiltersAndSort();
    });

    resetFiltersMobileBtn.addEventListener('click', () => {
        // Reset mobile filter UI
        sortOptionsMobile.querySelector('input[value="featured"]').checked = true;
        priceRangeSliderMobile.value = 1000;
        minPriceDisplayMobile.textContent = '$0';
        maxPriceDisplayMobile.textContent = '$1000+';
        inStockFilterMobile.checked = false;
        ratingFiltersMobile.forEach(radio => radio.checked = false);

        // Apply reset to currentFilters and re-render
        currentFilters = {
            sortBy: 'featured',
            price: 1000,
            rating: 0,
            inStock: false,
            brand: []
        };
        applyFiltersAndSort();
    });

    priceRangeSliderMobile.addEventListener('input', (e) => {
        minPriceDisplayMobile.textContent = '$0';
        maxPriceDisplayMobile.textContent = `${e.target.value}${e.target.value == 1000 ? '+' : ''}`;
    });

    // Initial load: Select 'Electronics' by default
    const initialCategoryElement = categoryList.querySelector('li[data-category="Electronics"]');
    if (initialCategoryElement) {
        selectCategory(initialCategoryElement);
        initialCategoryElement.classList.add('expanded');
        const submenu = initialCategoryElement.querySelector('.submenu');
        if (submenu) {
            submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
    }

    function applyFiltersAndSort() {
        const selectedCategoryElement = categoryList.querySelector('li.active');
        if (!selectedCategoryElement) return;

        const selectedCategoryName = selectedCategoryElement.dataset.category;
        const categoryInfo = allCategoryData[selectedCategoryName];

        let productsToFilter = [];
        if (categoryInfo && categoryInfo.subcategories) {
            // If it's a main category, gather products from all its subcategories
            for (const subcategoryName in categoryInfo.subcategories) {
                productsToFilter = productsToFilter.concat(categoryInfo.subcategories[subcategoryName]);
            }
        } else if (categoryInfo && categoryInfo.products) {
            // If it's a direct subcategory (or a category with direct products)
            productsToFilter = categoryInfo.products;
        } else {
            categoryContent.innerHTML = `<p>No content available for ${selectedCategoryName}.</p>`;
            return;
        }

        let filteredProducts = productsToFilter;

        // Apply filters
        if (currentFilters.price < 1000) {
            filteredProducts = filteredProducts.filter(p => parseFloat(p.price.replace('
        }
        if (currentFilters.inStock) {
            // Assuming products have an 'inStock' property
            filteredProducts = filteredProducts.filter(p => p.inStock);
        }
        if (currentFilters.rating > 0) {
            // Assuming products have a 'rating' property
            filteredProducts = filteredProducts.filter(p => p.rating >= currentFilters.rating);
        }
        // Apply brand filter if implemented

        // Apply sorting
        switch (currentFilters.sortBy) {
            case 'price-asc':
                filteredProducts.sort((a, b) => parseFloat(a.price.replace(', '')) - parseFloat(b.price.replace(', '')));
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => parseFloat(b.price.replace(', '')) - parseFloat(a.price.replace(', '')));
                break;
            case 'newest':
                // Assuming products have a 'dateAdded' property or similar
                // filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            case 'top-rated':
                // Assuming products have a 'rating' property
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'featured':
            default:
                // Keep original order or define a featured logic
                break;
        }

        // Render products based on current view
        categoryContent.innerHTML = generateProductCards(filteredProducts, false);
        if (currentView === 'list') {
            categoryContent.querySelector('.product-grid').classList.add('list-view');
        } else {
            categoryContent.querySelector('.product-grid').classList.remove('list-view');
        }

        updateFilterChips();
    }

    function updateFilterChips() {
        activeFilterChips.innerHTML = '';
        if (currentFilters.price < 1000) {
            addFilterChip(`Price: <${currentFilters.price}`, 'price');
        }
        if (currentFilters.inStock) {
            addFilterChip('In Stock', 'inStock');
        }
        if (currentFilters.rating > 0) {
            addFilterChip(`Rating: ${currentFilters.rating} Stars`, 'rating');
        }
        // Add brand chips if implemented
    }

    function addFilterChip(text, filterType) {
        const chip = document.createElement('span');
        chip.classList.add('filter-chip');
        chip.innerHTML = `${text} <i class="fas fa-times remove-filter" data-filter-type="${filterType}"></i>`;
        activeFilterChips.appendChild(chip);

        chip.querySelector('.remove-filter').addEventListener('click', (e) => {
            const type = e.target.dataset.filterType;
            if (type === 'price') {
                currentFilters.price = 1000;
                priceRangeSlider.value = 1000;
                minPriceDisplay.textContent = '$0';
                maxPriceDisplay.textContent = '$1000+';
            } else if (type === 'inStock') {
                currentFilters.inStock = false;
                document.getElementById('in-stock-filter').checked = false;
            } else if (type === 'rating') {
                currentFilters.rating = 0;
                document.querySelectorAll('input[name="rating"]').forEach(radio => radio.checked = false);
            }
            applyFiltersAndSort();
        });
    }

});, '')) <= currentFilters.price);
        }
        if (currentFilters.inStock) {
            // Assuming products have an 'inStock' property
            filteredProducts = filteredProducts.filter(p => p.inStock);
        }
        if (currentFilters.rating > 0) {
            // Assuming products have a 'rating' property
            filteredProducts = filteredProducts.filter(p => p.rating >= currentFilters.rating);
        }
        // Apply brand filter if implemented

        // Apply sorting
        switch (currentFilters.sortBy) {
            case 'price-asc':
                filteredProducts.sort((a, b) => parseFloat(a.price.replace(', '')) - parseFloat(b.price.replace(', '')));
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => parseFloat(b.price.replace(', '')) - parseFloat(a.price.replace(', '')));
                break;
            case 'newest':
                // Assuming products have a 'dateAdded' property or similar
                // filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            case 'top-rated':
                // Assuming products have a 'rating' property
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'featured':
            default:
                // Keep original order or define a featured logic
                break;
        }

        // Render products based on current view
        categoryContent.innerHTML = generateProductCards(filteredProducts, false);
        if (currentView === 'list') {
            categoryContent.querySelector('.product-grid').classList.add('list-view');
        } else {
            categoryContent.querySelector('.product-grid').classList.remove('list-view');
        }

        updateFilterChips();
    }

    function updateFilterChips() {
        activeFilterChips.innerHTML = '';
        if (currentFilters.price < 1000) {
            addFilterChip(`Price: <${currentFilters.price}`, 'price');
        }
        if (currentFilters.inStock) {
            addFilterChip('In Stock', 'inStock');
        }
        if (currentFilters.rating > 0) {
            addFilterChip(`Rating: ${currentFilters.rating} Stars`, 'rating');
        }
        // Add brand chips if implemented
    }

    function addFilterChip(text, filterType) {
        const chip = document.createElement('span');
        chip.classList.add('filter-chip');
        chip.innerHTML = `${text} <i class="fas fa-times remove-filter" data-filter-type="${filterType}"></i>`;
        activeFilterChips.appendChild(chip);

        chip.querySelector('.remove-filter').addEventListener('click', (e) => {
            const type = e.target.dataset.filterType;
            if (type === 'price') {
                currentFilters.price = 1000;
                priceRangeSlider.value = 1000;
                minPriceDisplay.textContent = '$0';
                maxPriceDisplay.textContent = '$1000+';
            } else if (type === 'inStock') {
                currentFilters.inStock = false;
                document.getElementById('in-stock-filter').checked = false;
            } else if (type === 'rating') {
                currentFilters.rating = 0;
                document.querySelectorAll('input[name="rating"]').forEach(radio => radio.checked = false);
            }
            applyFiltersAndSort();
        });
    }

});