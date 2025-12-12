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

    // Validation rules
    const nameAllowedRegex = /^[A-Za-z\s'-]{1,50}$/;
    const containsLetterRegex = /[A-Za-z]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^\d{10}$/;
    const addressContainsRegex = /[A-Za-z0-9]/;

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
        if (!emailRegex.test(v)) return 'Enter a valid email address (e.g. user@example.com).';
        return '';
    }

    function validatePhoneMsg() {
        if (!phone) return '';
        const v = (phone.value || '').trim();
        if (!v) return 'Phone number is required.';
        const sanitized = v.replace(/[^\d]/g, '').slice(0, 10);
        if (!phoneRegex.test(sanitized)) return 'Enter a valid 10-digit phone number.';
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

    phone && phone.addEventListener('paste', function () {
        // Let paste happen naturally, then sanitize quickly
        setTimeout(() => {
            const sanitized = (phone.value || '').replace(/[^\d]/g, '').slice(0, 10);
            if (phone.value !== sanitized) phone.value = sanitized;
        }, 0);
    });

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
            { key: 'message', fn: validateMessageMsg }
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

/* ===== DEMO: DYNAMIC PRODUCT MAPPING FROM API ===== */
(function () {
  const API_URL = 'https://fakestoreapi.com/products'; // <- replace with your product API URL
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  if (!productCards.length) {
    console.warn('No .product-card elements found — demo mapping skipped.');
    return;
  }

  // helper: safe HTML escape to avoid injecting raw HTML from API responses
  function escapeHtml(s) {
    if (s === undefined || s === null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // map API item -> normalized object used by updater
  function normalizeItem(item) {
    return {
      id: item.id ?? item.productId ?? '',
      name: item.title ?? item.name ?? 'Unnamed Product',
      description: item.description ?? item.desc ?? '',
      price: (typeof item.price === 'number') ? `Rs. ${item.price}` : (item.price ?? '—'),
      image: item.image ?? item.imageUrl ?? './pics/placeholder.jpg',
      url: item.url ?? item.link ?? '#'
    };
  }

  // update a single existing card element with data
  function updateCardWithItem(cardEl, item) {
    if (!cardEl || !item) return;

    const imgEl = cardEl.querySelector('.product-image img');
    if (imgEl) {
      imgEl.src = item.image;
      imgEl.alt = item.name;
    }

    const nameEl = cardEl.querySelector('.product-name');
    if (nameEl) nameEl.textContent = item.name;

    const descEl = cardEl.querySelector('.product-desc');
    if (descEl) descEl.textContent = item.description;

    const priceEl = cardEl.querySelector('.product-price');
    if (priceEl) priceEl.textContent = item.price;

    // update Add-to-cart button link/data attribute if present
    const addBtn = cardEl.querySelector('.add-to-cart-btn');
    if (addBtn) {
      addBtn.setAttribute('data-add-id', item.id);
      // keep it as a button/link; do not change its text
    }

    // if the card uses a wrapper link to product, update it
    const productLink = cardEl.querySelector('a[href*="http"], a.product-link, .product-info > a');
    if (productLink) {
      try { productLink.href = item.url; } catch (e) {}
    } else {
      // fallback: if the add-to-cart is actually a link to product, update that too
      if (addBtn && addBtn.tagName === 'A') {
        try { addBtn.href = item.url; } catch (e) {}
      }
    }
  }

  // show a small loading overlay inside first product card (non-invasive)
  function indicateLoading() {
    if (!productCards.length) return;
    const first = productCards[0];
    let loader = first.querySelector('.js-map-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'js-map-loader';
      loader.style.cssText = 'position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.4); color:white;';
      loader.textContent = 'Loading...';
      // keep loader small: append to the product grid container instead if preferred
      first.style.position = 'relative';
      first.appendChild(loader);
    }
    return loader;
  }
  function removeLoading(loader) { if (loader && loader.parentNode) loader.parentNode.removeChild(loader); }

  // main fetch + map flow
  (async function fetchAndMap() {
    const loader = indicateLoading();
    try {
      const res = await fetch(API_URL, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error('Fetch failed: ' + res.status);
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        console.warn('API returned no items to map.');
        removeLoading(loader);
        return;
      }

      // Normalize array of items
      const items = data.map(normalizeItem);

      // Map items to existing cards (by index)
      const count = Math.min(productCards.length, items.length);
      for (let i = 0; i < count; i++) {
        updateCardWithItem(productCards[i], items[i]);
      }

      // Optionally hide remaining cards if API returned fewer items:
      if (items.length < productCards.length) {
        for (let j = items.length; j < productCards.length; j++) {
          // keep it non-destructive: hide visually but keep in DOM
          productCards[j].style.display = 'none';
        }
      }

      // Done
      removeLoading(loader);
      console.log(`Mapped ${count} items onto ${productCards.length} existing cards.`);
    } catch (err) {
      removeLoading(loader);
      console.error('Product mapping demo failed:', err);
      // leave existing cards untouched (safe fallback)
    }
  })();

  // ensure Add-to-cart buttons still work via existing delegation (if you have it)
  // if not, you can add a simple delegation here:
  document.body.addEventListener('click', function (e) {
    const btn = e.target.closest && e.target.closest('.add-to-cart-btn');
    if (!btn) return;
    e.preventDefault();
    // reuse existing cart-count element
    const cartCountEl = document.getElementById('cart-count');
    let count = parseInt(cartCountEl?.textContent || '0', 10) || 0;
    count++;
    if (cartCountEl) cartCountEl.textContent = count;
    // small feedback
    const originalText = btn.textContent;
    btn.textContent = 'Added';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = originalText; btn.classList.remove('added'); }, 800);
  }, false);

})();
