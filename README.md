# ObsiCare

# Cara menjalankan docker
1. Clone ke direktori lokal anda
2. Jalankan ```docker-compose up --build```

**ObsiCare** adalah website inovatif yang dirancang untuk membantu penderita obesitas dalam memantau asupan nutrisi harian dan memperoleh rekomendasi makanan yang sesuai dengan kebutuhan gizi  masing-masing individu.

## Fitur Utama

- 🔐 **Autentikasi Pengguna**
  - Registrasi dan login pengguna
  - Penyimpanan data pengguna dengan PostgreSQL

- 🧠 **Prediksi Obesitas**
  - Menggunakan model machine learning untuk memprediksi kemungkinan obesitas berdasarkan data pengguna

- 🍽️ **Sistem Rekomendasi Makanan**
  - Rekomendasi berdasarkan kebutuhan kalori harian pengguna
  - Menggunakan metode knowledge-based
  - Integrasi model clustering KMeans untuk pengelompokan jenis makanan
