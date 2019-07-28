<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_pengaduan extends CI_Model {

    public function get_notif_pengaduan_baru()
    {
        //function untuk TU melihat daftar pengaduan yang baru
        $query = "SELECT a.id_pengaduan  , a.nama_perusahaan_pers, a.judul_berita, a.edisi_penerbitan, a.catatan, a.status_pengaduan,
                         b.id_terdaftar, b.email, b.alamat, CONCAT(b.nama_depan, ' ', b.nama_belakang) as nama_pengadu, b.tgl_terdaftar
                  FROM tbl_pengaduan a LEFT JOIN tbl_user b ON a.id_terdaftar = b.id_terdaftar                                
                  WHERE a.status_pengaduan = 'terkirim'
        ";
        return $this->db->query($query);
    }

    public function show_pengaduan($query)
    {
        $query = "SELECT a.id_pengaduan , a.nama_perusahaan_pers, a.judul_berita, a.edisi_penerbitan, a.catatan, a.status_pengaduan, 
                         b.id_terdaftar, b.email, CONCAT(b.nama_depan, ' ', b.nama_belakang) as nama_pengadu,
                         c.nomor_disposisi, c.tgl_disposisi, c.jenis_tugas, c.catatan_disposisi, c.status_disposisi, 
                         d.id_petugas, d.bagian
                  FROM tbl_pengaduan a LEFT JOIN tbl_user b ON a.id_terdaftar = b.id_terdaftar 
                                       LEFT JOIN tbl_disposisi c ON a.id_pengaduan = c.id_pengaduan 
                                       LEFT JOIN tbl_penugasan d ON c.id_petugas = d.id_petugas
                  WHERE a.status_pengaduan != 'terkirim' AND a.id_pengaduan LIKE '%$query%' OR a.nama_perusahaan_pers LIKE '%$query%' OR b.nama_depan LIKE '%$query%'
        ";
        return $this->db->query($query);
    }

    


}
