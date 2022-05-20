const booksEl = document.querySelector(".books");
const formEl = document.getElementById("new-book-form");
const titleInputEl = document.getElementById("book-name");
const authorInputEl = document.getElementById("author-name");
const pagesInputEl = document.getElementById("pages-num");
const readInputEl = document.getElementById("read");
const modalButton = document.querySelector(".open-modal");
const modalEl = document.querySelector(".modal");
let myLibrary = [];
displayBooks();

function Book(title, author, pages, isRead) {
  this.id = Math.random();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.getBookHTML = function () {
    return `
        <div class="card">
          <div class="title">${this.title}</div>
          <div class="author">by ${this.author}</div>
          <div class="pages">${this.pages} pages</div>
          <div>Read status: ${
            this.isRead ? "Completed" : "Not Completed Yet"
          }</div>
          <button data-id=${this.id} onclick="toggleReadStatus(${
      this.id
    })" class="book-read">${
      this.isRead ? "I haven't read this book" : "I have read this book"
    }
          </button>
          <button data-id=${this.id} onclick="removeBook(${
      this.id
    })" class="remove-book">Remove</button>
        </div>
    `;
  };
}

function addBookToLibrary(event) {
  event.preventDefault();
  const title = titleInputEl.value;
  const author = authorInputEl.value;
  const pages = pagesInputEl.value;
  const isRead = readInputEl.checked;
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  console.log(myLibrary);
  this.reset();
  closeModal();
  displayBooks();
}

function toggleReadStatus(id) {
  myLibrary = myLibrary.map((book) => {
    if (book.id === id) {
      return {
        ...book,
        isRead: !book.isRead,
      };
    }
    return book;
  });
  displayBooks();
}

function removeBook(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  displayBooks();
}

function displayBooks() {
  booksEl.innerHTML = `${myLibrary.map((book) => book.getBookHTML()).join("")}`;
}

formEl.addEventListener("submit", addBookToLibrary);

modalButton.addEventListener("click", () => {
  modalEl.style.display = "block";
});

function closeModal() {
  modalEl.style.display = "none";
}

document.querySelector(".close").addEventListener("click", () => {
  closeModal();
});

window.addEventListener("click", (event) => {
  if (event.target === modalEl) {
    closeModal();
  }
});
