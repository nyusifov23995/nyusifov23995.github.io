/* ===============================
   Mobile nav toggle
   (works with: .nav-toggle + .nav-list)
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-list"); // ✅ IMPORTANT

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("show");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when user clicks a link (mobile UX)
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    menu.classList.remove("show");
    btn.setAttribute("aria-expanded", "false");
  });
});

/* ===============================
   Contact form -> mailto (GitHub Pages compatible)
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fromEmail = document.getElementById("fromEmail")?.value.trim() || "";
    const subject = document.getElementById("subject")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";

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

/* ===============================
   Lightbox
   =============================== */
(() => {
  const box = document.getElementById("lightbox");
  if (!box) return;

  const imgEl = box.querySelector(".lightbox-img");
  const closeBtn = box.querySelector(".lightbox-close");
  const backdrop = box.querySelector(".lightbox-backdrop");

  function openLightbox(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || "";
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    imgEl.src = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    if (target.matches(".project-gallery img")) {
      openLightbox(target.src, target.alt);
    }
  });

  closeBtn?.addEventListener("click", closeLightbox);
  backdrop?.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();
