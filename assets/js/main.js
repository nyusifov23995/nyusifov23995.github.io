document.addEventListener('DOMContentLoaded', function(){
  var btn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav-list');
  if(!btn || !nav) return;
  btn.addEventListener('click', function(){
    nav.classList.toggle('show');
  });
});
