const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      requestAnimationFrame(() => {
        entry.target.classList.add('visible');
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.content').forEach(el => observer.observe(el));

document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
}); 