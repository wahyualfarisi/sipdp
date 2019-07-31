<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class M_dashboard extends CI_Model{

    public function count_pengaduan_status()
    {
        $query = "SELECT SUM(status_pengaduan = 'terkirim') as totalTerkirm, 
                         SUM(status_pengaduan = 'diterima') as totalDiTerima,
                         SUM(status_pengaduan = 'proses') as totalProses,
                         SUM(status_pengaduan = 'selesai') as totalSelesai
                  FROM tbl_pengaduan
        ";
        return $this->db->query($query);
    }

    public function count_disposisi_status()
    {
        $query = "SELECT SUM(status_disposisi = 'proses') as totalProses,
                         SUM(status_disposisi = 'tindaklanjuti') as totalTindakLanjuti,
                         SUM(status_disposisi = 'selesai') as totalSelesai
                  FROM tbl_disposisi        
        ";
        return $this->db->query($query);
    }

    


}
