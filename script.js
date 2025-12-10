/* ================= CLEANED JAVASCRIPT ================= */

/* Toggle Mobile Menu */
function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("active");
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
function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("active");
}

// ===================== SMOOTH SCROLL TO CONTACT =====================
document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    });
});

// ===================== CONTACT FORM VALIDATION =====================
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let salutation = document.getElementById("salutation").value;
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let countryCode = document.getElementById("countryCode").value;
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();

    const nameRegex = /^[A-Za-z]+$/;
    if (!firstName || !nameRegex.test(firstName)) {
        alert("First name must contain only alphabets.");
        return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return;
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (address.length > 500) {
        alert("Address must be under 500 characters.");
        return;
    }

    alert(
        "Form submitted successfully!\n\n" +
        `Name: ${salutation} ${firstName} ${lastName}\n` +
        `Phone: ${countryCode} ${phone}\n` +
        `Email: ${email}`
    );
});

