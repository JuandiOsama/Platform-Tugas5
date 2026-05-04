<?php
// Mencegah error CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Menggunakan path absolut agar variabel $koneksi pasti terbaca
// dirname(__FILE__) memastikan PHP mencari di folder yang sama (api-toko)
$path_koneksi = dirname(__FILE__) . '/koneksi.php';

if (file_exists($path_koneksi)) {
    include($path_koneksi);
} else {
    echo json_encode(["status" => "error", "message" => "File koneksi.php tidak ditemukan"]);
    exit;
}

// Cek apakah variabel $koneksi benar-benar ada setelah di-include
if (!isset($koneksi)) {
    echo json_encode(["status" => "error", "message" => "Variabel koneksi tidak terdefinisi"]);
    exit;
}

$query = "SELECT * FROM barang ORDER BY id DESC";
$hasil = mysqli_query($koneksi, $query);

if (!$hasil) {
    echo json_encode(["status" => "error", "message" => "Query Gagal: " . mysqli_error($koneksi)]);
    exit;
}

$data_barang = array();
while ($baris = mysqli_fetch_assoc($hasil)) {
    $data_barang[] = $baris;
}

echo json_encode([
    "status"  => "success",
    "message" => "Berhasil mengambil data",
    "data"    => $data_barang
]);
?>