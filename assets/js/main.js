document.addEventListener('DOMContentLoaded', function(){
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav-list');
  if(!btn || !nav) return;
  btn.addEventListener('click', function(){
    nav.classList.toggle('show');
  });
});
// Contact form -> opens mail client (works on GitHub Pages)
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

    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
});
