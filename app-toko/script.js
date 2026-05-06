async function ambilDataBarang() {
    const tabel = document.getElementById('tabel-barang');
    
    try {
        const response = await fetch('http://localhost/Juandi/api-toko/get-barang.php');
        const hasil = await response.json();
        
        if (hasil.status === 'success') {
            let barisHTML = '';
            
            hasil.data.forEach(barang => {
                // Format angka ke Rupiah
                const hargaFormatted = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(barang.harga);

                barisHTML += `
                    <tr class="hover:bg-emerald-50 transition-colors group">
                        <td class="px-6 py-4 text-slate-600 font-medium">#${barang.id}</td>
                        <td class="px-6 py-4 text-slate-800 font-semibold group-hover:text-emerald-700">${barang.nama_barang}</td>
                        <td class="px-6 py-4 text-right text-emerald-600 font-bold">${hargaFormatted}</td>
                        <td class="px-6 py-4 text-center">
                            <button onclick="hapusBarang(${barang.id})" class="bg-rose-500 hover:bg-rose-600 text-white text-xs px-3 py-2 rounded-lg font-medium transition-all active:scale-95 shadow-sm">Hapus</button>
                        </td>
                    </tr>
                `;
            });
            
            tabel.innerHTML = barisHTML;
        }
    } catch (error) {
        tabel.innerHTML = `
            <tr>
                <td colspan="4" class="px-6 py-10 text-center text-red-500 bg-red-50">
                    ⚠️ Gagal memuat data. Pastikan server lokal Anda menyala.
                </td>
            </tr>
        `;
        console.error('Error:', error);
    }
}

// Jalankan saat load
ambilDataBarang();
