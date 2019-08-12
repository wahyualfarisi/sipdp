<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_keputusan extends CI_Model{

    public function show_keputusan_users($id_terdaftar)
    {
        $query = "SELECT a.no_surat_keputusan, a.lampiran, a.perihal, a.isi_agenda, a.tgl_keputusan,
                         b.nomor_disposisi, 
                         c.id_pengaduan, c.nama_perusahaan_pers, c.judul_berita, c.edisi_penerbitan, c.catatan as ct_pengaduan, c.status_pengaduan, c.deskripsi_status
                  FROM tbl_surat_keputusan a LEFT JOIN tbl_disposisi b ON a.nomor_disposisi = b.nomor_disposisi
                                             LEFT JOIN tbl_pengaduan c ON b.id_pengaduan = c.id_pengaduan 
                                             WHERE c.id_terdaftar = '$id_terdaftar'                         
        ";
        return $this->db->query($query);
    }
    
    public function show_keputusan($query, $from, $to)
    {
        $query = "SELECT a.no_surat_keputusan, a.lampiran, a.perihal, a.isi_agenda, a.tgl_keputusan, a.status_surat,
                         b.nomor_disposisi, b.tgl_disposisi, b.jenis_tugas, b.catatan_disposisi as cat_dispo , b.status_disposisi,
                         c.id_pengaduan, c.nama_perusahaan_pers, c.judul_berita, c.edisi_penerbitan, c.catatan, c.status_pengaduan, c.deskripsi_status,
                         d.id_terdaftar, d.email, d.alamat, CONCAT(d.nama_depan, ' ', d.nama_belakang) as nama_lengkap,
                         e.id_petugas, e.bagian
                  FROM tbl_surat_keputusan a LEFT JOIN tbl_disposisi b ON a.nomor_disposisi = b.nomor_disposisi 
                                             LEFT JOIN tbl_pengaduan c ON b.id_pengaduan = b.id_pengaduan 
                                             LEFT JOIN tbl_user d ON c.id_terdaftar = c.id_terdaftar 
                                             LEFT JOIN tbl_penugasan e ON b.id_petugas = e.id_petugas
                                             WHERE a.no_surat_keputusan LIKE '%$query%' AND a.tgl_keputusan BETWEEN '$from' AND '$to'
                                             GROUP BY a.no_surat_keputusan   
        ";
        return $this->db->query($query);
    }

    public function show_keputusan_where($where = null)
    {
        $this->db->select('a.*')
                 ->select('b.*')
                 ->select('c.*')
                 ->select('d.*')
                 ->select('e.*')
                 ->from('tbl_surat_keputusan a')
                 ->join('tbl_disposisi b','b.nomor_disposisi = a.nomor_disposisi', 'left')
                 ->join('tbl_penugasan c','c.id_petugas = b.id_petugas', 'left')
                 ->join('tbl_pengaduan d', 'd.id_pengaduan = b.id_pengaduan', 'left')
                 ->join('tbl_user e','e.id_terdaftar = d.id_terdaftar','left');
       if($where !== null){
           $this->db->where($where);
       }
       return $this->db->get();     
    }
}
