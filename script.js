/* ================= CLEANED JAVASCRIPT ================= */

/* Toggle Mobile Menu */
function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("active");
}

/* Dropdown logic */
const dropdown = document.querySelector(".dropdown");
const submenu = document.querySelector(".has-submenu");

submenu.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle("active");
        e.stopPropagation();
    }
});

dropdown.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
        e.stopPropagation();
    }
});

/* Close menu when clicking outside */
document.addEventListener("click", function (e) {
    const nav = document.querySelector("nav");
    const ham = document.querySelector(".hamburger");

    if (!nav.contains(e.target) && !ham.contains(e.target)) {
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

/* ===== CONTACT FORM: modern inline + aggregated validation ===== */
(function () {
    const $ = (id) => document.getElementById(id);

    const form = $('contactForm');
    const salutation = $('salutation');
    const firstName = $('firstName');
    const lastName = $('lastName');
    const email = $('email');
    const phone = $('phone');
    const countryCode = $('countryCode');
    const address = $('address');
    const message = $('message');
    const submitBtn = $('submitBtn');

    if (!form) {
        console.warn('contactForm not found — skipping contact validation');
        return;
    }

    const errors = {
        salutation: $('salutationError'),
        firstName: $('firstNameError'),
        lastName: $('lastNameError'),
        email: $('emailError'),
        phone: $('phoneError'),
        address: $('addressError'),
        message: $('messageError'),
    };

    const nameAllowedRegex = /^[A-Za-z\s'-]{1,50}$/;
    const containsLetterRegex = /[A-Za-z]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^\d{10}$/;
    const addressContainsRegex = /[A-Za-z0-9]/;

    function setError(el, key, msg) {
        if (!errors[key]) return;
        errors[key].textContent = msg || '';
        if (msg) el && el.classList.add('invalid'); else el && el.classList.remove('invalid');
        toggleSubmitState();
    }

    function clearError(el, key) { setError(el, key, ''); }

    function validateSalutation() {
        if (!salutation) return true;
        if (!salutation.value || salutation.value.trim() === '') {
            setError(salutation, 'salutation', 'Please select a salutation.');
            return false;
        }
        clearError(salutation, 'salutation'); return true;
    }

    function validateFirstName() {
        const v = firstName.value.trim();
        if (!v) { setError(firstName, 'firstName', 'First name is required.'); return false; }
        if (v.length > 50) { setError(firstName, 'firstName', 'First name must be 50 characters or fewer.'); return false; }
        if (!containsLetterRegex.test(v)) { setError(firstName, 'firstName', 'First name must contain letters.'); return false; }
        if (!nameAllowedRegex.test(v)) { setError(firstName, 'firstName', 'First name contains invalid characters.'); return false; }
        clearError(firstName, 'firstName'); return true;
    }

    function validateLastName() {
        const v = lastName ? lastName.value.trim() : '';
        if (!v) { clearError(lastName, 'lastName'); return true; }
        if (v.length > 50) { setError(lastName, 'lastName', 'Last name must be 50 characters or fewer.'); return false; }
        if (!containsLetterRegex.test(v)) { setError(lastName, 'lastName', 'Last name must contain letters.'); return false; }
        if (!nameAllowedRegex.test(v)) { setError(lastName, 'lastName', 'Last name contains invalid characters.'); return false; }
        clearError(lastName, 'lastName'); return true;
    }

    function validateEmail() {
        const v = email.value.trim();
        if (!v) { setError(email, 'email', 'Email is required.'); return false; }
        if (v.length > 50) { setError(email, 'email', 'Email must be 50 characters or fewer.'); return false; }
        if (!emailRegex.test(v)) { setError(email, 'email', 'Enter a valid email address.'); return false; }
        clearError(email, 'email'); return true;
    }

    function validatePhone() {
        const v = (phone.value || '').trim();
        if (!v) { setError(phone, 'phone', 'Phone number is required.'); return false; }
        // remove any spaces or punctuation just in case
        const sanitized = v.replace(/[\s-()]/g, '');
        if (!phoneRegex.test(sanitized)) {
            setError(phone, 'phone', 'Enter a valid 10-digit phone number.');
            return false;
        }
        clearError(phone, 'phone');
        return true;
    }


    function validateAddress() {
        const v = address ? address.value.trim() : '';
        if (!v) { clearError(address, 'address'); return true; }
        if (v.length > 500) { setError(address, 'address', 'Address must be 500 characters or fewer.'); return false; }
        if (!addressContainsRegex.test(v)) { setError(address, 'address', 'Address must include letters or numbers.'); return false; }
        clearError(address, 'address'); return true;
    }

    function validateMessage() {
        const v = message ? message.value.trim() : '';
        if (v.length > 500) { setError(message, 'message', 'Message must be 500 characters or fewer.'); return false; }
        clearError(message, 'message'); return true;
    }

    function allValid() {
        return validateSalutation() && validateFirstName() && validateLastName() && validateEmail() && validatePhone() && validateAddress() && validateMessage();
    }

    function toggleSubmitState() {
        const requiredEmpty = !salutation.value || !firstName.value.trim() || !email.value.trim() || !phone.value.trim();
        const hasInlineErrors = Object.values(errors).some(el => el && el.textContent && el.textContent.trim() !== '');
        submitBtn.disabled = requiredEmpty || hasInlineErrors;
    }

    // Live handlers
    salutation && salutation.addEventListener('change', validateSalutation);
    firstName && firstName.addEventListener('input', validateFirstName);
    firstName && firstName.addEventListener('blur', validateFirstName);
    lastName && lastName.addEventListener('input', validateLastName);
    email && email.addEventListener('input', validateEmail);
    email && email.addEventListener('blur', validateEmail);
    address && address.addEventListener('input', validateAddress);
    message && message.addEventListener('input', validateMessage);

    // phone sanitise: prevent letters, allow leading + and digits
    function onPhoneInput(e) {
        const initial = phone.value;
        // remove everything except digits
        let sanitized = initial.replace(/[^\d]/g, '');
        // truncate to 10 digits maximum
        if (sanitized.length > 10) sanitized = sanitized.slice(0, 10);
        if (sanitized !== initial) phone.value = sanitized;

        // show lightweight error while typing if too long (we truncate, so this is just defensive)
        if (sanitized.length > 10) {
            setError(phone, 'phone', 'Phone must be 10 digits.');
        } else {
            // clear inline error while typing (we will validate on blur/submit)
            if (phoneRegex.test(sanitized) || sanitized.length < 10) clearError(phone, 'phone');
        }
        toggleSubmitState();
    }


    phone && phone.addEventListener('paste', function (ev) {
        ev.preventDefault();
        const paste = (ev.clipboardData || window.clipboardData).getData('text') || '';
        // keep digits only and truncate to 10
        const digits = paste.replace(/[^\d]/g, '').slice(0, 10);
        phone.value = digits;
        setTimeout(() => { validatePhone(); }, 30);
    });

    phone && phone.addEventListener('blur', () => { validatePhone(); });

    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        const validators = [
            { fn: validateSalutation, key: 'salutation' },
            { fn: validateFirstName, key: 'firstName' },
            { fn: validateLastName, key: 'lastName' },
            { fn: validateEmail, key: 'email' },
            { fn: validatePhone, key: 'phone' },
            { fn: validateAddress, key: 'address' },
            { fn: validateMessage, key: 'message' },
        ];

        const failed = [];
        validators.forEach(v => { if (!v.fn()) { const msgEl = errors[v.key]; if (msgEl && msgEl.textContent) failed.push(msgEl.textContent); } });

        if (failed.length > 0) {
            const combined = failed.map((m, i) => `${i + 1}. ${m}`).join('\n');
            alert('Please fix the following errors before submitting:\n\n' + combined);
            const firstInvalid = form.querySelector('.invalid, input:invalid, textarea:invalid, select:invalid');
            if (firstInvalid) firstInvalid.focus();
            return false;
        }

        toggleSubmitState();
        if (submitBtn.disabled) {
            alert('Please complete the required fields correctly before submitting.');
            return false;
        }

        // Replace this with real submission (AJAX / form POST) if needed
        alert('Form submitted successfully! (demo)');
        return true;
    });

    // initial toggle:
    toggleSubmitState();
})();


