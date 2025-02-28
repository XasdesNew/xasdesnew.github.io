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

const menuButton = document.querySelector('.menu-button');
const navMenu = document.querySelector('.nav-menu');

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menuButton.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Добавление параллакс-эффекта
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    const scrollPosition = window.scrollY;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    // Проверяем, видна ли секция
    if (scrollPosition > sectionTop - window.innerHeight && 
        scrollPosition < sectionTop + sectionHeight) {
      
      // Вычисляем значение для параллакс-эффекта
      const parallaxValue = (scrollPosition - sectionTop) * 0.1;
      
      // Применяем эффект к заголовку секции
      const heading = section.querySelector('h2');
      if (heading) {
        heading.style.transform = `translateY(${parallaxValue}px)`;
      }
    }
  });
});

// Добавление эффекта наведения для карточек
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x позиция внутри элемента
    const y = e.clientY - rect.top; // y позиция внутри элемента
    
    // Вычисляем поворот на основе положения мыши
    const rotateY = ((x / rect.width) - 0.5) * 10; // от -5 до 5 градусов
    const rotateX = ((y / rect.height) - 0.5) * -10; // от -5 до 5 градусов
    
    // Применяем трансформацию
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  
  // Сбрасываем трансформацию при уходе мыши
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.transition = 'transform 0.5s ease';
  });
});

// Исправленная инициализация карточек
const initCards = () => {
  // Сначала делаем все карточки видимыми для JavaScript
  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
  });
  
  // Добавляем индексы для задержки анимации
  document.querySelectorAll('.card-container').forEach(container => {
    container.querySelectorAll('.card').forEach((card, index) => {
      card.style.setProperty('--i', index);
    });
  });
  
  // Создаем новый observer для карточек
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        });
      }
    });
  }, { threshold: 0.1 });
  
  // Наблюдаем за каждой карточкой
  document.querySelectorAll('.card').forEach(card => {
    cardObserver.observe(card);
  });
};

// Вызываем функцию после загрузки страницы
document.addEventListener('DOMContentLoaded', initCards);

// Переменные для темы
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Проверяем сохраненную тему при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
  }
  
  // Инициализируем частицы в соответствии с текущей темой
  updateParticlesForTheme(body.classList.contains('light-theme'));
});

// Обновляем обработчик переключения темы
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  const isLight = body.classList.contains('light-theme');
  
  // Сохраняем выбор пользователя
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  
  // Обновляем частицы
  updateParticlesForTheme(isLight);
});

// Обновляем настройки частиц для разных тем
const updateParticlesForTheme = (isLight) => {
  if (typeof particlesJS !== 'undefined') {
    const color = isLight ? "#0066cc" : "#00ffd5";
    
    particlesJS('particles-js', {
      particles: {
        number: { value: isLight ? 50 : 80, density: { enable: true, value_area: 800 } },
        color: { value: color },
        shape: { type: "circle" },
        opacity: { value: isLight ? 0.3 : 0.5, random: true },
        size: { value: isLight ? 2 : 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: color,
          opacity: isLight ? 0.1 : 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: isLight ? 1 : 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 }
        }
      }
    });
  }
}; 