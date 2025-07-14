document.addEventListener('DOMContentLoaded', () => {
    const categoryList = document.getElementById('category-list');
    const categoryBodyTitle = document.getElementById('category-body-title');
    const categoryBanner = document.getElementById('category-banner');
    const categoryDescription = document.getElementById('category-description');
    const categoryContent = document.getElementById('category-content');

    // Comprehensive category data including subcategories and products
    const allCategoryData = {
        "Electronics": {
            banner: "https://via.placeholder.com/800x200/007bff/ffffff?text=Electronics+Banner",
            description: "Explore the latest in electronics, from cutting-edge smartphones to powerful laptops and essential accessories.",
            subcategories: {
                "Smartphones": [
                    { name: "Smartphone X", price: "$699", image: "../../assets/placeholder-product.jpg" },
                    { name: "Smartphone Y", price: "$599", image: "../../assets/placeholder-product.jpg" },
                    { name: "Smartphone Z", price: "$799", image: "../../assets/placeholder-product.jpg" },
                    { name: "Smartphone A", price: "$499", image: "../../assets/placeholder-product.jpg" }
                ],
                "Laptops": [
                    { name: "Laptop Pro", price: "$1200", image: "../../assets/placeholder-product.jpg" },
                    { name: "Gaming Laptop", price: "$1500", image: "../../assets/placeholder-product.jpg" },
                    { name: "Ultrabook", price: "$900", image: "../../assets/placeholder-product.jpg" }
                ],
                "Accessories": [
                    { name: "Wireless Earbuds", price: "$99", image: "../../assets/placeholder-product.jpg" },
                    { name: "Smartwatch", price: "$150", image: "../../assets/placeholder-product.jpg" }
                ],
                "Televisions": [
                    { name: "Smart TV 4K", price: "$800", image: "../../assets/placeholder-product.jpg" },
                    { name: "LED TV", price: "$400", image: "../../assets/placeholder-product.jpg" }
                ],
                "Cameras": [
                    { name: "DSLR Camera", price: "$700", image: "../../assets/placeholder-product.jpg" },
                    { name: "Mirrorless Camera", price: "$900", image: "../../assets/placeholder-product.jpg" }
                ]
            }
        },
        "Fashion": {
            banner: "https://via.placeholder.com/800x200/28a745/ffffff?text=Fashion+Trends",
            description: "Stay in style with our diverse collection of fashion apparel for men, women, and kids.",
            subcategories: {
                "Men's Fashion": [
                    { name: "Men's T-Shirt", price: "$25", image: "../../assets/placeholder-product.jpg" },
                    { name: "Men's Jeans", price: "$50", image: "../../assets/placeholder-product.jpg" },
                    { name: "Men's Jacket", price: "$80", image: "../../assets/placeholder-product.jpg" }
                ],
                "Women's Fashion": [
                    { name: "Women's Dress", price: "$45", image: "../../assets/placeholder-product.jpg" },
                    { name: "Women's Skirt", price: "$30", image: "../../assets/placeholder-product.jpg" },
                    { name: "Women's Blouse", price: "$35", image: "../../assets/placeholder-product.jpg" }
                ],
                "Kids' Fashion": [
                    { name: "Kids' T-Shirt", price: "$15", image: "../../assets/placeholder-product.jpg" },
                    { name: "Kids' Jeans", price: "$25", image: "../../assets/placeholder-product.jpg" }
                ],
                "Footwear": [
                    { name: "Sneakers", price: "$60", image: "../../assets/placeholder-product.jpg" },
                    { name: "Sandals", price: "$30", image: "../../assets/placeholder-product.jpg" }
                ]
            }
        },
        "Home & Garden": {
            banner: "https://via.placeholder.com/800x200/ffc107/000000?text=Home+%26+Garden+Essentials",
            description: "Furnish your home and cultivate your garden with our wide range of products.",
            subcategories: {
                "Furniture": [
                    { name: "Sofa Set", price: "$800", image: "../../assets/placeholder-product.jpg" },
                    { name: "Dining Table", price: "$400", image: "../../assets/placeholder-product.jpg" }
                ],
                "Decor": [
                    { name: "Wall Art", price: "$50", image: "../../assets/placeholder-product.jpg" },
                    { name: "Vase", price: "$20", image: "../../assets/placeholder-product.jpg" }
                ],
                "Kitchenware": [
                    { name: "Blender", price: "$70", image: "../../assets/placeholder-product.jpg" },
                    { name: "Cookware Set", price: "$120", image: "../../assets/placeholder-product.jpg" }
                ],
                "Gardening": [
                    { name: "Garden Hose", price: "$20", image: "../../assets/placeholder-product.jpg" },
                    { name: "Gardening Tools Set", price: "$40", image: "../../assets/placeholder-product.jpg" }
                ]
            }
        },
        "Books & Media": {
            banner: "https://via.placeholder.com/800x200/17a2b8/ffffff?text=Books+%26+Media+Collection",
            description: "Dive into new worlds with our extensive collection of books, movies, and music.",
            subcategories: {
                "Fiction": [
                    { name: "Fantasy Novel", price: "$15", image: "../../assets/placeholder-product.jpg" },
                    { name: "Mystery Thriller", price: "$12", image: "../../assets/placeholder-product.jpg" }
                ],
                "Non-Fiction": [
                    { name: "Biography", price: "$18", image: "../../assets/placeholder-product.jpg" },
                    { name: "Cookbook", price: "$20", image: "../../assets/placeholder-product.jpg" }
                ],
                "Movies": [
                    { name: "Sci-Fi Movie", price: "$10", image: "../../assets/placeholder-product.jpg" },
                    { name: "Action Movie", price: "$10", image: "../../assets/placeholder-product.jpg" }
                ],
                "Music": [
                    { name: "Pop Album", price: "$15", image: "../../assets/placeholder-product.jpg" },
                    { name: "Rock Album", price: "$15", image: "../../assets/placeholder-product.jpg" }
                ]
            }
        },
        "Sports & Outdoors": {
            banner: "https://via.placeholder.com/800x200/dc3545/ffffff?text=Sports+%26+Outdoors+Gear",
            description: "Gear up for your next adventure with our sports and outdoor equipment.",
            subcategories: {
                "Fitness": [
                    { name: "Running Shoes", price: "$70", image: "../../assets/placeholder-product.jpg" },
                    { name: "Dumbbell Set", price: "$50", image: "../../assets/placeholder-product.jpg" }
                ],
                "Camping": [
                    { name: "Camping Tent", price: "$120", image: "../../assets/placeholder-product.jpg" },
                    { name: "Sleeping Bag", price: "$40", image: "../../assets/placeholder-product.jpg" }
                ],
                "Cycling": [
                    { name: "Mountain Bike", price: "$500", image: "../../assets/placeholder-product.jpg" },
                    { name: "Bike Helmet", price: "$30", image: "../../assets/placeholder-product.jpg" }
                ]
            }
        },
        "Automotive": {
            banner: "https://via.placeholder.com/800x200/6f42c1/ffffff?text=Automotive+Parts",
            description: "Find everything you need for your vehicle, from parts to accessories.",
            subcategories: {
                "Car Parts": [
                    { name: "Car Wax", price: "$18", image: "../../assets/placeholder-product.jpg" },
                    { name: "Tire Pressure Gauge", price: "$12", image: "../../assets/placeholder-product.jpg" }
                ],
                "Motorcycles": [
                    { name: "Motorcycle Helmet", price: "$100", image: "../../assets/placeholder-product.jpg" },
                    { name: "Motorcycle Jacket", price: "$150", image: "../../assets/placeholder-product.jpg" }
                ]
            }
        }
    };

    // Function to generate product cards for a given array of products
    const generateProductCards = (products) => {
        if (!products || products.length === 0) {
            return '<p>No products found.</p>';
        }
        let html = '<div class="product-grid">';
        products.slice(0, 4).forEach(product => { // Limit to 4 products for preview
            html += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                    <div class="product-actions">
                        <button class="add-to-cart"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                        <button class="add-to-wishlist"><i class="fas fa-heart"></i></button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
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
                        <a href="./shop.html?category=${encodeURIComponent(mainCategoryName)}&subcategory=${encodeURIComponent(subcategoryName)}" class="view-all-link">View All <i class="fas fa-arrow-right"></i></a>
                    </div>
                    ${generateProductCards(products)}
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
        categoryBodyTitle.textContent = selectedCategory;

        // Update banner and description
        const info = allCategoryData[selectedCategory];
        if (info) {
            categoryBanner.innerHTML = `<img src="${info.banner}" alt="${selectedCategory} Banner">`;
            categoryDescription.textContent = info.description;
        } else {
            categoryBanner.innerHTML = '';
            categoryDescription.textContent = '';
        }

        // If a main category is selected, show its subcategories and products
        if (info && info.subcategories) {
            categoryContent.innerHTML = generateSubcategoryBlocks(selectedCategory);
        } else if (info && productsData[selectedCategory]) { // If it's a subcategory with direct products
            categoryContent.innerHTML = generateProductCards(productsData[selectedCategory]);
        } else {
            categoryContent.innerHTML = `<p>No content available for ${selectedCategory}.</p>`;
        }
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

    // Select the first main category by default on page load
    const firstMainCategory = categoryList.querySelector('li.has-submenu');
    if (firstMainCategory) {
        selectCategory(firstMainCategory);
        firstMainCategory.classList.add('expanded'); // Expand it by default
        const submenu = firstMainCategory.querySelector('.submenu');
        if (submenu) {
            submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
    }
});