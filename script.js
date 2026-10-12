// Typing effect
const words = ["Web Developer", "Data Science Student", "Problem Solver", "Learner"];
const typingEl = document.getElementById("typing");
let w = 0, c = 0, deleting = false;

function type() {
  const word = words[w];
  typingEl.textContent = word.substring(0, c);
  if (!deleting && c < word.length) {
    c++;
    setTimeout(type, 110);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (c > 0) {
    c--;
    setTimeout(type, 55);
  } else {
    deleting = false;
    w = (w + 1) % words.length;
    setTimeout(type, 300);
  }
}
type();

// Dark / light theme (remembered)
const themeBtn = document.getElementById("theme-toggle");
function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeBtn.textContent = dark ? "☀️" : "🌙";
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
applyTheme(saved === "dark");
themeBtn.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark");
  applyTheme(dark);
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
});

// Mobile menu
const nav = document.getElementById("nav-links");
document.getElementById("menu-btn").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// Scroll reveal, skill bars and counters
function animateCount(el) {
  const target = +el.dataset.count;
  let n = 0;
  const step = setInterval(() => {
    n++;
    el.textContent = n;
    if (n >= target) clearInterval(step);
  }, 250);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add("visible");
    el.querySelectorAll(".fill").forEach(f => (f.style.width = f.dataset.width + "%"));
    el.querySelectorAll("[data-count]").forEach(animateCount);
    observer.unobserve(el);
  });
}, { threshold: 0.2 });
document.querySelectorAll(".fade").forEach(el => observer.observe(el));

// Active nav link on scroll + back-to-top button
const sections = document.querySelectorAll("section[id]");
const toTop = document.getElementById("to-top");
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  nav.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  toTop.classList.toggle("show", window.scrollY > 400);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Contact form validation
const form = document.getElementById("contact-form");
const msg = document.getElementById("form-msg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const text = document.getElementById("message").value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !text) {
    msg.className = "error";
    msg.textContent = "Please fill in all the fields.";
  } else if (!emailOk) {
    msg.className = "error";
    msg.textContent = "Please enter a valid email address.";
  } else {
    msg.className = "success";
    msg.textContent = "Thanks " + name + "! Your message has been sent. ✅";
    form.reset();
  }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
