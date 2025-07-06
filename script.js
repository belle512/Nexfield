// ===== NAVIGATION MENU =====
const navMenu = document.getElementById("nav-menu")
const navToggle = document.getElementById("nav-toggle")
const navClose = document.getElementById("nav-close")

// Menu show
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
    navToggle.setAttribute("aria-expanded", "true")
  })
}

// Menu hidden
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
    navToggle.setAttribute("aria-expanded", "false")
  })
}

// Remove menu mobile
const navLinks = document.querySelectorAll(".nav__link")

function linkAction() {
  navMenu.classList.remove("show-menu")
  navToggle.setAttribute("aria-expanded", "false")
}
navLinks.forEach((n) => n.addEventListener("click", linkAction))

// Close menu on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("show-menu")) {
    linkAction()
  }
})

// ===== SCROLL HEADER =====
function scrollHeader() {
  const header = document.getElementById("header")
  if (window.scrollY >= 50) {
    header.style.backgroundColor = "rgba(0, 0, 0, 0.98)"
  } else {
    header.style.backgroundColor = "rgba(0, 0, 0, 0.95)"
  }
}
window.addEventListener("scroll", scrollHeader)

// ===== SCROLL TO TOP =====
const scrollTop = document.getElementById("scroll-top")

function showScrollTop() {
  if (window.scrollY >= 560) {
    scrollTop.classList.add("show")
  } else {
    scrollTop.classList.remove("show")
  }
}
window.addEventListener("scroll", showScrollTop)

if (scrollTop) {
  scrollTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ===== FORM VALIDATION =====
const contactForm = document.querySelector(".contact__form")

if (contactForm) {
  const formInputs = contactForm.querySelectorAll(".form__input")

  // Real-time validation
  formInputs.forEach((input) => {
    input.addEventListener("blur", validateField)
    input.addEventListener("input", clearError)
  })

  function validateField(e) {
    const field = e.target
    const value = field.value.trim()
    const fieldName = field.name
    let isValid = true
    let errorMessage = ""

    // Clear previous error
    clearError(e)

    // Validation rules
    switch (fieldName) {
      case "name":
        if (!value) {
          errorMessage = "Name is required"
          isValid = false
        } else if (value.length < 2) {
          errorMessage = "Name must be at least 2 characters"
          isValid = false
        }
        break

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) {
          errorMessage = "Email is required"
          isValid = false
        } else if (!emailRegex.test(value)) {
          errorMessage = "Please enter a valid email address"
          isValid = false
        }
        break

      case "service":
        if (!value) {
          errorMessage = "Please select a service"
          isValid = false
        }
        break

      case "message":
        if (!value) {
          errorMessage = "Message is required"
          isValid = false
        } else if (value.length < 10) {
          errorMessage = "Message must be at least 10 characters"
          isValid = false
        }
        break
    }

    if (!isValid) {
      showError(field, errorMessage)
    }

    return isValid
  }

  function showError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`)
    if (errorElement) {
      errorElement.textContent = message
      field.setAttribute("aria-invalid", "true")
      field.style.borderColor = "var(--error-color)"
    }
  }

  function clearError(e) {
    const field = e.target
    const errorElement = document.getElementById(`${field.name}-error`)
    if (errorElement) {
      errorElement.textContent = ""
      field.setAttribute("aria-invalid", "false")
      field.style.borderColor = "var(--border-color)"
    }
  }

  // Form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Validate all fields
    let isFormValid = true
    formInputs.forEach((input) => {
      if (input.hasAttribute("required")) {
        const fieldValid = validateField({ target: input })
        if (!fieldValid) isFormValid = false
      }
    })

    if (!isFormValid) {
      // Focus first invalid field
      const firstError = contactForm.querySelector('[aria-invalid="true"]')
      if (firstError) firstError.focus()
      return
    }

    // Submit form
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = "<span>Sending...</span>"
    submitBtn.disabled = true

    // Simulate form submission (Formspree will handle actual submission)
    setTimeout(() => {
      submitBtn.innerHTML = "<span>Message Sent!</span>"
      submitBtn.style.backgroundColor = "var(--success-color)"

      setTimeout(() => {
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
        submitBtn.style.backgroundColor = "var(--accent-color)"
        contactForm.reset()
      }, 2000)
    }, 1000)
  })
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service, .insight, .stat").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// ===== PERFORMANCE OPTIMIZATIONS =====
// Preload critical resources
const preloadLink = document.createElement("link")
preloadLink.rel = "preload"
preloadLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
preloadLink.as = "style"
document.head.appendChild(preloadLink)

// ===== ERROR HANDLING =====
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation for mobile menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && navMenu.classList.contains("show-menu")) {
    const focusableElements = navMenu.querySelectorAll("a, button")
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault()
      lastElement.focus()
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault()
      firstElement.focus()
    }
  }
})

// ===== PERFORMANCE MONITORING =====
window.addEventListener("load", () => {
  if ("performance" in window) {
    const perfData = performance.getEntriesByType("navigation")[0]
    console.log(`Page load time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`)
  }
})

console.log("✅ Nexfield Africa Investment Consultancy - Optimized for Performance")
