import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

// Inisialisasi Firebase
const appSettings = {
    databaseURL: "https://tabungan-d57a1-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const riwayat = ref(database, "riwayat");

// Ambil elemen DOM
const saldo = document.getElementById("tambah");
const tombolTambah = document.getElementById("tombol-tambah");
const daftar = document.getElementById("daftarRiwayat");

// Fungsi untuk format rupiah
function formatRupiah(input) {
    let angka = input.value.replace(/\D/g, ''); // Menghapus karakter selain angka
    angka = angka.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Menambahkan titik setiap 3 digit
    input.value = angka;
}

// Tambahkan event listener pada input untuk format uang setiap kali user mengetik
saldo.addEventListener("input", function() {
    formatRupiah(saldo);
});

// Event listener untuk tombol tambah
tombolTambah.addEventListener("click", function() {
    let pemasukan = saldo.value.replace(/\./g, ''); // Menghapus titik sebelum push ke database

    // Push data pemasukan ke Firebase
    push(riwayat, pemasukan)

    // Kosongkan input setelah data tersimpan
     saldo.value = "";

     // menambahkan list
     daftar.innerHTML += `<li>${pemasukan}</li>`

    
});