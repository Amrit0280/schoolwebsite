// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .why-card, .step').forEach(el => {
  revealObserver.observe(el);
});

// ─── STICKY BAR ───
const stickyBar = document.getElementById('stickyBar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    stickyBar.classList.add('visible');
  } else {
    stickyBar.classList.remove('visible');
  }
});

// ─── RIPPLE ON SUBMIT ───
document.getElementById('submitBtn').addEventListener('click', function(e) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
  this.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

// ─── FORM SUBMISSION ───
document.getElementById('admissionForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const fields = ['studentName', 'parentName', 'phone', 'email'];
  let valid = true;

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#ef4444';
      valid = false;
      setTimeout(() => el.style.borderColor = '', 2000);
    }
  });

  const cls = document.getElementById('classApplying');
  if (!cls.value) {
    cls.style.borderColor = '#ef4444';
    valid = false;
    setTimeout(() => cls.style.borderColor = '', 2000);
  }

  if (!valid) return;

  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Submitting…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Submit Application 🎓';
    btn.disabled = false;
    
    sendToWhatsApp();

    document.getElementById('admissionForm').reset();
    document.getElementById('successPopup').classList.add('show');

    // decrement seat count for urgency
    const sc = document.getElementById('seatCount');
    const cur = parseInt(sc.textContent);
    if (cur > 1) sc.textContent = cur - 1;
  }, 1400);
});

// ─── SELECT STYLE FIX ───
document.getElementById('classApplying').addEventListener('change', function() {
  this.classList.add('filled');
});

// ─── SEAT COUNTER ANIMATION ───
function animateCounter() {
  const el = document.getElementById('seatCount');
  let count = 30, target = 24;
  const interval = setInterval(() => {
    if (count <= target) { clearInterval(interval); return; }
    count--;
    el.textContent = count;
  }, 80);
}
const urgencyObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounter();
    urgencyObserver.disconnect();
  }
}, { threshold: 0.5 });
urgencyObserver.observe(document.querySelector('.urgency'));

// ─── CLOSE POPUP ON OUTSIDE CLICK ───
document.getElementById('successPopup').addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('show');
});

// ─── SEND TO WHATSAPP ───
function sendToWhatsApp() {
    let name = document.getElementById("studentName").value;
    let parent = document.getElementById("parentName").value;
    let className = document.getElementById("classApplying").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let whatsappMessage =
        "📚 *New Admission Form* \n\n" +
        "👤 Student Name: " + name + "\n" +
        "👨‍👩‍👧 Parent Name: " + parent + "\n" +
        "🏫 Class: " + className + "\n" +
        "📞 Phone: " + phone + "\n" +
        "📧 Email: " + email + "\n" +
        "💬 Message: " + message;

    let encodedMessage = encodeURIComponent(whatsappMessage);

    // Your number added here (without +)
    let phoneNumber = "918318466940";

    let url = "https://wa.me/" + phoneNumber + "?text=" + encodedMessage;

    window.open(url, "_blank");
}

// ─── WELCOME POPUP & SLIDESHOW ───
window.addEventListener('DOMContentLoaded', () => {
  const welcomePopup = document.getElementById('welcomePopup');
  const closeBtn = document.getElementById('welcomeClose');
  const applyBtn = document.getElementById('welcomeApplyBtn');
  const slides = document.querySelectorAll('#welcomeSlides .slide');
  
  if (welcomePopup && slides.length > 0) {
    // Show popup after a short delay
    setTimeout(() => {
      welcomePopup.classList.add('show');
    }, 600);

    // Close logic
    const closePopup = () => welcomePopup.classList.remove('show');
    closeBtn.addEventListener('click', closePopup);
    applyBtn.addEventListener('click', closePopup);
    welcomePopup.addEventListener('click', (e) => {
      if (e.target === welcomePopup) closePopup();
    });

    // Slideshow logic
    let currentSlide = 0;
    slides[currentSlide].classList.add('active');
    
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 3500);
  }

  // Hero Background Slideshow logic
  const heroSlides = document.querySelectorAll('#heroBgSlider .bg-slide');
  if (heroSlides.length > 0) {
    let currentHeroSlide = 0;
    setInterval(() => {
      heroSlides[currentHeroSlide].classList.remove('active');
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      heroSlides[currentHeroSlide].classList.add('active');
    }, 5000);
  }
});
