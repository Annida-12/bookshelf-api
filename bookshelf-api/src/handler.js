const { nanoid } = require('nanoid');
let books = [];

// Kriteria 3: Menyimpan buku
const addBook = (req, res) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

  res.status(201).json({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: 1,
    },
  });

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt
  };

  books.push(newBook);

};

// Kriteria 4: Mendapatkan semua buku
const getBooks = (req, res) => {
  const responseBooks = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
  res.status(200).json({
    status: 'success',
    data: { books: responseBooks },
  });
};

// Kriteria 5: Mendapatkan detail buku
const getBookById = (req, res) => {
  const { bookId } = req.params;
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(400).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { 
      book: {
        "id": "1",
        "name": "Nama Buku",
        "year": 2021,
        "author": "Penulis",
        "summary": "Ringkasan",
        "publisher": "Penerbit",
        "pageCount": 100,
        "readPage": 50,
        "finished": false,
        "reading": false,
        "insertedAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      } 
    },
  });
};

if (bookIndex === -1) {
  return res.status(400).json({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
}

// Kriteria 6: Memperbarui buku
const updateBook = (req, res) => {
  const { bookId } = req.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
  const bookIndex = books.findIndex((b) => b.id === bookId);

  books[bookIndex] = {
    ...books[bookIndex],
    name, year, author, summary, publisher, pageCount, readPage, reading,
    finished: pageCount === readPage,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
};

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  if (bookIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
  }
  
// Kriteria 7: Menghapus buku
const deleteBook = (req, res) => {
  const { bookId } = req.params;
  const bookIndex = books.findIndex((b) => b.id === bookId);

res.status(200).json({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
};

  if (bookIndex === -1) {
    return res.status(400).json({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
  }

  books.splice(bookIndex, 1);


module.exports = { addBook, getBooks, getBookById, updateBook, deleteBook };
