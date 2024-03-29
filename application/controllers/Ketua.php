<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ketua extends CI_Controller {

    public function index()
    {
        $this->load->view('ketua/root.html');
    }

    public function dashboard()
    {
        $this->load->view('ketua/pages/v_dashboard.html');
    }

    public function disposisi()
    {
        $this->load->view('ketua/pages/v_disposisi.html');
    }

    public function keputusan()
    {
        if(isset($_GET['id']) ){
            $this->load->view('ketua/pages/v_detail_keputusan.html');
        }else{
            $this->load->view('ketua/pages/v_keputusan.html');
        }
        
    }

    public function pengaduan()
    {
        $this->load->view('ketua/pages/v_pengaduan.html');
    }

    public function laporan()
    {
        $this->load->view('ketua/pages/v_laporan.html');
    }

    public function lihatlaporan()
    {
        if(isset($_GET['id_laporan']) ){
            $this->load->view('ketua/pages/v_lihatlaporan.html');
        }
    }

    public function lihatsurat()
    {
        if(isset($_GET['id_surat']) ){
            $this->load->view('ketua/pages/v_lihatsurat.html');
        }
    }

}