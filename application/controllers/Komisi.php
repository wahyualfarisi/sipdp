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
        if(isset($_GET['id']) ){
            $this->load->view('komisi/pages/v_detail_keputusan.html');    
        }else{
            $this->load->view('komisi/pages/v_keputusan.html');
        }
        
    }

    public function pengaduan()
    {
        $this->load->view('komisi/pages/v_pengaduan.html');
    }

    public function buatsurat()
    {
        if(isset($_GET['id_pgd']) && isset($_GET['nmr_dispo'])){
            $this->load->view('komisi/pages/v_buatsurat.html');
        }
    }

}