if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker terdaftar!', reg))
            .catch(err => console.log('Gagal daftar SW:', err));
    });  
}
// 1. Tangkap Elemen Form
const formTambah = document.getElementById('form-tambah');

// 2. Beri event 'submit' pada Form tersebut
formTambah.addEventListener('submit', async function(event) {
    
    // PENTING: Mencegah halaman berkedip/reload!
    event.preventDefault(); 
    
    // 3. Tangkap nilai yang diketik user
    const namaBarang = document.getElementById('input-nama').value;
    const hargaBarang = document.getElementById('input-harga').value;

    // 4. Siapkan kardus Data Object (akan di-stringify nanti)
    const dataKirim = {
        nama_barang: namaBarang,
        harga: hargaBarang
    };

    try {
        // 5. Panggil kurir Fetch API
        const response = await fetch('http://localhost/Juandi/api-toko/tambah_barang.php', {
            method: 'POST', // Beri tahu niatnya adalah menambah data
            headers: {
                'Content-Type': 'application/json' // Label bahwa isi paket adalah JSON
            },
            body: JSON.stringify(dataKirim) // Ubah Object JS menjadi String JSON
        });

        const hasil = await response.json();

        // 6. Cek status balasan dari PHP koki
        if (hasil.status === 'success') {
            // Bersihkan form inputan
            formTambah.reset(); 
            
            // Beri notifikasi ke user
            alert('Sukses: ' + hasil.pesan);
            
            // AJAIB: Panggil ulang fungsi Get Tabel dari Pertemuan 3!
            // Agar baris tabel otomatis bertambah tanpa reload halaman
            ambilDataBarang(); 
        } else {
            alert('Gagal: ' + hasil.pesan);
        }

    } catch (error) {
        console.error('Terjadi kesalahan koneksi:', error);
        alert('Gagal menghubungi server API. Pastikan XAMPP/Laragon menyala.');
    }
});

// Fungsi Hapus Data
async function hapusBarang(id_target) {
    
    // 1. Validasi Keamanan / Konfirmasi
    // Mencegah penghapusan karena klik tidak sengaja
    const yakin = confirm("Peringatan!\nApakah Anda yakin ingin menghapus barang dengan ID " + id_target + "?");
    
    // Jika user mengklik "OK" / "Yes" pada popup
    if (yakin) {
        try {
            // 2. Fetch API Koki
            const response = await fetch('http://localhost/Juandi/api-toko/hapus_barang.php', {
                method: 'DELETE', // Method resmi REST API untuk hapus
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id_target }) // Kirim ID ke Backend
            });

            const hasil = await response.json();

            // 3. Respon UI (Refresh Tabel)
            if (hasil.status === 'success') {
                // Panggil ulang ambilDataBarang agar tabel ter-update (hilang satu baris) secara otomatis
                ambilDataBarang(); 
            } else {
                alert('Gagal: ' + hasil.pesan);
            }

        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            alert('Gagal terhubung ke server untuk menghapus data.');
        }
    }
}
