<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tu extends CI_Controller {

    public function index()
    {
        $this->load->view('tu/root.html');
    }

    public function dashboard()
    {
        $this->load->view('tu/pages/v_dashboard.html');
    }

    public function pengaduan()
    {
        $this->load->view('tu/pages/v_pengaduan.html');
    }

    public function disposisi()
    {
        $this->load->view('tu/pages/v_disposisi.html');
    }

    public function keputusan()
    {
        $this->load->view('tu/pages/v_surat_keputusan.html');
    }

    public function penugasan()
    {
        $this->load->view('tu/pages/v_penugasan.html');
    }

    public function petugas()
    {   
        $this->load->view('tu/pages/v_petugas.html');
    }

    public function pengadu()
    {
        $this->load->view('tu/pages/v_pengadu.html');
    }

    

}