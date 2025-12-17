/* ===============================
   Mobile nav toggle (optional)
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");

  if (btn && nav) {
    btn.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
});

/* ===============================
   Contact form -> mailto (GitHub Pages compatible)
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fromEmail = document.getElementById("fromEmail").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    const to = "nurlan.datapath@gmail.com";

    const body =
      `From: ${fromEmail}\n\n` +
      `${message}\n\n` +
      `Phone: +994 55 265 17 01\n` +
      `WhatsApp: https://wa.me/994552651701`;

    const mailto =
      `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
});
