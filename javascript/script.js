let body = document.body;
let main = document.querySelector('main');
let aside = document.querySelector('aside');
let path = 'http://localhost:3000';
let themeIcon = document.getElementById('theme');
let line = document.querySelector('hr');
let mainAllBooks = document.getElementById('allBook');

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

if(localStorage.getItem('theme') == 'dark'){
  themeIcon.classList.replace('fa-moon', 'fa-sun');
  body.classList.add('dark');
}else{
  themeIcon.classList.replace('fa-sun', 'fa-moon');
  body.classList.remove('dark')
}

themeIcon.addEventListener('click', () => {
  if (localStorage.getItem('theme') == 'dark') {
    localStorage.setItem('theme', 'light');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    body.classList.remove('dark');
  } else {
    localStorage.setItem('theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    body.classList.add('dark');
  }
});

// function toggleTheme() {
//   if (localStorage.getItem('theme') === 'dark') {
//     localStorage.setItem('theme', 'light');
//     themeIcon.classList.replace('fa-sun', 'fa-moon');
//     body.classList.remove('dark');
//   } else {
//     localStorage.setItem('theme', 'dark');
//     themeIcon.classList.replace('fa-moon', 'fa-sun');
//     body.classList.add('dark');
//   }
// }

// themeIcon.addEventListener('click', toggleTheme);

function createBooksSection() {
  let section = document.createElement('section');
  section.classList.add('books');

  let header = document.createElement('div');
  header.classList.add('books-header');

  let h2 = document.createElement('h2');
  h2.textContent = 'Книги';

  let allBooksLink = document.createElement('a');
  allBooksLink.classList.add('all-books-link');
  allBooksLink.innerHTML = 'Все книги <i class="fa-solid fa-arrow-right"></i>';
  allBooksLink.href = './allBooks.html';

  header.append(h2, allBooksLink);
  
  let booksContainer = document.createElement('div');
  booksContainer.classList.add('books-container');

  section.append(header, booksContainer);
  
  return { section, booksContainer };
}

function createAudioBooksSection() {
  let audioSection = document.createElement('section');
  audioSection.classList.add('books');

  let header = document.createElement('div');
  header.classList.add('books-header');

  let h2 = document.createElement('h2');
  h2.textContent = 'Аудиониги';

  let allBooksLink = document.createElement('a');
  allBooksLink.classList.add('all-books-link');
  allBooksLink.innerHTML = 'Все аудиокниги <i class="fa-solid fa-arrow-right"></i>';

  header.append(h2, allBooksLink);
  
  let audioBooksContainer = document.createElement('div');
  audioBooksContainer.classList.add('books-container');

  audioSection.append(header, audioBooksContainer);
  
  return { audioSection, audioBooksContainer };
}

function likesColor(book, heartIcon) {
  let likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];

  let isLiked = likedBooks.some(likedBook => likedBook.id === book.id);
  
  if (isLiked ) {
    heartIcon.style.color = 'red'; 
  } else {
    heartIcon.style.color = 'white';
  }
}

function createBookCard(book) {
  let bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  let heartBadge = document.createElement('div');
  heartBadge.classList.add('heart-badge');

  let heartIcon = document.createElement('i');
  heartIcon.classList.add('heart-icon');
  heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';

  likesColor (book, heartIcon);

  heartIcon.addEventListener('click', () => {
    heartIcon.classList.toggle('liked');
    let likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
  
    if (heartIcon.classList.contains('liked')) {
      heartIcon.style.color = 'red';
      likedBooks.push(book); 
    } else {
      heartIcon.style.color = 'white';
      likedBooks = likedBooks.filter(likedBook => likedBook.id !== book.id);
    }
  
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
  });

  let bookImg = document.createElement('img');
  bookImg.src = book.bookFoto;
  bookImg.alt = book.bookName;

  let h3 = document.createElement('h3');
  h3.textContent = book.bookName;

  let p = document.createElement('p');
  p.textContent = `Автор: ${book.bookAuthor}`;

  let bookDetail = document.createElement('div');
  bookDetail.classList.add('book-details');

  let readButton = document.createElement('button');
  readButton.classList.add('buy-btn');
  readButton.textContent = 'Читать';

  let rating = document.createElement('span');
  rating.classList.add('rating');
  rating.innerHTML = book.raiting || '&#9733; &#9733; &#9733; &#9733; &#9734;';

  bookCard.append(heartBadge, bookImg, h3, p, bookDetail);
  heartBadge.append(heartIcon);
  bookDetail.append(readButton, rating);

  return bookCard;
}

function createAudioBookCard(audioBook) {
  let audioBookCard = document.createElement('div');
  audioBookCard.classList.add('audio-book-card');

  let heartBadge = document.createElement('div');
  heartBadge.classList.add('heart-badge');

  let heartIcon = document.createElement('i');
  heartIcon.classList.add('heart-icon');
  heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';

  heartIcon.addEventListener('click', () => {
    heartIcon.classList.toggle('liked'); 
    if (heartIcon.classList.contains('liked')) {
      heartIcon.style.color = 'red'; 
    } else {
      heartIcon.style.color = '';
    }
  });

  let bookCover = document.createElement('div');
  bookCover.classList.add('book-cover');
  let bookImg = document.createElement('img');
  bookImg.src = audioBook.bookFoto;

  let audioBookContent = document.createElement('div');
  audioBookContent.classList.add('audio-book-content');
  let h3 = document.createElement('h3');
  h3.textContent = audioBook.bookName;

  let p = document.createElement('p');
  p.textContent = `Автор: ${audioBook.bookAuthor}`;


  let audioControls = document.createElement('div');
  audioControls.classList.add('audio-controls');
  
  let audioPlay = document.createElement('audio');
  audioPlay.autoplay;
  audioPlay.loop;

  let audioSource = document.createElement('source');
  audioSource.type = 'audio/mpeg';
  audioSource.src = audioBook.audio;

  let controlButton = document.createElement('div');
  controlButton.classList.add('control-buttons');

  let prevButton = document.createElement('button');
  prevButton.classList.add('prev-button');
  let prevIcon = document.createElement('i')
  prevIcon.classList.add('fa-solid', 'fa-forward');
  prevButton.append(prevIcon);
  
  let playButton = document.createElement('button');
  playButton.classList.add('play-button');
  let playIcon = document.createElement('i');
  playIcon.classList.add('fa-solid', 'fa-pause');
  playButton.append(playIcon);
  
  let nextButton = document.createElement('button');
  nextButton.classList.add('next-button');
  let nextIcon = document.createElement('i');
  nextIcon.classList.add('fa-solid', 'fa-backward');
  nextButton.append(nextIcon);
  
  
  audioBookCard.append(heartBadge, bookCover, audioBookContent,  );
  heartBadge.append(heartIcon);
  bookCover.append(bookImg);
  audioBookContent.append(h3, p, audioControls, controlButton);
  controlButton.append(nextButton, playButton, prevButton);
  audioControls.append(audioPlay);
  audioPlay.append(audioSource);

  return audioBookCard;
}

async function getBooks() {
  try {
    let response = await fetch(`${path}/books`);
    let data = await response.json();

    let { section, booksContainer } = createBooksSection();

    data.forEach(book => {
      let bookCard = createBookCard(book);
      booksContainer.append(bookCard);
    });

    main.append(section);
  } catch (error) {
    console.error('Ошибка при загрузке книг:', error);
  }
}

getBooks();

async function getAudioBooks() {
  try {
    let response = await fetch(`${path}/audioBooks`);
    let data = await response.json();

    let { audioSection, audioBooksContainer } = createAudioBooksSection();

    data.forEach(audioBooks => {
      let bookCard = createAudioBookCard(audioBooks);
      audioBooksContainer.append(bookCard);
    });

    aside.append(audioSection);
  } catch (error) {
    console.error('Ошибка при загрузке книг:', error);
  }
}
getAudioBooks();