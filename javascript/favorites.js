let themeIcon = document.getElementById('theme');
let body = document.body;
let path = 'http://localhost:3000';
let main = document.querySelector('main')

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



function createBooksSection() {
  let section = document.createElement('section');
  section.classList.add('books');

  let header = document.createElement('div');
  header.classList.add('books-header');

  let h2 = document.createElement('h2');
  h2.textContent = 'Избранное';

  header.append(h2);

  let booksContainer = document.createElement('div');
  booksContainer.classList.add('books-container');

  section.append(header, booksContainer);

  return { section, booksContainer };
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

  likesColor(book, heartIcon);

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
  p.innerHTML = `Автор: ${book.bookAuthor} <br> Жанр: ${book.genre}`;

  let bookDetail = document.createElement('div');
  bookDetail.classList.add('book-details');

  let readButton = document.createElement('button');
  readButton.classList.add('buy-btn');
  readButton.textContent = 'Читать';

  let rating = document.createElement('span');
  rating.classList.add('rating');
  rating.innerHTML = '&#9733; &#9733; &#9733; &#9733; &#9734;';

  bookCard.append(heartBadge, bookImg, h3, p, bookDetail);
  heartBadge.append(heartIcon);
  bookDetail.append(readButton, rating);

  return bookCard;
}

async function getBooks() {
  try {
    let likedBooks = JSON.parse(localStorage.getItem('likedBooks')) || [];
    let { section, booksContainer } = createBooksSection();

    if (likedBooks.length > 0) {
      likedBooks.forEach(book => {
        let bookCard = createBookCard(book);
        booksContainer.append(bookCard);
      });
    } else {
      booksContainer.innerHTML = '<p>Нет избранных книг.</p>';
    }

    main.append(section);
  } catch (error) {
    console.error('Ошибка при загрузке книг:', error);
  }
}

getBooks();