<?php
include "koneksi.php";

/** @var mysqli $koneksi */

// Pastikan koneksi database berhasil
if (!$koneksi) {
    echo json_encode(["status" => "error", "pesan" => "Koneksi database gagal."]);
    exit;
}

// MENERIMA JSON DARI JAVASCRIPT FETCH
// Fungsi file_get_contents('php://input') adalah standar REST API murni
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

// Validasi jika JSON valid dan data tidak kosong
if ($data === null) {
    echo json_encode(["status" => "error", "pesan" => "Format JSON tidak valid!"]);
    exit;
}

if(isset($data['nama_barang']) && isset($data['harga'])) {
    
    // Validasi input
    $nama = trim($data['nama_barang']);
    $harga = trim($data['harga']);
    
    if (empty($nama) || !is_numeric($harga) || $harga < 0) {
        echo json_encode(["status" => "error", "pesan" => "Data tidak valid! Nama harus diisi dan harga harus angka positif."]);
        exit;
    }
    
    // Gunakan prepared statement untuk keamanan
    $stmt = mysqli_prepare($koneksi, "INSERT INTO barang (nama_barang, harga) VALUES (?, ?)");
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "sd", $nama, $harga);
        if (mysqli_stmt_execute($stmt)) {
            // Jika sukses, kembalikan JSON status success
            echo json_encode(["status" => "success", "pesan" => "Data barang berhasil disimpan!"]);
        } else {
            // Jika gagal query database
            echo json_encode(["status" => "error", "pesan" => "Gagal menyimpan ke database: " . mysqli_error($koneksi)]);
        }
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(["status" => "error", "pesan" => "Gagal mempersiapkan query."]);
    }

} else {
    // Jika format JSON dari Frontend salah atau kosong
    echo json_encode(["status" => "error", "pesan" => "Data tidak lengkap!"]);
}
?>
