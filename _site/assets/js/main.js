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

/* ===============================
   Full-page snap scrolling helper
   - Uses CSS scroll-snap as primary
   - Adds a lightweight wheel/keyboard handler for consistent next/prev behavior
   - Respects prefers-reduced-motion and touch devices (no JS intervention)
   =============================== */
(function(){
  const container = document.querySelector('.snap-container');
  if (!container) return;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);

  // Do not attach JS snapping if the user prefers reduced motion
  if (prefersReduced) return;

  const sections = Array.from(container.querySelectorAll('.snap-section'));
  if (!sections.length) return;

  let isAnimating = false;

  function currentIndex(){
    const st = container.scrollTop;
    let idx = 0, min = Infinity;
    sections.forEach((s,i)=>{
      const diff = Math.abs(s.offsetTop - st);
      if (diff < min){ min = diff; idx = i; }
    });
    return idx;
  }

  function scrollToIndex(i){
    i = Math.max(0, Math.min(sections.length - 1, i));
    const target = sections[i];
    if (!target) return;
    const top = target.offsetTop;
    isAnimating = true;
    container.scrollTo({ top, behavior: 'smooth' });
    setTimeout(()=>{ isAnimating = false; }, 700);
  }

  // Wheel handling for non-touch devices
  if (!isTouch){
    container.addEventListener('wheel', (e)=>{
      if (isAnimating) { e.preventDefault(); return; }
      const delta = e.deltaY;
      if (Math.abs(delta) < 20) return; // ignore small deltas
      e.preventDefault();
      const dir = delta > 0 ? 1 : -1;
      const idx = currentIndex();
      scrollToIndex(idx + dir);
    }, { passive: false });

    // Keyboard support
    window.addEventListener('keydown', (e)=>{
      if (['ArrowDown','PageDown'].includes(e.key)){
        e.preventDefault();
        scrollToIndex(currentIndex() + 1);
      } else if (['ArrowUp','PageUp'].includes(e.key)){
        e.preventDefault();
        scrollToIndex(currentIndex() - 1);
      }
    });
  }

  // Intercept navbar links on the home page to scroll to sections instead of navigating away
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    // Only intercept same-page links when we're on the homepage
    const onHome = location.pathname === '/' || location.pathname.endsWith('/index.html');
    if (!onHome) return;
    // Map common paths to anchor ids
    const map = {
      '/': 'home',
      '/about/': 'about',
      '/projects/': 'projects',
      '/skills/': 'skills',
      '/experience/': 'experience',
      '/contact/': 'contact'
    };
    // If it's an in-page hash, let browser handle it
    if (href.startsWith('#')) return;

    // Try to match the href against known paths
    for (const [path, id] of Object.entries(map)){
      if (href.endsWith(path) || href === path || href.endsWith(path.replace(/\//g,''))){
        const idx = sections.findIndex(s=>s.id === id);
        if (idx >= 0){
          e.preventDefault();
          scrollToIndex(idx);
        }
      }
    }
  });
})();
