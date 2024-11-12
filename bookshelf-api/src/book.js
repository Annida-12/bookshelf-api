// book.js

const { nanoid } = require('nanoid');

// Inisialisasi array untuk menyimpan data buku
const books = [];
// Fungsi untuk menambahkan buku baru
function addBook({ name, year, author, summary, publisher, pageCount, readPage, reading }) {
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  return newBook;
}

// Fungsi untuk mendapatkan semua buku
function getAllBooks() {
  return books.map(({ id, name, publisher }) => ({ id, name, publisher }));
}

// Fungsi untuk mendapatkan detail buku berdasarkan ID
function getBookById(id) {
  return books.find((book) => book.id === id);
}

// Fungsi untuk memperbarui buku berdasarkan ID
function updateBook(id, { name, year, author, summary, publisher, pageCount, readPage, reading }) {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) return null;

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    updatedAt,
  };

  return books[bookIndex];
}

// Fungsi untuk menghapus buku berdasarkan ID
function deleteBook(id) {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) return false;

  books.splice(bookIndex, 1);
  return true;
}

// Ekspor fungsi
module.export = books;