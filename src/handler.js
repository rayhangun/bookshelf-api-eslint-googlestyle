import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';
import books from './books.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const saveBooksToFile = () => {
  const filePath = path.join(__dirname, 'books.js');
  const fileContent = `const books = ${JSON.stringify(
    books,
    null,
    2,
  )};\n\nexport default books;\n`;
  fs.writeFileSync(filePath, fileContent, 'utf8');
};

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  saveBooksToFile();

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id },
    })
    .code(201);
};

const getAllBooksHandler = (request) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = books;

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading === !!Number(reading),
    );
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === !!Number(finished),
    );
  }

  const booksResponse = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return {
    status: 'success',
    data: { books: booksResponse },
  };
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return h
      .response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
      .code(404);
  }

  return {
    status: 'success',
    data: { book },
  };
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
      .code(404);
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: pageCount === readPage,
    updatedAt: new Date().toISOString(),
  };

  saveBooksToFile();

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
    .code(200);
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404);
  }

  books.splice(index, 1);
  saveBooksToFile();

  return h
    .response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    .code(200);
};

export {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
