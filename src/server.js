// Mengimpor package Hapi
const Hapi = require("@hapi/hapi");

// Mengimpor routes yang sudah kamu definisikan di routes.js
const routes = require("./routes");

// Fungsi async init() digunakan untuk menginisialisasi dan menjalankan server
const init = async () => {
  // Membuat instance server Hapi
  const server = Hapi.server({
    // Server akan berjalan di port 9000 (sesuai kriteria submission)
    port: 9000,

    // Alamat host, biasanya localhost pas development
    host: "localhost",

    // Mengaktifkan CORS agar bisa akses dari browser, Postman, dsb.
    routes: {
      cors: {
        origin: ["*"], // berarti semua domain diizinkan
      },
    },
  });

  // Mendaftarkan semua route dari file routes.js
  server.route(routes);

  // Menjalankan server
  await server.start();

  // Menampilkan pesan di console kalau server berhasil dijalankan
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// Memanggil fungsi init untuk menjalankan server
init();