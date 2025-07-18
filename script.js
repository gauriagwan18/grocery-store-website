document.addEventListener("DOMContentLoaded", function () {
    // Add to Cart Functionality
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
        });
    });
    
    // Display Cart Items on Cart Page
    if (document.getElementById("cart-items")) {
        const cartItemsContainer = document.getElementById("cart-items");
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <p><strong>${item.name}</strong> - $${item.price} x ${item.quantity}</p>
                    <button class="remove-item" data-name="${item.name}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }
    }
    
    // Remove Item from Cart
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
            const name = event.target.dataset.name;
            const itemIndex = cart.findIndex(item => item.name === name);
            
            if (itemIndex > -1) {
                cart.splice(itemIndex, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            }
        }
    });

    // Mobile Navigation Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const clearCartButton = document.getElementById("clear-cart");
    const checkoutButton = document.getElementById("checkout");

    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function renderCart() {
        const cart = getCart();
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.innerHTML = `
                    <p>${item.name} - $${item.price.toFixed(2)} 
                    <button onclick="removeItem(${index})">Remove</button></p>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price;
            });
        }
        totalPriceElement.textContent = total.toFixed(2);
    }

    function removeItem(index) {
        let cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
    }

    clearCartButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        renderCart();
    });

    checkoutButton.addEventListener("click", function () {
        alert("Proceeding to checkout...");
        // Redirect to checkout page if implemented
        window.location.href ="cart.html";
    });

    renderCart();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            addToCart(name, price);
        });
    });
});



