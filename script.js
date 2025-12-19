/* ================= CLEANED JAVASCRIPT ================= */

/* Toggle Mobile Menu */
function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
}



/* Close menu when clicking outside */
document.addEventListener("click", function (e) {
  const nav = document.querySelector("nav");
  const ham = document.querySelector(".hamburger");

  if (!nav.contains(e.target) && !ham.contains(e.target)) {
    nav.classList.remove("active");
  }
});

// ===================== CART LOGIC =====================

const cart = {};
const cartCount = document.getElementById("cart-count");
const cartPopup = document.getElementById("cartPopup");
const cartItems = document.getElementById("cartItems");
const cartDisplay = document.getElementById("cart-count");

document.addEventListener("click", function (e) {

  const productCard = e.target.closest(".product-card");
  if (!productCard) return;

  const productName =
    productCard.querySelector(".product-name").textContent;

  const minusBtn = productCard.querySelector(".minus-btn");

  // PLUS
  if (e.target.classList.contains("plus-btn")) {
    cart[productName] = (cart[productName] || 0) + 1;
    minusBtn.disabled = false;
    updateCartUI();
  }

  // MINUS
  if (e.target.classList.contains("minus-btn")) {
    if (!cart[productName]) return;

    cart[productName]--;

    if (cart[productName] === 0) {
      delete cart[productName];
      minusBtn.disabled = true;
    }

    updateCartUI();
  }
});

// ===================== SMOOTH SCROLL TO CONTACT =====================
document.querySelectorAll('a[href="#contact"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
});

/* ===== CONTACT FORM ===== */
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
  const mobile = $('mobile');

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
    mobile: $('mobileError')
  };

  // Validation rules
  const nameAllowedRegex = /^[A-Za-z\s'-]{1,50}$/;
  const containsLetterRegex = /[A-Za-z]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^\d{10}$/;
  const addressContainsRegex = /[A-Za-z0-9]/;
  const mobileRegex = /^\d{10}$/;


  function clearAllErrors() {
    Object.keys(errors).forEach(k => {
      const el = errors[k];
      if (el) el.textContent = '';
      const inputEl = getInputByKey(k);
      if (inputEl) inputEl.classList.remove('invalid');
    });
  }

  function getInputByKey(key) {
    switch (key) {
      case 'salutation': return salutation;
      case 'firstName': return firstName;
      case 'lastName': return lastName;
      case 'email': return email;
      case 'phone': return phone;
      case 'address': return address;
      case 'message': return message;
      case 'mobile': return mobile;
      default: return null;
    }
  }

  // Validate functions return error message string or empty string when valid
  function validateSalutationMsg() {
    if (!salutation) return '';
    if (!salutation.value || salutation.value.trim() === '') return 'Please select a salutation.';
    return '';
  }

  function validateFirstNameMsg() {
    if (!firstName) return '';
    const v = firstName.value.trim();
    if (!v) return 'First name is required.';
    if (v.length > 50) return 'First name must be 50 characters or fewer.';
    if (!containsLetterRegex.test(v)) return 'First name must contain letters.';
    if (!nameAllowedRegex.test(v)) return 'First name contains invalid characters.';
    return '';
  }

  function validateLastNameMsg() {
    if (!lastName) return '';
    const v = lastName.value.trim();
    if (!v) return ''; // optional
    if (v.length > 50) return 'Last name must be 50 characters or fewer.';
    if (!containsLetterRegex.test(v)) return 'Last name must contain letters.';
    if (!nameAllowedRegex.test(v)) return 'Last name contains invalid characters.';
    return '';
  }

  function validateEmailMsg() {
    if (!email) return '';
    const v = email.value.trim();
    if (!v) return 'Email is required.';
    if (v.length > 50) return 'Email must be 50 characters or fewer.';
    if (!emailRegex.test(v)) return `${v} is not a valid email address (e.g. user@example.com).`;
    return '';
  }

  function validatePhoneMsg() {
    if (!phone) return '';
    const v = (phone.value || '').trim();
    if (!v) return 'Phone number is required.';
    const sanitized = v.replace(/[^\d]/g, '').slice(0, 10);
    if (!phoneRegex.test(sanitized)) return `${v}Enter a valid 10-digit phone number.`;
    return '';
  }

  function validateMobileMsg() {
    if (!mobile) return '';
    const v = (mobile.value || '').trim();
    if (!v) return 'Mobile number is required.';
    const sanitizedm = v.replace(/[^\d]/g, '').slice(0, 10);
    if (!mobileRegex.test(sanitizedm)) return `${v}Enter a valid 10-digit mobile number.`;
    return '';
  }

  function validateAddressMsg() {
    if (!address) return '';
    const v = address.value.trim();
    if (!v) return ''; // optional
    if (v.length > 500) return 'Address must be 500 characters or fewer.';
    if (!addressContainsRegex.test(v)) return 'Address must include letters or numbers.';
    return '';
  }

  function validateMessageMsg() {
    if (!message) return '';
    const v = message.value.trim();
    if (v.length > 500) return 'Message must be 500 characters or fewer.';
    return '';
  }

  // --- Phone sanitization while typing (silent) ---
  phone && phone.addEventListener('input', function () {
    const before = phone.value;
    const sanitized = before.replace(/[^\d]/g, '').slice(0, 10);
    if (sanitized !== before) phone.value = sanitized;
    // do NOT show error messages while typing (user requested submit-only errors)
    phone.classList.remove('invalid');
    if (errors.phone) errors.phone.textContent = '';
  });

  mobile && mobile.addEventListener('input', function () {
  const before = mobile.value;
  const sanitized = before.replace(/[^\d]/g, '').slice(0, 10);
  if (sanitized !== before) mobile.value = sanitized;

  mobile.classList.remove('invalid');
  if (errors.mobile) errors.mobile.textContent = '';
});


  phone && phone.addEventListener('paste', function () {
    // Let paste happen naturally, then sanitize quickly
    setTimeout(() => {
      const sanitized = (phone.value || '').replace(/[^\d]/g, '').slice(0, 10);
      if (phone.value !== sanitized) phone.value = sanitized;
    }, 0);
  });

  function blockNonNumeric(e) {
  if (
    !/[0-9]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight" &&
    e.key !== "Tab"
  ) {
    e.preventDefault();
  }
}

phone && phone.addEventListener("keydown", blockNonNumeric);
mobile && mobile.addEventListener("keydown", blockNonNumeric);


  // Remove live validation handlers — keep only non-intrusive sanitization.
  // (No other 'input' or 'blur' handlers that show errors.)

  // --- Submit handler: aggregate all errors, show popup, mark invalids ---
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    clearAllErrors();

    const validators = [
      { key: 'salutation', fn: validateSalutationMsg },
      { key: 'firstName', fn: validateFirstNameMsg },
      { key: 'lastName', fn: validateLastNameMsg },
      { key: 'email', fn: validateEmailMsg },
      { key: 'phone', fn: validatePhoneMsg },
      { key: 'address', fn: validateAddressMsg },
      { key: 'message', fn: validateMessageMsg },
      { key: 'mobile', fn: validateMobileMsg },
    ];

    const failed = [];
    for (let i = 0; i < validators.length; i++) {
      const v = validators[i];
      const msg = v.fn();
      if (msg) {
        // populate inline error (so user sees the exact field errors after popup)
        const errEl = errors[v.key];
        if (errEl) errEl.textContent = msg;
        const inputEl = getInputByKey(v.key);
        if (inputEl) inputEl.classList.add('invalid');
        failed.push({ key: v.key, msg });
      }
    }

    if (failed.length > 0) {
      // Build aggregated popup text
      const combined = failed.map((f, idx) => `${idx + 1}. ${f.msg}`).join('\n');
      alert('Cannot submit — please fix the following errors:\n\n' + combined);

      // focus the first invalid field
      const firstInvalidKey = failed[0].key;
      const firstInvalidInput = getInputByKey(firstInvalidKey);
      if (firstInvalidInput) firstInvalidInput.focus();
      return false;
    }

    // If reached here, all validations passed
    // TODO: Replace with real submission (AJAX / fetch / form POST)
    alert('Form submitted successfully! (demo)');
    form.reset();
    clearAllErrors();
    return true;
  });

  // ensure the submit button stays enabled so user can always submit and get aggregated errors
  if (submitBtn) submitBtn.disabled = false;
})();

async function getUsers() {
  const url = ""; // example API

  try {
    const res = await fetch(url);              // 1) call API
    if (!res.ok) {                             // 2) handle HTTP errors
      throw new Error("Request failed: " + res.status);
    }

    const data = await res.json();             // 3) parse JSON
    console.log("Users:", data);               // 4) use data (render to UI, etc.)
  } catch (err) {
    console.error("Error fetching users:", err.message); // 5) handle network errors
  }
}

getUsers();

// ===================== CATEGORY DROPDOWN =====================

const categoryTitle = document.querySelector('.category-title');
const categoryMenu = document.querySelector('.category-menu');

categoryTitle.addEventListener('click', function (e) {
  if (window.innerWidth <= 768) {
    e.stopPropagation();
    categoryMenu.classList.toggle('active');
  }
});

document.addEventListener('click', function () {
  categoryMenu.classList.remove('active');
});


// ===================== PRODUCT FILTER =====================

const filters = document.querySelectorAll('.category-menu li');
const products = document.querySelectorAll('.product-card');

filters.forEach(filter => {
  filter.addEventListener('click', () => {

    filters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');

    const category = filter.getAttribute('data-filter');

    products.forEach(product => {
      const productCategory = product.getAttribute('data-category');
      product.style.display =
        category === 'all' || productCategory === category
          ? 'block'
          : 'none';
    });

    // ✅ close dropdown
    categoryMenu.classList.remove('active');

    // ✅ scroll to products
    document.getElementById("products")
      .scrollIntoView({ behavior: "smooth" });
  });
});


// ===================== UPDATE CART UI =====================
function updateCartUI() {
  let totalCount = 0;
  cartItems.innerHTML = "";

  for (let product in cart) {
    totalCount += cart[product];

    const li = document.createElement("li");
    li.innerHTML = `<span>${product}</span><span>x${cart[product]}</span>`;
    cartItems.appendChild(li);
  }

  cartCount.classList.remove("cart-bump"); // reset animation
  void cartCount.offsetWidth;              // force reflow
  cartCount.textContent = totalCount;
  cartCount.classList.add("cart-bump");    // trigger animation


  if (totalCount === 0) {
    cartPopup.style.display = "none";
  }
}

// ==================== Toggle Cart Popup ====================
document.querySelector(".cart-icon").addEventListener("click", function (e) {
  e.stopPropagation();
  cartPopup.style.display =
    cartPopup.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function () {
  cartPopup.style.display = "none";
});
