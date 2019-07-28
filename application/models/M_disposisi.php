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


}
