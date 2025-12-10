/* ================= CLEANED JAVASCRIPT ================= */

/* Toggle Mobile Menu */
function toggleMenu(){
    document.querySelector("nav").classList.toggle("active");
}

/* Dropdown logic */
const dropdown = document.querySelector(".dropdown");
const submenu = document.querySelector(".has-submenu");

submenu.addEventListener("click", function(e){
    if(window.innerWidth <= 768){
        e.preventDefault();
        dropdown.classList.toggle("active");
        e.stopPropagation();
    }
});

dropdown.addEventListener("click", function(e){
    if(window.innerWidth <= 768){
        e.stopPropagation();
    }
});

/* Close menu when clicking outside */
document.addEventListener("click", function(e){
    const nav = document.querySelector("nav");
    const ham = document.querySelector(".hamburger");

    if(!nav.contains(e.target) && !ham.contains(e.target)){
        nav.classList.remove("active");
        dropdown.classList.remove("active");
    }
});

// Start cart count at 0
let cartCount = 0;

// Function to update cart display
function updateCart() {
    cartCount++; // increase by 1
    document.getElementById("cart-count").textContent = cartCount;
}

// Attach click event to all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault(); // stop link from opening a new page
        updateCart();           // increase cart count
    });
});
