const booksEl = document.querySelector(".books");
const formEl = document.getElementById("new-book-form");
const titleInputEl = document.getElementById("book-name");
const authorInputEl = document.getElementById("author-name");
const pagesInputEl = document.getElementById("pages-num");
const readInputEl = document.getElementById("read");
const modalButton = document.querySelector(".open-modal");
const modalEl = document.querySelector(".modal");

class Book {
  constructor(title, author, pages, isRead) {
    this.id = Math.random();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
  toggleRead = function () {
    this.isRead = !this.isRead;
  };
  getBookHTML = function () {
    return `
        <div class="card">
          <div class="title">${this.title}</div>
          <div class="author">by ${this.author}</div>
          <div class="pages">${this.pages} pages</div>
          <div>Read status: ${
            this.isRead ? "Completed" : "Not Completed Yet"
          }</div>
          <button data-id=${this.id} onclick="Book.toggleReadStatus(${
      this.id
    })" class="book-read">${
      this.isRead ? "I haven't read this book" : "I have read this book"
    }
          </button>
          <button data-id=${this.id} onclick="Book.removeBook(${
      this.id
    })" class="remove-book">Remove</button>
        </div>
    `;
  };
  static displayBooks() {
    booksEl.innerHTML = `${myLibrary
      .map((book) => book.getBookHTML())
      .join("")}`;
  }
  static addBookToLibrary(event) {
    event.preventDefault();
    const title = titleInputEl.value;
    const author = authorInputEl.value;
    const pages = pagesInputEl.value;
    const isRead = readInputEl.checked;
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    this.reset();
    closeModal();
    Book.displayBooks();
  }
  static toggleReadStatus(id) {
    myLibrary = myLibrary.map((book) => {
      if (book.id === id) {
        book.toggleRead();
        return book;
      }
      return book;
    });
    Book.displayBooks();
  }
  static removeBook(id) {
    myLibrary = myLibrary.filter((book) => book.id !== id);
    Book.displayBooks();
  }
}
let myLibrary = [];
Book.displayBooks();

formEl.addEventListener("submit", Book.addBookToLibrary);

/*
All of these methods are to open/close the modal
*/
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
