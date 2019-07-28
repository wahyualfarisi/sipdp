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

    


}
