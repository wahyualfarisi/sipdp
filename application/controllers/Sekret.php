<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sekret extends CI_Controller {

    public function index()
    {
        $this->load->view('sekretrs/root.html');
    }

    public function dashboard()
    {

    }


    public function laporan()
    {
        if(isset($_GET['id'] )){
            $this->load->view('sekretrs/pages/v_detail_keputusan.html');
        }else{
            $this->load->view('sekretrs/pages/v_surat_keputusan.html');
        }
    }

    public function buatlaporan()
    {
        $this->load->view('sekretrs/pages/v_buatlaporan.html');
    }

}
