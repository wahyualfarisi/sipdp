<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_disposisi extends CI_Model{

    public function get_jenistugas()
    {
        $type = $this->db->query("SHOW COLUMNS FROM tbl_disposisi WHERE Field = 'jenis_tugas'" )->row( 0 )->Type;
        preg_match("/^enum\(\'(.*)\'\)$/", $type, $matches);
        $enum = explode("','", $matches[1]);
        return $enum;
    }

    public function show_disposisi($query)
    {
        $query = "SELECT a.nomor_disposisi, a.tgl_disposisi, a.jenis_tugas, a.catatan_disposisi, a.status_disposisi, 
                         b.id_petugas , b.bagian ,
                         c.id_pengaduan, c.nama_perusahaan_pers, c.judul_berita, c.edisi_penerbitan, c.catatan, c.status_pengaduan,
                         d.id_terdaftar, d.email, CONCAT(d.nama_depan, ' ', d.nama_belakang) as nama_pengadu
                  FROM tbl_disposisi a LEFT JOIN tbl_penugasan b ON a.id_petugas = b.id_petugas 
                                       LEFT JOIN tbl_pengaduan c ON a.id_pengaduan = c.id_pengaduan 
                                       LEFT JOIN tbl_user d ON c.id_terdaftar = d.id_terdaftar
                                       WHERE a.nomor_disposisi LIKE '%$query%' OR b.bagian LIKE '%$query%'
                                       ORDER BY a.tgl_disposisi ASC
        ";
        return $this->db->query($query);
    }


}
