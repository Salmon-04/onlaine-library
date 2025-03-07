let body = document.body;
let themeIcon = document.getElementById('theme');

if(localStorage.getItem('theme') == 'dark'){
  themeIcon.classList.replace('fa-moon', 'fa-sun');
  body.classList.add('dark');
}else{
  themeIcon.classList.replace('fa-sun', 'fa-moon');
  body.classList.remove('dark')
}

function toggleTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    body.classList.remove('dark');
  } else {
    localStorage.setItem('theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    body.classList.add('dark');
  }
}

themeIcon.addEventListener('click', toggleTheme);

new Swiper('.book-swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: { // пагинация
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: false,
  },
  // scrollbar: { // скролбар
  //   el: '.swiper-scrollbar',
  //   draggable: true
  // },
  loop: true, //бесконечность
  autoplay: { // автослайдер
    delay: 3000, // Задержка между слайдами
  },
  grabCursor: true, // курсор
  effect: 'slide', // fade cuba
  slidesPerView: 3
});

new Swiper('.reviews-swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: { // пагинация
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: false,
  },
  // scrollbar: { // скролбар
  //   el: '.swiper-scrollbar',
  //   draggable: true
  // },
  loop: false, //бесконечность
  autoplay: false,
  grabCursor: true, // курсор
  effect: 'slide', // fade cuba
  slidesPerView: 1
});