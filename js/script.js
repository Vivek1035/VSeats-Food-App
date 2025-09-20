document.addEventListener('DOMContentLoaded', function() {
    // Food items data
    const foodItems = [
        {
            id: 1,
            name: 'Home made pizza',
            price: '₹190',
            rating: 4.7,
            reviews: 267,
            image: 'images/11.png'
        },
        {
            id: 2,
            name: 'Home made pizza',
            price: '₹125',
            rating: 4.3,
            reviews: 67,
            image: 'images/12.png'
        },
        {
            id: 3,
            name: 'Home made pizza',
            price: '₹190',
            rating: 4.7,
            reviews: 59,
            image: 'images/13.png'
        },
        {
            id: 4,
            name: 'Home made pizza',
            price: '₹190',
            rating: 4.7,
            reviews: 59,
            image: 'images/14.png'
        },
        {
            id: 5,
            name: 'Home made pizza',
            price: '₹190',
            rating: 4.7,
            reviews: 59,
            image: 'images/21.png'
        },
        {
            id: 6,
            name: 'Home made pizza',
            price: '₹190',
            rating: 4.7,
            reviews: 59,
            image: 'images/22.png'
        },
        {
            id: 7,
            name: 'Home made pizza',
            price: '₹190',
            rating: 4.7,
            reviews: 59,
            image: 'images/23.png'
        },
        {
            id: 8,
            name: 'Home made pizza',
            price: '₹190',
            rating: 4.7,
            reviews: 59,
            image: 'images/24.png'
        },
         {
            id: 9,
            name: 'Home made pizza',
            price: '₹190',
            rating: 4.7,
            reviews: 267,
            image: 'images/11.png'
        },
        {
            id: 10,
            name: 'Home made pizza',
            price: '₹125',
            rating: 4.3,
            reviews: 67,
            image: 'images/12.png'
        },
        {
            id: 11,
            name: 'Home made pizza',
            price: '₹190',
            rating: 4.7,
            reviews: 59,
            image: 'images/13.png'
        },
        {
            id: 12,
            name: 'Home made pizza',
            price: '₹190',
            rating: 4.7,
            reviews: 59,
            image: 'images/14.png'
        }
    ];

    let cart = [];
    let autoSlideInterval = null;
    let itemsToShow = 3;
    let currentIndex = 0;

    const foodGrid = document.querySelector('.food-grid');
    const carouselItemsContainer = document.querySelector('.carousel-items');
    const cartSidebar = document.getElementById('cart');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const cartItemsDiv = cartSidebar.querySelector('.cart-items');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    // --- Utility Functions ---
    function getCartQuantity(id) {
        const found = cart.find(c => c.id === id);
        return found ? found.quantity : 0;
    }

    function setCartQuantity(item, qty) {
        qty = Math.max(0, qty);
        let existing = cart.find(c => c.id === item.id);
        if (existing) {
            if (qty === 0) {
                cart = cart.filter(c => c.id !== item.id);
            } else {
                existing.quantity = qty;
            }
        } else if (qty > 0) {
            cart.push({ ...item, quantity: qty });
        }
        renderAll();
    }

    // --- Product/Card Rendering ---
    function createFoodItemElement(item) {
        const quantity = getCartQuantity(item.id);
        const el = document.createElement('div');
        el.className = 'food-item';
        el.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="food-item-info">
                <div class="food-item-title">
                    <h3>${item.name}</h3>
                    <span class="price">${item.price}</span>
                </div>
                <div class="food-item-rating">
                    <div class="stars"><span class="star">★</span>${item.rating}</div>
                    <span class="reviews">(${item.reviews} reviews)</span>
                    <div class="quantity-wrapper" data-id="${item.id}">
                        ${quantity < 1 ?
                            `<div class="add-to-cart" data-id="${item.id}" style="background:#FFC700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:22px;font-weight:bold;cursor:pointer;">+</div>`
                        :
                            `<div class="quantity-control" data-id="${item.id}">
                                <button class="qty-btn minus" type="button">-</button>
                                <input class="qty-input" type="text" value="${quantity}" readonly>
                                <button class="qty-btn plus" type="button">+</button>
                            </div>`
                        }
                    </div>
                </div>
            </div>
        `;
        return el;
    }

    function refreshFoodGrid() {
        foodGrid.innerHTML = '';
        foodItems.forEach(item => foodGrid.appendChild(createFoodItemElement(item)));
    }

    function createCarouselItemElement(item) {
        const quantity = getCartQuantity(item.id);
        const el = document.createElement('div');
        el.className = 'carousel-item';
        el.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="carousel-item-content">
                <div class="carousel-item-header">
                    <span class="carousel-item-title">${item.name}</span>
                    <span class="carousel-item-price">${item.price}</span>
                </div>
                <div class="carousel-item-footer">
                    <div class="carousel-item-rating">
                        <div class="stars"><span class="rating-star">★</span>${item.rating}</div>
                    </div>
                    <span class="delivery-time">(50-79 min)</span>
                    <div class="quantity-wrapper" data-id="${item.id}">
                        ${quantity < 1 ?
                            `<div class="add-to-cart" data-id="${item.id}" style="background:#FFC700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:22px;font-weight:bold;cursor:pointer;">+</div>`
                        :
                            `<div class="quantity-control" data-id="${item.id}">
                                <button class="qty-btn minus" type="button">-</button>
                                <input class="qty-input" type="text" value="${quantity}" readonly>
                                <button class="qty-btn plus" type="button">+</button>
                            </div>`
                        }
                    </div>
                </div>
            </div>
        `;
        return el;
    }

    function refreshCarouselItems() {
        carouselItemsContainer.innerHTML = '';
        carouselItems.forEach(item => carouselItemsContainer.appendChild(createCarouselItemElement(item)));
        updateCarousel();
    }

    function renderCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<div style="color:#888; text-align:center;">Cart is empty</div>';
        }
        cart.forEach(item => {
            total += parseInt(item.price.replace(/[^\d]/g, "")) * item.quantity;
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <button data-id="${item.id}" class="remove-cart">x</button>
            `;
            cartItemsDiv.appendChild(cartItemDiv);
        });
        cartTotalAmount.textContent = `₹${total}`;
    }
    
    function renderAll() {
        refreshFoodGrid();
        refreshCarouselItems();
        renderCart();
    }

    // --- EVENTS ---
    // Dynamic controls and add-to-cart
    document.body.addEventListener('click', function (e) {
        // Quantity control: plus/minus
        if (e.target.classList.contains('qty-btn')) {
            const control = e.target.closest('.quantity-control');
            const id = parseInt(control.getAttribute('data-id'));
            const quantity = getCartQuantity(id);
            let item = foodItems.find(f => f.id === id) || carouselItems.find(c => c.id === id);
            if (e.target.classList.contains('plus')) {
                setCartQuantity(item, quantity + 1);
                showCartToast('Added to cart!');
            } else if (e.target.classList.contains('minus')) {
                setCartQuantity(item, quantity - 1);
                if (quantity - 1 < 1) showCartToast('Item removed!');
            }
        }
        // Add-to-cart icon (yellow +)
        if (e.target.classList.contains('add-to-cart')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            let item = foodItems.find(f => f.id === id) || carouselItems.find(c => c.id === id);
            setCartQuantity(item, 1);
            showCartToast('Added to cart!');
        }
        // Remove from cart button
        if (e.target.classList.contains('remove-cart')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            setCartQuantity({ id }, 0);
            showCartToast('Removed from cart!');
        }
    });

    // Cart sidebar toggle
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function (e) {
            e.preventDefault();
            cartSidebar.classList.toggle('show');
        });
    }
    // Hide cart sidebar when clicking outside
    document.addEventListener('click', function (e) {
        if (!cartSidebar.contains(e.target) && !e.target.classList.contains('cart-icon')) {
            cartSidebar.classList.remove('show');
        }
    });

    // Cart actions: clear and checkout
    const clearBtn = cartSidebar.querySelector('.clear-btn');
    const checkoutBtn = cartSidebar.querySelector('.checkout-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            cart = [];
            renderAll();
        });
    }
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Order placed successfully!');
            cart = [];
            renderAll();
            cartSidebar.classList.remove('show');
        });
    }

    // Toast top right
    function showCartToast(message) {
        var toast = document.getElementById('add-to-cart-toast');
        if (!toast) return;
        toast.innerHTML = "<span style='display:inline-block;width:32px;height:32px;background:#ffe600;border-radius:50%;text-align:center;line-height:32px;font-size:18px;color:#222;margin-right:16px;font-weight:bold;'>+</span> " + (message || "Added to cart!");
        toast.style.display = 'block';
        toast.classList.add('show');
        clearTimeout(window._cartToastTimeout);
        window._cartToastTimeout = setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { toast.style.display = 'none'; }, 400);
        }, 1700);
    }

    // Carousel navigation and auto-slide
    function updateCarousel() {
        const itemWidth = 380; // update if changed in CSS
        const totalItems = carouselItemsContainer.children.length;
        const maxIndex = Math.max(0, totalItems - itemsToShow);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        carouselItemsContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            currentIndex--;
            updateCarousel();
            resetAutoSlide();
        });
        nextBtn.addEventListener('click', function () {
            currentIndex++;
            updateCarousel();
            resetAutoSlide();
        });
    }
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            const items = document.querySelectorAll('.carousel-item');
            const maxIndex = items.length - itemsToShow;
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
    }
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // --- Modal ---
    function attachModalListeners() {
        const modal = document.getElementById('request-dish-modal');
        if (!modal) return;
        const requestDishBtn = document.querySelector('.request-dish-btn button');
        const closeModal = document.querySelector('.close-modal');
        if(requestDishBtn){
            requestDishBtn.onclick = () => modal.classList.add('show');
        }
        if(closeModal){
            closeModal.onclick = () => modal.classList.remove('show');
        }
        window.onclick = function (e) {
            if (e.target === modal) modal.classList.remove('show');
        };
        // Forms
        const contactForm = document.getElementById('contact-form');
        const requestDishForm = document.getElementById('request-dish-form');
        if(contactForm){
            contactForm.onsubmit = (e) => {
                e.preventDefault();
                alert('Thank you for your message! Our team will contact you soon.');
                contactForm.reset();
            };
        }
        if(requestDishForm){
            requestDishForm.onsubmit = (e) => {
                e.preventDefault();
                alert('Thank you for your dish request! We will consider adding it to our menu.');
                requestDishForm.reset();
                modal.classList.remove('show');
            };
        }
    }

    // Initial render and attach
    renderAll();
    attachModalListeners();
    setTimeout(() => {
        updateCarousel();
        startAutoSlide();
    }, 150);

});