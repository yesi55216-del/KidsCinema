# Kids Cinema - Platform Pemesanan Tiket Bioskop Anak

Kids Cinema adalah aplikasi web interaktif berdesain modern (glassmorphism) yang dirancang khusus untuk eksplorasi film animasi anak dan pemesanan tiket secara daring. Platform ini dilengkapi dengan fitur pencarian real-time, ulasan & rating bintang, kalkulasi harga tiket otomatis (Kelas Regular dan VIP Suite), cetak e-ticket, serta riwayat transaksi yang tersimpan secara lokal.

## Fitur Utama

* **Katalog Film & Modal Detail**: Memuat daftar film animasi populer (Tangled, Moana, Coco, Frozen, dll.) lengkap dengan poster, sinopsis, genre, dan skor rating.

* **Sistem Ulasan & Rating Bintang**: Pengguna yang telah masuk (login) dapat memberikan ulasan teks beserta rating bintang (1-5) yang tersimpan secara interaktif pada setiap film.

* **Pencarian & Penyaringan Real-Time**:
  * Pencarian judul film atau genre pada halaman utama.
  * Pengurutan berdasarkan rating tertinggi atau abjad (A-Z) pada halaman rekomendasi.

* **Kalkulator & Pemesanan Tiket**:
  * Pemilihan jadwal tayang (showtime).
  * Pilih kelas tiket: **Regular Seat** (IDR 50.000) atau **VIP Suite** (IDR 85.000).
  * Hitung total pembayaran secara otomatis berdasarkan jumlah tiket.
  * Konfirmasi pemesanan dan pembuatan E-Ticket (modal invoice).

* **Riwayat Tiket (Ticket History)**: Menyimpan dan menampilkan seluruh transaksi tiket pengguna secara real-time.

* **Autentikasi Pengguna (Simulasi)**: Manajemen sesi pengguna (Login, Signup, Logout, Lupa Password) menggunakan penyimpanan browser (LocalStorage).

* **Notifikasi Toast Kustom**: Umpan balik visual yang intuitif saat pengguna melakukan aksi (misal: login, posting ulasan, atau membeli tiket).

* **Dukungan Layout iFrame (frame.html)**: Memungkinkan navigasi aplikasi dijalankan di dalam induk iframe tanpa memuat ulang seluruh halaman.

## Teknologi yang Digunakan

* **Frontend**: HTML5, CSS3 (Glassmorphism, Variabel CSS, Animasi CSS, Flexbox & CSS Grid)
* **Library JavaScript**: jQuery 3.7.1
* **Penyimpanan Data**: Web Storage API (LocalStorage) untuk persistensi data sesi, ulasan, dan riwayat pemesanan.
* **Tipografi**: Google Fonts (Inter)

## Struktur Berkas Repositori

```
KidsCinema/
├── index.html       # Halaman utama (Hero banner, pencarian, & grid film populer)
├── buyticket.html   # Halaman formulir pemesanan tiket & riwayat transaksi
├── recommend.html   # Halaman rekomendasi film dengan fitur penyaringan (For You)
├── contact.html     # Halaman formulir kontak & bantuan
├── frame.html       # Halaman master layout dengan navigasi berbasis iFrame
├── login.html       # Halaman masuk pengguna
├── signup.html      # Halaman pendaftaran akun baru
├── forgot.html      # Halaman reset kata sandi
├── script.js        # Logika utama (Mock data film, autentikasi, ulasan, kalkulator tiket, LocalStorage)
└── styles.css       # Berkas gaya global (Tema Glassmorphism, tabel harga, notifikasi toast, responsivitas)
```

## Struktur Data LocalStorage

Aplikasi ini menggunakan tiga kunci utama pada LocalStorage untuk menyimpan data pengguna secara lokal:

| Key | Deskripsi Data | 
| ----- | ----- | 
| `kc_session_final` | Menyimpan data sesi pengguna yang sedang login (`{ name: string }`). | 
| `kc_comments_final` | Objek riwayat ulasan film berdasarkan ID film (`{ [movieId]: [{ user, text, stars }] }`). | 
| `kc_history_final` | Array riwayat pembelian tiket (`[{ user, movieTitle, seatType, qty, total, date, time }]`). | 

## Cara Menjalankan Proyek

1. **Unduh / Clone Repositori**:
   ```bash
   git clone https://github.com/username/kids-cinema.git
   ```

2. **Buka Aplikasi**:
   * Untuk tampilan standar: Buka berkas `index.html` langsung di peramban web (browser) Anda.
   * Untuk tampilan navigasi iFrame: Buka berkas `frame.html`.
   * Atau gunakan ekstensi server lokal seperti Live Server di Visual Studio Code.

## Lisensi

Proyek ini dikembangkan untuk tujuan edukasi dan demonstrasi antarmuka pemesanan tiket bioskop anak berbasis web.
