<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Komisi extends CI_Controller {

    public function index()
    {
        $this->load->view('komisi/root.html');
    }

    public function dashboard()
    {
        $this->load->view('komisi/pages/v_dashboard.html');
    }

    public function keputusan()
    {
        $this->load->view('komisi/pages/v_keputusan.html');
    }

    public function pengaduan()
    {
        $this->load->view('komisi/pages/v_pengaduan.html');
    }

}