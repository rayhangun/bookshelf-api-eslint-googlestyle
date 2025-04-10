// Mengimpor fungsi addBookHandler dan getAllBooksHandler dari file handler.js
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handler");

// Membuat array bernama 'routes' yang berisi konfigurasi rute API
const routes = [
  {
    // method HTTP yang diterima (POST berarti client kirim data ke server)
    method: "POST",

    // path URL yang dituju (client akan mengakses /books untuk menambahkan buku baru)
    path: "/books",

    // handler yang akan dijalankan saat ada request ke /books
    handler: addBookHandler,
  },
  {
    // Route untuk mendapatkan seluruh daftar buku
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler, // handler untuk GET /books
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT", // Method HTTP untuk update
    path: "/books/{bookId}", // URL untuk update buku berdasarkan ID
    handler: editBookByIdHandler, // Handler untuk update
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

// Mengekspor array routes agar bisa digunakan di file lain (misalnya server.js)
module.exports = routes;
