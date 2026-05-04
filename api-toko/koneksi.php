<?php
/**
 * PENTING: Jangan ada spasi atau baris kosong di atas tag <?php
 */

// 1. Set Header (Opsional di sini, tapi bagus untuk jaga-jaga)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// 2. Parameter Koneksi
$host = "localhost";
$user = "root";
$pass = ""; 
$db   = "db_toko";

// 3. Eksekusi Koneksi
$koneksi = mysqli_connect($host, $user, $pass, $db);

// 4. Proteksi Jika Gagal
if (!$koneksi) {
    // Gunakan http_response_code agar sistem PWA tahu ada server error
    http_response_code(500);
    die(json_encode([
        "status" => "error", 
        "message" => "Koneksi Database Gagal: " . mysqli_connect_error()
    ]));
}